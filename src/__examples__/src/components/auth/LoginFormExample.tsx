"use client";

import React from "react";
import { LoginForm } from "../../../../index";
import { SearchParamsPageType } from "../../../../types";
import Link from "next/link";

const LoginFormExample: React.FC<SearchParamsPageType> = ({
  params,
  searchParams,
}) => {
  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>LoginForm Examples</h1>
        <p>
          Pre-built login form with credential authentication, error handling,
          and session management.
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Login Form */}
        <div className="ihub-example-card">
          <h3>Basic Login</h3>
          <p>Default login form with email/username and password fields</p>

          <LoginForm
            params={params}
            searchParams={searchParams}
            endpointPath="/api/auth/login"
            verificationPath="/auth/verify-email"
            redirectPath="/dashboard"
            type="skills"
            autoRedirectOnSession={false}
          />
        </div>

        {/* Login Form with Custom Title */}
        <div className="ihub-example-card">
          <h3>Custom Title & Subtitle</h3>
          <p>Login form with custom branding text</p>

          <LoginForm
            params={params}
            searchParams={searchParams}
            endpointPath="/api/auth/login"
            title="Welcome Back"
            subtitle="Sign in to access your learning dashboard"
            type="skills"
            autoRedirectOnSession={false}
          />
        </div>

        {/* Login Form with Remember Me & Validation */}
        <div className="ihub-example-card">
          <h3>With Remember Me & Validation</h3>
          <p>Includes remember me checkbox and client-side validation</p>

          <LoginForm
            params={params}
            searchParams={searchParams}
            endpointPath="/api/auth/login"
            title="Secure Login"
            showRememberMe
            enableClientValidation
            validateOnBlur
            preserveFormData
            type="skills"
            autoRedirectOnSession={false}
          />
        </div>

        {/* Login Form with Callbacks */}
        <div className="ihub-example-card">
          <h3>With Event Callbacks</h3>
          <p>Login form with tracking and error callbacks (check console)</p>

          <LoginForm
            params={params}
            searchParams={searchParams}
            endpointPath="/api/auth/login"
            title="Tracked Login"
            type="skills"
            trackingEnabled
            autoRedirectOnSession={false}
            onSubmitStart={() => console.log("[LoginForm] Submit started")}
            onSubmitComplete={(success) =>
              console.log("[LoginForm] Submit complete:", success)
            }
            onError={(error, type) =>
              console.log("[LoginForm] Error:", type, error)
            }
            onLoginAttempt={(username) =>
              console.log("[LoginForm] Attempt by:", username)
            }
            onLoginFailure={(error, username) =>
              console.log("[LoginForm] Failed:", username, error)
            }
          />
        </div>

        {/* Minimal Login Form */}
        <div className="ihub-example-card">
          <h3>Minimal (No Links)</h3>
          <p>Login form without reset password or signup links</p>

          <LoginForm
            params={params}
            searchParams={searchParams}
            endpointPath="/api/auth/login"
            title="Staff Login"
            hideResetPassword
            hideSignup
            type="skills"
            autoRedirectOnSession={false}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre>
            <code>{`import { LoginForm } from "@instincthub/react-ui";

// In your page component (server component)
export default async function LoginPage({ searchParams }) {
  const _searchParams = await searchParams;

  return (
    <LoginForm
      searchParams={_searchParams}
      endpointPath="/api/auth/login"
      redirectPath="/dashboard"
      type="skills"
    />
  );
}`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Session & Callbacks</h3>
          <pre>
            <code>{`import { LoginForm } from "@instincthub/react-ui";
import { auth } from "@/auth";

export default async function LoginPage({ searchParams }) {
  const session = await auth();
  const _searchParams = await searchParams;

  return (
    <LoginForm
      session={session}
      searchParams={_searchParams}
      endpointPath="/api/auth/login"
      type="skills"
      showRememberMe
      enableClientValidation
      trackingEnabled
      onError={(error, type) => {
        // type: "network" | "validation" | "auth"
        console.error(\`[\${type}] \${error}\`);
      }}
      onLoginSuccess={(user) => {
        console.log("Logged in:", user.email);
      }}
    />
  );
}`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Custom Redirect Logic</h3>
          <pre>
            <code>{`<LoginForm
  searchParams={searchParams}
  endpointPath="/api/auth/login"
  onSuccessRedirect={(user, callbackUrl) => {
    if (user.track === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = callbackUrl || "/dashboard";
    }
  }}
  onFailureRedirect={(error) => {
    window.location.href = \`/auth/error?msg=\${error}\`;
  }}
/>`}</code>
          </pre>
        </div>
      </div>

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/auth/LoginFormExample.tsx"
      >
        <button className="ihub-outlined-btn ihub-mt-5">View codebase</button>
      </Link>
    </div>
  );
};

export default LoginFormExample;
