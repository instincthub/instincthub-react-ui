"use client";

import React, { useState } from "react";
import { ContentViewer } from "../../../../index";

const richArticleContent = `
<h1>The Complete Guide to Modern Web Development</h1>

<p>The web development landscape is evolving rapidly. Modern tools and frameworks have transformed how we build applications, making it possible to create <strong>experiences that were previously unimaginable</strong>.</p>

<p>In this comprehensive article, we explore the key trends shaping the industry &mdash; from component architecture to performance optimization &mdash; and what developers need to know to stay ahead.</p>

<h2>The Rise of Component-Based Architecture</h2>

<p>Component-based architecture has become the <strong>de facto standard</strong> for building modern web applications. React, Vue, and Svelte all embrace this paradigm, allowing developers to create reusable, self-contained pieces of UI.</p>

<p>The benefits are clear: better code organization, easier testing, and <em>improved collaboration</em> across teams. When a component is well-designed, it can be used across multiple projects with <u>minimal modification</u>.</p>

<blockquote data-type="pull-quote"><p>Design is not just what it looks like and feels like. Design is how it works.</p></blockquote>

<h3>Why Components Win</h3>

<p>Components encapsulate <strong>structure</strong>, <em>behavior</em>, and <mark>styling</mark> in a single unit. This makes them easy to reason about, test in isolation, and compose into larger interfaces. Think of them as the building blocks of your application.</p>

<blockquote><p>The best code is no code at all. Every new line of code you willingly bring into the world is code that has to be debugged, code that has to be read and understood.</p></blockquote>

<h2>Key Technologies to Watch</h2>

<h3>Bullet List</h3>
<ul>
  <li>Server Components and streaming SSR for better performance</li>
  <li>Edge computing bringing logic closer to users</li>
  <li>AI-assisted development tools for faster iteration</li>
  <li>Web Assembly for near-native performance in the browser</li>
</ul>

<h3>Numbered List: The Development Workflow</h3>
<ol>
  <li>Plan your component API and data flow</li>
  <li>Write tests for the expected behavior</li>
  <li>Implement the minimal code to pass tests</li>
  <li>Refactor for clarity and performance</li>
  <li>Review, document, and ship</li>
</ol>

<h3>Nested Lists</h3>
<ul>
  <li>Frontend
    <ul>
      <li>React with TypeScript</li>
      <li>Next.js for full-stack</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js with Express</li>
      <li>Python with Django</li>
    </ul>
  </li>
</ul>

<h2>Code Examples</h2>

<p>Here is a basic example of a modern React component using <code>TypeScript</code>:</p>

<pre><code>interface CardProps {
  title: string;
  description: string;
  onClick?: () =&gt; void;
}

export function Card({ title, description, onClick }: CardProps) {
  return (
    &lt;div className="card" onClick={onClick}&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      &lt;p&gt;{description}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>

<p>This pattern is simple, composable, and easy to test. You can pass data in through <code>props</code>, handle events with <code>onClick</code>, and render output declaratively.</p>

<h2>Inline Formatting</h2>

<p>The editor supports a variety of inline formatting options:</p>

<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for subtle emphasis</li>
  <li><u>Underlined text</u> for annotations</li>
  <li><s>Strikethrough</s> for corrections</li>
  <li><mark>Highlighted text</mark> for key points</li>
  <li><code>Inline code</code> for technical terms</li>
  <li><a href="https://instincthub.com">Links</a> for navigation</li>
  <li>Combined: <strong><em>bold italic</em></strong>, <strong><code>bold code</code></strong></li>
</ul>

<h2>Data Table: Core Web Vitals</h2>

<p>Performance is not just a technical metric &mdash; it directly impacts user experience. Studies show that a <mark>1-second delay in page load can reduce conversions by 7%</mark>.</p>

<table>
  <tr>
    <th>Metric</th>
    <th>Good</th>
    <th>Needs Improvement</th>
    <th>Poor</th>
  </tr>
  <tr>
    <td>LCP (Largest Contentful Paint)</td>
    <td>&le; 2.5s</td>
    <td>&le; 4.0s</td>
    <td>&gt; 4.0s</td>
  </tr>
  <tr>
    <td>FID (First Input Delay)</td>
    <td>&le; 100ms</td>
    <td>&le; 300ms</td>
    <td>&gt; 300ms</td>
  </tr>
  <tr>
    <td>CLS (Cumulative Layout Shift)</td>
    <td>&le; 0.1</td>
    <td>&le; 0.25</td>
    <td>&gt; 0.25</td>
  </tr>
</table>

<h2>Task List</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked /><span></span></label><div><p>Set up your development environment</p></div></li>
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked /><span></span></label><div><p>Choose a framework (React, Vue, Svelte)</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox" /><span></span></label><div><p>Build your first component</p></div></li>
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox" /><span></span></label><div><p>Deploy to production</p></div></li>
</ul>

<h2>Image with Caption</h2>

<figure class="ihub-te-image-block ihub-te-image-center">
  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=720&q=80" alt="Developer workspace" />
  <figcaption class="ihub-te-image-caption">A modern developer workspace &mdash; clean, focused, and productive.</figcaption>
</figure>

<h2>Heading Levels</h2>

<h1>Heading 1 &mdash; Page Title</h1>
<h2>Heading 2 &mdash; Major Section</h2>
<h3>Heading 3 &mdash; Subsection</h3>
<h4>Heading 4 &mdash; Detail</h4>

<hr />

<h2>Conclusion</h2>

<p>The future of web development is bright. By embracing modern patterns, staying curious, and building with users in mind, developers can create experiences that truly matter.</p>

<blockquote data-type="pull-quote"><p>Build for the user. Ship with confidence. Iterate with data.</p></blockquote>
`;

