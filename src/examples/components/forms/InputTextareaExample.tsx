"use client";

import React, { useState } from 'react';
import { InputTextarea } from '@/index';

const InputTextareaExample: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedback.length < 10) {
      setError('Feedback must be at least 10 characters long');
      return;
    }
    
    setError(undefined);
    console.log('Submitted feedback:', feedback);
    console.log('Description:', description);
    
    // Reset form after submission
    setFeedback('');
    setDescription('');
    alert('Thank you for your feedback!');
  };

  return (
    <div className="ihub-container ihub-py-6">
      <h2 className="ihub-mb-4">Share Your Feedback</h2>
      
      <form onSubmit={handleSubmit}>
        <InputTextarea
          label="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Please share your thoughts..."
          minRows={3}
          maxRows={6}
          error={error}
          required
        />
        
        <InputTextarea
          label="Additional Details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional: Add any additional context"
          helperText="Any extra information that might help us understand your feedback better"
          minRows={2}
          className="ihub-mt-4"
        />
        
        <button 
          type="submit" 
          className="ihub-important-btn ihub-mt-5"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default InputTextareaExample;