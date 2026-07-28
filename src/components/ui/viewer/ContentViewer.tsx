"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import DOMPurify from "dompurify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { marked } from "marked"; // Import marked for Markdown parsing

// MUI Icons
import PrintIcon from "@mui/icons-material/Print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import {
  copyTextToClipboard,
  enhanceCodeBlocks,
  resolveCodeCopyTarget,
  showCopiedFeedback,
} from "./codeCopyEnhancer";

interface ContentViewerProps {
  content: string;
  title?: string;
  className?: string;
  editable?: boolean;
  isEditing?: boolean;
  setIsEditing?: (html: boolean) => void;
  onContentChange?: (newContent: string) => void;
  showToolbar?: boolean;
  showEditBtn?: boolean;
  isMarkdown?: boolean; // New prop to indicate if content is Markdown
  enableCodeCopy?: boolean; // Show a copy button on fenced code blocks
  enableInlineCodeCopy?: boolean; // Allow inline `code` snippets to be copied on click
  showCodeLineNumbers?: boolean; // Draw a line-number gutter on multi-line code blocks
}

/**
 *
 * @component
 * @example
 * ```jsx
 * import {ContentViewer} from "@instincthub/react-ui";
 * <ContentViewer content="Hello world" />
 * ```
 * @param {string} content - The content to be displayed
 * @param {string} title - The title of the content
 * @param {string} className - Additional class names for the content viewer
 * @param {boolean} editable - Whether the content is editable
 * @param {function} onContentChange - A function to be called when the content changes
 * @param {boolean} isEditing - Whether the content is being edited
 * @param {function} setIsEditing - A function to set the isEditing state
 * @param {boolean} showToolbar - Whether to show the toolbar
 * @param {boolean} showEditBtn - Whether to show the edit button
 * @param {boolean} isMarkdown - Whether the content is Markdown
 * @param {boolean} enableCodeCopy - Whether code blocks get a copy button
 * @param {boolean} enableInlineCodeCopy - Whether inline code can be clicked to copy
 * @param {boolean} showCodeLineNumbers - Whether multi-line code blocks get a line-number gutter
 */
