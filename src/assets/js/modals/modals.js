import { Images } from "../../images/Images";
import { reqOptions } from "../helpFunction";

// Import the css in root: import "@/assets/css/modal.css";
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
				: "You are about to initiate a function!"
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
				handleCancel();
			}
		});
	});
};

export const openConfirmDelete = (message, token, url) => {
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
		<section id="myModal" class="modal">
			<div class="modal-content">
				<h4>Delete noaholatoye ?</h4>
				<p class="something_bad_flagged">
					Unexpected bad things will happen if you don’t read this!
				</p>
				<p>
					This action cannot be undone. This will permanently delete the
					<strong>${message}</strong> repository, feedbacks, schedules, and remove all team
					associations.<br/><br/>
				</p>

				<div class="flex">
					<p>Please type <strong>${message}</strong> to confirm.</p>
					<div style="cursor: pointer" id="copyValue"> ${unCopiedState}</div>
				</div>

				<input type="text" id="deleteInput" oninput="handleInput(this)"/>
				
				<div class="action_btn">
					<button type="button" disabled="" id="deleteBtn" class="delete_btn" onClick={handleConfirm()}>Delete</button
					><button type="button" class="cancel_btn" id="cancelBtn" onClick={handleCancel()}>Cancel</button>
				</div>
			</div>
		</section>
		`;

		modal_container.innerHTML = modalContent;
		document.body.appendChild(modal_container);

		const copyValue = document.getElementById("copyValue");
		const deleteBtn = document.getElementById("deleteBtn");

		copyValue.addEventListener("click", () => {
			navigator.clipboard
				.writeText(message)
				.then(() => {
					copyValue.innerHTML = copiedState;
					setTimeout(() => {
						copyValue.innerHTML = unCopiedState;
					}, 2000); // Set the timeout duration (2 seconds in this case)
				})
				.catch((err) => console.error("Unable to copy to clipboard", err));
		});

		window.handleInput = (e) => {
			if (`${message}` === e.value) {
				deleteBtn.disabled = false;
			} else {
				deleteBtn.disabled = true;
			}
		};

		function cleanup() {
			modal_container.remove();
		}

		window.handleCancel = () => {
			// User canceled!
			cleanup();
			resolve(false);
		};

		window.handleConfirm = () => {
			// User confirmed
			handleSubmit();
		};

		const handleSubmit = async () => {
			// Delete the object from the DB if user confirms.
			const requestOptions = reqOptions("DELETE", null, token);
			const request = await fetch(url, requestOptions);
			if (request.status === 204) {
				openToast(`${message} was successfully deleted.`);
				cleanup();
				return resolve(true);
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
			return resolve(false);
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
