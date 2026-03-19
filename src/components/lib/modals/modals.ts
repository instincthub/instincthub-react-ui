// css: /Users/noaholatoye/Documents/code_projects/npm_packages/instincthub-react-ui/src/assets/css/modals
import React from "react";

// Type for status codes
type StatusCode = 200 | 201 | 400 | 500 | number;

// Utility function to validate email
const isValidEmail = (input: string | undefined): boolean => {
  if (!input || input.length < 3) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

// Declare global window interface extensions for event handlers
declare global {
  interface Window {
    handleCancel: () => void;
    handleConfirm: () => void;
    cleanupToast: () => void;
    handleInput: (e: HTMLInputElement) => void;
    handleCleanUpInput: () => void;
  }
}

/**
 * Opens a confirmation modal that returns a promise resolving to the user's choice.
 *
 * @example
 * ```tsx
 * import { openConfirmModal } from "@instincthub/react-ui/lib";
 *
 * // Basic confirmation
 * const handleAction = async () => {
 *   const confirmed = await openConfirmModal("Are you sure you want to proceed?");
 *   if (confirmed) {
 *     // User clicked "Ok"
 *     performAction();
 *   }
 * };
 *
 * // With warning flag (red warning banner)
 * const handleDangerousAction = async () => {
 *   const confirmed = await openConfirmModal(
 *     "This will permanently remove all data. Continue?",
 *     true // Shows red warning banner
 *   );
 *   if (confirmed) {
 *     deleteAllData();
 *   }
 * };
 *
 * // In a form submission flow
 * const handleSubmit = async (formData: FormData) => {
 *   const confirmed = await openConfirmModal(
 *     "You are about to submit this form. Please review your entries."
 *   );
 *   if (confirmed) {
 *     await submitForm(formData);
 *     openToast("Form submitted successfully!");
 *   }
 * };
 * ```
 *
 * @param message - The confirmation message to display
 * @param flag - If true, shows a red warning banner instead of the default purple one
 * @returns Promise that resolves to `true` (Ok) or `false` (Cancel / overlay click)
 */
export const openConfirmModal = (
  message: string,
  flag: boolean = false
): Promise<boolean> => {
  return new Promise((resolve) => {
    let modalContainer = document.getElementById(
      "confirmModal"
    ) as HTMLDivElement | null;
    if (!modalContainer) {
      modalContainer = document.createElement("div");
      modalContainer.id = "confirmModal";
    }

    const warningClass = flag ? "something_bad_flagged" : "something_bad";
    const warningText = flag
      ? "Unexpected things will happen if you don't read this!"
      : "You are about to submit!";
    const bodyText =
      message ||
      "Carefully read the instructions before making a decision. Ready? Hit the continue button!";

    // Build modal using safe DOM methods
    const section = document.createElement("section");
    section.id = "myModal";
    section.className = "modal";

    const contentDiv = document.createElement("div");
    contentDiv.className = "modal-content";

    const closeSpan = document.createElement("span");
    closeSpan.className = "close";
    closeSpan.textContent = "\u00D7";
    closeSpan.addEventListener("click", () => {
      cleanup();
      resolve(false);
    });

    const warningP = document.createElement("p");
    warningP.className = warningClass;
    warningP.textContent = warningText;

    const bodyP = document.createElement("p");
    bodyP.textContent = bodyText;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "mt-4";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "danger-btn d-inline-block";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => {
      cleanup();
      resolve(false);
    });

    const okBtn = document.createElement("button");
    okBtn.type = "button";
    okBtn.className = "important-btn confirm-btn ihub-bg-dark-cyan";
    okBtn.textContent = "Ok";
    okBtn.addEventListener("click", () => {
      cleanup();
      resolve(true);
    });

    actionsDiv.appendChild(cancelBtn);
    actionsDiv.appendChild(okBtn);
    contentDiv.appendChild(closeSpan);
    contentDiv.appendChild(warningP);
    contentDiv.appendChild(bodyP);
    contentDiv.appendChild(actionsDiv);
    section.appendChild(contentDiv);

    // Clear and set content
    modalContainer.textContent = "";
    modalContainer.appendChild(section);
    document.body.appendChild(modalContainer);

    const cleanup = () => {
      modalContainer?.remove();
    };

    modalContainer.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "myModal" || target.id === "confirmModal") {
        cleanup();
        resolve(false);
      }
    });
  });
};

// Counter to stack multiple toasts
let toastCounter = 0;

