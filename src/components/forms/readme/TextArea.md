# TextArea Component

A customizable textarea input component with floating label support.

## Props

| Prop            | Type                                                | Required | Default | Description                         |
| --------------- | --------------------------------------------------- | -------- | ------- | ----------------------------------- |
| `name`         | string                                              | Yes      | -       | Input name and CSS class identifier |
| `label`        | string                                              | Yes      | -       | Label text that floats on focus     |
| `rows`          | number                                              | No       | -       | Number of visible text rows         |
| `defaultValue` | string                                              | No       | -       | Default textarea content            |
| `placeholder`   | string                                              | No       | -       | Placeholder text                    |
| `maxLength`    | number \| string                                    | No       | -       | Maximum character count             |
| `setValue`     | (value: string) => void                             | No       | -       | Callback function for value changes |
| `inputEvent`    | (e: React.ChangeEvent<HTMLTextAreaElement>) => void | No       | -       | Additional change event handler     |

## Usage

```tsx
import { TextArea } from "@instincthub/react-ui";

// Basic usage
<TextArea 
  name="description" 
  label="Description" 
  rows={4} 
/>

// With default value and callback
<TextArea 
  name="feedback" 
  label="Your Feedback" 
  rows={6} 
  defaultValue="Initial content"
  setValue={(value) => console.log(value)} 
/>

// With character limit
<TextArea 
  name="bio" 
  label="Biography" 
  maxLength={250} 
  placeholder="Tell us about yourself" 
/>
```

## Examples

### Form Integration

```tsx
import { useState } from "react";
import { TextArea } from "@instincthub/react-ui";

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
        name="userFeedback"
        label="Your Feedback"
        rows={5}
        setValue={setFeedback}
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};
```

### With Character Counter

```tsx
import { useState } from "react";
import { TextArea } from "@instincthub/react-ui";

const LimitedTextArea = () => {
  const [text, setText] = useState("");
  const maxLength = 200;

  return (
    <div>
      <TextArea
        name="limitedText"
        label="Your Message"
        rows={4}
        maxLength={maxLength}
        setValue={setText}
      />
      <div className="character-count">
        {text.length}/{maxLength} characters
      </div>
    </div>
  );
};
```
