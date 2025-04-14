"use client";
import { ContentViewer } from "../../../../index";
import { useState } from "react";

export default function ListStylesDemo() {
  const [content] = useState(`
    <h2>Custom List Styles in InstinctHub</h2>
    <p>Here are examples of different list styles available in the content viewer:</p>
    
    <h3>Default Unordered List</h3>
    <ul>
      <li>This is a standard unordered list item</li>
      <li>InstinctHub provides a clean, modern style</li>
      <li>Lists help organize content effectively</li>
    </ul>
    
    <h3>Checkmark List</h3>
    <ul class="checkmark">
      <li>Uses checkmark icons for each list item</li>
      <li>Great for displaying completed items</li>
      <li>Adds visual interest to your content</li>
    </ul>
    
    <h3>Circle List</h3>
    <ul class="circle">
      <li>Uses small circular bullets</li>
      <li>A more subtle list style</li>
      <li>Works well for supplementary information</li>
    </ul>
    
    <h3>Arrow List</h3>
    <ul class="arrow">
      <li>Uses arrow symbols to guide attention</li>
      <li>Excellent for step-by-step instructions</li>
      <li>Creates a sense of direction and flow</li>
    </ul>
    
    <h3>Square List</h3>
    <ul class="square">
      <li>Uses square bullets for a modern look</li>
      <li>High contrast makes items stand out</li>
      <li>Works well for important points</li>
    </ul>
    
    <h3>Standard Ordered List</h3>
    <ol>
      <li>First item with automatic numbering</li>
      <li>Second item with custom circle styling</li>
      <li>Third item with consistent formatting</li>
    </ol>
    
    <h3>Colored Ordered Lists</h3>
    <p>Primary Color:</p>
    <ol class="primary">
      <li>First item with DarkCyan background</li>
      <li>Clean, professional appearance</li>
      <li>Consistent with InstinctHub branding</li>
    </ol>
    
    <p>Secondary Color:</p>
    <ol class="secondary">
      <li>First item with TurkishRose background</li>
      <li>Adds visual variety to your content</li>
      <li>Works well to distinguish different sections</li>
    </ol>
    
    <h3>Two-Column List (responsive)</h3>
    <ul class="two-column">
      <li>First column item</li>
      <li>Second column item</li>
      <li>Another first column item</li>
      <li>Another second column item</li>
      <li>Yet another first column item</li>
      <li>Final second column item</li>
    </ul>
    
    <h3>List with Background</h3>
    <div class="custom-ul-list">
      <ul>
        <li>This list has a subtle background</li>
        <li>Makes the list stand out from regular content</li>
        <li>Great for featured lists or important points</li>
      </ul>
    </div>
    
    <h3>Task List</h3>
    <ul data-type="taskList">
      <li data-checked="true"><input type="checkbox" checked /><div>This task has been completed</div></li>
      <li data-checked="false"><input type="checkbox" /><div>This task is still pending</div></li>
      <li data-checked="false"><input type="checkbox" /><div>Another pending task to complete</div></li>
    </ul>
    
    <h3>Nested Lists</h3>
    <ul>
      <li>First level item
        <ul>
          <li>Second level item</li>
          <li>Another second level item
            <ul>
              <li>Third level item</li>
              <li>Another third level item</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Another first level item</li>
    </ul>
  `);

  return (
    <div className="ihub-content-page">
      <h1>InstinctHub List Style Options</h1>
      <p>
        Below are examples of various list styles available for your course
        content.
      </p>

      <ContentViewer
        content={content}
        title="List Style Examples"
        showToolbar={true}
      />
    </div>
  );
}
