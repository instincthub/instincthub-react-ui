import React from "react";

interface MessageDisplayProps {
  messages?: string;
  flag?: "success" | "failed" | "note";
}

/**
 * Component to display various types of messages with different styling
 */
const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages, flag }) => {
  if (!messages) {
    return null;
  }

  return (
    <div className={`ihub-react-message ${flag ? `ihub-${flag}` : ""}`}>
      <p>{messages}</p>
    </div>
  );
};

export default MessageDisplay;