# LoginForm

**Category:** Auth | **Type:** component

Comprehensive login form component with advanced security, validation, OAuth integration, and accessibility features

## 🏷️ Tags

`auth`, `login`, `security`, `oauth`, `validation`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { LoginForm } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the LoginForm
 */
const LoginFormExamples = () => {
  const [activeExample, setActiveExample] = useState<string>("basic");

  // Mock search params for examples
  const mockSearchParams = {
    callbackUrl: "/dashboard",
    error: null,
  };

  // Example handlers
  const handleLoginAttempt = (username: string) => {
    console.log("Login attempt for:", username);
  };

  const handleLoginSuccess = (user: any) => {
    console.log("Login successful:", user);
    openToast("Login successful!", 200);
  };

  const handleLoginFailure = (error: string, username: string) => {
    console.log("Login failed:", error, "for user:", username);
    openToast(`Login failed: ${error}`, 400);
  };

  const handleError = (error: string, type: 'network' | 'validation' | 'auth') => {
    console.log(`${type} error:`, error);
  };

  const handleSubmitStart = () => {
    console.log("Form submission started");
  };

  const handleSubmitComplete = (success: boolean) => {
    console.log("Form submission completed:", success ? "success" : "failure");
  };

  const customValidationRules = {
    username: (value: string) => {
      if (value.length < 3) return "Username must be at least 3 characters";
      if (!/^[a-zA-Z0-9@._-]+$/.test(value)) return "Username contains invalid characters";
      return null;
    },
    password: (value: string) => {
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) 
        return "Password must contain lowercase, uppercase, and number";
      return null;
    },
  };

  const customValidationHandler = async (user: any) => {
    // Mock custom validation
    console.log("Running custom validation for user:", user);
    return true;
  };

  const handleSuccessRedirect = (user: any, callbackUrl?: string) => {
    console.log("Custom success redirect:", user, callbackUrl);
    openToast("Custom redirect triggered!", 200);
  };

  const handleFailureRedirect = (error: string) => {
    console.log("Custom failure redirect:", error);
    openToast(`Redirect failed: ${error}`, 400);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Login Form Examples</h1>

      <div
        className="ihub-d-flex ihub-py-5"
        style={{ gap: "10px", flexWrap: "wrap" }}
      >
        {/* Example Selection Buttons */}
        <button
          className={`${activeExample === "basic" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("basic")}
        >
          Basic Login
        </button>

        <button
          className={`${activeExample === "enhanced" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("enhanced")}
        >
          Enhanced Features
        </button>

        <button
          className={`${activeExample === "oauth" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("oauth")}
        >
          OAuth Integration
        </button>

        <button
          className={`${activeExample === "security" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("security")}
        >
          Security Features
        </button>

        <button
          className={`${activeExample === "validation" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("validation")}
        >
          Advanced Validation
        </button>

        <button
          className={`${activeExample === "accessibility" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("accessibility")}
        >
          Accessibility
        </button>

        <button
          className={`${activeExample === "custom" ? "ihub-important-btn" : "ihub-outlined-btn"}`}
          onClick={() => setActiveExample("custom")}
        >
          Custom Styling
        </button>
      </div>

      <div className="ihub-example-container">
        {/* Basic Login Example */}
        {activeExample === "basic" && (
          <div>
            <h2>Basic Login Form</h2>
            <p>Simple login form with default settings and minimal configuration.</p>
            <LoginForm
              searchParams={mockSearchParams}
              type="skills"
              channelUsername="demo"
              title="Welcome Back"
              subtitle="Sign in to your account"
              endpointPath="/api/auth/login"
              redirectPath="/dashboard"
            />
          </div>
        )}

        {/* Enhanced Features Example */}
        {activeExample === "enhanced" && (
          <div>
            <h2>Enhanced Login Form</h2>
            <p>Login form with remember me, form reset, and progress tracking.</p>
            <LoginForm
              searchParams={mockSearchParams}
              type="lms"
              channelUsername="demo"
              title="Enhanced Login"
              subtitle="Experience our advanced features"
              
              // Enhanced Features
              showRememberMe={true}
              rememberMeText="Keep me signed in for 30 days"
              enableFormReset={true}
              preserveFormData={true}
              autoSave={true}
              autoSaveInterval={3000}
              
              // Loading & State
              loadingText="Authenticating..."
              focusOnMount={true}
              
              // Event Handlers
              onSubmitStart={handleSubmitStart}
              onSubmitComplete={handleSubmitComplete}
              onError={handleError}
              
              // Custom Styling
              submitButtonText="Sign In"
              submitButtonVariant="important"
              className="ihub-enhanced-login"
            />
          </div>
        )}

        {/* OAuth Integration Example */}
        {activeExample === "oauth" && (
          <div>
            <h2>OAuth Integration</h2>
            <p>Login form with social authentication providers.</p>
            <LoginForm
              searchParams={mockSearchParams}
              type="skills"
              channelUsername="demo"
              title="Social Login"
              subtitle="Sign in with your preferred method"
              
              // OAuth Configuration
              enableOAuth={true}
              oauthProviders={["google", "github", "facebook", "linkedin"]}
              oauthConfig={{
                google: { 
                  scope: "email profile",
                  prompt: "select_account"
                },
                github: { 
                  scope: "user:email"
                },
                facebook: { 
                  scope: "email"
                },
                linkedin: { 
                  scope: "r_emailaddress r_liteprofile"
                }
              }}
              
              // Tracking
              trackingEnabled={true}
              onLoginAttempt={handleLoginAttempt}
              onLoginSuccess={handleLoginSuccess}
              onLoginFailure={handleLoginFailure}
              
              // Links
              hideResetPassword={false}
              hideSignup={false}
            />
          </div>
        )}

        {/* Security Features Example */}
        {activeExample === "security" && (
          <div>
            <h2>Security Features</h2>
            <p>Login form with enhanced security measures and rate limiting.</p>
            <LoginForm
              searchParams={mockSearchParams}
              type="lms"
              channelUsername="demo"
              title="Secure Login"
              subtitle="Protected with advanced security"
              
              // Security Features
              enableRateLimiting={true}
              maxAttempts={3}
              lockoutDuration={300000} // 5 minutes
              enableCaptcha={true}
              captchaProvider="recaptcha"
              
              // Password Security
              showPasswordStrength={true}
              sanitizeInputs={true}
              preventMultipleSubmissions={true}
              
              // Session Management
              sessionCheckInterval={30000}
              sessionTimeoutWarning={true}
              sessionTimeoutDuration={1800000} // 30 minutes
              clearCallbackAfterUse={true}
              
              // Network Features
              offlineSupport={true}
              retryAttempts={3}
              retryDelay={1000}
              
              // Handlers
              onError={handleError}
              onLoginFailure={handleLoginFailure}
            />
          </div>
        )}

        {/* Advanced Validation Example */}
        {activeExample === "validation" && (
          <div>
            <h2>Advanced Validation</h2>
            <p>Login form with comprehensive client-side validation.</p>
            <LoginForm
              searchParams={mockSearchParams}
              type="skills"
              channelUsername="demo"
              title="Validated Login"
              subtitle="Real-time validation and feedback"
              
              // Validation Configuration
              enableClientValidation={true}
              validateOnBlur={true}
              debounceValidation={500}
              customValidationRules={customValidationRules}
              customValidationHandler={customValidationHandler}
              
              // Password Features
              showPasswordStrength={true}
              
              // Form Behavior
              autoComplete={true}
              preserveFormData={true}
              
              // Custom Redirects
              onSuccessRedirect={handleSuccessRedirect}
              onFailureRedirect={handleFailureRedirect}
              autoRedirectOnSession={false}
              
              // Event Handlers
              onError={handleError}
              onSubmitStart={handleSubmitStart}
              onSubmitComplete={handleSubmitComplete}
            />
          </div>
        )}

        {/* Accessibility Example */}
        {activeExample === "accessibility" && (
          <div>
            <h2>Accessibility Features</h2>
            <p>Login form optimized for screen readers and keyboard navigation.</p>
            <LoginForm
              searchParams={mockSearchParams}
              type="lms"
              channelUsername="demo"
              title="Accessible Login"
              subtitle="Designed for everyone"
              
              // Accessibility Features
              ariaLabel="Main login form"
              ariaDescribedBy="login-description"
              focusOnMount={true}
              highContrastMode={false}
              
              // Enhanced UX
              showLoadingSkeleton={true}
              loadingText="Loading accessible form..."
              
              // Error Handling
              enableClientValidation={true}
              onError={handleError}
              
              // Form Features
              showRememberMe={true}
              enableFormReset={true}
              submitButtonText="Sign In Securely"
              
              className="ihub-accessible-form"
            />
            <div id="login-description" className="ihub-sr-only">
              This is an accessible login form with comprehensive keyboard navigation and screen reader support.
            </div>
          </div>
        )}

        {/* Custom Styling Example */}
        {activeExample === "custom" && (
          <div>
            <h2>Custom Styling</h2>
            <p>Login form with custom appearance and branding.</p>
            <div className="ihub-custom-login-container">
              <LoginForm
                searchParams={mockSearchParams}
                type="skills"
                channelUsername="demo"
                title="Custom Brand Login"
                subtitle="Tailored to your brand identity"
                
                // Custom Styling
                className="ihub-custom-brand-login"
                formClassName="ihub-custom-form"
                submitButtonText="Access Dashboard"
                submitButtonVariant="primary"
                
                // Enhanced Features
                showRememberMe={true}
                rememberMeText="Stay logged in"
                enableFormReset={true}
                showPasswordStrength={true}
                
                // OAuth with Custom Styling
                enableOAuth={true}
                oauthProviders={["google", "github"]}
                
                // Custom Handlers
                onSubmitStart={() => console.log("Custom login started")}
                onSubmitComplete={(success) => console.log("Custom login completed:", success)}
                onError={(error, type) => console.log(`Custom error (${type}):`, error)}
                
                // Links
                hideResetPassword={false}
                hideSignup={false}
              />
            </div>
            
            <style jsx>{`
              .ihub-custom-login-container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              }
              .ihub-custom-brand-login {
                max-width: 400px;
                margin: 0 auto;
              }
              .ihub-custom-form {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              }
            `}</style>
          </div>
        )}
      </div>

      <div className="ihub-mt-5">
        <h3>Code Example for Current Configuration</h3>
        <div className="ihub-code-block">
          <pre>
            <code>
{`<LoginForm
  searchParams={{ callbackUrl: "/dashboard" }}
  type="${activeExample === "basic" ? "skills" : activeExample === "enhanced" ? "lms" : activeExample === "oauth" ? "skills" : activeExample === "security" ? "lms" : activeExample === "validation" ? "skills" : activeExample === "accessibility" ? "lms" : "skills"}"
  channelUsername="demo"
  title="${activeExample === "basic" ? "Welcome Back" : activeExample === "enhanced" ? "Enhanced Login" : activeExample === "oauth" ? "Social Login" : activeExample === "security" ? "Secure Login" : activeExample === "validation" ? "Validated Login" : activeExample === "accessibility" ? "Accessible Login" : "Custom Brand Login"}"
  ${activeExample === "enhanced" ? `showRememberMe={true}
  enableFormReset={true}
  preserveFormData={true}
  autoSave={true}` : ""}${activeExample === "oauth" ? `enableOAuth={true}
  oauthProviders={["google", "github", "facebook", "linkedin"]}
  trackingEnabled={true}` : ""}${activeExample === "security" ? `enableRateLimiting={true}
  maxAttempts={3}
  enableCaptcha={true}
  showPasswordStrength={true}
  offlineSupport={true}` : ""}${activeExample === "validation" ? `enableClientValidation={true}
  validateOnBlur={true}
  customValidationRules={customRules}
  showPasswordStrength={true}` : ""}${activeExample === "accessibility" ? `ariaLabel="Main login form"
  focusOnMount={true}
  showLoadingSkeleton={true}` : ""}${activeExample === "custom" ? `className="ihub-custom-brand-login"
  submitButtonVariant="primary"
  enableOAuth={true}` : ""}
/>`}
            </code>
          </pre>
        </div>
      </div>

      {/* Implementation Tips */}
      <div className="ihub-mt-5">
        <h3>Implementation Tips</h3>
        <div className="ihub-tips-grid">
          <div className="ihub-tip-card">
            <h4>🔐 Security Best Practices</h4>
            <ul>
              <li>Always enable rate limiting in production</li>
              <li>Use CSRF tokens for additional security</li>
              <li>Implement proper session management</li>
              <li>Enable input sanitization</li>
              <li>Consider CAPTCHA for high-risk environments</li>
            </ul>
          </div>
          
          <div className="ihub-tip-card">
            <h4>🎯 User Experience</h4>
            <ul>
              <li>Show password strength indicators</li>
              <li>Provide clear error messages</li>
              <li>Enable form auto-save for longer sessions</li>
              <li>Focus management for keyboard users</li>
              <li>Offer multiple authentication methods</li>
            </ul>
          </div>
          
          <div className="ihub-tip-card">
            <h4>♿ Accessibility</h4>
            <ul>
              <li>Use proper ARIA labels and descriptions</li>
              <li>Ensure keyboard navigation works</li>
              <li>Provide high contrast mode option</li>
              <li>Announce errors to screen readers</li>
              <li>Test with actual assistive technologies</li>
            </ul>
          </div>
          
          <div className="ihub-tip-card">
            <h4>📊 Analytics & Monitoring</h4>
            <ul>
              <li>Track login attempts and success rates</li>
              <li>Monitor for suspicious activity</li>
              <li>Log validation failures</li>
              <li>Track OAuth provider usage</li>
              <li>Measure form completion rates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormExamples;
```

## 🔗 Related Components

- [IsUsernameEmailTaken](./IsUsernameEmailTaken.md) - Username/email availability checker
- [ClientDetector](./ClientDetector.md) - Client device detection component
- [PasswordsMatch](./PasswordsMatch.md) - Password matching validation component
- [FromInstinctHub](./FromInstinctHub.md) - From InstinctHub component
- [PasswordField](./PasswordField.md) - Password input field component
- [InputText](./InputText.md) - Text input field component
- [SubmitButton](./SubmitButton.md) - Submit button component

