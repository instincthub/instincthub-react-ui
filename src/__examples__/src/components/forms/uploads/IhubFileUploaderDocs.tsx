"use client";
import { CodeDisplay } from "../../../../../index";
import React from "react";

const IhubFileUploaderDocs: React.FC = () => {
  return (
    <div className="ihub-container ihub-content-viewer">
      <h1>InstinctHub File Uploader</h1>
      <p>
        A modern, TypeScript-based file upload component for InstinctHub
        applications, featuring drag-and-drop functionality, progress tracking,
        and AWS S3 integration.
      </p>

      <h2>Table of Contents</h2>
      <ul className="ihub-list-circle">
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#usage">Usage</a>
        </li>
        <li>
          <a href="#component-api">Component API</a>
        </li>
        <li>
          <a href="#interfaces">Interfaces</a>
        </li>
        <li>
          <a href="#styling">Styling</a>
        </li>
        <li>
          <a href="#examples">Examples</a>
        </li>
        <li>
          <a href="#error-handling">Error Handling</a>
        </li>
        <li>
          <a href="#browser-compatibility">Browser Compatibility</a>
        </li>
      </ul>

      <section id="installation">
        <h2>Installation</h2>
        <p>Ensure you have the required dependencies installed:</p>
        <CodeDisplay
          language="bash"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code="npm install @aws-sdk/client-s3 @aws-sdk/lib-storage"
        />

        <p>Add the component files to your project:</p>
        <ol>
          <li>
            Copy <code>IhubFileUploader.tsx</code> to your components directory
          </li>
          <li>
            Copy <code>ihub-file-uploader.css</code> to your styles directory
          </li>
          <li>Import the component and styles in your application</li>
        </ol>
      </section>

      <section id="features">
        <h2>Features</h2>
        <ul className="ihub-list-circle">
          <li>
            <strong>Modern UI</strong>: Clean, intuitive interface with
            responsive design
          </li>
          <li>
            <strong>Drag and Drop</strong>: Easily drag files into the upload
            area
          </li>
          <li>
            <strong>File Preview</strong>: Preview selected files before
            uploading
          </li>
          <li>
            <strong>Progress Tracking</strong>: Real-time upload progress
            monitoring
          </li>
          <li>
            <strong>File Validation</strong>: Built-in validation for file types
            and sizes
          </li>
          <li>
            <strong>S3 Integration</strong>: Direct uploading to AWS S3 buckets
          </li>
          <li>
            <strong>Smart Uploading</strong>: Automatic switching between
            single-part and multipart upload based on file size
          </li>
          <li>
            <strong>Accessibility</strong>: Keyboard and screen reader friendly
          </li>
          <li>
            <strong>TypeScript Support</strong>: Full type safety with
            comprehensive interfaces
          </li>
        </ul>
      </section>

      <section id="usage">
        <h2>Usage</h2>
        <p>Basic usage example:</p>

        <CodeDisplay
          language="tsx"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`import React from 'react';
import IhubFileUploader from './components/IhubFileUploader';
import './styles/ihub-file-uploader.css';

const MyUploadPage: React.FC = () => {
  const handleUploadComplete = (response) => {
    console.log('Upload completed:', response);
    // Do something with the uploaded file information
  };

  return (
    <div className="my-page">
      <h1>Upload Documents</h1>
      <IhubFileUploader
        header="Upload Your Resume"
        accept=".pdf,.docx"
        maxFileSize={10 * 1024 * 1024} // 10MB
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};

export default MyUploadPage;`}
        />
      </section>

      <section id="component-api">
        <h2>Component API</h2>
        <h3>Props</h3>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>header</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Header text displayed above the uploader</td>
            </tr>
            <tr>
              <td>
                <code>label</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>"Drag and drop files here or click to browse"</code>
              </td>
              <td>Text shown in the upload area</td>
            </tr>
            <tr>
              <td>
                <code>accept</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>"*"</code>
              </td>
              <td>Accepted file types (e.g., 'image/*', '.pdf,.docx')</td>
            </tr>
            <tr>
              <td>
                <code>maxFileSize</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>0</code>
              </td>
              <td>Maximum allowed file size in bytes (0 = unlimited)</td>
            </tr>
            <tr>
              <td>
                <code>name</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>"upload"</code>
              </td>
              <td>Input field name attribute</td>
            </tr>
            <tr>
              <td>
                <code>module</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>""</code>
              </td>
              <td>Module identifier for setting values</td>
            </tr>
            <tr>
              <td>
                <code>step</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>""</code>
              </td>
              <td>Step identifier for setting values</td>
            </tr>
            <tr>
              <td>
                <code>username</code>
              </td>
              <td>
                <code>string | null</code>
              </td>
              <td>
                <code>null</code>
              </td>
              <td>Username used in file naming</td>
            </tr>
            <tr>
              <td>
                <code>onUploadComplete</code>
              </td>
              <td>
                <code>(response: S3UploadResponseType) {`=>`} void</code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Callback fired when upload completes</td>
            </tr>
            <tr>
              <td>
                <code>setValues</code>
              </td>
              <td>
                <code>(name: string, value: string) {`=>`} void</code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Callback for setting values</td>
            </tr>
            <tr>
              <td>
                <code>setModules</code>
              </td>
              <td>
                <code>
                  (module: string, name: string, value: string) {`=>`} void
                </code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Callback for setting module values</td>
            </tr>
            <tr>
              <td>
                <code>setSteps</code>
              </td>
              <td>
                <code>
                  (module: string, step: string, name: string, value: string){" "}
                  {`=>`} void
                </code>
              </td>
              <td>
                <code>undefined</code>
              </td>
              <td>Callback for setting step values</td>
            </tr>
            <tr>
              <td>
                <code>className</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>""</code>
              </td>
              <td>Additional CSS class names</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="interfaces">
        <h2>Interfaces</h2>
        <h3>FileUploaderProps</h3>
        <CodeDisplay
          language="tsx"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`   
           export interface FileUploaderProps {
  /** Header text to display above the uploader */
  header?: string;
  /** Label text for the dropzone area */
  label?: string;
  /** Accepted file types (e.g., 'image/*', 'video/*', '.pdf,.docx') */
  accept?: string;
  /** Maximum allowed file size in bytes */
  maxFileSize?: number;
  /** Input field name */
  name?: string;
  /** Module identifier for setting values */
  module?: string;
  /** Step identifier for setting values */
  step?: string;
  /** Username for file naming */
  username?: string | null;
  /** Callback for handling the upload response */
  onUploadComplete?: (response: S3UploadResponseType) => void;
  /** Callback for setting values */
  setValues?: (name: string, value: string) => void;
  /** Callback for setting module values */
  setModules?: (module: string, name: string, value: string) => void;
  /** Callback for setting step values */
  setSteps?: (module: string, step: string, name: string, value: string) => void;
  /** Additional CSS class names */
  className?: string;
} `}
        />
        <h3>S3UploadResponseType</h3>
        <CodeDisplay
          language="tsx"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`export interface S3UploadResponseType {
  bucket: string;
  title: string;
  key: string;
  content_type: string;
  size: number;
  location: string;
}`}
        />
      </section>

      <section id="styling">
        <h2>Styling</h2>
        <p>
          The component comes with a comprehensive CSS file (
          <code>ihub-file-uploader.css</code>) that follows the InstinctHub
          design system. All class names are prefixed with <code>ihub-</code>{" "}
          for consistency.
        </p>
        <h3>Key Style Classes</h3>
        <ul>
          <li>
            <code>.ihub-uploader</code> - Main container
          </li>
          <li>
            <code>.ihub-uploader-dropzone</code> - Drag and drop area
          </li>
          <li>
            <code>.ihub-uploader-dropzone-active</code> - Applied when dragging
            a file over the area
          </li>
          <li>
            <code>.ihub-uploader-progress</code> - Progress bar container
          </li>
          <li>
            <code>.ihub-uploader-progress-bar</code> - Progress indicator
          </li>
          <li>
            <code>.ihub-uploader-error</code> - Error message container
          </li>
          <li>
            <code>.ihub-uploader-success</code> - Success message container
          </li>
        </ul>
        <h3>Customization</h3>
        <p>
          You can customize the appearance by overriding the CSS variables used
          in the component:
        </p>
        <CodeDisplay
          language="css"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`:root {
  --DarkCyan: #00838f; /* Primary color */
  --Danger: #ea5f5e;   /* Error color */
  --Gunmetal: #2c333a; /* Text color */
  --White: #ffffff;    /* Background color */
}`}
        />
      </section>

      <section id="examples">
        <h2>Examples</h2>
        <h3>Basic Image Uploader</h3>
        <CodeDisplay
          language="tsx"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`<IhubFileUploader
  header="Upload Profile Picture"
  accept="image/*"
  maxFileSize={5 * 1024 * 1024} // 5MB
  onUploadComplete={(response) => {
    setProfileImage(response.location);
  }}
/>`}
        />
        <h3>Document Uploader with Module</h3>
        <CodeDisplay
          language="tsx"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`<IhubFileUploader
  header="Upload Assignment"
  accept=".pdf,.doc,.docx"
  maxFileSize={20 * 1024 * 1024} // 20MB
  module="course123"
  name="assignment"
  setModules={(module, name, value) => {
    updateAssignment(module, name, value);
  }}
/>`}
        />
        <h3>Video Uploader with Progress Tracking</h3>
        <CodeDisplay
          language="tsx"
          showLineNumbers={true}
          wrapLines={false}
          darkMode={true}
          code={`<IhubFileUploader
  header="Upload Course Video"
  label="Drag and drop your video file or click to browse"
  accept="video/*"
  maxFileSize={500 * 1024 * 1024} // 500MB
  onUploadComplete={handleVideoUploadComplete}
/>`}
        />
      </section>

      <section id="error-handling">
        <h2>Error Handling</h2>
        <p>The component handles various error scenarios:</p>
        <ol>
          <li>
            <strong>File Size Exceeded</strong>: Displays an error when the
            selected file exceeds <code>maxFileSize</code>
          </li>
          <li>
            <strong>Unsupported File Type</strong>: Shows an error when the file
            type doesn't match the <code>accept</code> pattern
          </li>
          <li>
            <strong>Upload Failures</strong>: Handles S3 upload errors with
            retry functionality
          </li>
          <li>
            <strong>Network Issues</strong>: Provides feedback when network
            problems occur
          </li>
        </ol>
        <p>
          Error messages are displayed within the component interface with
          appropriate styling.
        </p>
      </section>

      <section id="browser-compatibility">
        <h2>Browser Compatibility</h2>
        <p>The component is compatible with all modern browsers:</p>
        <ul>
          <li>Chrome (latest)</li>
          <li>Firefox (latest)</li>
          <li>Safari (latest)</li>
          <li>Edge (latest)</li>
        </ul>
        <p>
          The drag and drop functionality uses standard HTML5 APIs and fallbacks
          to traditional file input when drag and drop is not supported.
        </p>
      </section>
    </div>
  );
};

export default IhubFileUploaderDocs;
