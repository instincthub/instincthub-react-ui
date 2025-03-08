import { Images } from "../images/Images";
import { isValidEmail } from "./helpFunction";

// Import the css in root: import "@/assets/css/modals.css";
export const openConfirmModal = (message, flag = false) => {
	return new Promise((resolve) => {
		let modal_container = document.getElementById("confirmModal");
		if (!modal_container) {
			modal_container = document.createElement("div");
			modal_container.id = "confirmModal";
		}

		const modalContent = `
      <section id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={handleCancel()}>&times;</span>
          <p class=${flag ? "something_bad_flagged" : "something_bad"}>${
			flag
				? "Unexpected things will happen if you don’t read this!"
				: "You are about to submit!"
		}</p>
          <p>${
						message ||
						"Carefully read the instructions before making a decision. Ready? Hit the continue button!"
					}</p>
          <div class="mt-4">
            <button type="button" class="danger-btn d-inline-block" onClick={handleCancel()}>Cancel</button>
            <button type="button" class="important-btn confirm-btn" onClick={handleConfirm()}>Ok</button>
          </div>
        </div>
      </section>
    `;

		modal_container.innerHTML = modalContent;
		document.body.appendChild(modal_container);

		function cleanup() {
			modal_container.remove();
		}

		window.handleCancel = () => {
			// User canceled!
			cleanup();
			resolve(false);
			console.log("");
		};

		window.handleConfirm = () => {
			// User confirmed
			cleanup();
			resolve(true);
		};

		modal_container.addEventListener("click", (e) => {
			// Close if user clicks outside the content box.
			const target = e.target;
			if (target.id === "myModal" || target.id === "confirmModal") {
				cleanup();
			}
		});
	});
};

// Default call openToast();
export const openToast = (message = "", status = 200) => {
	const msg =
		status === 200 || status === 201
			? "Awesome! The update was made."
			: status === 500
			? "Sorry, the server can't process your request"
			: "Hmmm..., Something went wrong. Try again";

	const icons = status === 200 || status === 201 ? Images.valid : Images.error;

	let modal_container = document.getElementById("openToast");
	if (!modal_container) {
		modal_container = document.createElement("div");
		modal_container.id = "openToast";
	}

	const modalContent = `
	<div class="toast-wrapper">
		<div class="slide-in-top">
			<div class="align-text">
				<div class="valid_btn">
					<img src="${icons}" alt="Status Icon" class="valid" />
					<p
						class="${status === 200 || status === 201 ? "isDone" : "isError"}"
					>
						${message || msg}
					</p>
				</div>
			</div>
			
			<svg width="800px" height="800px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" 
			class="close-btn" onClick={cleanupToast()}>
				<path d="M3 21.32L21 3.32001" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3 3.32001L21 21.32" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
`;

	modal_container.innerHTML = modalContent;
	document.body.appendChild(modal_container);

	window.cleanupToast = () => {
		modal_container.remove();
	};

	setTimeout(() => {
		cleanupToast();
	}, 10000);
};

export const getUserEmailInputModal = (title) => {
	/* Import the css in root: import "@/assets/css/modal.css";
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
	return new Promise((resolve) => {
		let modal_container = document.getElementById("confirmModal");
		if (!modal_container) {
			modal_container = document.createElement("div");
			modal_container.id = "confirmModal";
		}
		let email_value;

		const modalContent = `
		<section id="myModal" class="modal">
			<div class="modal-content">
			<svg width="800px" height="800px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" 
			class="ih_get_user_email_modal_close_btn" onClick={handleCleanUpInput()}>
				<path d="M3 21.32L21 3.32001" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3 3.32001L21 21.32" stroke="var(--Gunmetal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<h4>Enrol for ${title}</h4>
			<p>Enter a valid Email Address</p>

				<input type="email" name="email" id="userInput" oninput="handleInput(this)"/>
				
				<div class="action_btn">
					<button type="button" disabled="" id="proceedBtn" class="delete_btn important-btn" onClick={handleConfirm()}>Proceed</button
					>
				</div>
			</div>
		</section>
		`;

		modal_container.innerHTML = modalContent;
		document.body.appendChild(modal_container);

		const proceedBtn = document.getElementById("proceedBtn");

		window.handleInput = (e) => {
			if (isValidEmail(e.value)) {
				proceedBtn.disabled = false;
				email_value = e.value;
			} else {
				proceedBtn.disabled = true;
				email_value = "";
			}
		};

		function cleanup() {
			modal_container.remove();
		}

		window.handleConfirm = () => {
			// Return valid email
			if (isValidEmail(email_value)) {
				cleanup();
				return resolve(email_value);
			} else {
				openToast("You need to enter a valid email!", 400);
			}
		};

		window.handleCleanUpInput = (e) => {
			// Close if user clicks outside the content box.
			cleanup();
		};
	});
};
