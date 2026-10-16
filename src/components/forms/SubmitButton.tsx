"use client";
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

/** Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error */
export type SubmitButtonStatus = 0 | 1 | 2 | 3;

export type SubmitButtonVariant =
  | "important"
  | "outlined"
  | "primary"
  | "danger"
  | "default"
  | "icon";

interface SubmitButtonProps {
  /** Button label text */
  label: string | ReactNode;
  /** Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error */
  status?: number;
  /** Button type attribute */
  type?: "submit" | "button" | "reset";
  /** Button name attribute */
  name?: string;
  /** Button style variant */
  variant?: SubmitButtonVariant;
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

const STATUS_LOADING = 0;
const STATUS_READY = 1;
const STATUS_SUCCESS = 2;
const STATUS_ERROR = 3;

/**
 * Every icon is drawn in currentColor so it always matches the button text,
 * whichever theme is active. A hard-coded fill is what made the chevron and
 * spinner vanish on dark mode's inverted "primary" button.
 */
const SpinnerIcon = () => (
  <svg
    className="ihub-submit-btn__icon ihub-submit-btn__spinner ihub-bt-spinner"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="2.5"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    className="ihub-submit-btn__icon ihub-submit-btn__chevron"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="ihub-submit-btn__icon ihub-submit-btn__check"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="ihub-submit-btn__icon ihub-submit-btn__error"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" />
    <path
      d="M12 7.5v5.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="1.25" fill="currentColor" />
  </svg>
);

/** The trailing slot holds exactly one mark for the current status. */
const StatusMark = ({ status }: { status: number }) => {
  if (status === STATUS_LOADING) return <SpinnerIcon />;
  if (status === STATUS_SUCCESS) return <CheckIcon />;
  if (status === STATUS_ERROR) return <ErrorIcon />;
  return <ChevronIcon />;
};

/**
 * Submit button component with loading state and animation
 * @component
 * @example
 * ```tsx
 * <SubmitButton label="Submit" status={0} />
 * ```
 * Props interface for the SubmitButtonProps interface
 * @property {string | ReactNode} label - Button label text
 * @property {number} [status=1] - Loading state: 0 = loading, 1 = ready, 2 = success, 3 = error
 * @property {string} [type="submit"] - Button type attribute
 * @property {string} [name] - Button name attribute
 * @property {string} [variant="important | outlined | primary | danger | default | icon"] - Button style variant
 * @property {boolean} [disabled=false] - Disable the button
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - Button onClick handler
 * @property {number} [autoResetTimeout=30000] - Auto-reset timer (in ms) for loading state (0 to disable)
 * @property {string} [className=""] - Custom class name to add to the button
 * @property {string} [ariaLabel] - ARIA label for better accessibility
 * @property {string} [id="submitBtn"] - ID for the button element
 * @property {string} [testId="submit-button"] - Data testid for testing
 *
 * The rendered button carries `data-variant` and `data-status` attributes so
 * consumers can style or test each state without relying on class names.
 */
const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      label,
      status = STATUS_READY,
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
      if (internalStatus === STATUS_LOADING && autoResetTimeout > 0) {
        const timer = setTimeout(() => {
          setInternalStatus(STATUS_READY);
        }, autoResetTimeout);

        return () => clearTimeout(timer);
      }
    }, [internalStatus, autoResetTimeout]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          onClick(event);
        }
      },
      [onClick]
    );

    const isLoading = internalStatus === STATUS_LOADING;
    const isDisabled = disabled || isLoading;
    const isIconOnly = variant === "icon";

    const classes = [
      "ihub-submit-btn",
      `${variant}-btn`,
      isIconOnly ? "" : "ihub-submit-btn--with-slot",
      isLoading ? "ihub-rolling" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="ihub-submit-btn-wrapper">
        <button
          ref={ref}
          type={type}
          name={name}
          id={id}
          data-testid={testId}
          data-variant={variant}
          data-status={internalStatus}
          className={classes}
          disabled={isDisabled}
          onClick={handleClick}
          aria-label={ariaLabel || (typeof label === "string" ? label : "")}
          aria-busy={isLoading}
        >
          {isIconOnly ? (
            isLoading ? (
              <SpinnerIcon />
            ) : (
              <span className="ihub-submit-btn__label">{label}</span>
            )
          ) : (
            <>
              <span className="ihub-submit-btn__label">{label}</span>
              <span className="ihub-submit-btn__slot" aria-hidden="true">
                <StatusMark status={internalStatus} />
              </span>
            </>
          )}
        </button>
      </div>
    );
  }
);

// Display name for React DevTools
SubmitButton.displayName = "SubmitButton";

export default SubmitButton as React.FC<SubmitButtonProps>;
