"use client"
import { ContentViewer } from "../../../../index";

export default function ListStylesDemoTwo() {
  // Example content from database or elsewhere
  const lesson = {
    title: "Introduction to Programming",
    content: `
        <h2>Getting Started with Programming</h2>
        <p>Programming is the process of creating instructions for computers to follow. Here are some key concepts:</p>
        
        <ul>
          <li>Variables store data values</li>
          <li>Functions organize code into reusable blocks</li>
          <li>Loops repeat actions
            <ul>
              <li>For loops</li>
              <li>While loops</li>
              <li>Do-while loops</li>
            </ul>
          </li>
          <li>Conditionals make decisions</li>
        </ul>
        
        <h3>Learning Path</h3>
        <ol>
          <li>Understand basic syntax</li>
          <li>Learn control structures</li>
          <li>Practice with simple projects</li>
          <li>Study data structures
            <ol>
              <li>Arrays</li>
              <li>Linked lists</li>
              <li>Hash tables</li>
            </ol>
          </li>
        </ol>
      `,
  };

  return (
    <div className="course-page">
      <h1>{lesson.title}</h1>

      {/* Basic usage with default styling */}
      <ContentViewer content={lesson.content} title={lesson.title} />

      {/* With a style variant */}
      <h2>Alternative Styling</h2>
      <ContentViewer content={lesson.content} title={lesson.title} />

      {/* Two-column layout */}
      <h2>Two-Column Layout</h2>
      <ContentViewer content={lesson.content} title={lesson.title} />

      {/* Boxed style */}
      <h2>Boxed Style</h2>
      <ContentViewer content={lesson.content} title={lesson.title} />
    </div>
  );
}
