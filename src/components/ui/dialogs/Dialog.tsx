"use client"
import React, { useEffect, useRef, useState } from "react";

interface DialogProps {
    /** Whether the dialog is currently visible */
    isOpen: boolean;
    /** Function to call when dialog should close */
    onClose: () => void;
    /** Dialog title */
    title: string;
    /** Dialog content */
    children: React.ReactNode;
    /** Optional footer content (typically action buttons) */
    footer?: React.ReactNode;
    /** Optional max width of the dialog */
    maxWidth?: string;
    /** Optional CSS class to add to the dialog */
    className?: string;
  }
  
  /**
   * A reusable dialog component that handles keyboard accessibility
   * and focus management.
   */
  const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    maxWidth = "902px",
    className = "",
  }) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    // Used for client-side rendering of the portal
    const [mounted, setMounted] = useState(false);
  
    // Set mounted state to true after component mounts
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);
  
    // Handle ESC key to close dialog
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose();
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);
  
    // Prevent body scrolling when dialog is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);
  
    // Prevent rendering if not open or not mounted
    if (!isOpen || !mounted) return null;
  
    // Render the dialog directly (no portal) to avoid issues
    return (
      <div 
        className="ihub-modal" 
        aria-modal="true" 
        role="dialog"
        onClick={(e) => {
          // Close dialog when clicking the backdrop
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div 
          className={`ihub-modal-content ${className}`} 
          ref={dialogRef}
          style={{ maxWidth }}
          tabIndex={-1}
        >
          <div className="ihub-violet">
            <h2>{title}</h2>
            <span 
              className="ihub-close-it" 
              onClick={onClose}
              aria-label="Close dialog"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="#2C333A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#2C333A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          
          <div className="ihub-txt-modal">
            {children}
          </div>
          
          {footer && (
            <div className="ihub-next-prev">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Dialog;
