# CustomTextEditor

A powerful rich text editor component built on Tiptap with comprehensive formatting options including text styles, images, links, tables, code blocks, task lists, and character counting. Perfect for content creation, blog posts, documentation, and any application requiring rich text input.

## Features

- **Rich Text Formatting**: Bold, italic, underline, strikethrough, highlight
- **Block Elements**: Headings, paragraphs, blockquotes, code blocks
- **Lists**: Ordered, unordered, and task lists with nesting support
- **Media**: Image insertion and link management
- **Tables**: Full table support with resizable columns
- **Character Count**: Real-time word and character counting with limits
- **Placeholder Support**: Customizable placeholder text
- **Preview Mode**: Toggle between edit and preview modes

## Props

### CustomTextEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label for the editor |
| `name` | `string` | `"editor-content"` | Name attribute for form submission |
| `note` | `string` | - | Additional note to display below editor |
| `onChange` | `(html: string) => void` | - | Callback when content changes |
| `setIsEditing` | `(editing: boolean) => void` | - | Callback to set editing state |
| `isEditing` | `boolean` | `false` | Whether editor is in editing mode |
| `content` | `string` | - | Initial HTML content |
| `charLimit` | `number` | `5000` | Maximum character limit |
| `placeholder` | `string` | `"Begin writing here..."` | Placeholder text |
| `lastUpdated` | `string` | - | Last updated timestamp |
| `showPreviewBtn` | `boolean` | `false` | Show preview button in toolbar |
| `required` | `boolean` | `false` | Whether field is required |

## Basic Usage

```tsx
"use client";

import React, { useState } from 'react';
import { CustomTextEditor } from 'instincthub-react-ui';

export default function BasicEditor() {
  const [content, setContent] = useState('');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Basic Text Editor</h1>
      <CustomTextEditor
        label="Article Content"
        name="article-content"
        content={content}
        onChange={setContent}
        placeholder="Start writing your article..."
        charLimit={10000}
      />
    </div>
  );
}
```

## Advanced Usage

### Blog Post Editor

```tsx
"use client";

import React, { useState } from 'react';
import { CustomTextEditor } from 'instincthub-react-ui';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export default function BlogEditor() {
  const [isEditing, setIsEditing] = useState(true);
  const [post, setPost] = useState<BlogPost>({
    title: '',
    content: '',
    excerpt: '',
    tags: []
  });

  const handleContentChange = (html: string) => {
    setPost(prev => ({ ...prev, content: html }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving blog post:', post);
    // Save logic here
  };

  const handlePreview = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <h1>Blog Post Editor</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Title *
          </label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter blog post title"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e1e1',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Excerpt
          </label>
          <textarea
            value={post.excerpt}
            onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief description of your post..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e1e1',
              borderRadius: '6px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <CustomTextEditor
          label="Blog Content *"
          name="blog-content"
          content={post.content}
          onChange={handleContentChange}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          placeholder="Write your blog post content here..."
          charLimit={50000}
          showPreviewBtn={true}
          required={true}
          note="Use the toolbar above to format your content. You can add images, links, tables, and more."
          lastUpdated={new Date().toISOString()}
        />

        <div style={{ 
          marginTop: '20px', 
          display: 'flex', 
          gap: '10px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#6B7280',
                border: '2px solid #e1e1e1',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Save Draft
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Publish Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
```

### Documentation Editor

