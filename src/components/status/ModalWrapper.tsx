"use client";
import { X } from "lucide-react";
import React from "react";

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
  if (!isOpen) return null;

  return (
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
            <X />
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
};

export default ModalWrapper;
