"use client";
import React, { useState, useMemo, useCallback } from "react";
import { EditorContent } from "@tiptap/react";

import { IHubTextEditorProps, DEFAULT_FEATURES } from "./types";
import useIHubEditor from "./hooks/useIHubEditor";
import useSlashCommands from "./hooks/useSlashCommands";
import useImageUpload from "./hooks/useImageUpload";
import useMediaEmbed from "./hooks/useMediaEmbed";
import BubbleToolbar from "./components/BubbleToolbar";
import SlashCommandMenu from "./components/SlashCommandMenu";
import FloatingAddButton from "./components/FloatingAddButton";
import TableToolbar from "./components/TableToolbar";
import EditorFooter from "./components/EditorFooter";

export default function IHubTextEditor({
  name = "editor-content",
  label,
  content = "",
  placeholder = "Tell your story...",
  onChange,
  onBlur,
  required = false,
  charLimit = 50000,
  features: featuresProp,
  onImageUpload,
  className = "",
  minHeight = "400px",
  maxHeight = "80vh",
  lastUpdated,
  readOnly = false,
  extensions: additionalExtensions = [],
}: IHubTextEditorProps) {
  const features = useMemo(
    () => ({ ...DEFAULT_FEATURES, ...featuresProp }),
    [featuresProp]
  );

  const [htmlContent, setHtmlContent] = useState(content);

  const slashCommands = useSlashCommands();

  const handleChange = (html: string) => {
    setHtmlContent(html);
    onChange?.(html);
  };

  const editor = useIHubEditor({
    content,
    placeholder,
    charLimit,
    features: featuresProp,
    readOnly,
    onChange: handleChange,
    onBlur,
    additionalExtensions,
    onSlashCommandStart: slashCommands.onStart,
    onSlashCommandExit: slashCommands.onExit,
  });

  const { openFilePicker } = useImageUpload({
    editor,
    onImageUpload,
    enabled: features.imageUpload,
  });

  useMediaEmbed({
    editor,
    enabled: features.mediaEmbeds,
  });

  const wrapperClass = [
    "ihub-te-wrapper",
    features.focusMode ? "ihub-te-wrapper--focus" : "",
    readOnly ? "ihub-te-wrapper--readonly" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleEditorAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!editor || readOnly) return;
      const target = e.target as HTMLElement;

      // Ignore clicks on bubble toolbar / link popover to preserve selection
      const isBubbleToolbar = target.closest(
        ".ihub-te-bubble-menu, .ihub-te-bubble-toolbar, .ihub-te-link-popover"
      );
      if (isBubbleToolbar) return;

      const isInsideContent = target.closest(".ihub-te-content");

      if (!isInsideContent) {
        // Click on empty space outside content — focus at end
        editor.commands.focus("end");
        return;
      }

      // If clicking below the last node (e.g. after a code block),
      // check if the last node is not a paragraph and add one
      const editorEl = target.closest(".ihub-te-content") as HTMLElement;
      if (!editorEl) return;

      const lastChild = editorEl.lastElementChild;
      if (!lastChild) return;

      const lastChildRect = lastChild.getBoundingClientRect();
      const clickY = e.clientY;

      // User clicked below the last block element
      if (clickY > lastChildRect.bottom) {
        const { doc } = editor.state;
        const lastNode = doc.lastChild;
        if (lastNode && lastNode.type.name !== "paragraph") {
          // Insert a paragraph at the end and focus it
          editor
            .chain()
            .focus("end")
            .command(({ tr, dispatch }) => {
              if (dispatch) {
                const paragraph =
                  editor.state.schema.nodes.paragraph.create();
                tr.insert(tr.doc.content.size, paragraph);
              }
              return true;
            })
            .focus("end")
            .run();
        } else {
          editor.commands.focus("end");
        }
      }
    },
    [editor, readOnly]
  );

  if (!editor) return null;

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={name} className="ihub-te-label">
          {label}
          {required && <span className="ihub-te-required">*</span>}
        </label>
      )}

      <div
        className="ihub-te-editor-area"
        style={{
          minHeight,
          maxHeight,
        }}
        onClick={handleEditorAreaClick}
      >
        {features.bubbleMenu && !readOnly && (
          <BubbleToolbar editor={editor} />
        )}

        {features.floatingAddButton && !readOnly && (
          <FloatingAddButton
            editor={editor}
            onImageInsert={openFilePicker}
          />
        )}

        {features.slashCommands && slashCommands.isOpen && (
          <SlashCommandMenu
            items={slashCommands.items}
            selectedIndex={slashCommands.selectedIndex}
            onSelect={slashCommands.selectItem}
            clientRect={slashCommands.clientRect}
          />
        )}

        <EditorContent
          editor={editor}
          className="ihub-te-content-wrapper"
        />

        {features.tables && !readOnly && (
          <TableToolbar editor={editor} />
        )}
      </div>

      <input type="hidden" value={htmlContent} name={name} />

      {features.characterCount && (
        <EditorFooter
          editor={editor}
          charLimit={charLimit}
          lastUpdated={lastUpdated}
        />
      )}
    </div>
  );
}
