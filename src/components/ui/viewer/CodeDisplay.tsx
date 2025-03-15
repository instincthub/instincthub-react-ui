'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define the props interface
interface CodeDisplayProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  fileName?: string;
  darkMode?: boolean;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  language,
  showLineNumbers = true,
  wrapLines = false,
  fileName,
  darkMode = true,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userDarkMode, setUserDarkMode] = useState(darkMode);
  const codeRef = useRef<HTMLDivElement>(null);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Toggle code collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle theme
  const toggleTheme = () => {
    setUserDarkMode(!userDarkMode);
  };

  // Add keyboard shortcut for copy (Ctrl+C or Cmd+C when focused)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === codeRef.current) {
        e.preventDefault();
        handleCopy();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [code]);

  return (
    <div 
      className="ihub-code-display"
      ref={codeRef}
      tabIndex={0}
      aria-label={`Code block in ${language}${fileName ? ` for file ${fileName}` : ''}`}
    >
      {/* Header with controls */}
      <div className="ihub-code-header">
        {fileName && <span className="ihub-code-filename">{fileName}</span>}
        <div className="ihub-code-controls">
          <button 
            onClick={toggleTheme}
            className="ihub-code-button"
            aria-label={userDarkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {userDarkMode ? "☀️" : "🌙"}
          </button>
          <button 
            onClick={toggleCollapse}
            className="ihub-code-button"
            aria-label={isCollapsed ? "Expand code" : "Collapse code"}
          >
            {isCollapsed ? "+" : "-"}
          </button>
          <button 
            onClick={handleCopy}
            className="ihub-code-button"
            aria-label="Copy code to clipboard"
            disabled={isCopied}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className={`ihub-code-content ${isCollapsed ? 'ihub-collapsed' : ''}`}>
        <SyntaxHighlighter
          language={language}
          style={userDarkMode ? tomorrow : oneLight}
          showLineNumbers={showLineNumbers}
          wrapLines={wrapLines}
          wrapLongLines={wrapLines}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 4px 4px',
            fontSize: '14px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      
      {/* Display an indicator when code is collapsed */}
      {isCollapsed && (
        <div className="ihub-code-collapsed-indicator" onClick={toggleCollapse}>
          Click to expand code
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;