export default function ContentViewer({
  content,
  title = "Document",
  className = "",
  editable = false,
  onContentChange,
  isEditing = false,
  setIsEditing = () => {},
  showToolbar = true,
  showEditBtn = false,
  isMarkdown = false, // Default to false for backward compatibility
  enableCodeCopy = true,
  enableInlineCodeCopy = true,
  showCodeLineNumbers = true,
}: ContentViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Configure DOMPurify
  useEffect(() => {
    DOMPurify.addHook("afterSanitizeAttributes", (node) => {
      // Add rel="noopener noreferrer" to all links
      if (node.tagName === "A" && node.getAttribute("href")) {
        node.setAttribute("rel", "noopener noreferrer");

        // Open external links in new tab
        const href = node.getAttribute("href");
        if (href && href.startsWith("http")) {
          node.setAttribute("target", "_blank");
        }
      }
    });
  }, []);

  // Configure marked options
  useEffect(() => {
    marked.use({
      gfm: true,
      breaks: true,
    });
  }, []);

  // Detect if content is Markdown
  const detectMarkdown = (content: string): boolean => {
    if (isMarkdown) return true;

    // If isMarkdown prop isn't set, try to auto-detect
    // Common Markdown patterns
    const markdownPatterns = [
      /^#\s+.+$/m, // Headers
      /^\*\s+.+$/m, // Unordered lists
      /^\d+\.\s+.+$/m, // Ordered lists
      /\[.+\]\(.+\)/, // Links
      /!\[.+\]\(.+\)/, // Images
      /^>\s+.+$/m, // Blockquotes
      /`{1,3}[\s\S]*?`{1,3}/, // Code blocks or inline code
      /^\s*\*\*\*+\s*$/m, // Horizontal rules
      /\*\*.+\*\*/, // Bold
      /\*.+\*/, // Italic
      /^(\|[^|]+\|)+$/m, // Tables
    ];

    // Check if content matches any Markdown patterns
    return markdownPatterns.some((pattern) => pattern.test(content));
  };

  // Convert Markdown to HTML
  const processMarkdown = (markdownContent: string): Promise<string> => {
    return Promise.resolve(marked(markdownContent));
  };

  const processCodeContent = (content: string) => {
    // Look for <code> tags and process their contents
    return content.replace(
      /<code>([\s\S]*?)<\/code>/g,
      (match, codeContent) => {
        const escapedCode = codeContent
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<code>${escapedCode}</code>`;
      }
    );
  };

  // Process HTML to add styling to lists
  const processHtml = async (rawContent: string) => {
    // First check if it's markdown and convert if needed
    const isContentMarkdown = detectMarkdown(rawContent);
    let processedContent = isContentMarkdown
      ? await processMarkdown(rawContent)
      : rawContent;

    // Check if the content is code
    const isCode = processedContent.includes("<code>");
    if (isCode) {
      // Process the content
      processedContent = processCodeContent(processedContent);
    }

    // Sanitize the content
    const sanitizedContent = DOMPurify.sanitize(processedContent, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel", "data-type", "data-checked", "class"],
      ADD_TAGS: ["iframe", "video", "audio", "source", "figure", "figcaption"],
    });

    // Create a temporary element to manipulate the DOM
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sanitizedContent;

    // Lists are styled by .ihub-content-viewer CSS with clean native markers.
    // Only add fancy list classes if the content viewer has .ihub-style-list parent.
    // For standard rich text content (from IHubTextEditor), native styling is preferred.

    // Apply additional Markdown-specific styling
    if (isContentMarkdown) {
      // Style blockquotes
      const blockquotes = tempDiv.querySelectorAll("blockquote");
      blockquotes.forEach((blockquote) => {
        blockquote.classList.add("ihub-blockquote");
      });

      // Style code blocks
      const preCodeBlocks = tempDiv.querySelectorAll("pre code");
      preCodeBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        if (pre) {
          pre.classList.add("ihub-code-block");
        }
        codeBlock.classList.add("ihub-code");
      });

      // Style inline code
      const inlineCodes = tempDiv.querySelectorAll("code:not(pre code)");
      inlineCodes.forEach((code) => {
        code.classList.add("ihub-inline-code");
      });

      // Style tables
      const tables = tempDiv.querySelectorAll("table");
      tables.forEach((table) => {
        table.classList.add("ihub-table");
        table.setAttribute("cellspacing", "0");
        table.setAttribute("cellpadding", "0");
      });
    }

    // Add copy affordances to code blocks and inline snippets
    enhanceCodeBlocks(tempDiv, {
      enableBlockCopy: enableCodeCopy,
      enableInlineCopy: enableInlineCodeCopy,
      showLineNumbers: showCodeLineNumbers,
    });

    setHtml(tempDiv.innerHTML);

    return tempDiv.innerHTML;
  };

  // Helper function to get the nesting depth of a list
  const getListDepth = (element: Element): number => {
    let depth = 0;
    let parent = element.parentElement;

    while (parent) {
      if (parent.tagName === "LI") {
        depth++;
      }
      parent = parent.parentElement;
    }

    return depth;
  };

  // Update HTML when content changes
  useEffect(() => {
    if (!content) return;
    processHtml(content);
  }, [
    content,
    isMarkdown,
    enableCodeCopy,
    enableInlineCodeCopy,
    showCodeLineNumbers,
  ]);

  // Handle task item checkbox clicks
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!editable || !onContentChange) return;

      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" &&
        target.getAttribute("type") === "checkbox"
      ) {
        const checkbox = target as HTMLInputElement;
        const listItem = checkbox.closest("li");

        if (listItem) {
          // Toggle the data-checked attribute
          const isChecked = checkbox.checked;
          listItem.setAttribute("data-checked", isChecked ? "true" : "false");

          // Update the content if callback provided
          if (contentRef.current && onContentChange) {
            onContentChange(contentRef.current.innerHTML);
          }
        }
      }
    },
    [editable, onContentChange]
  );

  // Copy code blocks / inline snippets through delegation on the rendered HTML
  const copyTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleCodeCopy = useCallback(async (e: Event) => {
    const target = resolveCodeCopyTarget(e.target);
    if (!target) return;

    e.preventDefault();

    const copied = await copyTextToClipboard(target.text);
    if (!copied) {
      showNotification("Failed to copy code", "error");
      return;
    }

    // Keep the pending-timer list bounded — only recent resets can still fire
    copyTimersRef.current = [
      ...copyTimersRef.current.slice(-9),
      showCopiedFeedback(target),
    ];

    // Block buttons show their own "Copied!" label, inline snippets do not
    if (target.kind === "inline") {
      showNotification("Code copied to clipboard!", "success");
    }
  }, []);

  const handleCodeCopyKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;

      const target = resolveCodeCopyTarget(e.target);
      // Native buttons already translate Enter/Space into a click
      if (!target || target.element.tagName === "BUTTON") return;

      handleCodeCopy(e);
    },
    [handleCodeCopy]
  );

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    container.addEventListener("click", handleClick);
    container.addEventListener("click", handleCodeCopy);
    container.addEventListener("keydown", handleCodeCopyKeyDown);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("click", handleCodeCopy);
      container.removeEventListener("keydown", handleCodeCopyKeyDown);
    };
  }, [handleClick, handleCodeCopy, handleCodeCopyKeyDown]);

  // Drop pending "Copied!" resets when the viewer unmounts
  useEffect(() => {
    return () => {
      copyTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Export to PDF handler
  const handleExportPDF = async () => {
    if (!contentRef.current) return;

    try {
      const container = contentRef.current;

      // Create a clone of the content for exporting
      const clone = container.cloneNode(true) as HTMLElement;
      clone.style.width = "794px"; // A4 width in pixels at 96 DPI
      clone.style.padding = "40px";
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the number of pages needed
      const pageRatio = canvas.height / canvas.width;
      const pdfPageHeight = pdfWidth * pageRatio;
      const totalPages = Math.ceil(pdfPageHeight / pdfHeight);

      // Add title to first page
      pdf.setFontSize(16);
      pdf.text(title, 14, 20);

      // Add each page
      let position = 0;

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        const sliceHeight = canvas.height / totalPages;
        const sliceY = i * sliceHeight;

        // Create a new canvas for this slice
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeight;

        const ctx = sliceCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            sliceY,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight
          );

          const sliceImgData = sliceCanvas.toDataURL("image/png");

          // Add the slice to the PDF
          // Start at y=30 on first page (to account for title) and y=10 on subsequent pages
          const startY = i === 0 ? 30 : 10;

          pdf.addImage(
            sliceImgData,
            "PNG",
            10, // x
            startY, // y
            pdfWidth - 20, // width
            (pdfWidth - 20) * (sliceHeight / canvas.width) // height
          );
        }
      }

      pdf.save(`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
      showNotification("PDF exported successfully!", "success");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      showNotification("Failed to export PDF", "error");
    }
  };

  // Copy content to clipboard
  const handleCopy = async () => {
    if (!contentRef.current) return;

    // Read the plain text without the code toolbars ("javascript Copy") leaking
    // in. innerText needs a rendered node, so hide them for the read instead of
    // cloning — this happens within a single frame, so nothing flickers.
    const toolbars = Array.from(
      contentRef.current.querySelectorAll<HTMLElement>(".ihub-code-block-toolbar")
    );
    toolbars.forEach((toolbar) => (toolbar.hidden = true));
    const textContent = contentRef.current.innerText;
    toolbars.forEach((toolbar) => (toolbar.hidden = false));

    const copied = await copyTextToClipboard(textContent);
    showNotification(
      copied ? "Content copied to clipboard!" : "Failed to copy content",
      copied ? "success" : "error"
    );
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Show notification
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div
      className={`ihub-content-container ${
        isFullscreen ? "ihub-fullscreen" : ""
      } ${className}`}
    >
      {showToolbar && (
        <div className="ihub-content-toolbar">
          {!isEditing && showEditBtn ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="ihub-toolbar-btn"
              title="Edit content"
            >
              <EditIcon fontSize="small" />
            </button>
          ) : (
            ""
          )}
          <button
            onClick={handlePrint}
            className="ihub-toolbar-btn"
            title="Print content"
          >
            <PrintIcon fontSize="small" />
          </button>
          <button
            onClick={handleExportPDF}
            className="ihub-toolbar-btn"
            title="Export as PDF"
          >
            <FileDownloadIcon fontSize="small" />
          </button>
          <button
            onClick={handleCopy}
            className="ihub-toolbar-btn"
            title="Copy to clipboard"
          >
            <ContentCopyIcon fontSize="small" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="ihub-toolbar-btn"
            title="Toggle fullscreen"
          >
            {isFullscreen ? (
              <FullscreenExitIcon fontSize="small" />
            ) : (
              <FullscreenIcon fontSize="small" />
            )}
          </button>
        </div>
      )}

      <div
        className="ihub-sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {notification?.message || ""}
      </div>

      {notification && (
        <div
          className={`ihub-notification ihub-notification-${notification.type}`}
          aria-hidden="true"
        >
          {notification.message}
        </div>
      )}

      <div
        ref={contentRef}
        className={`ihub-content-viewer ${
          isMarkdown ? "ihub-markdown-content" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
