import { reqOptions } from "../helpFunction";
import { openToast } from "./modals";

/**
 * API response interface for error handling
 */
interface ApiErrorResponse {
  detail?: string;
  [key: string]: any;
}

/**
 * Opens a confirmation modal for deleting an item
 * @example
 *
 * const handleDelete = async (option) => {
 *   const endpoint = `${API_HOST_URL}assessments/${handle}/assessment-link-tree-destroy/${option.id}/`;
 *   const confirm = await openConfirmDelete(
 *     option.title,
 *     token,
 *     endpoint,
 *     true,
 *     reqOptions,
 *   );
 *
 *   if (confirm) {
 *     // Update objects
 *     const newObjects = data.filter((i) => i.id !== option.id);
 *     setData(newObjects);
 *   }
 * };
 *
 * @property {string} message The name of the item to be deleted
 * @property {string} token Authentication token for the API request
 * @property {string} url API endpoint for deletion
 * @property {boolean} pop Whether to show a popup confirmation (default: true)
 * @returns Promise that resolves to boolean indicating success or failure
 */
export const openConfirmDelete = (
  message: string,
  token: string,
  url: string,
  pop: boolean = true
): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    // Create modal element reference ID for cleanup
    const modalId = "ihub-confirm-modal";

    // Track event listeners for cleanup
    const listeners: Array<{
      element: HTMLElement | Document;
      type: string;
      handler: EventListenerOrEventListenerObject;
    }> = [];

    /**
     * Helper function to add event listeners that will be tracked for cleanup
     */
    const addTrackedListener = <T extends Event>(
      element: HTMLElement | Document,
      type: string,
      handler: (event: T) => void
    ): void => {
      const wrappedHandler = (event: Event) => handler(event as T);
      element.addEventListener(type, wrappedHandler);
      listeners.push({ element, type, handler: wrappedHandler });
    };

    /**
     * Removes the modal from the DOM and cleans up event listeners
     */
    const cleanup = (): void => {
      // Clean up all tracked event listeners
      listeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });

      // Remove the modal element
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        // Remove global event handlers before removing the element
        for (const handlerName of [
          "handleInput",
          "handleCancel",
          "handleConfirm",
        ]) {
          if ((window as any)[handlerName]) {
            delete (window as any)[handlerName];
          }
        }
        modalElement.remove();
      }
    };

    /**
     * Handles the deletion API request
     */
    const handleSubmit = async (): Promise<void> => {
      try {
        // Delete the object from the DB if user confirms
        const requestOptions = reqOptions("DELETE", null, token);
        const request = await fetch(url, requestOptions);

        if (request.status === 204) {
          openToast(`${message} was successfully deleted.`);
          cleanup();
          resolve(true);
          return;
        } else if (request.status === 401) {
          openToast("You don't have permission to delete this item.", 401);
        } else {
          const res = (await request.json()) as ApiErrorResponse;
          openToast(
            res.detail ||
              "Couldn't delete the item. You can report the issue with the feedback button.",
            request.status
          );
        }
      } catch (error) {
        openToast(
          `Error deleting item: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          500
        );
      }

      resolve(false);
    };

    // If no popup needed, just submit and return
    if (!pop) {
      handleSubmit();
      return;
    }

    // Templates for the copy button states
    const copiedState = `
        <div class="ihub-copy-status ihub-copy-success">
          <svg class="ihub-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckIcon">
            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
          </svg>
          <span>Copied!</span>
        </div>
      `.trim();

    const unCopiedState = `
        <div class="ihub-copy-status">
          <svg class="ihub-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ContentCopyIcon">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
          </svg>
          <span class="ihub-fs-sm">Copy Text</span>
        </div>
      `.trim();

    // Create or get the modal container
    let modalContainer = document.getElementById(modalId);
    if (!modalContainer) {
      modalContainer = document.createElement("div");
      modalContainer.id = modalId;
    }

    // Create modal content with proper ihub- prefixed classes
    const modalContent = `
        <section class="ihub-modal ihub-modal-open" aria-labelledby="delete-modal-title" role="dialog" aria-modal="true">
          <div class="ihub-modal-content">
            <h4 id="delete-modal-title" class="ihub-modal-title">Delete confirmation</h4>
            <p class="ihub-warning-text">
              Unexpected bad things will happen if you don't read this!
            </p>
            <p class="ihub-modal-description">
              This action cannot be undone. This will permanently delete the
              <strong>${message}</strong> repository, feedbacks, schedules, and remove all team
              associations.
            </p>
  
            <div class="ihub-confirm-row">
              <p class="ihub-confirm-instruction">Please type <strong class="ihub-confirm-value">${message}</strong> to confirm.</p>
              <button type="button" id="ihub-copy-btn" class="ihub-copy-btn" aria-label="Copy confirmation text">
                ${unCopiedState}
              </button>
            </div>
  
            <div class="ihub-input-wrapper">
              <input 
                type="text" 
                id="ihub-delete-input" 
                class="ihub-delete-input" 
                aria-label="Confirmation text"
                placeholder="Type the text to confirm deletion"
              />
            </div>
            
            <div class="ihub-modal-actions">
              <button 
                type="button" 
                id="ihub-cancel-btn" 
                class="ihub-cancel-btn"
                aria-label="Cancel deletion"
              >
                Cancel
              </button>
              <button 
                type="button" 
                disabled 
                id="ihub-delete-btn" 
                class="ihub-delete-btn"
                aria-label="Confirm deletion"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      `.trim();

    // Set modal content and add to document
    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);

    // Get DOM elements
    const copyBtn = document.getElementById("ihub-copy-btn");
    const deleteBtn = document.getElementById(
      "ihub-delete-btn"
    ) as HTMLButtonElement | null;
    const cancelBtn = document.getElementById("ihub-cancel-btn");
    const deleteInput = document.getElementById(
      "ihub-delete-input"
    ) as HTMLInputElement | null;
    const modalElement = document.querySelector(".ihub-modal");

    // Set up copy button functionality
    if (copyBtn) {
      const copyClickHandler = () => {
        navigator.clipboard
          .writeText(message)
          .then(() => {
            if (copyBtn) {
              copyBtn.innerHTML = copiedState;
              setTimeout(() => {
                if (copyBtn) {
                  copyBtn.innerHTML = unCopiedState;
                }
              }, 2000);
            }
          })
          .catch((err) => console.error("Unable to copy to clipboard", err));
      };

      addTrackedListener(copyBtn, "click", copyClickHandler);
    }

    // Set up input validation
    if (deleteInput) {
      const inputHandler = (e: Event) => {
        const input = e.target as HTMLInputElement;
        if (deleteBtn) {
          deleteBtn.disabled = input.value !== message;
        }
      };

      addTrackedListener(deleteInput, "input", inputHandler);
    }

    // Set up cancel button
    if (cancelBtn) {
      const cancelHandler = () => {
        cleanup();
        resolve(false);
      };

      addTrackedListener(cancelBtn, "click", cancelHandler);
    }

    // Set up delete button
    if (deleteBtn) {
      const deleteHandler = () => {
        handleSubmit();
      };

      addTrackedListener(deleteBtn, "click", deleteHandler);
    }

    // Close modal when clicking outside (only if clicking directly on the modal background)
    if (modalElement) {
      const modalClickHandler = (e: MouseEvent) => {
        if (e.target === modalElement) {
          cleanup();
          resolve(false);
        }
      };

      addTrackedListener<MouseEvent>(
        modalElement as HTMLElement,
        "click",
        modalClickHandler
      );
    }

    // Handle escape key to cancel
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cleanup();
        resolve(false);
      }
    };

    // Add escape key listener to our tracked listeners
    addTrackedListener<KeyboardEvent>(document, "keydown", handleEscapeKey);
  });
};
