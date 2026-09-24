import { afterEach, describe, expect, it } from "vitest";
import { Editor } from "@tiptap/core";
import { makeEditor, toDom, css } from "./helpers";
import { buildExtensions } from "../hooks/useIHubEditor";
import { sanitizeStyle } from "../extensions/colorUtils";
import { TableViewWithAttrs } from "../extensions/TableExtensions";
import { beginUpload, getUpload, newUploadId } from "../upload/uploadRegistry";
import { canUpload } from "../upload/uploadFile";
import { isAllowedEmbed, isSafeUrl, safeWidth } from "../upload/mediaKinds";
import { safeButtonHref } from "../extensions/ButtonBlock";
import { findTableAt } from "../table/tableOps";

let editor: Editor | null = null;
afterEach(() => {
  editor?.destroy();
  editor = null;
});

describe("review fixes", () => {
  it("loads a callout whose body class was stripped instead of crashing", () => {
    expect(() => (editor = makeEditor('<div data-type="callout"><p>hi</p></div>'))).not.toThrow();
    expect(editor!.getHTML()).toContain("hi");
    expect(editor!.getHTML()).toContain('data-type="callout"');
  });

  it("rejects media widths that carry extra CSS", () => {
    editor = makeEditor('<figure data-type="ihub-media" data-kind="image" data-src="https://x.com/a.png" data-width="10px;position:fixed;inset:0"></figure>');
    expect(editor.getHTML()).not.toMatch(/position/);
    expect(safeWidth("60%")).toBe("60%");
    expect(safeWidth("480px")).toBe("480px");
    expect(safeWidth("10px;x:y")).toBeNull();
  });

  it("only embeds known providers, sandboxed", () => {
    editor = makeEditor('<figure data-type="ihub-media" data-kind="embed" data-src="https://evil.example/login"></figure>');
    expect(editor.getHTML()).not.toContain("<iframe");
    editor.commands.setContent('<figure data-type="ihub-media" data-kind="embed" data-src="https://www.youtube.com/embed/abc"></figure>');
    const frame = toDom(editor.getHTML()).querySelector("iframe") as HTMLElement;
    expect(frame.getAttribute("sandbox")).toContain("allow-scripts");
    expect(frame.getAttribute("sandbox")).not.toContain("allow-forms");
    expect(isAllowedEmbed("https://evil.youtube.com.attacker.io/x")).toBe(false);
    expect(isAllowedEmbed("http://www.youtube.com/embed/x")).toBe(false);
  });

  it("frames PDFs only when the URL is a real .pdf", () => {
    editor = makeEditor('<figure data-type="ihub-media" data-kind="pdf" data-src="https://evil.example/login" data-name="doc"></figure>');
    expect(editor.getHTML()).not.toContain("<iframe");
    expect(editor.getHTML()).toContain("ihub-te-file-card");
    editor.commands.setContent('<figure data-type="ihub-media" data-kind="pdf" data-src="https://cdn.x.com/guide.PDF?v=2"></figure>');
    expect(editor.getHTML()).toContain("ihub-te-pdf-frame");
  });

  it("strips remote url() and page-pinning positions from preserved styles", () => {
    expect(sanitizeStyle("color:red;background-image:url(https://evil/p.gif);position:fixed;inset:0")).toBe("color:red;inset:0");
    expect(sanitizeStyle("background:url('data:image/png;base64,AAA')")).toContain("data:image/png");
    editor = makeEditor('<div style="position:fixed;color:red"><p>x</p></div>');
    expect(editor.getHTML()).not.toMatch(/position/);
  });

  it("sanitises styled blocks set through JSON content", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setContent({ type: "doc", content: [{ type: "styledBlock", attrs: { style: "position:fixed;color:red" }, content: [{ type: "paragraph" }] }] });
    expect(editor.getHTML()).not.toMatch(/position/);
    expect(editor.getHTML()).toMatch(/color:\s*red/);
  });

  it("does not treat protocol-relative or script URLs as safe", () => {
    expect(isSafeUrl("//evil.com/x")).toBe(false);
    expect(isSafeUrl("/uploads/x.png")).toBe(true);
    expect(safeButtonHref("javascript:alert(1)")).toBe("#");
    expect(safeButtonHref("mailto:hi@x.com")).toBe("mailto:hi@x.com");
  });

  it("keeps direct S3 off unless explicitly enabled", () => {
    // No NEXT_PUBLIC_AWS_* keys here, so even opting in has nothing to use.
    expect(canUpload({ upload: {} }, "image")).toBe(false);
    expect(canUpload({ upload: { directS3: true } }, "image")).toBe(false);
  });

  it("clears table styles the view applied when the style changes", () => {
    editor = makeEditor('<table style="border:5px solid red"><tbody><tr><td><p>a</p></td></tr></tbody></table>');
    const ref = findTableAt(editor.state.doc, 3)!;
    const view = new TableViewWithAttrs(ref.node, 25);
    expect(css(view.table, "border")).toContain("5px");
    const cleared = ref.node.type.create({ ...ref.node.attrs, style: null }, ref.node.content);
    view.update(cleared);
    expect(css(view.table, "border")).toBe("");
  });

  it("finishes an upload even after the block moved", async () => {
    editor = new Editor({ extensions: buildExtensions({}), content: "<p>first</p>" });
    const id = newUploadId();
    editor.commands.setContent({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "first" }] }, { type: "mediaBlock", attrs: { kind: "image", pendingId: id } }],
    });
    let resolve!: (v: { url: string }) => void;
    const uploader = () => new Promise<{ url: string }>((r) => (resolve = r));
    beginUpload(editor, id, new File(["x"], "a.png", { type: "image/png" }), "image", uploader as any);
    expect(getUpload(id)).toBeDefined();
    // Simulate a move: new content before the block shifts its position.
    editor.commands.insertContentAt(0, "<h2>moved</h2><p>again</p>");
    resolve({ url: "https://cdn/a.png" });
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));
    expect(editor.getHTML()).toContain('data-src="https://cdn/a.png"');
    expect(getUpload(id)).toBeUndefined();
  });

  it("records upload failures on the node so a new view can show them", async () => {
    editor = new Editor({ extensions: buildExtensions({}), content: "<p></p>" });
    const id = newUploadId();
    editor.commands.setMediaBlock({ kind: "file", pendingId: id });
    beginUpload(editor, id, new File(["x"], "a.txt"), "file", (() => Promise.reject(new Error("HTTP 500"))) as any);
    await new Promise((r) => setTimeout(r, 0));
    let attrs: Record<string, unknown> | null = null;
    editor.state.doc.descendants((n) => {
      if (n.type.name === "mediaBlock") attrs = n.attrs;
    });
    expect(attrs).toMatchObject({ pendingId: null, uploadError: "HTTP 500" });
  });
});
