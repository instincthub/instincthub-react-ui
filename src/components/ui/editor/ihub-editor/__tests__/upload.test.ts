import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { canUpload, createUploader, extractUrl, UploadNotConfiguredError, validateFileSize } from "../upload/uploadFile";
import { formatBytes, isSafeUrl, kindFromMime, kindFromUrl, toEmbedUrl } from "../upload/mediaKinds";

const file = (name: string, type: string, size = 10) => new File([new Uint8Array(size)], name, { type });

describe("media kind helpers", () => {
  it("maps mime types to block kinds", () => {
    expect(kindFromMime("image/png")).toBe("image");
    expect(kindFromMime("video/mp4")).toBe("video");
    expect(kindFromMime("audio/mpeg")).toBe("audio");
    expect(kindFromMime("application/pdf")).toBe("pdf");
    expect(kindFromMime("", "notes.PDF")).toBe("pdf");
    expect(kindFromMime("application/zip")).toBe("file");
  });

  it("converts provider links to embed URLs", () => {
    expect(toEmbedUrl("https://www.youtube.com/watch?v=abc123XYZ")).toBe("https://www.youtube.com/embed/abc123XYZ");
    expect(toEmbedUrl("https://vimeo.com/76979871")).toBe("https://player.vimeo.com/video/76979871");
    expect(toEmbedUrl("https://www.loom.com/share/abcd1234")).toBe("https://www.loom.com/embed/abcd1234");
    expect(toEmbedUrl("https://drive.google.com/file/d/FILEID/view")).toBe("https://drive.google.com/file/d/FILEID/preview");
    expect(toEmbedUrl("https://example.com/page")).toBeNull();
    expect(toEmbedUrl("javascript:alert(1)")).toBeNull();
  });

  it("guesses kinds from link extensions", () => {
    expect(kindFromUrl("https://x.com/a.webp?x=1", "file")).toBe("image");
    expect(kindFromUrl("https://x.com/a.pdf", "file")).toBe("pdf");
    expect(kindFromUrl("https://x.com/a", "video")).toBe("video");
  });

  it("formats sizes and checks URL safety", () => {
    expect(formatBytes(0)).toBe("");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.0 MB");
    expect(isSafeUrl("https://a.com")).toBe(true);
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("data:text/html,x")).toBe(false);
  });
});

describe("extractUrl", () => {
  it("finds the URL in common API response shapes", () => {
    expect(extractUrl({ url: "https://a" })).toBe("https://a");
    expect(extractUrl({ file: "https://b" })).toBe("https://b");
    expect(extractUrl({ data: { location: "https://c" } })).toBe("https://c");
    expect(extractUrl("https://d")).toBe("https://d");
    expect(extractUrl({ id: 1 })).toBeNull();
  });
});

describe("createUploader", () => {
  it("prefers onFileUpload and fills in file metadata", async () => {
    const onFileUpload = vi.fn(async (_f: File, ctx: { onProgress: (n: number) => void }) => {
      ctx.onProgress(50);
      return "https://cdn/x.pdf";
    });
    const onImageUpload = vi.fn();
    const progress = vi.fn();
    const upload = createUploader({ onFileUpload, onImageUpload });
    const result = await upload(file("x.pdf", "application/pdf"), "pdf", progress);
    expect(result).toEqual({ url: "https://cdn/x.pdf", name: "x.pdf", size: 10, mime: "application/pdf" });
    expect(progress).toHaveBeenCalledWith(50);
    expect(onImageUpload).not.toHaveBeenCalled();
  });

  it("falls back to onImageUpload for images only", async () => {
    const upload = createUploader({ onImageUpload: async () => "https://cdn/i.png" });
    await expect(upload(file("i.png", "image/png"), "image")).resolves.toMatchObject({ url: "https://cdn/i.png" });
    await expect(upload(file("v.mp4", "video/mp4"), "video")).rejects.toBeInstanceOf(UploadNotConfiguredError);
  });

  it("rejects files over the size limit before uploading", async () => {
    const onFileUpload = vi.fn();
    const upload = createUploader({ onFileUpload, upload: { maxSizeMB: { image: 0.00001 } } });
    await expect(upload(file("big.png", "image/png", 100), "image")).rejects.toThrow(/limit/);
    expect(onFileUpload).not.toHaveBeenCalled();
    expect(() => validateFileSize(file("ok.png", "image/png", 10), "image")).not.toThrow();
  });

  it("rejects a handler that returns no URL", async () => {
    const upload = createUploader({ onFileUpload: async () => ({ url: "" }) });
    await expect(upload(file("a.txt", "text/plain"), "file")).rejects.toThrow(/did not return a URL/);
  });

  it("reports whether any strategy is configured", () => {
    expect(canUpload({}, "file")).toBe(false);
    expect(canUpload({ onImageUpload: async () => "" }, "image")).toBe(true);
    expect(canUpload({ onImageUpload: async () => "" }, "pdf")).toBe(false);
    expect(canUpload({ upload: { endpoint: "/api/upload" } }, "pdf")).toBe(true);
  });
});

