"use client";

import React, { useState } from "react";
import { PasswordsMatch } from "../../../../index";
import Link from "next/link";

const PasswordsMatchExample = () => {
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [validationLog, setValidationLog] = useState<string[]>([]);

  // Handle password validation callback
  const handlePasswordChange = (password: string, isValid: boolean) => {
    setPasswordValid(isValid);
    setCanSubmit(isValid && confirmPasswordValid);
    
    const logEntry = `Password: ${password.length} chars, Valid: ${isValid}`;
    setValidationLog(prev => [...prev.slice(-4), logEntry]);
  };

  // Handle confirm password validation callback
  const handleConfirmPasswordChange = (confirmPassword: string, isValid: boolean) => {
    setConfirmPasswordValid(isValid);
    setCanSubmit(passwordValid && isValid);
    
    const logEntry = `Confirm: ${confirmPassword.length} chars, Valid: ${isValid}`;
    setValidationLog(prev => [...prev.slice(-4), logEntry]);
  };

  // Clear validation log
  const clearLog = () => {
    setValidationLog([]);
  };

  return (
    <section className="ihub-container">
      <div className="ihub-mb-4">
        <h1>PasswordsMatch Component Examples</h1>
        <p>Demonstrating password matching validation with default values and callbacks.</p>
      </div>

      {/* Basic Example */}
      <div className="ihub-card ihub-mb-4">
        <div className="ihub-card-header">
          <h3>Basic Password Matching</h3>
        </div>
        <div className="ihub-card-body">
          <p>Simple password matching with real-time validation:</p>
          <PasswordsMatch />
        </div>
      </div>

      {/* Default Password Example */}
      <div className="ihub-card ihub-mb-4">
        <div className="ihub-card-header">
          <h3>With Default Password</h3>
        </div>
        <div className="ihub-card-body">
          <p>Pre-populated password field for editing scenarios:</p>
          <PasswordsMatch defaultPassword="MySecurePass123" />
        </div>
      </div>

      {/* Callback Example with Validation Monitoring */}
      <div className="ihub-card ihub-mb-4">
        <div className="ihub-card-header">
          <h3>With Validation Callbacks</h3>
        </div>
        <div className="ihub-card-body">
          <p>Real-time validation monitoring with callback functions:</p>
          
          <PasswordsMatch 
            onPasswordChange={handlePasswordChange}
            onConfirmPasswordChange={handleConfirmPasswordChange}
          />

          <div className="ihub-mt-3 ihub-row">
            <div className="ihub-col-md-6">
              <div className="ihub-alert ihub-alert-info">
                <h5>Validation Status</h5>
                <p className="ihub-mb-2">
                  <strong>Password Valid:</strong> 
                  <span className={`ihub-badge ${passwordValid ? 'ihub-badge-success' : 'ihub-badge-danger'}`}>
                    {passwordValid ? 'Yes' : 'No'}
                  </span>
                </p>
                <p className="ihub-mb-2">
                  <strong>Confirm Valid:</strong> 
                  <span className={`ihub-badge ${confirmPasswordValid ? 'ihub-badge-success' : 'ihub-badge-danger'}`}>
                    {confirmPasswordValid ? 'Yes' : 'No'}
                  </span>
                </p>
                <p className="ihub-mb-0">
                  <strong>Can Submit:</strong> 
                  <span className={`ihub-badge ${canSubmit ? 'ihub-badge-success' : 'ihub-badge-secondary'}`}>
                    {canSubmit ? 'Yes' : 'No'}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <div className="ihub-alert ihub-alert-light">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-2">
                  <h5 className="ihub-mb-0">Validation Log</h5>
                  <button 
                    className="ihub-btn ihub-btn-sm ihub-outlined-btn"
                    onClick={clearLog}
                  >
                    Clear
                  </button>
                </div>
                {validationLog.length > 0 ? (
                  <ul className="ihub-mb-0" style={{ fontSize: '0.875rem' }}>
                    {validationLog.map((log, index) => (
                      <li key={index}>{log}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ihub-mb-0" style={{ fontStyle: 'italic', color: '#666' }}>
                    Start typing to see validation events...
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="ihub-mt-3">
            <button 
              className={`ihub-btn ${canSubmit ? 'ihub-important-btn' : 'ihub-btn-secondary'}`}
              disabled={!canSubmit}
            >
              {canSubmit ? 'Submit Form' : 'Complete Password Fields'}
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Example - Profile Update Simulation */}
      <div className="ihub-card ihub-mb-4">
        <div className="ihub-card-header">
          <h3>Profile Update Simulation</h3>
        </div>
        <div className="ihub-card-body">
          <p>Simulating a profile update form with existing password data:</p>
          
          <div className="ihub-alert ihub-alert-warning ihub-mb-3">
            <strong>Note:</strong> This example shows how you might handle password updates 
            in a user profile editing scenario where the user wants to change their password.
          </div>

          <PasswordsMatch 
            defaultPassword="UserExistingPassword2024"
            onPasswordChange={(password, isValid) => {
              console.log('Profile password change:', { password: password.substring(0, 3) + '***', isValid });
            }}
            onConfirmPasswordChange={(confirmPassword, isValid) => {
              console.log('Profile confirm change:', { confirmPassword: confirmPassword.substring(0, 3) + '***', isValid });
            }}
          />

          <div className="ihub-mt-3">
            <small className="ihub-text-muted">
              Check the browser console to see the validation callbacks in action.
            </small>
          </div>
        </div>
      </div>

      {/* Code Reference */}
      <div className="ihub-card">
        <div className="ihub-card-header">
          <h3>Component API</h3>
        </div>
        <div className="ihub-card-body">
          <h5>Props Interface</h5>
          <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: '0.875rem' }}>
{`interface PasswordsMatchProps {
  defaultPassword?: string;
  onPasswordChange?: (password: string, isValid: boolean) => void;
  onConfirmPasswordChange?: (confirmPassword: string, isValid: boolean) => void;
}`}
          </pre>

          <div className="ihub-mt-3">
            <Link
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/auth/PasswordsMatch.tsx"
            >
              <button className="ihub-outlined-btn">View Component Source</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordsMatchExample;
