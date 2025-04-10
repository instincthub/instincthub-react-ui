import { reqOptions } from "./helpFunction";

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

// Open a confirmation modal
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

    const modalContent = `
      <section id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onclick="window.handleCancel()">×</span>
          <p class="${flag ? "something_bad_flagged" : "something_bad"}">
            ${
              flag
                ? "Unexpected things will happen if you don’t read this!"
                : "You are about to submit!"
            }
          </p>
          <p>${
            message ||
            "Carefully read the instructions before making a decision. Ready? Hit the continue button!"
          }</p>
          <div class="mt-4">
            <button type="button" class="danger-btn d-inline-block" onclick="window.handleCancel()">Cancel</button>
            <button type="button" class="important-btn confirm-btn" onclick="window.handleConfirm()">Ok</button>
          </div>
        </div>
      </section>
    `;

    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);

    const cleanup = () => {
      modalContainer?.remove();
    };

    window.handleCancel = () => {
      cleanup();
      resolve(false);
      console.log("");
    };

    window.handleConfirm = () => {
      cleanup();
      resolve(true);
    };

    modalContainer.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "myModal" || target.id === "confirmModal") {
        cleanup();
      }
    });
  });
};

/**
 * Opens a confirmation dialog for deleting an item
 * @example
 * ```ts
 * const confirm = await openConfirmDelete(option.title, token, endpoint);
 * if (confirm) {
 *   // Update objects
 *   const newObjects = data.filter((i) => i.id !== option.id);
 *   setData(newObjects);
 * }
 * ```
 * @param message The name of the item to be deleted
 * @param token Authentication token
 * @param url API endpoint for deletion
 * @param pop Whether to show the confirmation dialog (default: true)
 * @returns Promise that resolves to true if deletion was successful, false otherwise
 */
export const openConfirmDelete = (
  message: string,
  token: string | undefined,
  url: string,
  pop: boolean = true
): Promise<boolean> => {
  /* Import the css in root: import "@/styles/app/modal.css";
  INITIATE:
  const handleDelete = async (option) => {
    const endpoint = `${API_HOST_URL}assessments/${handle}/assessment-link-tree-destroy/${option.id}/`;
    const confirm = await openConfirmDelete(option.title, token, endpoint);
    if (confirm) {
      // Update objects
      const newObjects = data.filter((i) => i.id !== option.id);
      setData(newObjects);
    }
  };
  */

  return new Promise<boolean>((resolve) => {
    const handleSubmit = async (): Promise<void> => {
      // Delete the object from the DB if user confirms.
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
        const res = await request.json();
        openToast(
          res.detail ||
            "Couldn't delete the item. You can report the issue with the feedback button.",
          request.status
        );
      }
      resolve(false);
    };

    if (!pop) {
      // No need for pop if not required.
      handleSubmit();
      return;
    }

    let modal_container = document.getElementById("confirmModal");
    if (!modal_container) {
      modal_container = document.createElement("div");
      modal_container.id = "confirmModal";
    }

    const copiedState = `
		<div>
		<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckIcon" style="position: relative; top: 5px; margin-right: 10px;"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
		<span> Copied! </span>
	<div/>
		`;

    const unCopiedState = `
		<div>
			<svg
				class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
				focusable="false"
				aria-hidden="true"
				viewBox="0 0 24 24"
				data-testid="ContentCopyIcon"
				style="position: relative; top: 5px; margin-right: 10px"
			>
			<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" ></path></svg>
			<span> Copy Link </span>
		</div>
		`;

    const modalContent = `
		<section id="myModal" class="ihub-modal">
			<div class="ihub-modal-content">
				<h4>Delete ${message}?</h4>
				<p class="ihub-something-bad-flagged">
					Unexpected bad things will happen if you don't read this!
				</p>
				<p>
					This action cannot be undone. This will permanently delete the
					<strong>${message}</strong> repository, feedbacks, schedules, and remove all team
					associations.<br/><br/>
				</p>

				<div class="ihub-flex">
					<p>Please type <strong>${message}</strong> to confirm.</p>
					<div style="cursor: pointer" id="copyValue"> ${unCopiedState}</div>
				</div>

				<input type="text" id="deleteInput" oninput="handleInput(this)"/>
				
				<div class="ihub-action-btn">
					<button type="button" disabled id="deleteBtn" class="ihub-delete-btn" onClick={handleConfirm()}>Delete</button>
					<button type="button" class="ihub-cancel-btn" id="cancelBtn" onClick={handleCancel()}>Cancel</button>
				</div>
			</div>
		</section>
		`;

    modal_container.innerHTML = modalContent;
    document.body.appendChild(modal_container);

    const copyValue = document.getElementById("copyValue");
    const deleteBtn = document.getElementById(
      "deleteBtn"
    ) as HTMLButtonElement | null;

    if (copyValue) {
      copyValue.addEventListener("click", () => {
        navigator.clipboard
          .writeText(message)
          .then(() => {
            if (copyValue) {
              copyValue.innerHTML = copiedState;
              setTimeout(() => {
                if (copyValue) {
                  copyValue.innerHTML = unCopiedState;
                }
              }, 2000); // Set the timeout duration (2 seconds in this case)
            }
          })
          .catch((err) => console.error("Unable to copy to clipboard", err));
      });
    }

    // Define the input handler on the window object
    (window as any).handleInput = (e: HTMLInputElement): void => {
      if (deleteBtn) {
        deleteBtn.disabled = `${message}` !== e.value;
      }
    };

    function cleanup(): void {
      if (modal_container) {
        modal_container.remove();
      }
    }

    // Define the cancel handler on the window object
    (window as any).handleCancel = (): void => {
      // User canceled!
      cleanup();
      resolve(false);
    };

    // Define the confirm handler on the window object
    (window as any).handleConfirm = (): void => {
      // User confirmed
      handleSubmit();
    };

    modal_container.addEventListener("click", (e: MouseEvent) => {
      // Close if user clicks outside the content box.
      const target = e.target as HTMLElement;
      if (target.id === "myModal" || target.id === "confirmModal") {
        cleanup();
        resolve(false);
      }
    });
  });
};

