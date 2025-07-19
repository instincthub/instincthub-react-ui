# MenuBar

**Category:** UI | **Type:** component

Toolbar component for the TipTap rich text editor

## 🏷️ Tags

`ui`, `editor`, `toolbar`, `tiptap`

```tsx
"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { MenuBar } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the MenuBar with TipTap editor
 */
const MenuBarExamples = () => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [editorContent, setEditorContent] = useState<string>(
    `<h1>Welcome to the Rich Text Editor</h1>
    <p>This is a sample document with <strong>bold text</strong>, <em>italic text</em>, and <mark>highlighted text</mark>.</p>
    <h2>Features Include:</h2>
    <ul>
      <li>Text formatting (bold, italic, strikethrough)</li>
      <li>Headings (H1, H2, H3)</li>
      <li>Lists (bullet and numbered)</li>
      <li>Code blocks and links</li>
      <li>Tables and images</li>
    </ul>
    <blockquote>
      <p>This is a blockquote to showcase quote formatting.</p>
    </blockquote>`
  );

  // Basic Editor Configuration
  const basicEditor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  // Advanced Editor with Custom Features
  const [advancedContent, setAdvancedContent] = useState<string>(
    `<h2>Advanced Editor Features</h2>
    <p>This editor demonstrates advanced MenuBar integration.</p>
    <table>
      <tbody>
        <tr>
          <th>Feature</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Tables</td>
          <td>✅ Working</td>
        </tr>
        <tr>
          <td>Task Lists</td>
          <td>✅ Working</td>
        </tr>
      </tbody>
    </table>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">Completed task</li>
      <li data-type="taskItem" data-checked="false">Pending task</li>
    </ul>`
  );

  const advancedEditor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: advancedContent,
    onUpdate: ({ editor }) => {
      setAdvancedContent(editor.getHTML());
    },
  });

  // Minimal Editor Configuration
  const [minimalContent, setMinimalContent] = useState<string>(
    `<p>This is a minimal editor with basic formatting only.</p>`
  );
  
  const minimalEditor = useEditor({
    extensions: [StarterKit],
    content: minimalContent,
    onUpdate: ({ editor }) => {
      setMinimalContent(editor.getHTML());
    },
  });

  const handleSaveContent = (content: string, editorName: string) => {
    openToast(`${editorName} content saved successfully!`);
    console.log(`Saved ${editorName}:`, content);
  };

  const handleExportHTML = (content: string) => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'editor-content.html';
    a.click();
    URL.revokeObjectURL(url);
    openToast("HTML content exported successfully!");
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>MenuBar Editor Examples</h1>
      <p className="ihub-mb-4">
        Rich text editor toolbar with comprehensive formatting options.
        The MenuBar integrates seamlessly with TipTap editor extensions.
      </p>

      {/* Basic Editor with Full MenuBar */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Full-Featured Editor</h2>
        <div className="ihub-card">
          <div className="ihub-card-header ihub-d-flex ihub-justify-content-between ihub-align-items-center">
            <h3>Rich Text Editor</h3>
            <div className="ihub-d-flex" style={{ gap: "10px" }}>
              <button
                className="ihub-outlined-btn"
                onClick={() => handleSaveContent(editorContent, "Basic Editor")}
              >
                Save Content
              </button>
              <button
                className="ihub-primary-btn"
                onClick={() => handleExportHTML(editorContent)}
              >
                Export HTML
              </button>
            </div>
          </div>
          
          <div className="ihub-card-body">
            <MenuBar
              editor={basicEditor}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              showPreviewBtn={true}
            />
            
            <div className="ihub-editor-content" style={{ marginTop: "10px" }}>
              {isEditing ? (
                <EditorContent 
                  editor={basicEditor} 
                  className="ihub-editor"
                />
              ) : (
                <div 
                  className="ihub-editor-preview"
                  dangerouslySetInnerHTML={{ __html: editorContent }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Editor with Table Support */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Editor with Tables</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Advanced Features Demo</h3>
            <p className="ihub-text-muted">Includes tables, task lists, and advanced formatting</p>
          </div>
          
          <div className="ihub-card-body">
            <MenuBar
              editor={advancedEditor}
              isEditing={true}
              showPreviewBtn={false}
            />
            
            <EditorContent 
              editor={advancedEditor} 
              className="ihub-editor"
              style={{ marginTop: "10px" }}
            />
            
            <div className="ihub-mt-3 ihub-d-flex" style={{ gap: "10px" }}>
              <button
                className="ihub-outlined-btn"
                onClick={() => {
                  advancedEditor?.chain().focus().insertTable({ 
                    rows: 3, 
                    cols: 3, 
                    withHeaderRow: true 
                  }).run();
                }}
              >
                Insert Table
              </button>
              
              <button
                className="ihub-outlined-btn"
                onClick={() => {
                  advancedEditor?.chain().focus().toggleTaskList().run();
                }}
              >
                Add Task List
              </button>
              
              <button
                className="ihub-outlined-btn"
                onClick={() => handleSaveContent(advancedContent, "Advanced Editor")}
              >
                Save Advanced Content
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Editor */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Minimal Editor</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Basic Text Formatting</h3>
            <p className="ihub-text-muted">Simplified toolbar for basic formatting needs</p>
          </div>
          
          <div className="ihub-card-body">
            <MenuBar
              editor={minimalEditor}
              isEditing={true}
              showPreviewBtn={false}
            />
            
            <EditorContent 
              editor={minimalEditor} 
              className="ihub-editor"
              style={{ marginTop: "10px" }}
            />
          </div>
        </div>
      </section>

      {/* MenuBar Features Overview */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">MenuBar Features</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Text Formatting</h3>
              </div>
              <div className="ihub-card-body">
                <ul>
                  <li><strong>Bold:</strong> Make text bold</li>
                  <li><em>Italic:</em> Make text italic</li>
                  <li><s>Strikethrough:</s> Cross out text</li>
                  <li><mark>Highlight:</mark> Highlight important text</li>
                  <li><code>Code:</code> Inline code formatting</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Structure Elements</h3>
              </div>
              <div className="ihub-card-body">
                <ul>
                  <li>Headings (H1, H2, H3)</li>
                  <li>Bullet and numbered lists</li>
                  <li>Task lists with checkboxes</li>
                  <li>Blockquotes</li>
                  <li>Horizontal rules</li>
                  <li>Code blocks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Advanced Features</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Tables</h3>
              </div>
              <div className="ihub-card-body">
                <p>Insert and manage tables with:</p>
                <ul>
                  <li>Header rows</li>
                  <li>Resizable columns</li>
                  <li>Multiple rows and columns</li>
                  <li>Cell formatting</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Links & Media</h3>
              </div>
              <div className="ihub-card-body">
                <p>Rich media support:</p>
                <ul>
                  <li>Hyperlinks with URLs</li>
                  <li>Image insertion</li>
                  <li>Link editing and removal</li>
                  <li>Media embedding</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Actions</h3>
              </div>
              <div className="ihub-card-body">
                <p>Editor controls:</p>
                <ul>
                  <li>Undo/Redo operations</li>
                  <li>Clear all formatting</li>
                  <li>Preview toggle</li>
                  <li>Content management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Notes */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface MenuBarProps {
  editor: Editor | null;          // TipTap editor instance
  setIsEditing?: (editing: boolean) => void;
  isEditing: boolean;             // Current editing state
  showPreviewBtn?: boolean;       // Show preview toggle button
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Editor Integration:</strong> Direct integration with TipTap editor</li>
            <li><strong>Icon Support:</strong> Material-UI icons for all actions</li>
            <li><strong>Responsive Design:</strong> Toolbar adapts to different screen sizes</li>
            <li><strong>Accessibility:</strong> Proper ARIA labels and keyboard navigation</li>
            <li><strong>State Management:</strong> Reflects current editor state in button appearance</li>
            <li><strong>Extensible:</strong> Easy to add or remove toolbar buttons</li>
          </ul>
          
          <h3 className="ihub-mt-3">Usage Tips:</h3>
          <ul>
            <li>Include required TipTap extensions for full functionality</li>
            <li>Use <code>showPreviewBtn</code> to toggle between edit and preview modes</li>
            <li>The editor instance must be properly initialized before passing to MenuBar</li>
            <li>Toolbar buttons are automatically disabled when editor is null</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MenuBarExamples;
```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component with TipTap integration
- [ContentViewer](./ContentViewer.md) - Content viewer component for displaying rich text
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Toggleable content view and edit component
- [Dialog](./Dialog.md) - Modal dialog component for overlays

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component

