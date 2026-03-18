"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Link, Unlink, ExternalLink } from "lucide-react";

interface LinkPopoverProps {
  editor: Editor;
  onClose: () => void;
}

export default function LinkPopover({ editor, onClose }: LinkPopoverProps) {
  const currentUrl = editor.getAttributes("link").href || "";
  const [url, setUrl] = useState(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const setLink = useCallback(() => {
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const normalizedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: normalizedUrl })
        .run();
    }
    onClose();
  }, [editor, url, onClose]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onClose();
  }, [editor, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setLink();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [setLink, onClose]
  );

  return (
    <div className="ihub-te-link-popover">
      <div className="ihub-te-link-popover-input-wrapper">
        <Link size={14} />
        <input
          ref={inputRef}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste or type a link..."
          className="ihub-te-link-popover-input"
        />
      </div>
      <div className="ihub-te-link-popover-actions">
        <button
          type="button"
          onClick={setLink}
          className="ihub-te-link-popover-btn ihub-te-link-popover-btn--primary"
          title="Apply link"
        >
          <ExternalLink size={14} />
        </button>
        {currentUrl && (
          <button
            type="button"
            onClick={removeLink}
            className="ihub-te-link-popover-btn ihub-te-link-popover-btn--danger"
            title="Remove link"
          >
            <Unlink size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
