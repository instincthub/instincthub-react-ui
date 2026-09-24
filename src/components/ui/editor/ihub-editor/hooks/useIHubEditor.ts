"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import Focus from "@tiptap/extension-focus";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import Dropcursor from "@tiptap/extension-dropcursor";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { type AnyExtension, type Extensions } from "@tiptap/core";

import { IHubEditorFeatures, DEFAULT_FEATURES, MediaKind } from "../types";
import PullQuoteExtension from "../extensions/PullQuoteExtension";
import SlashCommandExtension from "../extensions/SlashCommandExtension";
import EmbedExtension from "../extensions/EmbedExtension";
import MediaBlock from "../extensions/MediaBlock";
import SectionBanner from "../extensions/SectionBanner";
import Callout from "../extensions/Callout";
import ToggleBlock, { ToggleSummary } from "../extensions/ToggleBlock";
import ButtonBlock from "../extensions/ButtonBlock";
import { PreserveStyles, StyledBlock } from "../extensions/PreserveStyles";
import { IHubTable, IHubTableCell, IHubTableHeader, IHubTableRow } from "../extensions/TableExtensions";
import BlockKeymap from "../blocks/BlockKeymap";
import { commandsForFeatures, filterCommands } from "../constants";
import type { EditorUploader } from "../upload/uploadFile";

interface UseIHubEditorOptions {
  content?: string;
  placeholder?: string;
  charLimit?: number;
  features?: IHubEditorFeatures;
  readOnly?: boolean;
  onChange?: (html: string) => void;
  onBlur?: () => void;
  additionalExtensions?: Extensions;
  onSlashCommandStart?: (props: any) => void;
  onSlashCommandExit?: () => void;
  uploaderRef?: { current: EditorUploader | null };
}

function uploadKinds(features: Required<IHubEditorFeatures>): MediaKind[] {
  const kinds: MediaKind[] = [];
  if (features.imageUpload) kinds.push("image");
  if (features.fileUploads) kinds.push("video", "audio", "pdf", "file");
  return kinds;
}

/** Build the extension list for the enabled features. Exported for headless tests. */
export function buildExtensions({
  placeholder = "Tell your story...",
  charLimit = 50000,
  features: featuresProp,
  additionalExtensions = [],
  onSlashCommandStart,
  onSlashCommandExit,
  uploaderRef = { current: null },
}: Omit<UseIHubEditorOptions, "content" | "readOnly" | "onChange" | "onBlur">): AnyExtension[] {
  const features = { ...DEFAULT_FEATURES, ...featuresProp };

  const extensions: AnyExtension[] = [
    StarterKit.configure({ dropcursor: false, codeBlock: false }),
    Link.configure({ openOnClick: false, HTMLAttributes: { class: "ihub-te-link" } }),
    Underline,
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color,
    Dropcursor.configure({ color: "var(--DarkCyan)", width: 2 }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    // Plain <img> from pasted HTML; uploads use MediaBlock.
    Image.configure({ HTMLAttributes: { class: "ihub-te-inline-image" } }),
    MediaBlock.configure({ uploaderRef, uploadKinds: uploadKinds(features) }),
    Placeholder.configure({
      placeholder: ({ node, editor }) => {
        if (node.type.name === "heading") return `Heading ${node.attrs.level}`;
        if (node.type.name === "toggleSummary") return "Toggle title";
        return editor.isEmpty ? placeholder : "Type '/' for commands";
      },
      showOnlyCurrent: true,
      includeChildren: true,
      emptyEditorClass: "ihub-te-empty",
    }),
    CharacterCount.configure({ limit: charLimit }),
  ];

  if (features.tables) extensions.push(IHubTable, IHubTableRow, IHubTableCell, IHubTableHeader);
  if (features.codeBlocks) extensions.push(CodeBlock.configure({ exitOnTripleEnter: true, exitOnArrowDown: true }));
  if (features.taskLists) extensions.push(TaskList, TaskItem.configure({ nested: true }));
  if (features.pullQuotes) extensions.push(PullQuoteExtension);
  if (features.banners) extensions.push(SectionBanner);
  if (features.callouts) extensions.push(Callout);
  if (features.toggles) extensions.push(ToggleBlock, ToggleSummary);
  if (features.buttons) extensions.push(ButtonBlock);
  if (features.preserveStyles) extensions.push(PreserveStyles, StyledBlock);
  if (features.mediaEmbeds) {
    extensions.push(Youtube.configure({ HTMLAttributes: { class: "ihub-te-youtube" } }), EmbedExtension);
  }
  if (features.dragHandle) extensions.push(BlockKeymap);
  if (features.typography) extensions.push(Typography);
  if (features.focusMode) extensions.push(Focus.configure({ className: "ihub-te-has-focus", mode: "deepest" }));

  if (features.slashCommands) {
    const available = commandsForFeatures(features);
    extensions.push(
      SlashCommandExtension.configure({
        suggestion: {
          items: ({ query }: { query: string }) => filterCommands(available, query),
          render: () => ({
            onStart: (props: any) => onSlashCommandStart?.(props),
            onUpdate: (props: any) => onSlashCommandStart?.(props),
            onKeyDown: (props: any) => {
              if (props.event.key === "Escape") {
                onSlashCommandExit?.();
                return true;
              }
              return false;
            },
            onExit: () => onSlashCommandExit?.(),
          }),
        },
      })
    );
  }

  extensions.push(...additionalExtensions);
  return extensions;
}

export default function useIHubEditor({ content = "", readOnly = false, onChange, onBlur, ...rest }: UseIHubEditorOptions) {
  return useEditor({
    extensions: buildExtensions(rest),
    content,
    editable: !readOnly,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "ihub-te-content" },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onBlur: () => {
      onBlur?.();
    },
  });
}
