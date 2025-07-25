"use client";

import React, { useState } from "react";
import { MessageDisplay, SubmitButton, InputText } from "../../../../index";

const MessageDisplayExample: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const addMessage = (type: string, content: string) => {
    const message = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [message, ...prev]);
  };

  const removeMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>MessageDisplay Examples</h1>
        <p>Message display component for showing notifications, alerts, and system messages</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Messages */}
        <div className="ihub-example-card">
          <h3>Basic Message Types</h3>
          <p>Different types of messages with various styles</p>
          
          <div className="ihub-message-types">
            <MessageDisplay 
              messages="Operation completed successfully!"
              flag="success"
            />
            
            <MessageDisplay 
              messages="Please review your information before proceeding"
              flag="note"
            />
            
            <MessageDisplay 
              messages="An error occurred while processing your request"
              flag="failed"
            />
            
            <MessageDisplay 
              messages="Your profile has been updated"
            />
          </div>
        </div>

        {/* Interactive Messages */}
        <div className="ihub-example-card">
          <h3>Interactive Messages</h3>
          <p>Messages with actions and controls</p>
          
          <div className="ihub-controls">
            <button onClick={() => addMessage('success', 'Data saved successfully!')} className="ihub-success-btn">
              Add Success
            </button>
            <button onClick={() => addMessage('error', 'Failed to connect to server')} className="ihub-error-btn">
              Add Error
            </button>
            <button onClick={() => addMessage('warning', 'Your session will expire soon')} className="ihub-warning-btn">
              Add Warning
            </button>
            <button onClick={() => addMessage('info', 'New features are available')} className="ihub-info-btn">
              Add Info
            </button>
          </div>
          
          <div className="ihub-message-list">
            {messages.map(msg => (
              <div key={msg.id} className="ihub-message-item">
                <MessageDisplay
                  messages={msg.content}
                  flag={msg.type === 'success' ? 'success' : msg.type === 'error' ? 'failed' : 'note'}
                />
                <button 
                  onClick={() => removeMessage(msg.id)}
                  className="ihub-dismiss-btn"
                  title="Dismiss"
                >
                  ×
                </button>
                <small className="ihub-timestamp">
                  {msg.timestamp.toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        <div className="ihub-example-card">
          <h3>Custom Message Input</h3>
          <p>Create your own custom messages</p>
          
          <div className="ihub-custom-message-form">
            <InputText
              name="messageContent"
              label="Message Content"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message"
            />
            
            <div className="ihub-message-buttons">
              <button 
                onClick={() => { addMessage('success', newMessage); setNewMessage(''); }}
                disabled={!newMessage}
                className="ihub-success-btn"
              >
                Success Message
              </button>
              <button 
                onClick={() => { addMessage('error', newMessage); setNewMessage(''); }}
                disabled={!newMessage}
                className="ihub-error-btn"
              >
                Error Message
              </button>
              <button 
                onClick={() => { addMessage('warning', newMessage); setNewMessage(''); }}
                disabled={!newMessage}
                className="ihub-warning-btn"
              >
                Warning Message
              </button>
              <button 
                onClick={() => { addMessage('info', newMessage); setNewMessage(''); }}
                disabled={!newMessage}
                className="ihub-info-btn"
              >
                Info Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { MessageDisplay } from '@instincthub/react-ui';

<MessageDisplay 
  message="Operation completed successfully!"
  type="success"
/>

<MessageDisplay 
  message="An error occurred"
  type="error"
  dismissible
  onDismiss={() => setShowError(false)}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default MessageDisplayExample;