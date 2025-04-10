"use client";
import React, { useEffect, useState, ReactNode } from "react";

interface MultiPurposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large" | "full";
  children: ReactNode;
  showFooter?: boolean;
  footerContent?: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  disableScroll?: boolean;
}

/**
 * A multipurpose modal component for InstinctHub applications
 *
 * @component
 * @example
 * ```tsx
 * <MultiPurposeModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Some Title"
 *   size="medium"
 *   children={<div>Some Content</div>}
 *   showFooter={true}
 *   footerContent={<div>Some Footer Content</div>}
 *   showCloseButton={true}
 *   closeOnOverlayClick={true}
 *   className="ihub-modal-class"
 *   disableScroll={true}
 * >
 *   <div>Some Content</div>
 * </MultiPurposeModal>
 * ```
 *
 * To listen for successful deletion:
 * @param isOpen Controls whether the modal is visible
 * @param onClose Function to call when the modal is closed
 * @param title Optional title to display in the modal header
 * @param size Size of the modal - small, medium, large, or full
 * @param children Content to display in the modal body
 * @param showFooter Whether to show the modal footer
 * @param footerContent Custom content for the footer
 * @param showCloseButton Whether to show the close button in the header
 * @param closeOnOverlayClick Whether clicking the overlay closes the modal
 * @param className Additional class names to apply to the modal
 * @param disableScroll Whether to disable body scrolling when modal is open
 */
const MultiPurposeModal: React.FC<MultiPurposeModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "medium",
  children,
  showFooter = false,
  footerContent,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
  disableScroll = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Handle modal visibility with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (disableScroll) {
        document.body.style.overflow = "hidden";
      }
    } else {
      setTimeout(() => {
        setIsVisible(false);
        if (disableScroll) {
          document.body.style.overflow = "";
        }
      }, 300);
    }

    return () => {
      if (disableScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, disableScroll]);

  if (!isVisible && !isOpen) {
    return null;
  }

  // Handle click on overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  // Determine size class
  const sizeClass = {
    small: "ihub-modal-small",
    medium: "ihub-modal-medium",
    large: "ihub-modal-large",
    full: "ihub-modal-full",
  }[size];

  return (
    <div
      className={`ihub-modal ${
        isOpen ? "ihub-modal-open" : "ihub-modal-closing"
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "ihub-modal-title" : undefined}
    >
      <div className={`ihub-modal-content ${sizeClass} ${className}`}>
        {(title || showCloseButton) && (
          <div className="ihub-modal-header">
            {title && (
              <h2 id="ihub-modal-title" className="ihub-modal-title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="ihub-close-it"
                onClick={onClose}
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        )}

        <div className="ihub-modal-body ihub-txt-modal">{children}</div>

        {showFooter && (
          <div className="ihub-modal-footer">
            {footerContent || (
              <div className="ihub-buttons">
                <button
                  className="ihub-outlined-btn"
                  onClick={onClose}
                  type="button"
                >
                  Cancel
                </button>
                <button className="ihub-important-btn" type="button">
                  Confirm
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPurposeModal;
