import React, { useState } from "react";

interface MultipleEmailProps {
  onEmailsChange?: (emails: string[]) => void;
}

const MultipleEmail: React.FC<MultipleEmailProps> = ({ onEmailsChange }) => {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      const trimmedValue = value.trim();

      if (trimmedValue && isValid(trimmedValue)) {
        const newItems = [...items, trimmedValue];
        setItems(newItems);
        setValue("");
        
        if (onEmailsChange) {
          onEmailsChange(newItems);
        }
      }
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    setError(null);
  };

  const handleDelete = (item: string) => {
    const newItems = items.filter((i) => i !== item);
    setItems(newItems);
    
    if (onEmailsChange) {
      onEmailsChange(newItems);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${items}`);
  };

  const handlePaste = (evt: React.ClipboardEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const paste = evt.clipboardData.getData("text");
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter((email) => !isInList(email));
      
      if (toBeAdded.length) {
        const newItems = [...items, ...toBeAdded];
        setItems(newItems);
        
        if (onEmailsChange) {
          onEmailsChange(newItems);
        }
      }
    }
  };

  const isValid = (email: string): boolean => {
    let emailError: string | null = null;

    if (isInList(email)) {
      emailError = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      emailError = `${email} is not a valid email address.`;
    }

    if (emailError) {
      setError(emailError);
      return false;
    }

    return true;
  };

  const isInList = (email: string): boolean => {
    return items.includes(email);
  };

  const isEmail = (email: string): boolean => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };

  return (
    <div className="ihub-multiple-email" onSubmit={handleSubmit}>
      {items.map((item) => (
        <div className="ihub-tag-item" key={item}>
          <p>{item}</p>
          <button
            type="button"
            className="ihub-button"
            onClick={() => handleDelete(item)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        className={`ihub-input ${error ? "ihub-has-error" : ""}`}
        value={value}
        placeholder="Separate emails with commas or 'Enter'"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onPaste={handlePaste}
      />

      {error && <p className="ihub-error">{error}</p>}
    </div>
  );
};

export default MultipleEmail;