import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";
import { Fragment, Slice } from "@tiptap/pm/model";
import { dropPoint } from "@tiptap/pm/transform";
import type { MediaKind } from "../types";
import type { EditorUploader } from "../upload/uploadFile";
import { EMBED_SANDBOX, fileExtension, formatBytes, isInlinePdf, kindFromMime, renderableSrc, safeWidth } from "../upload/mediaKinds";
import { beginUpload, newUploadId } from "../upload/uploadRegistry";
import type { Editor } from "@tiptap/core";
import MediaBlockView from "../components/media/MediaBlockView";

export interface MediaBlockAttrs {
  kind: MediaKind;
  src?: string | null;
  name?: string | null;
  size?: number | null;
  mime?: string | null;
  caption?: string;
  align?: "left" | "center" | "right";
  width?: string | null;
  pendingId?: string | null;
  uploadError?: string | null;
}

export interface MediaBlockOptions {
  /** Ref so the latest upload props are used without recreating the editor. */
  uploaderRef: { current: EditorUploader | null };
  /** Kinds that may be uploaded (drop / paste / picker). */
  uploadKinds: MediaKind[];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mediaBlock: {
      setMediaBlock: (attrs: Partial<MediaBlockAttrs> & { kind: MediaKind }) => ReturnType;
      setImageWithCaption: (options: { src: string; alt?: string; caption?: string }) => ReturnType;
    };
  }
}

/** Insert a block per file and start uploading each one straight away. */
function queueFiles(editor: Editor, view: EditorView, files: File[], options: MediaBlockOptions, pos?: number): boolean {
  const uploader = options.uploaderRef.current;
  if (!uploader) return false;
  const type = view.state.schema.nodes.mediaBlock;
  const items = files
    .map((file) => ({ file, kind: kindFromMime(file.type, file.name), id: newUploadId() }))
    .filter(({ kind }) => options.uploadKinds.includes(kind));
  if (!items.length) return false;
  const nodes = items.map(({ file, kind, id }) =>
    type.create({ kind, pendingId: id, name: file.name, size: file.size, mime: file.type })
  );
  const slice = new Slice(Fragment.from(nodes), 0, 0);
  const tr = view.state.tr;
  if (typeof pos === "number") {
    // Snap to the nearest block boundary so a drop doesn't split a paragraph.
    tr.insert(dropPoint(view.state.doc, pos, slice) ?? pos, nodes);
  } else {
    tr.replaceSelection(slice);
  }
  view.dispatch(tr.scrollIntoView());
  items.forEach(({ file, kind, id }) => beginUpload(editor, id, file, kind, uploader));
  return true;
}

// Returns null when the data attribute is absent so a parse rule's getAttrs
// (legacy figures, bare <video>) isn't overridden by a default.
const dataAttr = (name: string, parse: (v: string | null) => unknown = (v) => v, fallback: unknown = null) => ({
  default: fallback,
  parseHTML: (el: HTMLElement) => parse(el.getAttribute(`data-${name}`)),
  renderHTML: () => ({}),
});