describe("presign and endpoint strategies", () => {
  const sent: Array<{ method: string; url: string; headers: Record<string, string>; body: unknown }> = [];
  let responseText = "";

  class FakeXHR {
    upload: { onprogress: ((e: any) => void) | null } = { onprogress: null };
    status = 200;
    responseText = "";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    ontimeout: (() => void) | null = null;
    private req = { method: "", url: "", headers: {} as Record<string, string> };
    open(method: string, url: string) {
      this.req.method = method;
      this.req.url = url;
    }
    setRequestHeader(name: string, value: string) {
      this.req.headers[name] = value;
    }
    send(body: unknown) {
      sent.push({ ...this.req, body });
      this.upload.onprogress?.({ lengthComputable: true, loaded: 5, total: 10 });
      this.responseText = responseText;
      this.onload?.();
    }
  }

  beforeEach(() => {
    sent.length = 0;
    vi.stubGlobal("XMLHttpRequest", FakeXHR);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("PUTs to the presigned URL and returns the CDN URL", async () => {
    const getPresignedUrl = vi.fn(async () => ({ url: "https://s3/put", cdnUrl: "https://cdn/a.png", contentType: "image/png", headers: { "x-amz-acl": "public-read" } }));
    const progress = vi.fn();
    const upload = createUploader({ upload: { getPresignedUrl } });
    const result = await upload(file("a.png", "image/png"), "image", progress);
    expect(result.url).toBe("https://cdn/a.png");
    expect(sent[0]).toMatchObject({ method: "PUT", url: "https://s3/put" });
    expect(sent[0].headers).toMatchObject({ "Content-Type": "image/png", "x-amz-acl": "public-read" });
    expect(progress).toHaveBeenCalledWith(50);
  });

  it("POSTs multipart to the endpoint with a bearer token", async () => {
    responseText = JSON.stringify({ data: { file: "https://cdn/doc.pdf" } });
    const upload = createUploader({ upload: { endpoint: "https://api/upload/", token: "tok", extraFields: { folder: "docs" } } });
    const result = await upload(file("doc.pdf", "application/pdf"), "pdf");
    expect(result.url).toBe("https://cdn/doc.pdf");
    expect(sent[0]).toMatchObject({ method: "POST", url: "https://api/upload/" });
    expect(sent[0].headers.Authorization).toBe("Bearer tok");
    expect(sent[0].headers["Content-Type"]).toBeUndefined();
    const form = sent[0].body as FormData;
    expect((form.get("file") as File).name).toBe("doc.pdf");
    expect(form.get("folder")).toBe("docs");
  });

  it("errors clearly when the endpoint response has no URL", async () => {
    responseText = JSON.stringify({ ok: true });
    const upload = createUploader({ upload: { endpoint: "https://api/upload/" } });
    await expect(upload(file("a.txt", "text/plain"), "file")).rejects.toThrow(/did not include a file URL/);
  });
});
