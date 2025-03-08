/**
 * Handles form validation errors by highlighting fields and displaying error messages
 * @param {Object} errors - Object containing field errors from the server
 */
export default function handleFormErrors(errors) {
  // Reset any previous error states
  const formInputs = document.querySelectorAll("input, select, textarea");
  formInputs.forEach((input) => {
    input.style.borderColor = "";
    const errorElement = input.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  });

  // Track the first error field for focus
  let firstErrorField = null;

  // Process each error
  Object.entries(errors).forEach(([fieldName, errorMessages]) => {
    // Find all inputs with matching name attribute
    const fields = document.querySelectorAll(`[name="${fieldName}"]`);

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
      field.parentNode.insertBefore(errorDiv, field.nextSibling);

      // Track first error field
      if (!firstErrorField) {
        firstErrorField = field;
      }
    });
  });

  // Set focus to the first error field
  if (firstErrorField) {
    firstErrorField.focus();
  }

  return Object.keys(errors).length > 0;
}

// Example usage:
// const serverErrors = {
//   "assigned_email": ["This field is required."],
//   "password": ["This field may not be blank."]
// };
// handleFormErrors(serverErrors);
