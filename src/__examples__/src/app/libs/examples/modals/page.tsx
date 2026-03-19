"use client";

import React, { useState } from "react";
import MainNavigation from "../../../../components/navbars/MainNavigation";
import {
  openToast,
  openConfirmModal,
  getUserEmailInputModal,
} from "../../../../../../components/lib/modals/modals";
import { openConfirmDelete } from "../../../../../../components/lib/modals/openConfirmDelete";
import { CodeDisplay } from "@/components/ui";

export default function ModalsExamplePage() {
  const [confirmResult, setConfirmResult] = useState<string>("");
  const [emailResult, setEmailResult] = useState<string>("");
  const [deleteResult, setDeleteResult] = useState<string>("");

  // openToast demos
  const handleSuccessToast = () => {
    openToast("Profile updated successfully!");
  };

  const handleCreatedToast = () => {
    openToast("New item created!", 201);
  };

  const handleErrorToast = () => {
    openToast("Please check your input and try again.", 400);
  };

  const handleServerErrorToast = () => {
    openToast("Server error occurred. Please try again later.", 500);
  };

  const handleDefaultToast = () => {
    openToast();
  };

  const handleMultipleToasts = () => {
    openToast("First notification", 200);
    setTimeout(() => openToast("Second notification", 201), 300);
    setTimeout(() => openToast("Third notification", 400), 600);
  };

  // openConfirmModal demos
  const handleBasicConfirm = async () => {
    const confirmed = await openConfirmModal(
      "Are you sure you want to proceed with this action?"
    );
    setConfirmResult(confirmed ? "User clicked Ok" : "User cancelled");
  };

  const handleFlaggedConfirm = async () => {
    const confirmed = await openConfirmModal(
      "This will permanently remove all data associated with this account. This action cannot be undone.",
      true
    );
    setConfirmResult(
      confirmed ? "User confirmed dangerous action" : "User wisely cancelled"
    );
  };

  // getUserEmailInputModal demos
  const handleEmailModal = async () => {
    const email = await getUserEmailInputModal("Web Development Bootcamp");
    if (email) {
      setEmailResult(`Email collected: ${email}`);
      openToast(`Enrolled with: ${email}`);
    } else {
      setEmailResult("User cancelled email input");
    }
  };

  // openConfirmDelete demo
  const handleDeleteDemo = async () => {
    setDeleteResult("Awaiting confirmation...");
    // Using a fake endpoint — the fetch will fail but the modal still works
    const deleted = await openConfirmDelete(
      "My Test Project",
      "demo-token",
      "https://httpbin.org/delete"
    );
    setDeleteResult(
      deleted ? "Item deleted successfully" : "Deletion cancelled or failed"
    );
  };

  return (
    <>
      <MainNavigation />
      <main className="ihub-container ihub-mt-10 ihub-mb-10">
        <div className="ihub-max-w-4xl ihub-mx-auto">
          <h1 className="ihub-mb-3">Modal & Toast Utilities</h1>
          <p className="ihub-mb-8" style={{ color: "#6b7280" }}>
            Imperative modal and toast utilities that work without React state.
            Call a function, get a result. No providers or context needed.
          </p>

          {/* ============ openToast ============ */}
          <section className="ihub-mb-10">
            <h2 className="ihub-mb-4">openToast</h2>
            <p className="ihub-mb-4" style={{ color: "#6b7280" }}>
              Auto-dismissing toast notifications with status-based styling,
              progress bar, and stacking support.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "12px",
              }}
              className="ihub-mb-6"
            >
              <button
                className="ihub-important-btn"
                onClick={handleSuccessToast}
              >
                Success (200)
              </button>
              <button
                className="ihub-important-btn"
                onClick={handleCreatedToast}
              >
                Created (201)
              </button>
              <button className="ihub-danger-btn" onClick={handleErrorToast}>
                Error (400)
              </button>
              <button
                className="ihub-danger-btn"
                onClick={handleServerErrorToast}
              >
                Server Error (500)
              </button>
              <button
                className="ihub-outlined-btn"
                onClick={handleDefaultToast}
              >
                Default Message
              </button>
              <button
                className="ihub-outlined-btn"
                onClick={handleMultipleToasts}
              >
                Stack Multiple
              </button>
            </div>

            <CodeDisplay
              code={`import { openToast } from "@instincthub/react-ui/lib";

// Success
openToast("Profile updated successfully!");
openToast("New item created!", 201);

// Errors
openToast("Please check your input.", 400);
openToast("Server error occurred.", 500);

// Default message (no custom text)
openToast();

// In async operations
const handleSave = async () => {
  try {
    await saveData();
    openToast("Data saved successfully!");
  } catch (error) {
    openToast("Failed to save data.", 500);
  }
};`}
              language="typescript"
              fileName="openToast.ts"
            />
          </section>

          {/* ============ openConfirmModal ============ */}
          <section className="ihub-mb-10">
            <h2 className="ihub-mb-4">openConfirmModal</h2>
            <p className="ihub-mb-4" style={{ color: "#6b7280" }}>
              Promise-based confirmation dialog. Returns{" "}
              <code>true</code> (Ok) or <code>false</code> (Cancel).
            </p>

            <div
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              className="ihub-mb-4"
            >
              <button
                className="ihub-important-btn"
                onClick={handleBasicConfirm}
              >
                Basic Confirm
              </button>
              <button
                className="ihub-danger-btn"
                onClick={handleFlaggedConfirm}
              >
                Flagged Warning
              </button>
            </div>

            {confirmResult && (
              <p
                className="ihub-mb-4"
                style={{
                  padding: "10px 16px",
                  borderRadius: "6px",
                  background: "var(--Gray, #f3f4f6)",
                }}
              >
                Result: <strong>{confirmResult}</strong>
              </p>
            )}

            <CodeDisplay
              code={`import { openConfirmModal } from "@instincthub/react-ui/lib";

// Basic confirmation
const confirmed = await openConfirmModal(
  "Are you sure you want to proceed?"
);
if (confirmed) {
  performAction();
}

// With red warning flag
const confirmed = await openConfirmModal(
  "This will permanently remove all data. Continue?",
  true // Shows red warning banner
);

// In a form submission flow
const handleSubmit = async (formData: FormData) => {
  const confirmed = await openConfirmModal(
    "You are about to submit this form."
  );
  if (confirmed) {
    await submitForm(formData);
    openToast("Form submitted!");
  }
};`}
              language="typescript"
              fileName="openConfirmModal.ts"
            />
          </section>

          {/* ============ getUserEmailInputModal ============ */}
          <section className="ihub-mb-10">
            <h2 className="ihub-mb-4">getUserEmailInputModal</h2>
            <p className="ihub-mb-4" style={{ color: "#6b7280" }}>
              Email collection modal with built-in validation. Returns the email
              string or <code>undefined</code> if cancelled.
            </p>

            <div
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              className="ihub-mb-4"
            >
              <button
                className="ihub-important-btn"
                onClick={handleEmailModal}
              >
                Collect Email
              </button>
            </div>

            {emailResult && (
              <p
                className="ihub-mb-4"
                style={{
                  padding: "10px 16px",
                  borderRadius: "6px",
                  background: "var(--Gray, #f3f4f6)",
                }}
              >
                Result: <strong>{emailResult}</strong>
              </p>
            )}

            <CodeDisplay
              code={`import { getUserEmailInputModal } from "@instincthub/react-ui/lib";

// Collect email for enrollment
const email = await getUserEmailInputModal("Web Development Bootcamp");
if (email) {
  await enrollUser(email, courseId);
  openToast("Enrollment successful!");
} else {
  console.log("Cancelled");
}

// Collect email for newsletter
const email = await getUserEmailInputModal("Weekly Newsletter");
if (email) {
  await subscribeToNewsletter(email);
}

// Collect email before download
const email = await getUserEmailInputModal("Free E-Book: React Patterns");
if (email) {
  await sendDownloadLink(email, resourceId);
  openToast("Download link sent!");
}`}
              language="typescript"
              fileName="getUserEmailInputModal.ts"
            />
          </section>

          {/* ============ openConfirmDelete ============ */}
          <section className="ihub-mb-10">
            <h2 className="ihub-mb-4">openConfirmDelete</h2>
            <p className="ihub-mb-4" style={{ color: "#6b7280" }}>
              GitHub-style delete confirmation with type-to-confirm validation.
              Sends the DELETE request automatically on confirm.
            </p>

            <div
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              className="ihub-mb-4"
            >
              <button className="ihub-danger-btn" onClick={handleDeleteDemo}>
                Delete &quot;My Test Project&quot;
              </button>
            </div>

            {deleteResult && (
              <p
                className="ihub-mb-4"
                style={{
                  padding: "10px 16px",
                  borderRadius: "6px",
                  background: "var(--Gray, #f3f4f6)",
                }}
              >
                Result: <strong>{deleteResult}</strong>
              </p>
            )}

            <CodeDisplay
              code={`import { openConfirmDelete } from "@instincthub/react-ui/lib";

const handleDelete = async (item) => {
  const endpoint = \`\${API_HOST_URL}items/\${item.id}/\`;
  const deleted = await openConfirmDelete(
    item.title,   // Name shown in modal
    token,         // Auth token
    endpoint       // DELETE endpoint
  );

  if (deleted) {
    // Remove from local state
    setItems(prev => prev.filter(i => i.id !== item.id));
  }
};

// Skip confirmation popup (direct delete)
const deleted = await openConfirmDelete(
  item.title,
  token,
  endpoint,
  false  // pop = false, skips modal
);`}
              language="typescript"
              fileName="openConfirmDelete.ts"
            />
          </section>

          {/* ============ All Functions Reference ============ */}
          <section className="ihub-mb-10">
            <h2 className="ihub-mb-4">Function Signatures</h2>

            <CodeDisplay
              code={`// Toast notification
function openToast(message?: string, status?: number): void

// Confirmation dialog — returns user's choice
function openConfirmModal(message: string, flag?: boolean): Promise<boolean>

// Email collection — returns email or undefined
function getUserEmailInputModal(title: string): Promise<string | undefined>

// Delete with confirmation — sends DELETE request, returns success
function openConfirmDelete(
  message: string,
  token: string,
  url: string,
  pop?: boolean    // default: true (show modal)
): Promise<boolean>`}
              language="typescript"
              fileName="signatures.ts"
            />
          </section>
        </div>
      </main>
    </>
  );
}
