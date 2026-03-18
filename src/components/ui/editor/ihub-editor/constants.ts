import { SlashCommandItem } from "./types";

export const SLASH_COMMANDS: SlashCommandItem[] = [
  {
    title: "Heading 2",
    description: "Large section heading",
    icon: "heading-2",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Medium section heading",
    icon: "heading-3",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list",
    icon: "list",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    icon: "list-ordered",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Task List",
    description: "Track tasks with checkboxes",
    icon: "list-checks",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Blockquote",
    description: "Capture a quote",
    icon: "quote",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code Block",
    description: "Display code with syntax",
    icon: "code-xml",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Image",
    description: "Upload or embed an image",
    icon: "image",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      // Image upload is handled by the component via custom event
      const event = new CustomEvent("ihub-editor-insert-image", {
        detail: { editor },
      });
      document.dispatchEvent(event);
    },
  },
  {
    title: "Table",
    description: "Insert a table",
    icon: "table",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
  {
    title: "Horizontal Rule",
    description: "Visual divider",
    icon: "minus",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    title: "YouTube Video",
    description: "Embed a YouTube video",
    icon: "youtube",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      const url = prompt("Enter YouTube URL:");
      if (url) {
        editor.commands.setYoutubeVideo({ src: url });
      }
    },
  },
  {
    title: "Pull Quote",
    description: "Highlight a key quote",
    icon: "message-square-quote",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setPullQuote()
        .run();
    },
  },
];

export const KEYBOARD_SHORTCUTS: Record<string, string> = {
  "Mod-b": "Bold",
  "Mod-i": "Italic",
  "Mod-u": "Underline",
  "Mod-Shift-s": "Strikethrough",
  "Mod-Shift-h": "Highlight",
  "Mod-k": "Link",
  "Mod-Shift-1": "Heading 1",
  "Mod-Shift-2": "Heading 2",
  "Mod-Shift-3": "Heading 3",
};
