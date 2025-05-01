"use client";
import React, { useEffect, useState, ReactNode, useCallback, useMemo } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
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
 *   showFooter={true}
 *   footerContent={<div>Some Footer Content</div>}
 *   showCloseButton={true}
 *   closeOnOverlayClick={true}
 *   className="ihub-modal-class"
 *   disableScroll={true}
 *   handleSubmit={handleSubmit}
 * >
 *   <div>Some Content</div>
 * </MultiPurposeModal>
 * ```
 *
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
 * @param handleSubmit Function to call when the modal is submitted
 */
const MultiPurposeModal: React.FC<MultiPurposeModalProps> = React.memo(({
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
  handleSubmit,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // Track content updates with a key
  const [contentKey, setContentKey] = useState<number>(0);
  
  // Force re-render when children change
  useEffect(() => {
    // Increment the key to force a re-render of the content
    setContentKey(prevKey => prevKey + 1);
  }, [children]);

  // Handle modal visibility with animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isOpen) {
      setIsVisible(true);
      if (disableScroll) {
        document.body.style.overflow = "hidden";
      }
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        if (disableScroll) {
          document.body.style.overflow = "";
        }
      }, 300);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (disableScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, disableScroll]);

  // Handle click on overlay
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  // Memoize the size class calculation
  const sizeClass = useMemo(() => {
    const sizeMap = {
      small: "ihub-modal-small",
      medium: "ihub-modal-medium",
      large: "ihub-modal-large",
      full: "ihub-modal-full",
    };
    return sizeMap[size];
  }, [size]);

  // Memoize the className concatenation
  const fullClassName = useMemo(() => {
    return `ihub-modal-content ${sizeClass} ${className}`;
  }, [sizeClass, className]);
  
  // Memoize the modal open/closing class
  const modalStateClass = useMemo(() => {
    return `ihub-modal ${isOpen ? "ihub-modal-open" : "ihub-modal-closing"}`;
  }, [isOpen]);
  
  // Memoize the header content if it exists
  const headerContent = useMemo(() => {
    if (!(title || showCloseButton)) return null;
    
    return (
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
            <CloseOutlinedIcon />
          </button>
        )}
      </div>
    );
  }, [title, showCloseButton, onClose]);
  
  // Memoize the footer content
  const footerSection = useMemo(() => {
    if (!showFooter) return null;
    
    return (
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
            <button
              className="ihub-important-btn"
              type={handleSubmit ? "submit" : "button"}
            >
              {handleSubmit ? "Confirm" : "Close"}
            </button>
          </div>
        )}
      </div>
    );
  }, [showFooter, footerContent, onClose, handleSubmit]);

  // If modal is not visible and not open, don't render anything
  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <div
      className={modalStateClass}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "ihub-modal-title" : undefined}
    >
      <form onSubmit={handleSubmit}>
        <div className={fullClassName}>
          {headerContent}

          <div className="ihub-modal-body ihub-txt-modal" key={contentKey}>
            {children}
          </div>

          {footerSection}
        </div>
      </form>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Return true if nothing important changed (to prevent re-render)
  // Return false to trigger a re-render
  
  // Always re-render if isOpen state changes
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  
  // Always re-render if children change
  if (prevProps.children !== nextProps.children) return false;
  
  // Always re-render if footerContent changes
  if (prevProps.footerContent !== nextProps.footerContent) return false;
  
  // Always re-render if title changes
  if (prevProps.title !== nextProps.title) return false;
  
  // For other props, we can be more selective
  if (
    prevProps.size !== nextProps.size ||
    prevProps.showFooter !== nextProps.showFooter ||
    prevProps.showCloseButton !== nextProps.showCloseButton ||
    prevProps.closeOnOverlayClick !== nextProps.closeOnOverlayClick ||
    prevProps.className !== nextProps.className ||
    prevProps.disableScroll !== nextProps.disableScroll ||
    prevProps.handleSubmit !== nextProps.handleSubmit
  ) {
    return false;
  }
  
  // If we got here, nothing important changed, so prevent re-render
  return true;
});

// Display name for debugging
MultiPurposeModal.displayName = 'MultiPurposeModal';

export default MultiPurposeModal;