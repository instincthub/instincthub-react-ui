import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SectionBannerView from "../components/blocks/SectionBannerView";
import { readStyleValue, safeColor } from "./colorUtils";

export type BannerPadding = "sm" | "md" | "lg";

export const BANNER_PADDING: Record<BannerPadding, string> = {
  sm: "16px 20px",
  md: "28px 28px",
  lg: "48px 32px",
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    sectionBanner: {
      setSectionBanner: (attrs?: { bgColor?: string; textColor?: string }) => ReturnType;
    };
  }
}

const SectionBanner = Node.create({
  name: "sectionBanner",
  group: "block",
  content: "block+",
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      bgColor: {
        default: "#1A2535",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-bg") || readStyleValue(el, "background-color") || "#1A2535",
        renderHTML: () => ({}),
      },
      textColor: {
        default: "#FFFFFF",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-color") || readStyleValue(el, "color") || "#FFFFFF",
        renderHTML: () => ({}),
      },
      align: {
        default: "center",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-align") || readStyleValue(el, "text-align") || "center",
        renderHTML: () => ({}),
      },
      padding: {
        default: "md",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-padding") || "md",
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="section-banner"]', priority: 60 }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const bg = safeColor(node.attrs.bgColor, "#1A2535");
    const color = safeColor(node.attrs.textColor, "#FFFFFF");
    const align = ["left", "center", "right"].includes(node.attrs.align) ? node.attrs.align : "center";
    const padding = BANNER_PADDING[node.attrs.padding as BannerPadding] || BANNER_PADDING.md;
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "section-banner",
        "data-bg": bg,
        "data-color": color,
        "data-align": align,
        "data-padding": BANNER_PADDING[node.attrs.padding as BannerPadding] ? node.attrs.padding : "md",
        class: "ihub-te-banner",
        style: `background-color:${bg};color:${color};text-align:${align};padding:${padding};border-radius:8px;`,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setSectionBanner:
        (attrs = {}) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs,
            content: [
              { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Section title" }] },
              { type: "paragraph", content: [{ type: "text", text: "Add a short line of supporting text." }] },
            ],
          }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SectionBannerView);
  },
});

export default SectionBanner;
