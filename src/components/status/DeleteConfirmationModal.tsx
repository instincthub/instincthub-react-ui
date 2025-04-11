import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CopyToClipboard from "./CopyToClipBoard";
import { reqOptions } from "../lib/helpFunction";
import {
  confirmDelete,
  selectConfirmDelete,
  useDispatch,
  useSelector,
} from "../lib/redux";
import { SessionUserType } from "src/types";

/**
 * Custom hook for handling item deletion logic
 * @example
 * ```tsx
 * const { deleteItem, status, error } = useDeleteItem(url, title, onSuccess);
 * ```
 * @param url API endpoint for deletion
 * @param title Title of the item being deleted
 * @param onSuccess Callback function to run after successful deletion
 */
const useDeleteItem = (
  url: string | undefined | null,
  title: string | undefined | null,
  onSuccess: () => void
) => {
  const { data: session } = useSession();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const user = session?.user as SessionUserType;

  const deleteItem = useCallback(async () => {
    if (!url) return;

    setStatus("loading");
    setError(null);

    const token = user.name?.token as string | undefined;
    const requestOptions = reqOptions("DELETE", null, token);

    try {
      const response = await fetch(url, requestOptions);

      if (response.status === 204) {
        setStatus("success");
        onSuccess();
      } else if (response.status === 401) {
        setStatus("error");
        setError("You don't have permission to delete this item.");
      } else {
        setStatus("error");
        setError(
          "Couldn't delete the item. Please try again or report the issue."
        );
      }
    } catch (err) {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }, [url, session, onSuccess]);

  return { deleteItem, status, error };
};

interface DeleteConfirmationModalProps {
  itemTitle?: string;
}

interface ConfirmDeleteState {
  url?: string | null;
  title?: string;
  deleteStatus?: number;
}

/**
 * Modal component for confirming item deletion
 * @component
 * @example
 * ```tsx
 * <DeleteConfirmationModal
 *   url="http://endpoint"
 *   title="Some Title"
 *   onSuccess={() => {
 *     // Additional actions after successful deletion
 *   }}
 * />
 *
 * To trigger this modal:
 * dispatch(confirmDelete.actions.set({ url: "http://endpoint", title: "Some Title" }));
 *
 * To listen for successful deletion:
 * const { title, deleteStatus } = useSelector(selectConfirmDelete);
 * useEffect(() => {
 *   if (deleteStatus === 204) {
 *     dispatch(confirmDelete.actions.set({}));
 *     // Additional actions after successful deletion
 *   }
 * }, [deleteStatus]);
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (
  props
) => {
  const [confirmation, setConfirmation] = useState<string>("");
  const dispatch = useDispatch();
  const { url, title } = useSelector(selectConfirmDelete) as ConfirmDeleteState;

  const handleSuccess = useCallback(() => {
    dispatch(confirmDelete.actions.set({ deleteStatus: 204, title }));
  }, [dispatch, title]);

  const { deleteItem, status, error } = useDeleteItem(
    url,
    title,
    handleSuccess
  );

  const closeConfirmDelete = useCallback(() => {
    dispatch(confirmDelete.actions.set({}));
  }, [dispatch]);

  const isConfirmed = confirmation === title;

  // Reset confirmation input when modal opens with a new title
  useEffect(() => {
    setConfirmation("");
  }, [title]);

  if (!url) return null;

  return (
    <div
      className="ihub-modal"
      onClick={closeConfirmDelete}
      role="dialog"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div className="ihub-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ihub-delete-modal">
          <h4 id="delete-modal-title">Delete {title}?</h4>

          <p className="ihub-delete-warning" id="delete-modal-description">
            Warning: This action cannot be undone!
          </p>

          <p>
            This will permanently delete the{" "}
            <strong>{props.itemTitle || title}</strong> repository, including
            all associated data, feedbacks, schedules, and team associations.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isConfirmed) deleteItem();
            }}
          >
            <div className="ihub-delete-confirmation">
              <p>
                Please type <strong>{title}</strong> to confirm deletion.
              </p>
              <CopyToClipboard text={title || ""} />
            </div>

            <div className="ihub-form-input">
              <input
                type="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                className="ihub-delete-input"
                placeholder="Type to confirm"
                aria-describedby="confirmation-helper"
                autoComplete="off"
                autoFocus
              />
              <small id="confirmation-helper" className="ihub-helper-text">
                Type the exact name to enable deletion
              </small>
            </div>

            {error && (
              <p className="ihub-delete-message" role="alert">
                {error}
              </p>
            )}

            <div className="ihub-delete-actions">
              <button
                type="submit"
                disabled={!isConfirmed || status === "loading"}
                className="ihub-danger-btn"
                aria-busy={status === "loading"}
              >
                {status === "loading" ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                onClick={closeConfirmDelete}
                className="ihub-outlined-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
