import { IHubEditorFeatures, SlashCommandItem, MediaKind } from "./types";

/** Start a chain, removing the "/query" text when invoked from the slash menu. */
const start = (editor: any, range?: any) => {
  const chain = editor.chain().focus();
  return range ? chain.deleteRange(range) : chain;
};

const media = (kind: MediaKind) => ({ editor, range }: { editor: any; range?: any }) =>
  start(editor, range).setMediaBlock({ kind }).scrollIntoView().run();

export const SLASH_COMMANDS: SlashCommandItem[] = [
  { title: "Text", description: "Plain paragraph", icon: "text", keywords: ["paragraph", "p"],
    command: ({ editor, range }) => start(editor, range).setParagraph().run() },
  { title: "Heading 1", description: "Page title", icon: "heading-1", keywords: ["h1", "title"],
    command: ({ editor, range }) => start(editor, range).setHeading({ level: 1 }).run() },
  { title: "Heading 2", description: "Large section heading", icon: "heading-2", keywords: ["h2", "subtitle"],
    command: ({ editor, range }) => start(editor, range).setHeading({ level: 2 }).run() },
  { title: "Heading 3", description: "Medium section heading", icon: "heading-3", keywords: ["h3"],
    command: ({ editor, range }) => start(editor, range).setHeading({ level: 3 }).run() },
  { title: "Bullet List", description: "Create a simple bullet list", icon: "list", keywords: ["ul", "unordered"],
    command: ({ editor, range }) => start(editor, range).toggleBulletList().run() },
  { title: "Numbered List", description: "Create a numbered list", icon: "list-ordered", keywords: ["ol", "ordered"],
    command: ({ editor, range }) => start(editor, range).toggleOrderedList().run() },
  { title: "Task List", description: "Track tasks with checkboxes", icon: "list-checks", keywords: ["todo", "checkbox"], feature: "taskLists",
    command: ({ editor, range }) => start(editor, range).toggleTaskList().run() },
  { title: "Toggle", description: "Collapsible section", icon: "toggle", keywords: ["collapse", "details", "accordion"], feature: "toggles",
    command: ({ editor, range }) => start(editor, range).setToggleBlock().run() },
  { title: "Section Banner", description: "Coloured box with text over it", icon: "banner", keywords: ["hero", "header", "box", "section"], feature: "banners",
    command: ({ editor, range }) => start(editor, range).setSectionBanner().run() },
  { title: "Callout", description: "Highlight a tip, note or warning", icon: "callout", keywords: ["tip", "note", "info", "warning"], feature: "callouts",
    command: ({ editor, range }) => start(editor, range).setCallout().run() },
  { title: "Button", description: "Call-to-action link button", icon: "button", keywords: ["cta", "link"], feature: "buttons",
    command: ({ editor, range }) => start(editor, range).setButtonBlock().run() },
  { title: "Blockquote", description: "Capture a quote", icon: "quote", keywords: ["quote"],
    command: ({ editor, range }) => start(editor, range).toggleBlockquote().run() },
  { title: "Pull Quote", description: "Highlight a key quote", icon: "message-square-quote", keywords: ["quote"], feature: "pullQuotes",
    command: ({ editor, range }) => start(editor, range).setPullQuote().run() },
  { title: "Code Block", description: "Display code with syntax", icon: "code-xml", keywords: ["code", "pre"], feature: "codeBlocks",
    command: ({ editor, range }) => start(editor, range).toggleCodeBlock().run() },
  { title: "Table", description: "Insert a table", icon: "table", keywords: ["grid"], feature: "tables",
    command: ({ editor, range }) => start(editor, range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  { title: "Divider", description: "Visual separator", icon: "minus", keywords: ["hr", "horizontal rule", "line"],
    command: ({ editor, range }) => start(editor, range).setHorizontalRule().run() },
  { title: "Image", description: "Upload or link an image", icon: "image", keywords: ["picture", "photo"], feature: "imageUpload",
    command: media("image") },
  { title: "Video", description: "Upload a video or embed YouTube/Vimeo/Loom", icon: "video", keywords: ["movie", "mp4", "youtube", "vimeo", "loom"], feature: "fileUploads",
    command: media("video") },
  { title: "Audio", description: "Upload or link an audio clip", icon: "audio", keywords: ["sound", "mp3", "podcast"], feature: "fileUploads",
    command: media("audio") },
  { title: "PDF", description: "Upload a PDF and view it inline", icon: "pdf", keywords: ["document"], feature: "fileUploads",
    command: media("pdf") },
  { title: "File", description: "Attach any file for download", icon: "file", keywords: ["attachment", "upload", "download"], feature: "fileUploads",
    command: media("file") },
  { title: "Embed", description: "YouTube, Vimeo, Loom, Figma, Google Drive…", icon: "embed", keywords: ["iframe", "youtube", "vimeo", "loom", "figma", "drive"], feature: "mediaEmbeds",
    command: media("embed") },
];

/** Commands available for the enabled feature set. */
export function commandsForFeatures(features: Required<IHubEditorFeatures>): SlashCommandItem[] {
  return SLASH_COMMANDS.filter((item) => !item.feature || features[item.feature]);
}

/** Case-insensitive match on title and keywords. */
export function filterCommands(items: SlashCommandItem[], query: string): SlashCommandItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) => item.title.toLowerCase().includes(q) || (item.keywords || []).some((k) => k.includes(q))
  );
}

export const KEYBOARD_SHORTCUTS: Record<string, string> = {
  "Mod-b": "Bold",
  "Mod-i": "Italic",
  "Mod-u": "Underline",
  "Mod-Shift-s": "Strikethrough",
  "Mod-Shift-h": "Highlight",
  "Mod-k": "Link",
  "Mod-Shift-v": "Paste as plain text",
  "Mod-Alt-1": "Heading 1",
  "Mod-Alt-2": "Heading 2",
  "Mod-Alt-3": "Heading 3",
};