// Open a toast notification
export const openToast = (
  message: string = "",
  status: StatusCode = 200
): void => {
  const msg =
    status === 200 || status === 201
      ? "Awesome! The update was made."
      : status === 500
      ? "Sorry, the server can't process your request"
      : "Hmmm..., Something went wrong. Try again";

  const iconSvg =
    status === 200 || status === 201
      ? '<svg viewBox="0 0 24 24" style="color: var(--ViridianGreen); width:24px; height:24px;"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
      : '<svg viewBox="0 0 24 24" style="color: var(--Danger); width:24px; height:24px;"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>';

  let modalContainer = document.getElementById(
    "openToast"
  ) as HTMLDivElement | null;
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "openToast";
  }

  const modalContent = `
    <div class="toast-wrapper">
      <div class="slide-in-top">
        <div class="align-text">
          <div class="valid_btn">
            ${iconSvg}
            <p class="${
              status === 200 || status === 201 ? "isDone" : "isError"
            }">
              ${message || msg}
            </p>
          </div>
        </div>
        <svg width="800px" height="800px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" 
          class="close-btn" onclick="window.cleanupToast()">
          <path d="M3 21.32L21 3.32001" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 3.32001L21 21.32" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  `;

  modalContainer.innerHTML = modalContent;
  document.body.appendChild(modalContainer);

  window.cleanupToast = () => {
    modalContainer?.remove();
  };

  setTimeout(() => {
    window.cleanupToast();
  }, 10000);
};

// Open a modal to get user email input
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

    const modalContent = `
      <section id="myModal" class="modal">
        <div class="modal-content">
          <svg width="800px" height="800px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" 
            class="ih_get_user_email_modal_close_btn" onclick="window.handleCleanUpInput()">
            <path d="M3 21.32L21 3.32001" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 3.32001L21 21.32" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h4>Enrol for ${title}</h4>
          <p>Enter a valid Email Address</p>
          <input type="email" name="email" id="userInput" oninput="window.handleInput(this)" />
          <div class="action_btn">
            <button type="button" disabled id="proceedBtn" class="delete_btn important-btn" onclick="window.handleConfirm()">Proceed</button>
          </div>
        </div>
      </section>
    `;

    modalContainer.innerHTML = modalContent;
    document.body.appendChild(modalContainer);

    const proceedBtn = document.getElementById(
      "proceedBtn"
    ) as HTMLButtonElement | null;

    window.handleInput = (e: HTMLInputElement) => {
      if (isValidEmail(e.value)) {
        if (proceedBtn) proceedBtn.disabled = false;
        emailValue = e.value;
      } else {
        if (proceedBtn) proceedBtn.disabled = true;
        emailValue = undefined;
      }
    };

    const cleanup = () => {
      modalContainer?.remove();
    };

    window.handleConfirm = () => {
      if (isValidEmail(emailValue)) {
        cleanup();
        resolve(emailValue);
      } else {
        openToast("You need to enter a valid email!", 400);
      }
    };

    window.handleCleanUpInput = () => {
      cleanup();
      resolve(undefined);
    };
  });
};
