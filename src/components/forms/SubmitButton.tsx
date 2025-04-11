import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface SubmitButtonProps {
  /** Button label text */
  label: string;
  /** Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error */
  status?: number;
  /** Button type attribute */
  type?: "submit" | "button" | "reset";
  /** Button name attribute */
  name?: string;
  /** Button style variant */
  variant?: "important" | "outlined" | "primary" | "danger" | "default";
  /** Disable the button */
  disabled?: boolean;
  /** Button onClick handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Auto-reset timer (in ms) for loading state (0 to disable) */
  autoResetTimeout?: number;
  /** Custom class name to add to the button */
  className?: string;
  /** ARIA label for better accessibility */
  ariaLabel?: string;
  /** ID for the button element */
  id?: string;
  /** Data testid for testing */
  testId?: string;
}

/**
 * Submit button component with loading state and animation
 * @component
 * @example
 * ```tsx
 * <SubmitButton label="Submit" status={0} />
 * ```
 * Props interface for the SubmitButtonProps interface
 * @property {string} label - Button label text
 * @property {number} [status=1] - Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error
 * @property {string} [type="submit"] - Button type attribute
 * @property {string} [name] - Button name attribute
 * @property {string} [variant="important"] - Button style variant
 * @property {boolean} [disabled=false] - Disable the button
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - Button onClick handler
 * @property {number} [autoResetTimeout=30000] - Auto-reset timer (in ms) for loading state (0 to disable)
 * @property {string} [className=""] - Custom class name to add to the button
 * @property {string} [ariaLabel] - ARIA label for better accessibility
 * @property {string} [id="submitBtn"] - ID for the button element
 * @property {string} [testId="submit-button"] - Data testid for testing
 */
const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      label,
      status = 1,
      type = "submit",
      name,
      variant = "important",
      disabled = false,
      onClick,
      autoResetTimeout = 30000,
      className = "",
      ariaLabel,
      id = "submitBtn",
      testId = "submit-button",
    },
    ref
  ) => {
    const [internalStatus, setInternalStatus] = useState<number>(status);

    // Sync with external status prop
    useEffect(() => {
      setInternalStatus(status);
    }, [status]);

    // Auto-reset loading state after timeout
    useEffect(() => {
      if (internalStatus === 0 && autoResetTimeout > 0) {
        const timer = setTimeout(() => {
          setInternalStatus(1);
        }, autoResetTimeout);

        return () => clearTimeout(timer);
      }
    }, [internalStatus, autoResetTimeout]);

    // Handle click with loading state management
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          onClick(event);
        }
      },
      [onClick]
    );

    const isLoading = internalStatus === 0;
    const isDisabled = disabled || isLoading;

    return (
      <div className="ihub-submit-btn-wrapper">
        <button
          ref={ref}
          type={type}
          name={name}
          id={id}
          data-testid={testId}
          className={`ihub-submit-btn ${variant}-btn ihub-anime-button-chevron ${
            isLoading ? "ihub-rolling" : ""
          } ${className}`}
          disabled={isDisabled}
          onClick={handleClick}
          aria-label={ariaLabel || label}
          aria-busy={isLoading}
        >
          {isLoading && (
            <svg
              className="ihub-bt-spinner"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-hidden="true"
              role="presentation"
              fill="#fff"
            >
              <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
            </svg>
          )}
          {label}
          <ChevronRightIcon fill="#fff" id="animate" width="16" height="16" />
        </button>
      </div>
    );
  }
);

// Display name for React DevTools
SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
