# SubmitBtn Component

A customizable submit button component with loading state and animation effects.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `labels` | string | Yes | - | Text displayed on the button |
| `status` | number | No | undefined | Status of the submission (0 = loading) |
| `disableds` | boolean | No | false | Whether the button should be disabled |

## Features

- Loading spinner animation when status is 0
- Disabled state with visual feedback
- Right chevron animation on hover
- Consistent styling with "ihub-" prefix classes

## Usage

```tsx
import SubmitBtn from "@/components/SubmitBtn";

// Basic usage
<SubmitBtn labels="Submit Form" />

// With loading state
<SubmitBtn labels="Processing..." status={0} />

// Disabled button
<SubmitBtn labels="Cannot Submit" disableds={true} />

// In a form
<form onSubmit={handleSubmit}>
  {/* Form fields */}
  <SubmitBtn 
    labels={isSubmitting ? "Submitting..." : "Submit"} 
    status={isSubmitting ? 0 : 1} 
  />
</form>
```

## CSS Requirements

This component uses several CSS classes with the `ihub-` prefix:
- `ihub-react-button`
- `ihub-no-icon`
- `ihub-submit-btn`
- `ihub-important-btn`
- `ihub-anime-button-chevron`
- `ihub-bt-spinner`

## Implementation Examples

### Form Submission with State Management

```tsx
import { useState } from "react";
import SubmitBtn from "@/components/SubmitBtn";

const ContactForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState(1); // 1 = ready, 0 = loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(0); // Start loading
    
    try {
      // API call or form processing
      await submitFormData(formData);
      setSubmissionStatus(2); // Success
    } catch (error) {
      setSubmissionStatus(3); // Error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <SubmitBtn 
        labels={submissionStatus === 0 ? "Sending..." : "Send Message"} 
        status={submissionStatus} 
      />
    </form>
  );
};
```

### Disabled State Based on Form Validity

```tsx
import { useState, useEffect } from "react";
import SubmitBtn from "@/components/SubmitBtn";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    // Check if all required fields are filled
    const { name, email } = formData;
    setIsFormValid(name.trim() !== "" && email.trim() !== "");
  }, [formData]);

  return (
    <form>
      {/* Form fields */}
      <SubmitBtn 
        labels="Create Account" 
        disableds={!isFormValid} 
      />
    </form>
  );
};
```

## Dependencies

This component requires the `ChevronRightIcon` component to be available in your project.