function mediaChildren(attrs: MediaBlockAttrs): any[] {
  const src = renderableSrc(attrs);
  const width = safeWidth(attrs.width);
  const style = width ? `width:${width}` : undefined;
  const caption = attrs.caption ? [["figcaption", { class: "ihub-te-image-caption" }, attrs.caption]] : [];
  switch (attrs.kind) {
    case "image":
      return [["img", { src, alt: attrs.caption || attrs.name || "", style }], ...caption];
    case "video":
      return [["video", { src, controls: "true", preload: "metadata", playsinline: "true", style }], ...caption];
    case "audio":
      return [["audio", { src, controls: "true", preload: "metadata" }], ...caption];
    case "embed":
      return [
        ["div", { class: "ihub-te-embed-responsive" }, ["iframe", { src, class: "ihub-te-embed-iframe", allowfullscreen: "true", loading: "lazy", frameborder: "0", allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", sandbox: EMBED_SANDBOX }]],
        ...caption,
      ];
    case "pdf":
      if (!isInlinePdf(src)) return fileCard(attrs, src, caption);
      return [
        ["div", { class: "ihub-te-pdf-header" }, ["a", { href: src, target: "_blank", rel: "noopener noreferrer" }, attrs.name || "PDF document"]],
        ["iframe", { src, class: "ihub-te-pdf-frame", loading: "lazy", title: attrs.name || "PDF document" }],
        ...caption,
      ];
    default:
      return fileCard(attrs, src, caption);
  }
}

function fileCard(attrs: MediaBlockAttrs, src: string, caption: any[]): any[] {
  return [
    ["a", { href: src, class: "ihub-te-file-card", target: "_blank", rel: "noopener noreferrer", download: attrs.name || "" },
      ["span", { class: "ihub-te-file-ext" }, fileExtension(attrs.name)],
      ["span", { class: "ihub-te-file-meta" },
        ["span", { class: "ihub-te-file-name" }, attrs.name || "Attachment"],
        ["span", { class: "ihub-te-file-size" }, formatBytes(attrs.size)]]],
    ...caption,
  ];
}

const MediaBlock = Node.create<MediaBlockOptions>({
  name: "mediaBlock",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addOptions() {
    return { uploaderRef: { current: null }, uploadKinds: ["image", "video", "audio", "pdf", "file"] };
  },

  addAttributes() {
    return {
      kind: dataAttr("kind", (v) => v, "image"),
      src: dataAttr("src"),
      name: dataAttr("name"),
      size: dataAttr("size", (v) => (v ? Number(v) : null)),
      mime: dataAttr("mime"),
      align: dataAttr("align", (v) => v, "center"),
      width: dataAttr("width", (v) => safeWidth(v)),
      caption: {
        default: "",
        parseHTML: (el: HTMLElement) => el.querySelector("figcaption")?.textContent || null,
        renderHTML: () => ({}),
      },
      pendingId: { default: null, parseHTML: () => null, renderHTML: () => ({}) },
      uploadError: { default: null, parseHTML: () => null, renderHTML: () => ({}) },
    };
  },

  parseHTML() {
    return [
      { tag: 'figure[data-type="ihub-media"]', priority: 60 },
      {
        // Legacy ImageWithCaption output
        tag: "figure.ihub-te-image-block",
        priority: 55,
        getAttrs: (dom: HTMLElement) => {
          const img = dom.querySelector("img");
          if (!img) return false;
          const align = ["left", "right"].find((a) => dom.classList.contains(`ihub-te-image-${a}`)) || "center";
          return { kind: "image", src: img.getAttribute("src"), align, name: img.getAttribute("alt") };
        },
      },
      {
        tag: "video[src]",
        getAttrs: (dom: HTMLElement) => ({ kind: "video", src: dom.getAttribute("src") }),
      },
      {
        tag: "audio[src]",
        getAttrs: (dom: HTMLElement) => ({ kind: "audio", src: dom.getAttribute("src") }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const attrs = node.attrs as MediaBlockAttrs;
    const src = renderableSrc(attrs);
    const align = ["left", "right"].includes(attrs.align || "") ? attrs.align : "center";
    const figureAttrs = mergeAttributes(HTMLAttributes, {
      "data-type": "ihub-media",
      "data-kind": attrs.kind,
      "data-src": src || null,
      "data-name": attrs.name || null,
      "data-size": attrs.size ?? null,
      "data-mime": attrs.mime || null,
      "data-align": align,
      "data-width": safeWidth(attrs.width),
      class: `ihub-te-media ihub-te-media--${attrs.kind} ihub-te-image-block ihub-te-image-${align}`,
    });
    if (!src) return ["figure", { ...figureAttrs, "data-empty": "true", style: "display:none" }];
    return ["figure", figureAttrs, ...mediaChildren(attrs)] as any;
  },

  addCommands() {
    return {
      setMediaBlock:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
      setImageWithCaption:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { kind: "image", src: options.src, name: options.alt, caption: options.caption || "" },
          }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(MediaBlockView);
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    const options = this.options;
    return [
      new Plugin({
        key: new PluginKey("ihubMediaUpload"),
        props: {
          handlePaste: (view, event) => {
            const files: File[] = Array.from((event as ClipboardEvent).clipboardData?.files ?? []);
            if (!files.length) return false;
            const handled = queueFiles(editor, view, files, options);
            if (handled) event.preventDefault();
            return handled;
          },
          handleDrop: (view, event, _slice, moved) => {
            if (moved) return false;
            const files: File[] = Array.from((event as DragEvent).dataTransfer?.files ?? []);
            if (!files.length) return false;
            const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
            const handled = queueFiles(editor, view, files, options, coords?.pos);
            if (handled) event.preventDefault();
            return handled;
          },
        },
      }),
    ];
  },
});

export default MediaBlock;
