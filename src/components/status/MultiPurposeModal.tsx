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
   * @deprecated Use refreshStrategy instead for better control
   * Set to false when using forms or components that manage their own state
   */
  enableContentRefresh?: boolean;
  /**
   * Content refresh strategy
   * - 'none': Never force refresh (best for forms with inputs)
   * - 'smart': Refresh only on structural changes (default)
   * - 'aggressive': Always refresh on any change (original behavior)
   * @default 'smart'
   */
  refreshStrategy?: 'none' | 'smart' | 'aggressive';
  /**
   * Preserves scroll position when content refreshes
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
 * // For forms - no forced refresh to preserve input focus
 * <MultiPurposeModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="User Form"
 *   refreshStrategy="none"
 * >
 *   <UserForm />
 * </MultiPurposeModal>
 *
 * // For dynamic content - smart refresh (default)
 * <MultiPurposeModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Dynamic Content"
 *   refreshStrategy="smart"
 * >
 *   {dynamicContent}
 * </MultiPurposeModal>
 * 
 * // For complete refresh needs
 * <MultiPurposeModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Fully Dynamic"
 *   refreshStrategy="aggressive"
 * >
 *   {completelyDynamicContent}
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
 * @param enableContentRefresh (Deprecated) Use refreshStrategy instead
 * @param refreshStrategy Content refresh strategy - 'none' | 'smart' | 'aggressive'
 * @param preserveScrollPosition Whether to maintain scroll position during refreshes
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
    enableContentRefresh,
    refreshStrategy = 'smart',
    preserveScrollPosition = true,
  }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [contentKey, setContentKey] = useState<number>(0);
    const [structuralKey, setStructuralKey] = useState<number>(0);
    const modalBodyRef = useRef<HTMLDivElement>(null);
    const previousChildrenRef = useRef<ReactNode>(children);
    const focusInfoRef = useRef<{
      id?: string;
      value?: string;
      selectionStart?: number | null;
      selectionEnd?: number | null;
    }>({});

    // Determine actual refresh strategy (backward compatibility)
    const actualStrategy = enableContentRefresh === false ? 'none' : 
                          enableContentRefresh === true ? 'aggressive' : 
                          refreshStrategy;

    // Helper function to detect if children structure changed significantly
    const hasStructuralChange = useCallback((prevChildren: ReactNode, newChildren: ReactNode): boolean => {
      // If types are different, it's a structural change
      if (typeof prevChildren !== typeof newChildren) return true;
      
      // If one is null/undefined and the other isn't
      if (!prevChildren !== !newChildren) return true;
      
      // For arrays, check if length changed
      if (Array.isArray(prevChildren) && Array.isArray(newChildren)) {
        if (prevChildren.length !== newChildren.length) return true;
      }
      
      // For React elements, check if type changed
      if (React.isValidElement(prevChildren) && React.isValidElement(newChildren)) {
        if (prevChildren.type !== newChildren.type) return true;
      }
      
      return false;
    }, []);

    // Helper function to preserve focus
    const preserveFocus = useCallback(() => {
      const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
      if (activeElement && modalBodyRef.current?.contains(activeElement)) {
        focusInfoRef.current = {
          id: activeElement.id,
          value: activeElement.value,
          selectionStart: activeElement.selectionStart,
          selectionEnd: activeElement.selectionEnd,
        };
      }
    }, []);

    // Helper function to restore focus
    const restoreFocus = useCallback(() => {
      if (focusInfoRef.current.id) {
        setTimeout(() => {
          const element = document.getElementById(focusInfoRef.current.id!) as HTMLInputElement | HTMLTextAreaElement;
          if (element) {
            element.focus();
            if (focusInfoRef.current.value !== undefined && 'value' in element) {
              element.value = focusInfoRef.current.value;
              if (focusInfoRef.current.selectionStart !== null && 
                  focusInfoRef.current.selectionStart !== undefined &&
                  focusInfoRef.current.selectionEnd !== null && 
                  focusInfoRef.current.selectionEnd !== undefined) {
                element.setSelectionRange(focusInfoRef.current.selectionStart, focusInfoRef.current.selectionEnd);
              }
            }
          }
          // Clear the focus info after restoring
          focusInfoRef.current = {};
        }, 0);
      }
    }, []);

    // Handle content refresh based on strategy
    useEffect(() => {
      if (actualStrategy === 'none') {
        // No forced refresh at all
        return;
      }

      let scrollTop = 0;
      const hasActiveFormElement = document.activeElement && 
                                   modalBodyRef.current?.contains(document.activeElement) &&
                                   ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      // Store scroll position if needed
      if (preserveScrollPosition && modalBodyRef.current) {
        scrollTop = modalBodyRef.current.scrollTop;
      }

      if (actualStrategy === 'aggressive') {
        // Always refresh (original behavior)
        if (hasActiveFormElement) {
          preserveFocus();
        }
        setContentKey((prevKey) => prevKey + 1);
        if (hasActiveFormElement) {
          restoreFocus();
        }
      } else if (actualStrategy === 'smart') {
        // Only refresh on structural changes
        const isStructuralChange = hasStructuralChange(previousChildrenRef.current, children);
        
        if (isStructuralChange && !hasActiveFormElement) {
          // Only update if there's a structural change and no active form element
          setStructuralKey((prevKey) => prevKey + 1);
        }
        
        previousChildrenRef.current = children;
      }

      // Restore scroll position
      if (preserveScrollPosition && scrollTop > 0) {
        setTimeout(() => {
          if (modalBodyRef.current) {
            modalBodyRef.current.scrollTop = scrollTop;
          }
        }, 0);
      }
    }, [children, actualStrategy, preserveScrollPosition, hasStructuralChange, preserveFocus, restoreFocus]);

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

    // Determine which key to use based on strategy
    const getModalBodyKey = () => {
      switch (actualStrategy) {
        case 'none':
          return undefined; // No key, natural React updates only
        case 'smart':
          return structuralKey; // Key changes only on structural changes
        case 'aggressive':
          return contentKey; // Key changes on every update
        default:
          return undefined;
      }
    };

    const modalBodyProps = {
      ref: modalBodyRef,
      className: "ihub-modal-body ihub-txt-modal",
      style: { height: height },
      key: getModalBodyKey(),
    };

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
            <div {...modalBodyProps}>{children}</div>
            {footerSection}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={fullClassName}>
              {headerContent}
              <div {...modalBodyProps}>{children}</div>
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

    // Determine the actual refresh strategy for both prev and next
    const prevStrategy = prevProps.enableContentRefresh === false ? 'none' : 
                        prevProps.enableContentRefresh === true ? 'aggressive' : 
                        prevProps.refreshStrategy || 'smart';
    
    const nextStrategy = nextProps.enableContentRefresh === false ? 'none' : 
                        nextProps.enableContentRefresh === true ? 'aggressive' : 
                        nextProps.refreshStrategy || 'smart';

    // Handle children changes based on refresh strategy
    if (nextStrategy === 'none') {
      // With 'none' strategy, don't force re-render for children changes
      // React will handle updates naturally
    } else if (nextStrategy === 'smart') {
      // With 'smart' strategy, only re-render on type changes
      if (prevProps.children !== nextProps.children &&
          typeof prevProps.children !== typeof nextProps.children) {
        return false;
      }
    } else if (nextStrategy === 'aggressive') {
      // With 'aggressive' strategy, always re-render on children change
      if (prevProps.children !== nextProps.children) return false;
    }

    // Always re-render if footerContent changes
    if (prevProps.footerContent !== nextProps.footerContent) return false;

    // Always re-render if title changes
    if (prevProps.title !== nextProps.title) return false;

    // Check for other important prop changes
    if (
      prevProps.size !== nextProps.size ||
      prevProps.height !== nextProps.height ||
      prevProps.showFooter !== nextProps.showFooter ||
      prevProps.showCloseButton !== nextProps.showCloseButton ||
      prevProps.closeOnOverlayClick !== nextProps.closeOnOverlayClick ||
      prevProps.className !== nextProps.className ||
      prevProps.disableScroll !== nextProps.disableScroll ||
      prevProps.handleSubmit !== nextProps.handleSubmit ||
      prevProps.removeForm !== nextProps.removeForm ||
      prevStrategy !== nextStrategy ||
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