```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { CustomTextEditor } from 'instincthub-react-ui';

interface DocumentationPage {
  id: string;
  title: string;
  content: string;
  category: string;
  lastModified: string;
  version: string;
}

export default function DocumentationEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [doc, setDoc] = useState<DocumentationPage>({
    id: '',
    title: '',
    content: '',
    category: 'general',
    lastModified: '',
    version: '1.0.0'
  });

  const [autoSave, setAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  const handleContentChange = (html: string) => {
    setDoc(prev => ({ ...prev, content: html }));
    setSaveStatus('unsaved');
  };

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || saveStatus !== 'unsaved') return;

    const timeoutId = setTimeout(async () => {
      setSaveStatus('saving');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('saved');
      setDoc(prev => ({ 
        ...prev, 
        lastModified: new Date().toISOString() 
      }));
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [doc.content, autoSave, saveStatus]);

  const exportToMarkdown = () => {
    // Convert HTML to Markdown (simplified)
    const markdown = doc.content
      .replace(/<h1>(.*?)<\/h1>/g, '# $1')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
      .replace(/<br\s*\/?>/g, '\n');

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Documentation Editor</h1>
          <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '5px' }}>
            Status: <span style={{ 
              color: saveStatus === 'saved' ? '#10B981' : 
                     saveStatus === 'saving' ? '#F59E0B' : '#EF4444'
            }}>
              {saveStatus === 'saved' ? '✓ Saved' : 
               saveStatus === 'saving' ? '⏳ Saving...' : '● Unsaved'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
            />
            Auto-save
          </label>
          
          <button
            onClick={exportToMarkdown}
            style={{
              padding: '8px 16px',
              backgroundColor: '#8B5CF6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Export MD
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Document Title
          </label>
          <input
            type="text"
            value={doc.title}
            onChange={(e) => setDoc(prev => ({ ...prev, title: e.target.value }))}
            placeholder="API Reference Guide"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #e1e1e1',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Category
            </label>
            <select
              value={doc.category}
              onChange={(e) => setDoc(prev => ({ ...prev, category: e.target.value }))}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e1e1e1',
                borderRadius: '4px'
              }}
            >
              <option value="general">General</option>
              <option value="api">API Reference</option>
              <option value="tutorial">Tutorial</option>
              <option value="guide">Guide</option>
              <option value="examples">Examples</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Version
            </label>
            <input
              type="text"
              value={doc.version}
              onChange={(e) => setDoc(prev => ({ ...prev, version: e.target.value }))}
              placeholder="1.0.0"
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e1e1e1',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      </div>

      <CustomTextEditor
        label="Documentation Content"
        name="doc-content"
        content={doc.content}
        onChange={handleContentChange}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        placeholder="Start writing your documentation..."
        charLimit={100000}
        showPreviewBtn={true}
        lastUpdated={doc.lastModified}
        note="Use headings to structure your content. Add code blocks for examples and use tables for reference data."
      />
    </div>
  );
}
```

## Form Integration

### Comment System

```tsx
"use client";

import React, { useState } from 'react';
import { CustomTextEditor } from 'instincthub-react-ui';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

export default function CommentSystem() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      content: newComment,
      timestamp: new Date().toISOString(),
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const addReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      content: replyContent,
      timestamp: new Date().toISOString()
    };

    setComments(prev => prev.map(comment => 
      comment.id === parentId
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyContent('');
    setReplyingTo(null);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Discussion</h1>
      
      {/* New Comment Form */}
      <form onSubmit={addComment} style={{ marginBottom: '30px' }}>
        <CustomTextEditor
          label="Add a Comment"
          name="new-comment"
          content={newComment}
          onChange={setNewComment}
          placeholder="Share your thoughts..."
          charLimit={5000}
          note="Be respectful and constructive in your comments."
        />
        
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={!newComment.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: newComment.trim() ? '#3B82F6' : '#9CA3AF',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: newComment.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div>
        {comments.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#6B7280',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px'
          }}>
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} style={{ 
              marginBottom: '20px',
              border: '1px solid #e1e1e1',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <strong>{comment.author}</strong>
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                
                <div 
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                  style={{ marginBottom: '10px', lineHeight: '1.6' }}
                />
                
                <button
                  onClick={() => setReplyingTo(
                    replyingTo === comment.id ? null : comment.id
                  )}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'transparent',
                    color: '#3B82F6',
                    border: '1px solid #3B82F6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {replyingTo === comment.id ? 'Cancel' : 'Reply'}
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: '#F9FAFB',
                  borderTop: '1px solid #e1e1e1'
                }}>
                  <CustomTextEditor
                    label="Reply"
                    name={`reply-${comment.id}`}
                    content={replyContent}
                    onChange={setReplyContent}
                    placeholder="Write your reply..."
                    charLimit={2000}
                  />
                  
                  <div style={{ 
                    marginTop: '10px', 
                    display: 'flex', 
                    gap: '10px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => setReplyingTo(null)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        color: '#6B7280',
                        border: '1px solid #e1e1e1',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => addReply(comment.id)}
                      disabled={!replyContent.trim()}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: replyContent.trim() ? '#3B82F6' : '#9CA3AF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: replyContent.trim() ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ backgroundColor: '#F9FAFB' }}>
                  {comment.replies.map(reply => (
                    <div key={reply.id} style={{ 
                      padding: '15px',
                      borderTop: '1px solid #e1e1e1',
                      marginLeft: '20px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <strong style={{ fontSize: '14px' }}>{reply.author}</strong>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          {formatDate(reply.timestamp)}
                        </span>
                      </div>
                      
                      <div 
                        dangerouslySetInnerHTML={{ __html: reply.content }}
                        style={{ fontSize: '14px', lineHeight: '1.6' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Error Handling

### Editor Error Boundary

```tsx
"use client";

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class EditorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Text editor error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '4px',
          backgroundColor: '#ffe0e0',
          color: '#d63031'
        }}>
          <h3>Editor Error</h3>
          <p>The text editor encountered an error and couldn't load properly.</p>
          <details style={{ marginTop: '10px' }}>
            <summary>Error details</summary>
            <pre style={{ marginTop: '10px', fontSize: '12px' }}>
              {this.state.error?.message}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#d63031', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginTop: '10px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage with error boundary
