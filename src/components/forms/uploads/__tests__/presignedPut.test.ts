// The uploaders must PUT with exactly what the server signed and never fall
// back to signing in the browser.
import { afterEach, describe, expect, it, vi } from "vitest";
import { presignAndUpload, uploadToPresignedUrl } from "../presignedPut";

interface FakeXhr {
  method?: string;
  url?: string;
  headers: Record<string, string>;
  body?: unknown;
  status: number;
  upload: { onprogress?: (e: { lengthComputable: boolean; loaded: number; total: number }) => void };
  onload?: () => void;
  onerror?: () => void;
  ontimeout?: () => void;
}

let sent: FakeXhr[] = [];

function installXhr(status: number) {
  sent = [];
  class Xhr {
    headers: Record<string, string> = {};
    status = status;
    upload: FakeXhr["upload"] = {};
    method?: string;
    url?: string;
    onload?: () => void;
    open(method: string, url: string) {
      this.method = method;
      this.url = url;
    }
    setRequestHeader(name: string, value: string) {
      this.headers[name] = value;
    }
    send(body: unknown) {
      sent.push(this as unknown as FakeXhr);
      (this as unknown as FakeXhr).body = body;
      this.upload.onprogress?.({ lengthComputable: true, loaded: 5, total: 10 });
      this.onload?.();
    }
  }
  vi.stubGlobal("XMLHttpRequest", Xhr);
}

afterEach(() => vi.unstubAllGlobals());

const file = new File(["hello"], "notes.txt", { type: "text/html" });

describe("uploadToPresignedUrl", () => {
  it("PUTs the file with the signed content type and extra headers", async () => {
    installXhr(200);
    const progress: number[] = [];
    await uploadToPresignedUrl("https://bucket/put", file, "text/plain", (p) => progress.push(p), {
      "x-amz-acl": "public-read",
      "Content-Type": "ignored/duplicate",
    });
    expect(sent).toHaveLength(1);
    expect(sent[0].method).toBe("PUT");
    expect(sent[0].url).toBe("https://bucket/put");
    // The server's type wins over the browser's file.type and duplicate headers.
    expect(sent[0].headers["Content-Type"]).toBe("text/plain");
    expect(sent[0].headers["x-amz-acl"]).toBe("public-read");
    expect(sent[0].body).toBe(file);
    expect(progress).toEqual([50]);
  });

  it("rejects when the bucket refuses the PUT", async () => {
    installXhr(403);
    await expect(uploadToPresignedUrl("https://bucket/put", file, "text/plain", () => {})).rejects.toThrow(
      "HTTP 403"
    );
  });
});

describe("presignAndUpload", () => {
  it("asks the consumer's server first, then uploads to the returned URL", async () => {
    installXhr(200);
    const getPresignedUrl = vi.fn().mockResolvedValue({
      url: "https://bucket/signed",
      key: "u1__2026-10-16t00-00-00-000z-notes.txt",
      cdnUrl: "https://cdn/notes.txt",
      contentType: "text/plain",
      headers: { "x-amz-acl": "public-read" },
    });
    const result = await presignAndUpload(file, getPresignedUrl, () => {});
    expect(getPresignedUrl).toHaveBeenCalledWith(file);
    expect(sent[0].url).toBe("https://bucket/signed");
    expect(result.cdnUrl).toBe("https://cdn/notes.txt");
  });

  it("does not upload when presigning fails", async () => {
    installXhr(200);
    const getPresignedUrl = vi.fn().mockRejectedValue(new Error("Please sign in"));
    await expect(presignAndUpload(file, getPresignedUrl, () => {})).rejects.toThrow("Please sign in");
    expect(sent).toHaveLength(0);
  });
});
