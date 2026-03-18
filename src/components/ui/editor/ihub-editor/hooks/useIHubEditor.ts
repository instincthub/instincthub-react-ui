"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
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
import { Extension } from "@tiptap/core";

import { IHubEditorFeatures, DEFAULT_FEATURES } from "../types";
import PullQuoteExtension from "../extensions/PullQuoteExtension";
import SlashCommandExtension from "../extensions/SlashCommandExtension";
import ImageWithCaption from "../extensions/ImageWithCaption";
import EmbedExtension from "../extensions/EmbedExtension";
import { SLASH_COMMANDS } from "../constants";

interface UseIHubEditorOptions {
  content?: string;
  placeholder?: string;
  charLimit?: number;
  features?: IHubEditorFeatures;
  readOnly?: boolean;
  onChange?: (html: string) => void;
  onBlur?: () => void;
  additionalExtensions?: Extension[];
  onSlashCommandStart?: (props: any) => void;
  onSlashCommandExit?: () => void;
}

export default function useIHubEditor({
  content = "",
  placeholder = "Tell your story...",
  charLimit = 50000,
  features: featuresProp,
  readOnly = false,
  onChange,
  onBlur,
  additionalExtensions = [],
  onSlashCommandStart,
  onSlashCommandExit,
}: UseIHubEditorOptions) {
  const features = { ...DEFAULT_FEATURES, ...featuresProp };

  const extensions: Extension[] = [
    StarterKit.configure({
      dropcursor: false,
      codeBlock: false,
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: "ihub-te-link",
      },
    }),
    Underline,
    Highlight.configure({ multicolor: true }),
    TextStyle,
    Color,
    Dropcursor.configure({
      color: "var(--DarkCyan)",
      width: 2,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Image,
    ImageWithCaption,
    Placeholder.configure({
      placeholder,
      emptyEditorClass: "ihub-te-empty",
    }),
    CharacterCount.configure({
      limit: charLimit,
    }),
  ];

  if (features.tables) {
    extensions.push(
      Table.configure({ resizable: true }) as any,
      TableRow as any,
      TableCell as any,
      TableHeader as any
    );
  }

  if (features.codeBlocks) {
    extensions.push(
      CodeBlock.configure({
        exitOnTripleEnter: true,
        exitOnArrowDown: true,
      }) as any
    );
  }

  if (features.taskLists) {
    extensions.push(
      TaskList as any,
      TaskItem.configure({ nested: true }) as any
    );
  }

  if (features.pullQuotes) {
    extensions.push(PullQuoteExtension as any);
  }

  if (features.mediaEmbeds) {
    extensions.push(
      Youtube.configure({
        HTMLAttributes: {
          class: "ihub-te-youtube",
        },
      }) as any,
      EmbedExtension as any
    );
  }

  if (features.typography) {
    extensions.push(Typography as any);
  }

  if (features.focusMode) {
    extensions.push(
      Focus.configure({
        className: "ihub-te-has-focus",
        mode: "deepest",
      }) as any
    );
  }

  if (features.slashCommands) {
    extensions.push(
      SlashCommandExtension.configure({
        suggestion: {
          items: ({ query }: { query: string }) => {
            return SLASH_COMMANDS.filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10);
          },
          render: () => {
            return {
              onStart: (props: any) => {
                onSlashCommandStart?.(props);
              },
              onUpdate: (props: any) => {
                onSlashCommandStart?.(props);
              },
              onKeyDown: (props: any) => {
                if (props.event.key === "Escape") {
                  onSlashCommandExit?.();
                  return true;
                }
                return false;
              },
              onExit: () => {
                onSlashCommandExit?.();
              },
            };
          },
        },
      }) as any
    );
  }

  extensions.push(...additionalExtensions);

  const editor = useEditor({
    extensions,
    content,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: "ihub-te-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onBlur: () => {
      onBlur?.();
    },
  });

  return editor;
}
