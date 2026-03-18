import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageWithCaption: {
      setImageWithCaption: (options: {
        src: string;
        alt?: string;
        caption?: string;
      }) => ReturnType;
    };
  }
}

const ImageWithCaption = Node.create({
  name: "imageWithCaption",
  group: "block",
  content: "inline*",
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      caption: { default: "" },
      alignment: { default: "center" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure.ihub-te-image-block",
        getAttrs: (dom: HTMLElement) => {
          const img = dom.querySelector("img");
          const figcaption = dom.querySelector("figcaption");
          return {
            src: img?.getAttribute("src"),
            alt: img?.getAttribute("alt"),
            caption: figcaption?.textContent || "",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }: any) {
    const { src, alt, caption, alignment, ...rest } = HTMLAttributes;
    return [
      "figure",
      mergeAttributes(rest, {
        class: `ihub-te-image-block ihub-te-image-${alignment || "center"}`,
      }),
      ["img", { src, alt: alt || "" }],
      ["figcaption", { class: "ihub-te-image-caption" }, caption || ""],
    ];
  },

  addCommands() {
    return {
      setImageWithCaption:
        (options: any) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
            content: options.caption
              ? [{ type: "text", text: options.caption }]
              : [],
          });
        },
    };
  },
});

export default ImageWithCaption;
