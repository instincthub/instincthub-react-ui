# HandleError Component

A React component that processes API error responses and handles validation errors, user feedback, and redirects based on response status codes.

## Table of Contents

- [Installation](#installation)
- [Interfaces](#interfaces)
- [Component](#component)
- [Usage Examples](#usage-examples)

## Installation

Ensure you have Next.js and React installed in your project:

```bash
npm install next react react-dom
```

## Interfaces

### HandleErrorProps

- **Description**: Props for the HandleError component.
- **Properties**:
  - `status: number` - HTTP status code from the API response
  - `items: Record<string, any>` - Error information or response data from the API
  - `registerForm: HTMLFormElement | null` - Reference to the registration form element
  - `r_path: string | null` - Path to redirect to on successful response

## Component

### HandleError

- **Description**: Processes API responses, displays appropriate error messages, and handles redirects.
- **Parameters**:
  - `props: HandleErrorProps` - Component props
- **Behavior**:
  - Status 400: Handles validation errors
    - If user/username error with "field must be unique" - Shows custom message
    - Otherwise displays field-specific validation errors
  - Status 200/201/202: Redirects to the specified path on success
  - Status 401: Displays authentication error message
- **Returns**: `null` - This component doesn't render any UI elements directly

## Usage Examples

### Class Component Integration

```tsx
import { HandleError } from "../components/forms/HandleError";

// Within your component's render method
<HandleError
  items={apiResponseData}
  status={apiResponseStatus}
  registerForm={document.querySelector("#regForm")}
  r_path="/quiz"
/>;
```

### Function Component Integration

```tsx
import { HandleError } from "../components/forms/HandleError";
import { useState, useEffect } from "react";

const RegistrationForm = () => {
  const [apiStatus, setApiStatus] = useState<number | null>(null);
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
      });

      const data = await response.json();
      setApiStatus(response.status);
      setApiData(data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <form id="regForm" onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>

      <div className="server_err" style={{ display: "none" }}>
        <h3></h3>
        <a href="">
          <button>
            <span>Continue</span>
          </button>
        </a>
      </div>

      {apiStatus && apiData && (
        <HandleError
          status={apiStatus}
          items={apiData}
          registerForm={document.querySelector("#regForm")}
          r_path="/quiz"
        />
      )}
    </>
  );
};
```

## Required DOM Structure

The component expects the following HTML elements to be present in your document:

```html
<div class="server_err">
  <h3></h3>
  <a href=""
    ><button><span>Continue</span></button></a
  >
</div>
```

## Notes

- The component doesn't render any HTML itself but manipulates existing DOM elements
- It's designed to work with a specific HTML structure and CSS variables
- A proper implementation of the `printErr` function is required to display field-specific validation errors
