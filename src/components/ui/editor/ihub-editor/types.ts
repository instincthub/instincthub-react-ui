import { Extension } from "@tiptap/react";

export interface IHubTextEditorProps {
  name?: string;
  label?: string;
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  onBlur?: () => void;
  required?: boolean;
  charLimit?: number;
  features?: IHubEditorFeatures;
  onImageUpload?: (file: File) => Promise<string>;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  lastUpdated?: string;
  readOnly?: boolean;
  extensions?: Extension[];
}

export interface IHubEditorFeatures {
  bubbleMenu?: boolean;
  slashCommands?: boolean;
  floatingAddButton?: boolean;
  dragHandle?: boolean;
  focusMode?: boolean;
  imageUpload?: boolean;
  mediaEmbeds?: boolean;
  tables?: boolean;
  codeBlocks?: boolean;
  taskLists?: boolean;
  pullQuotes?: boolean;
  characterCount?: boolean;
  typography?: boolean;
}

export interface SlashCommandItem {
  title: string;
  description: string;
  icon: string;
  command: (props: { editor: any; range: any }) => void;
}

export interface LinkPopoverState {
  isOpen: boolean;
  url: string;
}

export const DEFAULT_FEATURES: Required<IHubEditorFeatures> = {
  bubbleMenu: true,
  slashCommands: true,
  floatingAddButton: true,
  dragHandle: false,
  focusMode: false,
  imageUpload: true,
  mediaEmbeds: true,
  tables: true,
  codeBlocks: true,
  taskLists: true,
  pullQuotes: true,
  characterCount: true,
  typography: true,
};
