import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";

interface EmailListProps {
  setEmailListValue?: (value: (prevEmails: string[]) => string[]) => void;
  names?: string;
}

const EmailList: React.FC<EmailListProps> = ({ setEmailListValue, names }) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState<string>("");
  const [newGroupEmail, setNewGroupEmail] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleEmailAdd = (): void => {
    const newEmails = newEmail.split(",").map((email) => email.trim());

    if (!emails.includes(newEmails[0])) {
      // check if email already on the list

      // add new email to list.
      setEmails((prevEmails) => [...prevEmails, ...newEmails]);

      setEmailListValue &&
        setEmailListValue((prevEmails) => [...prevEmails, ...newEmails]);
      setNewEmail("");
      message && setMessage("");
    } else {
      // print message if already exist.
      setMessage("Email already exist in the group.");
    }
  };

  const handleEmailDelete = (index: number): void => {
    setEmails((prevEmails) => [
      ...prevEmails.slice(0, index),
      ...prevEmails.slice(index + 1),
    ]);
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
    <div className={`ihub-email-list ${names || ""}`}>
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
        placeholder="Separate emails with commas or 'Enter'"
        className="ihub-input"
      />
      {message && <p className="ihub-notes ihub-is_invalid">{message}</p>}
    </div>
  );
};

export default EmailList;
