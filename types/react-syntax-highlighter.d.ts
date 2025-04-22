// types/react-syntax-highlighter.d.ts
import { ComponentType } from "react";

export interface SyntaxHighlighterProps {
  language?: string;
  style?: any;
  children: string | string[];
  [key: string]: any; // For additional props
}

declare module "react-syntax-highlighter/dist/cjs/prism" {
  const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism" {
  const tomorrow: any;
  const oneLight: any;
  export { tomorrow, oneLight };
}
