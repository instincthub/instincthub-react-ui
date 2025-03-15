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

interface ContentViewerProps {
  content: string;
  title?: string;
  className?: string;
  editable?: boolean;
  onEdit?: () => void;
  isEditing: boolean;
  setIsEditing: (html: boolean) => void;
  onContentChange?: (newContent: string) => void;
  showToolbar?: boolean;
  showEditBtn?: boolean;
  isMarkdown?: boolean; // New prop to indicate if content is Markdown
}

export default function ContentViewer({
  content,
  title = "Document",
  className = "",
  editable = false,
  onContentChange,
  isEditing = false,
  setIsEditing,
  showToolbar = true,
  showEditBtn = false,
  isMarkdown = false, // Default to false for backward compatibility
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
      ADD_ATTR: ["target", "rel", "data-type", "data-checked"],
      ADD_TAGS: ["iframe", "video", "audio", "source"],
    });

    // Create a temporary element to manipulate the DOM
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = sanitizedContent;

    // Find all unordered lists that don't already have a class
    const uls = tempDiv.querySelectorAll(
      'ul:not([class]):not([data-type="taskList"])'
    );
    uls.forEach((ul, index) => {
      // Apply different styles based on nesting level or position
      const depth = getListDepth(ul);

      if (depth === 0) {
        // First level lists get standard styling
        ul.classList.add("ihub-list-standard");
      } else if (depth === 1) {
        // Second level lists get circle styling
        ul.classList.add("ihub-list-circle");
      } else {
        // Deeper nested lists get square styling
        ul.classList.add("ihub-list-square");
      }
    });

    // Find all ordered lists that don't already have a class
    const ols = tempDiv.querySelectorAll("ol:not([class])");
    ols.forEach((ol, index) => {
      // Alternate between different styled ordered lists
      const styleClass =
        index % 3 === 0
          ? "ihub-list-primary"
          : index % 3 === 1
          ? "ihub-list-secondary"
          : "ihub-list-tertiary";
      ol.classList.add(styleClass);
    });

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
  }, [content, isMarkdown]);

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

  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      container.addEventListener("click", handleClick);
      return () => container.removeEventListener("click", handleClick);
    }
  }, [handleClick]);

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
    try {
      if (contentRef.current) {
        // Get plain text version for clipboard
        const textContent = contentRef.current.innerText;

        // For rich text copying, you could use:
        // const htmlContent = contentRef.current.innerHTML;

        await navigator.clipboard.writeText(textContent);
        showNotification("Content copied to clipboard!", "success");
      }
    } catch (error) {
      console.error("Failed to copy content:", error);
      showNotification("Failed to copy content", "error");
    }
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

      {notification && (
        <div
          className={`ihub-notification ihub-notification-${notification.type}`}
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