const ContentViewerExample: React.FC = () => {
  const [htmlContent] = useState(`
    <h2>Welcome to InstinctHub</h2>
    <p>This is a <strong>sample content</strong> with <em>HTML formatting</em>.</p>
    <ul>
      <li>First item with <a href="#">link</a></li>
      <li>Second item with <code>inline code</code></li>
      <li>Third item</li>
    </ul>
    <blockquote>
      This is a blockquote with important information.
    </blockquote>
  `);

  const [markdownContent] = useState(`
# Markdown Content Example

This is **markdown** content that will be *rendered* as HTML.

## Features
- Supports **bold** and *italic* text
- Code blocks: \`console.log('hello')\`
- Links: [InstinctHub](https://instincthub.com)

### Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a markdown blockquote
  `);

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>ContentViewer Examples</h1>
        <p>
          Content viewer component for displaying HTML, markdown, and plain text
          content with Medium/Substack-quality typography
        </p>
      </div>

      <div className="ihub-examples-grid">
        {/* Rich Article Content */}
        <div className="ihub-example-card">
          <h3>Rich Article (IHubTextEditor Output)</h3>
          <p>
            Full article with headings, lists, code, tables, blockquotes,
            highlights, tasks, and horizontal rules
          </p>

          <ContentViewer content={richArticleContent} showToolbar={true} />
        </div>

        {/* HTML Content */}
        <div className="ihub-example-card">
          <h3>Basic HTML Content</h3>
          <p>Display rich HTML content with proper sanitization</p>

          <ContentViewer content={htmlContent} />
        </div>

        {/* Markdown Content */}
        <div className="ihub-example-card">
          <h3>Markdown Content</h3>
          <p>Render markdown content as formatted HTML</p>

          <ContentViewer content={markdownContent} isMarkdown={true} />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>

        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre>
            <code>{`import { ContentViewer } from '@instincthub/react-ui';

<ContentViewer content={htmlFromEditor} showToolbar={true} />`}</code>
          </pre>
        </div>

        <div className="ihub-code-section">
          <h3>Markdown Content</h3>
          <pre>
            <code>{`<ContentViewer
  content={markdownString}
  isMarkdown={true}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContentViewerExample;
