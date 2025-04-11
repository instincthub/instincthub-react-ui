import React, { memo } from "react";

/**
 * Props for the FormError component
 */
interface FormErrorProps {
  /** Error messages grouped by field */
  errors?: Record<string, string[]> | null;
  /** HTTP status code of the error */
  status?: number;
}

/**
 * Component that displays form validation errors
 * @component FormError
 * @example
 * ```tsx
 * <FormError errors={errors} status={status} />
 * ```  
 * Props interface for the FormError component
 * @property {Record<string, string[]> | null} errors - Error messages grouped by field
 * @property {number} status - HTTP status code
 */
const FormError = ({ errors, status }: FormErrorProps) => {
  // Handle common HTTP error codes
  if (status === 500) {
    return renderErrorMessage(
      "The server couldn't process your request.",
      status
    );
  }

  if (status === 404) {
    return renderErrorMessage("Details not found.", status);
  }

  // Handle validation errors from the backend
  if (errors && Object.keys(errors).length > 0) {
    return (
      <div className="ihub-form-error err">
        <h4>Error {status}: </h4>
        <div>
          {Object.entries(errors).map(([field, fieldErrors]) =>
            fieldErrors?.map((error, index) => (
              <p key={`${field}-${index}`}>
                <strong>{field}:</strong> {error}
              </p>
            ))
          )}
        </div>
      </div>
    );
  }

  return null;
};

/**
 * Helper function to render a simple error message
 */
const renderErrorMessage = (message: string, status?: number) => (
  <div className="ihub-form-error">
    <h4>Error {status}: </h4>
    <div>
      <p>- {message}</p>
    </div>
  </div>
);

// Memoize the component to prevent unnecessary re-renders
export default memo(FormError);
