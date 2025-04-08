# DownloadAsExcel Component Documentation

## Overview

`DownloadAsExcel` is a TypeScript React component that allows users to download data from an API endpoint as an Excel (.xlsx) file. It provides options for displaying either a plain button or a form submission button.

## Installation

### Dependencies

The component requires the following dependencies:

```bash
npm install xlsx @mui/icons-material @instincthub/react-ui
```

## Component Props

The component accepts the following props:

| Prop     | Type    | Required | Default    | Description                                        |
| -------- | ------- | -------- | ---------- | -------------------------------------------------- |
| token    | string  | Yes      | -          | Authentication token for API requests              |
| urlPath  | string  | Yes      | -          | API endpoint path to fetch data from               |
| fileName | string  | No       | "data"     | Name of the downloaded file (without extension)    |
| labels   | string  | No       | "Download" | Text label for the download button                 |
| plainBtn | boolean | No       | false      | Whether to use a plain text button instead of form |

## Interfaces

### DownloadAsExcelProps

```typescript
interface DownloadAsExcelProps {
  token: string;
  urlPath: string;
  fileName?: string;
  labels?: string;
  plainBtn?: boolean;
}
```

### DataResponse

```typescript
interface DataResponse {
  results: any[];
  detail?: string;
}
```

## Methods

### handleFetchData

```typescript
const handleFetchData = async (): Promise<DataResponse>
```

Fetches data from the specified API endpoint using the provided token.

### flattenObject

```typescript
const flattenObject = (data: DataResponse): Record<string, any>[]
```

Flattens complex nested objects and arrays into a format suitable for Excel export. This function recursively processes nested structures to create a flattened representation.

### handleDownload

```typescript
const handleDownload = async (e?: React.FormEvent): Promise<void>
```

Handles the download process. When triggered:

1. Displays a confirmation modal
2. Fetches data if confirmed
3. Flattens the data structure
4. Converts the data to Excel format
5. Triggers the file download
6. Shows a success toast notification

## Usage Examples

### Basic Usage with Form Button

```tsx
import DownloadAsExcel from "./DownloadAsExcel";

const MyComponent = () => {
  const userToken = "your-auth-token";

  return (
    <div>
      <h2>Download User Data</h2>
      <DownloadAsExcel
        token={userToken}
        urlPath="users/data/"
        fileName="users-data"
      />
    </div>
  );
};
```

### Using as a Plain Button with Custom Label

```tsx
import DownloadAsExcel from "./DownloadAsExcel";

const MyComponent = () => {
  const userToken = "your-auth-token";

  return (
    <div>
      <h2>Export Section</h2>
      <div className="export-options">
        <DownloadAsExcel
          token={userToken}
          urlPath="reports/monthly/"
          fileName="monthly-report"
          labels="Export Monthly Report"
          plainBtn={true}
        />
      </div>
    </div>
  );
};
```

## CSS Customization

The component uses the following CSS classes that can be customized:

```css
.ihub-plain-download {
  cursor: pointer;
  margin-right: 20px !important;
  transition: 0.3s ease-in;
  font-family: var(--Nunito);
  display: inline-flex;
  align-items: center;
}

.ihub-plain-download:hover {
  opacity: 0.7;
}
```

## Error Handling

The component handles several error conditions:

- Shows an error toast if the API response contains a detail error message
- Shows a "No result was found" toast if the response has empty results
- Allows users to cancel the download through the confirmation modal

## Accessibility

The component includes basic accessibility features:

- `role="button"` attribute for the plain button version
- `tabIndex={0}` to make the element focusable

## Notes

- The component uses XLSX.js for Excel file generation
- The component relies on toast and modal functions from an external modals utility
- Data flattening logic handles complex nested structures, including arrays and objects
