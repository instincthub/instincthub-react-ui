import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embed: {
      setEmbed: (options: { src: string; type?: string }) => ReturnType;
    };
  }
}

const EmbedExtension = Node.create({
  name: "embed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      type: { default: "generic" },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }: any) {
    const src = HTMLAttributes.src || "";
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "embed",
        class: "ihub-te-embed-wrapper",
      }),
      [
        "iframe",
        {
          src,
          frameborder: "0",
          allowfullscreen: "true",
          class: "ihub-te-embed-iframe",
        },
      ],
    ];
  },

  addCommands() {
    return {
      setEmbed:
        (options: any) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default EmbedExtension;