export default function SafeEditor() {
  return (
    <EditorErrorBoundary>
      <CustomTextEditor
        label="Safe Editor"
        placeholder="This editor is protected by an error boundary"
      />
    </EditorErrorBoundary>
  );
}
```

## Testing Examples

### Unit Tests

```tsx
// __tests__/CustomTextEditor.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomTextEditor } from 'instincthub-react-ui';

describe('CustomTextEditor', () => {
  test('renders with default props', () => {
    render(<CustomTextEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays label when provided', () => {
    render(<CustomTextEditor label="Article Content" />);
    expect(screen.getByText('Article Content')).toBeInTheDocument();
  });

  test('calls onChange when content changes', async () => {
    const handleChange = jest.fn();
    render(
      <CustomTextEditor 
        onChange={handleChange}
        content="Initial content"
      />
    );

    const editor = screen.getByRole('textbox');
    fireEvent.input(editor, { target: { innerHTML: 'New content' } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(expect.stringContaining('New content'));
    });
  });

  test('shows character count', () => {
    render(<CustomTextEditor charLimit={1000} />);
    expect(screen.getByText(/characters/)).toBeInTheDocument();
  });

  test('displays note when provided', () => {
    const note = 'This is a helpful note';
    render(<CustomTextEditor note={note} />);
    expect(screen.getByText(note)).toBeInTheDocument();
  });

  test('shows last updated date', () => {
    const lastUpdated = '2023-12-01T10:00:00Z';
    render(<CustomTextEditor lastUpdated={lastUpdated} />);
    expect(screen.getByText(/Last updated/)).toBeInTheDocument();
  });

  test('toggles preview mode when preview button is available', () => {
    const setIsEditing = jest.fn();
    render(
      <CustomTextEditor 
        showPreviewBtn={true}
        isEditing={true}
        setIsEditing={setIsEditing}
      />
    );

    // This would depend on the MenuBar implementation
    // You might need to look for specific preview button elements
  });
});
```

## Accessibility Features

### Accessible Editor

```tsx
"use client";

import React, { useState } from 'react';
import { CustomTextEditor } from 'instincthub-react-ui';

export default function AccessibleEditor() {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const validateContent = (html: string) => {
    const newErrors: string[] = [];
    
    // Check for alt text on images
    const imgRegex = /<img[^>]*>/g;
    const images = html.match(imgRegex) || [];
    images.forEach((img, index) => {
      if (!img.includes('alt=')) {
        newErrors.push(`Image ${index + 1} is missing alt text`);
      }
    });

    // Check for empty links
    const linkRegex = /<a[^>]*>([^<]*)<\/a>/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(html)) !== null) {
      if (!linkMatch[1].trim()) {
        newErrors.push('Found link with no text content');
      }
    }

    setErrors(newErrors);
  };

  const handleContentChange = (html: string) => {
    setContent(html);
    validateContent(html);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 id="editor-heading">Accessible Content Editor</h1>
      
      {errors.length > 0 && (
        <div 
          role="alert"
          style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '6px'
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#DC2626' }}>
            Accessibility Issues Found:
          </h3>
          <ul style={{ margin: 0, color: '#DC2626' }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <CustomTextEditor
        label="Article Content"
        name="accessible-content"
        content={content}
        onChange={handleContentChange}
        placeholder="Write your content here. Remember to add alt text to images and meaningful text to links."
        charLimit={10000}
        note="This editor includes accessibility checks. Make sure to provide alt text for images and descriptive text for links."
        required={true}
      />

      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#F0FDF4',
        border: '1px solid #BBF7D0',
        borderRadius: '6px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#059669' }}>
          Accessibility Tips:
        </h3>
        <ul style={{ margin: 0, color: '#059669' }}>
          <li>Use heading structure (H1, H2, H3) to organize content</li>
          <li>Provide alt text for all images</li>
          <li>Use descriptive link text instead of "click here"</li>
          <li>Ensure sufficient color contrast</li>
          <li>Use lists for related items</li>
        </ul>
      </div>
    </div>
  );
}
```

## Related Components

- [ContentViewer](./ContentViewer.md) - Read-only content display component  
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Toggle between view and edit modes
- [MenuBar](./MenuBar.md) - Editor toolbar with formatting options
- [TextField](./TextField.md) - Simple text input fields
- [Dialog](./Dialog.md) - Modal dialogs for editor settings

## Notes

- Requires Tiptap dependencies to be installed in your project
- The editor saves HTML content that should be sanitized on the server
- Character counting includes HTML markup in the total
- Preview mode requires the MenuBar component with preview functionality
- Images and links can be inserted through the toolbar
- The component is designed to work with form submissions through hidden inputs

