"use client";

import React, { useState } from "react";
import { CodeDisplay, ContentViewer } from "../../../../index";
import "../../assets/styles/code-display-example.css";

const CodeExamplePage = () => {
  // Sample code snippets
  const reactCode = `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`;

  const pythonCode = `def fibonacci(n):
    """Calculate the nth Fibonacci number recursively."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Print the first 10 Fibonacci numbers
for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")`;

  const cssCode = `.container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}`;

  const content = `
# Code Display Component: Installation Guide

## Prerequisites

Make sure you have a Next.js project set up. If not, you can create one using:

\`\`\`bash
npx create-next-app@latest my-code-display-app
\`\`\`

## Step 1: Install Required Dependencies

Install the syntax highlighting library:

\`\`\`bash
npm install react-syntax-highlighter
# or
yarn add react-syntax-highlighter
\`\`\`

## Step 2: Add TypeScript Type Definitions (if using TypeScript)

\`\`\`bash
npm install -D @types/react-syntax-highlighter
# or
yarn add -D @types/react-syntax-highlighter
\`\`\`

## Step 3: Create Component Files

1. Create a new file at \`components/CodeDisplay.tsx\` (or \`.jsx\` if not using TypeScript)
2. Create a CSS file at \`components/CodeDisplay.css\`
3. Copy the provided code into these files

## Step 4: Use the Component

Import and use the component in any of your pages:

\`\`\`tsx
import CodeDisplay from '@/components/CodeDisplay';
import '@/components/CodeDisplay.css';

export default function Page() {
  return (
    <div>
      <h1>My Code Example</h1>
      <CodeDisplay 
        code="console.log('Hello, world!');" 
        language="javascript"
        fileName="example.js"
      />
    </div>
  );
}
\`\`\`

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`code\` | string | (required) | The code to display |
| \`language\` | string | (required) | Programming language for syntax highlighting |
| \`showLineNumbers\` | boolean | \`true\` | Whether to show line numbers |
| \`wrapLines\` | boolean | \`false\` | Whether to wrap long lines |
| \`fileName\` | string | \`undefined\` | Optional file name to display |
| \`darkMode\` | boolean | \`true\` | Initial theme setting |

## Customization

You can customize the appearance by modifying the CSS file. The component uses CSS variables from your main styles, including:

- \`--DarkCyan\`
- \`--Gray\`
- \`--Gunmetal\`
- \`--White\`
- \`--borderDefault\`
- \`--shadow\`
- \`--Montserat\` (font)
- \`--Nunito\` (font)

Make sure these variables are defined in your CSS or adjust the component's CSS to use your own variables.`;

  // Language selection state
  const [selectedLanguage, setSelectedLanguage] = useState("react");

  const codeExamples = {
    react: { code: reactCode, language: "jsx", fileName: "Counter.jsx" },
    python: { code: pythonCode, language: "python", fileName: "fibonacci.py" },
    css: { code: cssCode, language: "css", fileName: "styles.css" },
  };

  return (
    <div className="ihub-code-example-page">
      <h1>Code Display Component Example</h1>

      <div className="ihub-language-selector">
        <button
          className={`ihub-language-button ${
            selectedLanguage === "react" ? "active" : ""
          }`}
          onClick={() => setSelectedLanguage("react")}
        >
          React
        </button>
        <button
          className={`ihub-language-button ${
            selectedLanguage === "python" ? "active" : ""
          }`}
          onClick={() => setSelectedLanguage("python")}
        >
          Python
        </button>
        <button
          className={`ihub-language-button ${
            selectedLanguage === "css" ? "active" : ""
          }`}
          onClick={() => setSelectedLanguage("css")}
        >
          CSS
        </button>
      </div>

      <div className="ihub-code-container">
        <CodeDisplay
          code={
            codeExamples[selectedLanguage as keyof typeof codeExamples].code
          }
          language={
            codeExamples[selectedLanguage as keyof typeof codeExamples].language
          }
          fileName={
            codeExamples[selectedLanguage as keyof typeof codeExamples].fileName
          }
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
        />
      </div>

      <div className="ihub-options-panel">
        <h2>Component Features:</h2>
        <ul>
          <li>Syntax highlighting for multiple languages</li>
          <li>Line numbering</li>
          <li>Copy to clipboard functionality</li>
          <li>Code collapsing</li>
          <li>Dark/light theme toggle</li>
          <li>Responsive design</li>
          <li>Keyboard accessibility</li>
        </ul>
      </div>

      <ContentViewer
        content={content}
        title="Course Module: Introduction"
        showToolbar={true}
        isEditing={false}
        setIsEditing={() => {}}
      />
    </div>
  );
};

export default CodeExamplePage;
