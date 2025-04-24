"use client";
import React, { useState } from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";


interface CopyToClipboardProps {
  labels?: string;
  noLabel?: boolean;
  text: string;
}

/**
 * @component CopyToClipboard
 * @description A component that copies text to the clipboard
 * @example
 * ```tsx 
 * <CopyToClipboard text="https://instincthub.com/certificates/username/issued_id" />
 * ```
 * @param {CopyToClipboardProps} props - The props for the CopyToClipboard component
 * @returns {React.ReactNode} The rendered component
 */

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  labels,
  noLabel,
  text,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyClick = (): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Set the timeout duration (2 seconds in this case)
      })
      .catch((err) => console.error("Unable to copy to clipboard", err));
  };

  return (
    <div
      onClick={handleCopyClick}
      style={{ cursor: "pointer", color: "var(--Gunmetal)" }}
      className="copy-to-clipboard"
    >
      {isCopied ? (
        <>
          <DoneOutlinedIcon className="mui-icon-actions" />
          Copied!
        </>
      ) : (
        <>
          <ContentCopyOutlinedIcon className="mui-icon-actions" />
          {!noLabel ? labels || "Copy Link" : ""}
        </>
      )}
    </div>
  );
};

export default CopyToClipboard;
