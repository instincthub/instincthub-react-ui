"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "../../../assets/css/ui/content-viewer.css";
import DOMPurify from "dompurify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
  onContentChange?: (newContent: string) => void;
  showToolbar?: boolean;
}

export default function ContentViewer({
  content,
  title = "Document",
  className = "",
  editable = false,
  onEdit,
  onContentChange,
  showToolbar = true,
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

  // Sanitize content
  useEffect(() => {
    if (!content) return;

    const sanitizedContent = DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "rel", "data-type", "data-checked"],
      ADD_TAGS: ["iframe", "video", "audio", "source"],
    });
    setHtml(sanitizedContent);
  }, [content]);

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
          {onEdit && (
            <button
              onClick={onEdit}
              className="ihub-toolbar-btn"
              title="Edit content"
            >
              <EditIcon fontSize="small" />
            </button>
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
        className="ihub-content-viewer"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
