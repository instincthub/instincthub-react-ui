import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CalloutView from "../components/blocks/CalloutView";

export type CalloutVariant = "info" | "success" | "warning" | "danger" | "note";

/** Inline colours so exported HTML (e.g. emails) looks right without the stylesheet. */
export const CALLOUT_STYLES: Record<CalloutVariant, { bg: string; border: string; emoji: string }> = {
  info: { bg: "#E6F4F5", border: "#00838F", emoji: "💡" },
  success: { bg: "#F0FDF4", border: "#15803D", emoji: "✅" },
  warning: { bg: "#FFFBEB", border: "#D97706", emoji: "⚠️" },
  danger: { bg: "#FEF2F2", border: "#B91C1C", emoji: "🚫" },
  note: { bg: "#F3F4F6", border: "#6B7280", emoji: "📝" },
};

const isVariant = (value: unknown): value is CalloutVariant =>
  typeof value === "string" && value in CALLOUT_STYLES;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attrs?: { variant?: CalloutVariant; emoji?: string }) => ReturnType;
    };
  }
}

const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      variant: {
        default: "info",
        parseHTML: (el: HTMLElement) => {
          const v = el.getAttribute("data-variant");
          return isVariant(v) ? v : "info";
        },
        renderHTML: () => ({}),
      },
      emoji: {
        default: "💡",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-emoji") || "💡",
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
        priority: 60,
        // Fall back to the div itself when a sanitizer stripped the body class.
        contentElement: (el: HTMLElement) => (el.querySelector(".ihub-te-callout-body") as HTMLElement) ?? el,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const variant = isVariant(node.attrs.variant) ? node.attrs.variant : "info";
    const style = CALLOUT_STYLES[variant as CalloutVariant];
    const emoji = String(node.attrs.emoji || style.emoji).slice(0, 8);
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "callout",
        "data-variant": variant,
        "data-emoji": emoji,
        class: `ihub-te-callout ihub-te-callout--${variant}`,
        style: `display:flex;gap:12px;background-color:${style.bg};border-left:4px solid ${style.border};padding:16px 18px;border-radius:6px;`,
      }),
      ["span", { class: "ihub-te-callout-emoji", contenteditable: "false" }, emoji],
      ["div", { class: "ihub-te-callout-body", style: "flex:1;min-width:0;" }, 0],
    ];
  },

  addCommands() {
    return {
      setCallout:
        (attrs = {}) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { variant: attrs.variant || "info", emoji: attrs.emoji || CALLOUT_STYLES[attrs.variant || "info"].emoji },
            content: [{ type: "paragraph" }],
          }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView);
  },
});

export default Callout;
