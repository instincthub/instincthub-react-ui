import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    toggleBlock: {
      setToggleBlock: () => ReturnType;
    };
  }
}

/** Title line of a collapsible toggle. */
export const ToggleSummary = Node.create({
  name: "toggleSummary",
  content: "inline*",
  defining: true,
  selectable: false,

  parseHTML() {
    return [{ tag: "summary" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["summary", mergeAttributes(HTMLAttributes, { class: "ihub-te-toggle-summary" }), 0];
  },
});

/** Notion-style collapsible block, exported as native <details>. */
const ToggleBlock = Node.create({
  name: "toggleBlock",
  group: "block",
  content: "toggleSummary block+",
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: (el: HTMLElement) => el.hasAttribute("open"),
        renderHTML: (attrs: { open?: boolean }) => (attrs.open ? { open: "open" } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: "details" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["details", mergeAttributes(HTMLAttributes, { class: "ihub-te-toggle", "data-type": "toggle" }), 0];
  },

  addCommands() {
    return {
      setToggleBlock:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { open: true },
            content: [
              { type: "toggleSummary", content: [{ type: "text", text: "Toggle title" }] },
              { type: "paragraph" },
            ],
          }),
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      let current = node;
      const dom = document.createElement("div");
      dom.className = "ihub-te-toggle";
      dom.setAttribute("data-type", "toggle");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ihub-te-toggle-btn";
      button.contentEditable = "false";
      button.setAttribute("aria-label", "Expand or collapse");
      const content = document.createElement("div");
      content.className = "ihub-te-toggle-content";
      dom.append(button, content);

      const sync = () => {
        dom.classList.toggle("is-open", Boolean(current.attrs.open));
        button.setAttribute("aria-expanded", String(Boolean(current.attrs.open)));
      };
      sync();

      button.addEventListener("mousedown", (e) => e.preventDefault());
      button.addEventListener("click", () => {
        const pos = typeof getPos === "function" ? getPos() : null;
        if (typeof pos !== "number") return;
        // Toggling in read-only mode is a view-only change.
        if (!editor.isEditable) {
          current = current.type.create({ ...current.attrs, open: !current.attrs.open }, current.content);
          sync();
          return;
        }
        editor.view.dispatch(editor.view.state.tr.setNodeMarkup(pos, undefined, { ...current.attrs, open: !current.attrs.open }));
      });

      return {
        dom,
        contentDOM: content,
        update: (updated) => {
          if (updated.type !== current.type) return false;
          current = updated;
          sync();
          return true;
        },
        ignoreMutation: (mutation) => mutation.type === "attributes" && mutation.target === dom,
      };
    };
  },
});

export default ToggleBlock;
