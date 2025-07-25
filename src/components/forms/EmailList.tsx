"use client";
import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";

interface EmailListProps {
  /** Label to display above the email list */
  label?: string;
  /** Array of email addresses */
  emails?: string[];
  /** Function to update emails array */
  setEmails?: (emails: string[]) => void;
  /** Placeholder text for input field */
  placeholder?: string;
  /** Custom class name */
  className?: string;
  /** Field name for form submission */
  names?: string;
  /** Allow bulk email input */
  allowBulkInput?: boolean;
  /** Legacy prop for backward compatibility */
  setEmailListValue?: (value: (prevEmails: string[]) => string[]) => void;
}

const EmailList: React.FC<EmailListProps> = ({ 
  label,
  emails: externalEmails = [],
  setEmails: setExternalEmails,
  placeholder = "Separate emails with commas or 'Enter'",
  className = "",
  names,
  allowBulkInput = false,
  setEmailListValue 
}) => {
  const [internalEmails, setInternalEmails] = useState<string[]>([]);
  
  // Use external emails if provided, otherwise use internal state
  const emails = externalEmails.length > 0 ? externalEmails : internalEmails;
  const setEmails = setExternalEmails || setInternalEmails;
  const [newEmail, setNewEmail] = useState<string>("");
  const [newGroupEmail, setNewGroupEmail] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleEmailAdd = (): void => {
    const newEmails = newEmail.split(",").map((email) => email.trim());

    if (!emails.includes(newEmails[0])) {
      // check if email already on the list

      // add new email to list.
      const updatedEmails = [...emails, ...newEmails];
      setEmails(updatedEmails);

      // Legacy support
      setEmailListValue &&
        setEmailListValue(() => updatedEmails);
      setNewEmail("");
      message && setMessage("");
    } else {
      // print message if already exist.
      setMessage("Email already exist in the group.");
    }
  };

  const handleEmailDelete = (index: number): void => {
    const updatedEmails = [
      ...emails.slice(0, index),
      ...emails.slice(index + 1),
    ];
    setEmails(updatedEmails);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e?: KeyboardEvent<HTMLInputElement>): void => {
    if (e === undefined || ["Enter", "Tab", ","].includes(e.key)) {
      e && e.preventDefault();
      if (isValidEmail(newEmail)) {
        handleEmailAdd();
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmails = e.target.value.split(",").map((email) => email.trim());
    if (newEmails.length > 1) {
      setNewGroupEmail(newEmails);
    } else {
      setNewEmail(e.target.value);
    }
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    // If the user forgot to add comma
    // The event returns undefined object
    if (e.target.value) {
      handleKeyPress();
      e.target.value = ""; // empty the field
    }
  };

  return (
    <div className={`ihub-email-list ${className} ${names || ""}`}>
      {label && <label className="ihub-email-label">{label}</label>}
      <ul className="field">
        {emails.map((email, index) => (
          <li key={index} className="ihub-email-item">
            <span className="ihub-email-text">{email}</span>
            <span
              onClick={() => handleEmailDelete(index)}
              className="material-symbols-outlined ihub-email-icon"
            >
              close
            </span>
          </li>
        ))}
      </ul>
      <input name={names} hidden value={emails.join(",")} />
      <input
        type="text"
        value={newEmail}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="ihub-input"
      />
      {message && <p className="ihub-input-notes ihub-is_invalid">{message}</p>}
    </div>
  );
};

export default EmailList;
