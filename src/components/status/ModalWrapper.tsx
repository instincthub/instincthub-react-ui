/* 
createPortal(children, domNode): 
This is the core React function that tells the renderer: 
"Take this JSX and put it inside this specific DOM element (the body), 
instead of where this component is actually called.
*/

"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "small" | "medium" | "large" | "full";
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "full",
}) => {
  // 1. State to track if we are mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 2. Don't render anything if the modal is closed OR if we aren't on the client yet
  // (This prevents Hydration Mismatch errors in Next.js/SSR)
  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="ihub-modal ihub-modal-open"
      aria-labelledby="ihub-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className={`ihub-modal-content ihub-modal-${size}`}>
        <div className="ihub-modal-header">
          {title && (
            <h2 id="ihub-modal-title" className="ihub-modal-title">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            type="button"
            className="ihub-close-it"
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div
          className="ihub-modal-body ihub-txt-modal"
          style={{ height: "70vh" }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  // 3. Use createPortal to inject the content into the body
  return createPortal(modalContent, document.body);
};

export default ModalWrapper;
