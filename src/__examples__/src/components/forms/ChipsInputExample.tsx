"use client";

import React, { useState } from "react";
import { ChipsInput } from "../../../../index";

/**
 * Example component showing how to use the ChipsInput component
 */
const ChipsInputExample: React.FC = () => {
  const [skills, setSkills] = useState<string[]>(["JavaScript", "React"]);
  const [emails, setEmails] = useState<string[]>([]);

  /**
   * Validates a skill tag
   * @param value The skill tag to validate
   * @returns True if valid, error message string if invalid
   */
  const validateSkill = (value: string): boolean | string => {
    if (value.length < 2) {
      return "Skill must be at least 2 characters";
    }
    if (value.length > 20) {
      return "Skill must be less than 20 characters";
    }
    return true;
  };

  /**
   * Validates an email address
   * @param value The email to validate
   * @returns True if valid, error message string if invalid
   */
  const validateEmail = (value: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return true;
  };

  return (
    <div className="ihub-container">
      <h2>Skills Input</h2>
      <p>Enter your skills (press Enter or comma to add)</p>
      <ChipsInput
        value={skills}
        onChange={setSkills}
        placeholder="Add skills (e.g., JavaScript, React)"
        separator=","
        maxChips={10}
        validate={validateSkill}
        errorMessage="Invalid skill format"
      />

      <h2 className="ihub-mt-4">Email Addresses</h2>
      <p>Enter email addresses to invite (press Enter or comma to add)</p>
      <ChipsInput
        value={emails}
        onChange={setEmails}
        placeholder="Add email addresses"
        separator=","
        validate={validateEmail}
        errorMessage="Invalid email format"
        size="large"
      />

      <div className="ihub-mt-4">
        <h3>Form Values:</h3>
        <p>
          <strong>Skills:</strong> {skills.join(", ")}
        </p>
        <p>
          <strong>Emails:</strong> {emails.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ChipsInputExample;
