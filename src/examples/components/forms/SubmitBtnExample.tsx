import React, { useState, FormEvent } from "react";
import { SubmitButton } from "@/index";

const SubmitBtnExample: React.FC = () => {
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set status to loading (0)
    setStatus(0);

    // Add rolling class to button
    const submitBtn = e.currentTarget.querySelector("[type=submit]");
    if (submitBtn) {
      submitBtn.classList.add("rolling");
      (submitBtn as HTMLButtonElement).disabled = true;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      setStatus(1);
      setMessage("Feedback submitted successfully!");
    } catch (error) {
      // Error
      setStatus(2);
      setMessage("An error occurred. Please try again.");
    } finally {
      // Remove rolling class and enable button
      if (submitBtn) {
        submitBtn.classList.remove("rolling");
        (submitBtn as HTMLButtonElement).disabled = false;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your feedback" className="ihub-input" />
      <SubmitButton label="Add Feedback" status={status} />

      {message && (
        <div
          className={`ihub-message ${
            status === 1 ? "ihub-success" : "ihub-error"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default SubmitBtnExample;
