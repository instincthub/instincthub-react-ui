"use client";
import React, {
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface MultiPurposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large" | "full";
  height?: string;
  children: ReactNode;
  showFooter?: boolean;
  footerContent?: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  disableScroll?: boolean;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  removeForm?: boolean;
  /**
   * Controls whether the modal should force re-render when children change
   * @default true
   * Set to false when using forms or components that manage their own state
   */
  enableContentRefresh?: boolean;
  /**
   * Preserves scroll position when content refreshes (only works when enableContentRefresh is true)
   * @default true
   */
  preserveScrollPosition?: boolean;
}

/**
 * A multipurpose modal component for InstinctHub applications
 *
 * @component
 * @example
 * ```tsx
 * // For forms - disable content refresh to prevent scroll jumping
 * <MultiPurposeModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="User Form"
 *   enableContentRefresh={false}
 * >
 *   <UserForm />
 * </MultiPurposeModal>
 *
 * // For dynamic content - enable content refresh (default behavior)
 * <MultiPurposeModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Dynamic Content"
 *   enableContentRefresh={true}
 * >
 *   {dynamicContent}
 * </MultiPurposeModal>
 * ```
 *
 * @param isOpen Controls whether the modal is visible
 * @param onClose Function to call when the modal is closed
 * @param title Optional title to display in the modal header
 * @param size Size of the modal - small, medium, large, or full
 * @param height Height of the modal body
 * @param children Content to display in the modal body
 * @param showFooter Whether to show the modal footer
 * @param footerContent Custom content for the footer
 * @param showCloseButton Whether to show the close button in the header
 * @param closeOnOverlayClick Whether clicking the overlay closes the modal
 * @param className Additional class names to apply to the modal
 * @param disableScroll Whether to disable body scrolling when modal is open
 * @param handleSubmit Function to call when the modal is submitted
 * @param removeForm Whether to remove the default form element
 * @param enableContentRefresh Whether to force re-render when children change (default: true)
 * @param preserveScrollPosition Whether to maintain scroll position during refreshes (default: true)
 */
const MultiPurposeModal: React.FC<MultiPurposeModalProps> = React.memo(
  ({
    isOpen,
    onClose,
    title,
    size = "medium",
    height = "70vh",
    children,
    showFooter = false,
    footerContent,
    showCloseButton = true,
    closeOnOverlayClick = true,
    className = "",
    disableScroll = true,
    handleSubmit,
    removeForm = false,
    enableContentRefresh = true,
    preserveScrollPosition = true,
  }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [contentKey, setContentKey] = useState<number>(0);
    const modalBodyRef = useRef<HTMLDivElement>(null);

    // Conditional re-render logic based on enableContentRefresh prop
    useEffect(() => {
      if (!enableContentRefresh) {
        // Skip the forced re-render when disabled
        return;
      }

      let scrollTop = 0;

      // Store current scroll position if we want to preserve it
      if (preserveScrollPosition && modalBodyRef.current) {
        scrollTop = modalBodyRef.current.scrollTop;
      }

      // Force re-render when children change
      setContentKey((prevKey) => prevKey + 1);

      // Restore scroll position after the re-render
      if (preserveScrollPosition && scrollTop > 0) {
        setTimeout(() => {
          if (modalBodyRef.current) {
            modalBodyRef.current.scrollTop = scrollTop;
          }
        }, 0);
      }
    }, [children, enableContentRefresh, preserveScrollPosition]);

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
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && closeOnOverlayClick) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

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

    // Conditionally apply the contentKey only when refresh is enabled
    const modalBodyProps = {
      ref: modalBodyRef,
      className: "ihub-modal-body ihub-txt-modal",
      style: { height: height },
    };
    
    const modalBodyKey = enableContentRefresh ? contentKey : undefined;

    return (
      <div
        className={modalStateClass}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "ihub-modal-title" : undefined}
      >
        {removeForm ? (
          <div className={fullClassName}>
            {headerContent}
            <div key={modalBodyKey} {...modalBodyProps}>{children}</div>
            {footerSection}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={fullClassName}>
              {headerContent}
              <div key={modalBodyKey} {...modalBodyProps}>{children}</div>
              {footerSection}
            </div>
          </form>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for React.memo
    // Return true if nothing important changed (to prevent re-render)
    // Return false to trigger a re-render

    // Always re-render if isOpen state changes
    if (prevProps.isOpen !== nextProps.isOpen) return false;

    // Handle children changes based on enableContentRefresh setting
    if (nextProps.enableContentRefresh) {
      // When refresh is enabled, always re-render on children change
      if (prevProps.children !== nextProps.children) return false;
    } else {
      // When refresh is disabled, only re-render if it's a completely different component type
      if (
        prevProps.children !== nextProps.children &&
        typeof prevProps.children !== typeof nextProps.children
      ) {
        return false;
      }
    }

    // Always re-render if footerContent changes
    if (prevProps.footerContent !== nextProps.footerContent) return false;

    // Always re-render if title changes
    if (prevProps.title !== nextProps.title) return false;

    // Check for other important prop changes
    if (
      prevProps.size !== nextProps.size ||
      prevProps.showFooter !== nextProps.showFooter ||
      prevProps.showCloseButton !== nextProps.showCloseButton ||
      prevProps.closeOnOverlayClick !== nextProps.closeOnOverlayClick ||
      prevProps.className !== nextProps.className ||
      prevProps.disableScroll !== nextProps.disableScroll ||
      prevProps.handleSubmit !== nextProps.handleSubmit ||
      prevProps.removeForm !== nextProps.removeForm ||
      prevProps.enableContentRefresh !== nextProps.enableContentRefresh ||
      prevProps.preserveScrollPosition !== nextProps.preserveScrollPosition
    ) {
      return false;
    }

    // If we got here, nothing important changed, so prevent re-render
    return true;
  }
);

// Display name for debugging
MultiPurposeModal.displayName = "MultiPurposeModal";

export default MultiPurposeModal;