/**
 * Displays an auto-dismissing toast notification with status-based styling,
 * a countdown progress bar, and stacking support for multiple toasts.
 *
 * @example
 * ```tsx
 * import { openToast } from "@instincthub/react-ui/lib";
 *
 * // Success notifications
 * openToast("Profile updated successfully!");
 * openToast("New item created!", 201);
 *
 * // Error notifications
 * openToast("Please check your input.", 400);
 * openToast("You don't have permission.", 403);
 *
 * // Server error
 * openToast("Server error occurred.", 500);
 *
 * // Default messages (no custom message)
 * openToast();                  // "Awesome! The update was made."
 * openToast(undefined, 400);   // "Hmmm..., Something went wrong. Try again"
 * openToast(undefined, 500);   // "Sorry, the server can't process your request"
 *
 * // In async operations
 * const handleSave = async () => {
 *   try {
 *     await saveData();
 *     openToast("Data saved successfully!");
 *   } catch (error) {
 *     openToast("Failed to save data.", 500);
 *   }
 * };
 *
 * // After form validation
 * if (!isValid) {
 *   openToast("Please fill in all required fields.", 400);
 *   return;
 * }
 *
 * // After API delete
 * openToast(`${itemName} was successfully deleted.`);
 * ```
 *
 * @param message - Custom notification message. Falls back to a default based on status code.
 * @param status - HTTP-style status code for styling (default: 200).
 *   - `200/201` → green success icon
 *   - `400-499` → red error icon
 *   - `500+` → red error icon
 */
export const openToast = (
  message?: React.ReactDOM | string,
  status: StatusCode = 200
): void => {
  const isSuccess = status === 200 || status === 201;

  const msg = isSuccess
    ? "Awesome! The update was made."
    : status === 500
    ? "Sorry, the server can't process your request"
    : "Hmmm..., Something went wrong. Try again";

  const displayMessage = (message as string) || msg;

  // Create a unique container per toast for stacking
  const toastId = `ihub-toast-${++toastCounter}`;
  const toastContainer = document.createElement("div");
  toastContainer.id = toastId;
  toastContainer.className = "ihub-toast-container";

  // Build toast using safe DOM methods
  const variant = isSuccess ? "success" : "error";
  const toast = document.createElement("div");
  toast.className = `ihub-toast ihub-toast--${variant} ihub-toast-slide-in`;

  // Toast body (icon + message)
  const body = document.createElement("div");
  body.className = "ihub-toast-body";

  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  iconSvg.setAttribute("viewBox", "0 0 24 24");
  iconSvg.setAttribute("class", `ihub-toast-icon ihub-toast-icon--${variant}`);
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  iconPath.setAttribute("fill", "currentColor");
  iconPath.setAttribute(
    "d",
    isSuccess
      ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      : "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
  );
  iconSvg.appendChild(iconPath);

  const msgP = document.createElement("p");
  msgP.className = "ihub-toast-message";
  msgP.textContent = displayMessage;

  body.appendChild(iconSvg);
  body.appendChild(msgP);

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ihub-toast-close";
  closeBtn.setAttribute("aria-label", "Close notification");

  const closeSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  closeSvg.setAttribute("width", "14");
  closeSvg.setAttribute("height", "14");
  closeSvg.setAttribute("viewBox", "0 0 24 24");
  closeSvg.setAttribute("fill", "none");
  closeSvg.setAttribute("stroke", "currentColor");
  closeSvg.setAttribute("stroke-width", "2");
  closeSvg.setAttribute("stroke-linecap", "round");
  closeSvg.setAttribute("stroke-linejoin", "round");

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", "18");
  line1.setAttribute("y1", "6");
  line1.setAttribute("x2", "6");
  line1.setAttribute("y2", "18");

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", "6");
  line2.setAttribute("y1", "6");
  line2.setAttribute("x2", "18");
  line2.setAttribute("y2", "18");

  closeSvg.appendChild(line1);
  closeSvg.appendChild(line2);
  closeBtn.appendChild(closeSvg);

  // Progress bar
  const progressBar = document.createElement("div");
  progressBar.className = `ihub-toast-progress ihub-toast-progress--${variant}`;

  // Assemble toast
  toast.appendChild(body);
  toast.appendChild(closeBtn);
  toast.appendChild(progressBar);
  toastContainer.appendChild(toast);
  document.body.appendChild(toastContainer);

  const cleanup = () => {
    const el = document.getElementById(toastId);
    if (!el) return;
    const toastEl = el.querySelector(".ihub-toast");
    if (toastEl) {
      toastEl.classList.add("ihub-toast-slide-out");
      toastEl.addEventListener("animationend", () => el.remove(), {
        once: true,
      });
    } else {
      el.remove();
    }
  };

  closeBtn.addEventListener("click", cleanup);

  // Auto-dismiss after 8 seconds
  setTimeout(cleanup, 8000);
};

