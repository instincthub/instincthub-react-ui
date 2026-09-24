import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ButtonBlockView from "../components/blocks/ButtonBlockView";
import { readStyleValue, safeColor } from "./colorUtils";
import { isSafeUrl } from "../upload/mediaKinds";

export interface ButtonBlockAttrs {
  href: string;
  label: string;
  bgColor: string;
  textColor: string;
  align: "left" | "center" | "right";
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    buttonBlock: {
      setButtonBlock: (attrs?: Partial<ButtonBlockAttrs>) => ReturnType;
    };
  }
}

/** http(s), site-relative, mailto: and tel: links only. */
export function safeButtonHref(href: unknown): string {
  if (typeof href !== "string") return "#";
  return isSafeUrl(href) || /^(mailto|tel):/i.test(href.trim()) ? href.trim() : "#";
}

export function buttonInlineStyle(bg: string, color: string): string {
  return `display:inline-block;padding:14px 30px;background-color:${bg};color:${color};border-radius:6px;font-weight:700;text-decoration:none;`;
}

/** Call-to-action button. Inline styles keep it intact in emails. */
const ButtonBlock = Node.create({
  name: "buttonBlock",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    const fromLink = (read: (a: HTMLAnchorElement) => string | null, fallback: string) => ({
      default: fallback,
      parseHTML: (el: HTMLElement) => {
        const link = el.querySelector("a");
        return (link && read(link)) || fallback;
      },
      renderHTML: () => ({}),
    });
    return {
      href: fromLink((a) => a.getAttribute("href"), "https://"),
      label: fromLink((a) => a.textContent, "Click here"),
      bgColor: fromLink((a) => a.getAttribute("data-bg") || readStyleValue(a, "background-color"), "#00838F"),
      textColor: fromLink((a) => a.getAttribute("data-color") || readStyleValue(a, "color"), "#FFFFFF"),
      align: {
        default: "center",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-align") || readStyleValue(el, "text-align") || "center",
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="ihub-button"]', priority: 60 }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const attrs = node.attrs as ButtonBlockAttrs;
    const bg = safeColor(attrs.bgColor, "#00838F");
    const color = safeColor(attrs.textColor, "#FFFFFF");
    const align = ["left", "center", "right"].includes(attrs.align) ? attrs.align : "center";
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "ihub-button", "data-align": align, style: `text-align:${align};margin:24px 0;` }),
      [
        "a",
        {
          href: safeButtonHref(attrs.href),
          class: "ihub-te-button",
          target: "_blank",
          rel: "noopener noreferrer",
          "data-bg": bg,
          "data-color": color,
          style: buttonInlineStyle(bg, color),
        },
        attrs.label || "Click here",
      ],
    ];
  },

  addCommands() {
    return {
      setButtonBlock:
        (attrs = {}) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonBlockView);
  },
});

export default ButtonBlock;
