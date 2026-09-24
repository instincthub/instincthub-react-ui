import { readFileSync } from "fs";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import type { Editor } from "@tiptap/core";
import { css, important, makeEditor, toDom } from "./helpers";
import { sanitizeStyle, safeColor } from "../extensions/colorUtils";
import { stripProperties } from "../extensions/PreserveStyles";

const template = readFileSync(path.join(__dirname, "fixtures/emailTemplate.html"), "utf8");

let editor: Editor | null = null;
afterEach(() => {
  editor?.destroy();
  editor = null;
});

describe("rich HTML email template", () => {
  it("keeps the nested layout tables and their email attributes", () => {
    editor = makeEditor(template);
    const dom = toDom(editor.getHTML());
    const tables = dom.querySelectorAll("table");
    expect(tables.length).toBe(4);
    const outer = tables[0];
    expect(outer.getAttribute("role")).toBe("presentation");
    expect(outer.getAttribute("cellpadding")).toBe("0");
    expect(outer.getAttribute("width")).toBe("100%");
    expect(css(outer, "max-width")).toBe("600px");
    expect(css(outer, "margin")).toBe("0px auto");
    expect(tables[3].closest("td")).not.toBeNull();
  });

  it("keeps cell backgrounds, padding and borders", () => {
    editor = makeEditor(template);
    const dom = toDom(editor.getHTML());
    const header = dom.querySelector("td") as HTMLElement;
    expect(header.getAttribute("bgcolor")).toBe("#1A2535");
    expect(css(header, "background-color")).toBe("rgb(26, 37, 53)");
    expect(css(header, "padding")).toBe("26px 24px");
    expect(css(header, "text-align")).toBe("center");
    const tip = Array.from(dom.querySelectorAll("td")).filter((td) => td.textContent?.includes("This week's tip")).pop() as HTMLElement;
    expect(css(tip, "border-left")).toBe("4px solid rgb(0, 131, 143)");
    expect(tip.getAttribute("bgcolor")).toBe("#E6F4F5");
  });

  it("keeps paragraph typography and colours", () => {
    editor = makeEditor(template);
    const dom = toDom(editor.getHTML());
    const title = Array.from(dom.querySelectorAll("p")).find((p) => p.textContent === "Do not let August fade") as HTMLElement;
    expect(css(title, "font-size")).toBe("22px");
    expect(css(title, "font-family")).toContain("Montserrat");
    expect(css(title, "color")).toBe("rgb(255, 255, 255)");
    expect(important(title, "color")).toBe(true);
  });

  it("keeps the styled links, including the WhatsApp button", () => {
    editor = makeEditor(template);
    const dom = toDom(editor.getHTML());
    const whatsapp = Array.from(dom.querySelectorAll("a")).find((a) => a.textContent === "Ask me a question on WhatsApp") as HTMLElement;
    expect(whatsapp.getAttribute("href")).toBe("https://wa.me/2348162880409");
    expect(css(whatsapp, "padding")).toBe("14px 30px");
    expect(css(whatsapp, "display")).toBe("inline-block");
    const green = whatsapp.closest("td") as HTMLElement;
    expect(green.getAttribute("bgcolor")).toBe("#25D366");
  });

  it("keeps every piece of text", () => {
    editor = makeEditor(template);
    const text = editor.getText();
    ["Hi Parent,", "Five minutes every few days", "The 15-minute Saturday re-run", "Talk soon,", "Moyo", "InstinctHub Kids Can Code", "P.S."].forEach((snippet) =>
      expect(text).toContain(snippet)
    );
  });

  it("survives a second round trip unchanged", () => {
    editor = makeEditor(template);
    const first = editor.getHTML();
    const again = makeEditor(first);
    expect(again.getHTML()).toBe(first);
    again.destroy();
  });

  it("drops inline styles when preserveStyles is off", () => {
    editor = makeEditor(template, { preserveStyles: false });
    expect(editor.getHTML()).not.toContain("font-family:Nunito");
  });
});

describe("style sanitising", () => {
  it("removes script-capable declarations", () => {
    expect(sanitizeStyle("color:red;background:url(javascript:alert(1));width:expression(alert(1))")).toBe("color:red");
  });

  it("rejects colour values that smuggle extra CSS", () => {
    expect(safeColor("red;position:fixed", "#000")).toBe("#000");
    expect(safeColor("#1A2535", "#000")).toBe("#1A2535");
    expect(safeColor("rgb(1, 2, 3)", "#000")).toBe("rgb(1, 2, 3)");
  });

  it("strips properties owned by another attribute", () => {
    expect(stripProperties("text-align:center;margin:0", ["text-align"])).toBe("margin:0");
    expect(stripProperties("text-align:center", ["text-align"])).toBeNull();
  });

  it("lets a new text alignment win over a pasted one", () => {
    editor = makeEditor('<p style="text-align:center;margin:0">Hello</p>');
    editor.commands.setTextSelection(2);
    editor.commands.setTextAlign("right");
    const p = toDom(editor.getHTML()).querySelector("p") as HTMLElement;
    expect(css(p, "text-align")).toBe("right");
    expect(css(p, "margin")).toBe("0px");
  });
});