/**
 * Opens a modal dialog to collect a user's email address with built-in validation.
 *
 * @example
 * ```tsx
 * import { getUserEmailInputModal } from "@instincthub/react-ui/lib";
 *
 * // Collect email for course enrollment
 * const handleEnroll = async () => {
 *   const email = await getUserEmailInputModal("Web Development Bootcamp");
 *   if (email) {
 *     // User entered a valid email and clicked "Proceed"
 *     await enrollUser(email, courseId);
 *     openToast("Enrollment successful!");
 *   } else {
 *     // User cancelled or closed the modal
 *     console.log("Enrollment cancelled");
 *   }
 * };
 *
 * // Collect email for newsletter signup
 * const handleNewsletter = async () => {
 *   const email = await getUserEmailInputModal("Weekly Newsletter");
 *   if (email) {
 *     await subscribeToNewsletter(email);
 *   }
 * };
 *
 * // Collect email before downloading a resource
 * const handleDownload = async () => {
 *   const email = await getUserEmailInputModal("Free E-Book: React Patterns");
 *   if (email) {
 *     await sendDownloadLink(email, resourceId);
 *     openToast("Download link sent to your email!", 200);
 *   }
 * };
 * ```
 *
 * @param title - The title displayed in the modal (e.g. course name, resource name)
 * @returns Promise that resolves to the email string if valid, or `undefined` if cancelled
 */
export const getUserEmailInputModal = (
  title: string
): Promise<string | undefined> => {
  return new Promise((resolve) => {
    let modalContainer = document.getElementById(
      "confirmModal"
    ) as HTMLDivElement | null;
    if (!modalContainer) {
      modalContainer = document.createElement("div");
      modalContainer.id = "confirmModal";
    }
    let emailValue: string | undefined;

    const cleanup = () => {
      modalContainer?.remove();
    };

    // Build modal using safe DOM methods
    const section = document.createElement("section");
    section.id = "myModal";
    section.className = "modal";

    const contentDiv = document.createElement("div");
    contentDiv.className = "modal-content";

    // Close button SVG
    const closeSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    closeSvg.setAttribute("width", "24");
    closeSvg.setAttribute("height", "24");
    closeSvg.setAttribute("viewBox", "-0.5 0 25 25");
    closeSvg.setAttribute("fill", "none");
    closeSvg.setAttribute("class", "ih_get_user_email_modal_close_btn");
    closeSvg.style.cursor = "pointer";

    const closePath1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    closePath1.setAttribute("d", "M3 21.32L21 3.32001");
    closePath1.setAttribute("stroke", "var(--Gunmetal)");
    closePath1.setAttribute("stroke-width", "1.5");
    closePath1.setAttribute("stroke-linecap", "round");
    closePath1.setAttribute("stroke-linejoin", "round");

    const closePath2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    closePath2.setAttribute("d", "M3 3.32001L21 21.32");
    closePath2.setAttribute("stroke", "var(--Gunmetal)");
    closePath2.setAttribute("stroke-width", "1.5");
    closePath2.setAttribute("stroke-linecap", "round");
    closePath2.setAttribute("stroke-linejoin", "round");

    closeSvg.appendChild(closePath1);
    closeSvg.appendChild(closePath2);
    closeSvg.addEventListener("click", () => {
      cleanup();
      resolve(undefined);
    });

    const heading = document.createElement("h4");
    heading.textContent = `Enrol for ${title}`;

    const instruction = document.createElement("p");
    instruction.className = "ihub-mt-3";
    instruction.textContent = "Enter a valid Email Address";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.id = "userInput";

    const actionDiv = document.createElement("div");
    actionDiv.className = "action_btn ihub-mt-3";

    const proceedBtn = document.createElement("button");
    proceedBtn.type = "button";
    proceedBtn.disabled = true;
    proceedBtn.id = "proceedBtn";
    proceedBtn.className = "delete_btn important-btn";
    proceedBtn.textContent = "Proceed";

    emailInput.addEventListener("input", () => {
      if (isValidEmail(emailInput.value)) {
        proceedBtn.disabled = false;
        emailValue = emailInput.value;
      } else {
        proceedBtn.disabled = true;
        emailValue = undefined;
      }
    });

    proceedBtn.addEventListener("click", () => {
      if (isValidEmail(emailValue)) {
        cleanup();
        resolve(emailValue);
      } else {
        openToast("You need to enter a valid email!", 400);
      }
    });

    actionDiv.appendChild(proceedBtn);
    contentDiv.appendChild(closeSvg);
    contentDiv.appendChild(heading);
    contentDiv.appendChild(instruction);
    contentDiv.appendChild(emailInput);
    contentDiv.appendChild(actionDiv);
    section.appendChild(contentDiv);

    modalContainer.textContent = "";
    modalContainer.appendChild(section);
    document.body.appendChild(modalContainer);

    modalContainer.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "myModal" || target.id === "confirmModal") {
        cleanup();
        resolve(undefined);
      }
    });
  });
};
