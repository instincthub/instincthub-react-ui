"use client";
import React, { useState } from "react";
import CustomTextEditor from "../editor/CustomTextEditor";
import ContentViewer from "./ContentViewer";

interface ContentViewOrEditProps {
  setContent: (html: string) => void;
  content: string;
  title: string;
  showToolbar: boolean;
  placeholder: string;
  charLimit: number;
  lastUpdated?: string;
  showEditBtn?: boolean;
  showPreviewBtn?: boolean;
  /** Show a copy button on fenced code blocks (default: true) */
  enableCodeCopy?: boolean;
  /** Allow inline `code` snippets to be copied on click (default: true) */
  enableInlineCodeCopy?: boolean;
  /** Draw a line-number gutter on multi-line code blocks (default: true) */
  showCodeLineNumbers?: boolean;
}

/**
 * Toggles between an editable rich-text editor and a read-only ContentViewer.
 *
 * @component
 * @example
 * ```jsx
 * import { ContentViewOrEdit } from "@instincthub/react-ui";
 * <ContentViewOrEdit
 *   content={content}
 *   setContent={setContent}
 *   title="Lesson notes"
 *   showToolbar
 *   placeholder="Write something..."
 *   charLimit={5000}
 * />
 * ```
 */
export default function ContentViewOrEdit(
  props: ContentViewOrEditProps
): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="ihub-content-page ihub-style-list">
      {isEditing ? (
        <CustomTextEditor
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          content={props.content}
          onChange={props.setContent}
          placeholder={props.placeholder}
          charLimit={props.charLimit}
          lastUpdated={props.lastUpdated}
          showPreviewBtn={props.showPreviewBtn}
        />
      ) : (
        <ContentViewer
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          content={props.content}
          title={props.title}
          showToolbar={props.showToolbar}
          showEditBtn={props.showEditBtn}
          enableCodeCopy={props.enableCodeCopy ?? true}
          enableInlineCodeCopy={props.enableInlineCodeCopy ?? true}
          showCodeLineNumbers={props.showCodeLineNumbers ?? true}
        />
      )}
    </div>
  );
}
