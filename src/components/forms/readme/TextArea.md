# TextArea Component

A customizable textarea input component with floating label support.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `names` | string | Yes | - | Input name and CSS class identifier |
| `labels` | string | Yes | - | Label text that floats on focus |
| `rows` | number | No | - | Number of visible text rows |
| `defaultValues` | string | No | - | Default textarea content |
| `placeholder` | string | No | - | Placeholder text |
| `maxLengths` | number \| string | No | - | Maximum character count |
| `setValues` | (value: string) => void | No | - | Callback function for value changes |
| `inputEvent` | (e: React.ChangeEvent<HTMLTextAreaElement>) => void | No | - | Additional change event handler |

## Usage

```tsx
import TextArea from "@/components/TextArea";

// Basic usage
<TextArea 
  names="description" 
  labels="Description" 
  rows={4} 
/>

// With default value and callback
<TextArea 
  names="feedback" 
  labels="Your Feedback" 
  rows={6} 
  defaultValues="Initial content"
  setValues={(value) => console.log(value)} 
/>

// With character limit
<TextArea 
  names="bio" 
  labels="Biography" 
  maxLengths={250} 
  placeholder="Tell us about yourself" 
/>
```

## Examples

### Form Integration

```tsx
import { useState } from "react";
import TextArea from "@/components/TextArea";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    // Process the feedback
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextArea 
        names="userFeedback"
        labels="Your Feedback" 
        rows={5}
        setValues={setFeedback}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};
```

### With Character Counter

```tsx
import { useState } from "react";
import TextArea from "@/components/TextArea";

const LimitedTextArea = () => {
  const [text, setText] = useState("");
  const maxLength = 200;
  
  return (
    <div>
      <TextArea 
        names="limitedText"
        labels="Your Message" 
        rows={4}
        maxLengths={maxLength}
        setValues={setText}
      />
      <div className="character-count">
        {text.length}/{maxLength} characters
      </div>
    </div>
  );
};
```