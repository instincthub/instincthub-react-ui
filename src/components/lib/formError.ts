/**
 * Interface for form validation errors
 */
interface FormErrors {
  [fieldName: string]: string[];
}

/**
 * Handles form validation errors by highlighting fields and displaying error messages
 * @param errors - Object containing field errors from the server
 * @returns Boolean indicating if there were any errors
 */
export default function handleFormErrors(errors: FormErrors): boolean {
  // Reset any previous error states
  const formInputs = document.querySelectorAll<HTMLElement>(
    "input, select, textarea"
  );
  formInputs.forEach((input) => {
    if (input instanceof HTMLElement) {
      input.style.borderColor = "";
      const errorElement = input.parentNode?.querySelector(".error-message");
      if (errorElement) {
        errorElement.remove();
      }
    }
  });

  // Type for elements that support focus
  type FocusableElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

  // Track the first error field for focus
  let firstErrorField: HTMLElement | null = null;

  // Process each error
  Object.entries(errors).forEach(([fieldName, errorMessages]) => {
    // Find all inputs with matching name attribute
    const fields = document.querySelectorAll<HTMLElement>(
      `[name="${fieldName}"]`
    );

    fields.forEach((field) => {
      // Set red border
      field.style.borderColor = "#ff0000";

      // Create error message element
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.style.color = "var(--Danger)";
      errorDiv.style.fontSize = "0.8rem";
      errorDiv.style.marginTop = "4px";
      errorDiv.textContent = errorMessages.join(", ");

      // Insert error message after the input field
      field.parentNode?.insertBefore(errorDiv, field.nextSibling);

      // Track first error field
      if (!firstErrorField) {
        firstErrorField = field;
      }
    });
  });

  // Later, when focusing
  if (firstErrorField && "focus" in firstErrorField) {
    (firstErrorField as FocusableElement).focus();
  }

  return Object.keys(errors).length > 0;
}
