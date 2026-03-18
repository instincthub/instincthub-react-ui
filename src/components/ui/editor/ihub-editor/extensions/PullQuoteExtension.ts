import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    pullQuote: {
      setPullQuote: () => ReturnType;
      togglePullQuote: () => ReturnType;
    };
  }
}

const PullQuoteExtension = Node.create({
  name: "pullQuote",
  group: "block",
  content: "inline*",
  defining: true,

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: 'blockquote[data-type="pull-quote"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: any) {
    return [
      "blockquote",
      mergeAttributes(HTMLAttributes, {
        "data-type": "pull-quote",
        class: "ihub-te-pull-quote",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setPullQuote:
        () =>
        ({ commands }: any) => {
          return commands.setNode(this.name);
        },
      togglePullQuote:
        () =>
        ({ commands }: any) => {
          return commands.toggleNode(this.name, "paragraph");
        },
    };
  },
});

export default PullQuoteExtension;
