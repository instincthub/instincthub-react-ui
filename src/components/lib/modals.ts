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
