import { afterEach, describe, expect, it } from "vitest";
import type { Editor } from "@tiptap/core";
import { css, makeEditor, toDom } from "./helpers";
import { commandsForFeatures, filterCommands } from "../constants";
import { DEFAULT_FEATURES } from "../types";
import { attrsFromLink } from "../components/media/MediaBlockView";

let editor: Editor;
afterEach(() => editor?.destroy());

const roundTrip = (html: string) => {
  editor = makeEditor(html);
  const first = editor.getHTML();
  const again = makeEditor(first);
  const second = again.getHTML();
  again.destroy();
  return { first, second };
};

describe("section banner", () => {
  it("inserts with default colours and heading", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setSectionBanner();
    const banner = toDom(editor.getHTML()).querySelector('[data-type="section-banner"]') as HTMLElement;
    expect(css(banner, "background-color")).toBe("rgb(26, 37, 53)");
    expect(css(banner, "color")).toBe("rgb(255, 255, 255)");
    expect(banner.querySelector("h2")?.textContent).toBe("Section title");
  });

  it("round-trips custom colours and alignment", () => {
    const { first, second } = roundTrip('<div data-type="section-banner" data-bg="#00838F" data-color="#111827" data-align="left" data-padding="lg"><p>Hi</p></div>');
    expect(first).toBe(second);
    const banner = toDom(first).querySelector("div") as HTMLElement;
    expect(banner.getAttribute("data-bg")).toBe("#00838F");
    expect(css(banner, "text-align")).toBe("left");
    expect(css(banner, "padding")).toBe("48px 32px");
    // Block attributes must not leak onto the element as raw HTML attributes.
    expect(banner.hasAttribute("bgcolor")).toBe(false);
    expect(banner.hasAttribute("padding")).toBe(false);
  });

  it("ignores colour attributes that try to inject CSS", () => {
    editor = makeEditor('<div data-type="section-banner" data-bg="red;position:fixed"><p>x</p></div>');
    expect(editor.getHTML()).not.toMatch(/position:\s*fixed/);
  });
});

describe("callout, toggle and button", () => {
  it("round-trips a callout", () => {
    const { first, second } = roundTrip('<div data-type="callout" data-variant="warning" data-emoji="⚠️"><span>⚠️</span><div class="ihub-te-callout-body"><p>Careful</p></div></div>');
    expect(first).toBe(second);
    expect(first).toContain('data-variant="warning"');
    expect(first).toContain("Careful");
  });

  it("round-trips a toggle as native details/summary", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setToggleBlock();
    const html = editor.getHTML();
    expect(html).toContain("<details");
    expect(html).toContain("<summary");
    expect(roundTrip(html).second).toBe(html);
  });

  it("renders a button with email-safe inline styles and a safe href", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setButtonBlock({ label: "Apply now", href: "https://instincthub.com", bgColor: "#25D366" });
    const link = toDom(editor.getHTML()).querySelector("a.ihub-te-button") as HTMLElement;
    expect(link.textContent).toBe("Apply now");
    expect(css(link, "background-color")).toBe("rgb(37, 211, 102)");
    expect(link.getAttribute("data-bg")).toBe("#25D366");
    expect(roundTrip(editor.getHTML()).second).toContain("Apply now");
  });

  it("neutralises javascript: button links", () => {
    editor = makeEditor('<div data-type="ihub-button"><a href="javascript:alert(1)">x</a></div>');
    expect(editor.getHTML()).not.toContain("javascript:");
  });
});

describe("media blocks", () => {
  it.each([
    ["image", "img"],
    ["video", "video"],
    ["audio", "audio"],
    ["pdf", "iframe.ihub-te-pdf-frame"],
    ["file", "a.ihub-te-file-card"],
    ["embed", "iframe.ihub-te-embed-iframe"],
  ])("renders a %s block by type", (kind, selector) => {
    editor = makeEditor("<p></p>");
    const src = kind === "embed" ? "https://www.youtube.com/embed/abc123" : kind === "pdf" ? "https://cdn.example.com/a.pdf" : "https://cdn.example.com/a";
    editor.commands.setMediaBlock({ kind: kind as any, src, name: "a.bin", size: 2048 });
    const html = editor.getHTML();
    expect(toDom(html).querySelector(selector)).not.toBeNull();
    expect(roundTrip(html).second).toBe(html);
  });

  it("shows file name and size on file cards", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setMediaBlock({ kind: "file", src: "https://cdn.example.com/report.docx", name: "report.docx", size: 1536 });
    const card = toDom(editor.getHTML()).querySelector(".ihub-te-file-card") as HTMLElement;
    expect(card.textContent).toContain("DOCX");
    expect(card.textContent).toContain("report.docx");
    expect(card.textContent).toContain("1.5 KB");
  });

  it("hides empty placeholders from the saved HTML", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setMediaBlock({ kind: "image" });
    expect(editor.getHTML()).toContain('data-empty="true"');
    expect(editor.getHTML()).not.toContain("<img");
  });

  it("never writes javascript: sources", () => {
    editor = makeEditor('<figure data-type="ihub-media" data-kind="image" data-src="javascript:alert(1)"></figure>');
    expect(editor.getHTML()).not.toContain("javascript:");
  });

  it("still reads the old ImageWithCaption markup", () => {
    editor = makeEditor('<figure class="ihub-te-image-block ihub-te-image-left"><img src="https://x.com/a.png" alt="A"><figcaption>Cap</figcaption></figure>');
    const fig = toDom(editor.getHTML()).querySelector("figure") as HTMLElement;
    expect(fig.getAttribute("data-kind")).toBe("image");
    expect(fig.getAttribute("data-align")).toBe("left");
    expect(fig.querySelector("figcaption")?.textContent).toBe("Cap");
  });

  it("keeps the legacy setImageWithCaption command", () => {
    editor = makeEditor("<p></p>");
    editor.commands.setImageWithCaption({ src: "https://x.com/b.png", caption: "Hello" });
    expect(editor.getHTML()).toContain("https://x.com/b.png");
  });

  it("turns video links into the right block", () => {
    expect(attrsFromLink("https://youtu.be/dQw4w9WgXcQ", "video")).toMatchObject({ kind: "embed", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" });
    expect(attrsFromLink("https://cdn.x.com/clip.mp4", "video")).toMatchObject({ kind: "video" });
    expect(attrsFromLink("https://cdn.x.com/doc.pdf", "file")).toMatchObject({ kind: "file", name: "doc.pdf" });
    expect(attrsFromLink("javascript:alert(1)", "image")).toBeNull();
  });
});

describe("command catalogue", () => {
  it("hides commands for disabled features", () => {
    const titles = commandsForFeatures({ ...DEFAULT_FEATURES, tables: false, banners: false }).map((c) => c.title);
    expect(titles).not.toContain("Table");
    expect(titles).not.toContain("Section Banner");
    expect(titles).toContain("PDF");
  });

  it("matches keywords as well as titles", () => {
    const all = commandsForFeatures(DEFAULT_FEATURES);
    expect(filterCommands(all, "cta").map((c) => c.title)).toEqual(["Button"]);
    expect(filterCommands(all, "loom").map((c) => c.title)).toEqual(expect.arrayContaining(["Video", "Embed"]));
  });

  it("every command runs without throwing in a live editor", () => {
    editor = makeEditor("<p></p>");
    commandsForFeatures(DEFAULT_FEATURES).forEach((cmd) => {
      editor.commands.setContent("<p></p>");
      expect(() => cmd.command({ editor })).not.toThrow();
    });
  });
});
