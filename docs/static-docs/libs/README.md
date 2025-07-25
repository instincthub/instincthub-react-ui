# Library Utilities Documentation

**Category:** Library | **Type:** utility collection

This directory contains comprehensive documentation for all utility functions available in the InstinctHub React UI library. These utilities provide common functionality for data manipulation, DOM operations, API handling, and more.

## 📁 Available Utilities

### 🔧 Data Manipulation

#### [convertArrayToObject](./convertArrayToObject.md)
Convert arrays of objects into lookup objects for O(1) access performance.

```tsx
const categoriesObj = convertArrayToObject(categoriesArray);
const category = categoriesObj["categoryId"]; // O(1) lookup
```

### 📝 String & Text Utilities

#### [helpFunction](./helpFunction.md)
Comprehensive collection of string manipulation, validation, and formatting utilities.

```tsx
import { 
  stripHtmlTags, 
  convertToSlug, 
  formatNumberWithCommas,
  isValidEmail 
} from '@instincthub/react-ui/lib';
```

### ⏰ Time & Date Formatting

#### [format](./format.md)
Time formatting utilities for displaying durations and timestamps.

```tsx
const timeString = formatTime(3661); // "1:01"
```

### 📁 File Operations

#### [fileToBase64](./fileToBase64.md)
Convert files to Base64 encoding for uploads and data transmission.

```tsx
const base64String = await fileToBase64(file);
```

### 🌐 DOM & Browser Utilities

#### [loadScript](./loadScript.md)
Dynamically load external JavaScript files with error handling.

```tsx
const scriptElement = loadScript('https://js.stripe.com/v3/');
```

#### [elementIsVisibleInViewport](./elementIsVisibleInViewport.md)
Check if DOM elements are visible in the browser viewport.

```tsx
const isVisible = elementIsVisibleInViewport(element, true);
```

## 🚀 Quick Start

### Installation

```bash
npm install @instincthub/react-ui
```

### Import Utilities

```tsx
// Import individual utilities
import { 
  formatTime,
  fileToBase64,
  convertArrayToObject,
  loadScript,
  elementIsVisibleInViewport,
  stripHtmlTags,
  formatNumberWithCommas
} from '@instincthub/react-ui/lib';

// Or import all at once
import * as IHubUtils from '@instincthub/react-ui/lib';
```

## 📖 Usage Examples

### Data Processing Pipeline

```tsx
import React, { useState, useEffect } from 'react';
import { 
  convertArrayToObject, 
  formatTime, 
  stripHtmlTags,
  formatNumberWithCommas 
} from '@instincthub/react-ui/lib';

function DataProcessor() {
  const [courses, setCourses] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});

  useEffect(() => {
    // Process API response
    const processData = (apiData) => {
      // Convert array to object for fast lookups
      const coursesObj = convertArrayToObject(apiData);
      setCoursesMap(coursesObj);
      setCourses(apiData);
    };

    fetchCourses().then(processData);
  }, []);

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{stripHtmlTags(course.title)}</h3>
          <p>Duration: {formatTime(course.duration)}</p>
          <p>Price: ${formatNumberWithCommas(course.price)}</p>
        </div>
      ))}
    </div>
  );
}
```

### File Upload with Preview

```tsx
import React, { useState } from 'react';
import { fileToBase64 } from '@instincthub/react-ui/lib';

function FileUploader() {
  const [preview, setPreview] = useState('');

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setPreview(`data:${file.type};base64,${base64}`);
      } catch (error) {
        console.error('File conversion failed:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
}
```

### Lazy Loading with Visibility Detection

```tsx
import React, { useEffect, useRef } from 'react';
import { elementIsVisibleInViewport, loadScript } from '@instincthub/react-ui/lib';

function LazyComponent() {
  const elementRef = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current && !loaded) {
        const isVisible = elementIsVisibleInViewport(elementRef.current, true);
        if (isVisible) {
          // Load external library when component becomes visible
          loadScript('https://cdn.jsdelivr.net/npm/chart.js')
            .then(() => setLoaded(true));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  return (
    <div ref={elementRef}>
      {loaded ? <ChartComponent /> : <div>Loading chart...</div>}
    </div>
  );
}
```

## 🎯 Common Patterns

### API Request Helper

```tsx
import { reqOptions, fetchAPI } from '@instincthub/react-ui/lib';

const apiCall = async (endpoint, data, token) => {
  const options = reqOptions('POST', data, token, 'json');
  return await fetchAPI(
    (response) => console.log('Success:', response),
    endpoint,
    options,
    true
  );
};
```

### Form Validation

```tsx
import { isValidEmail, isValidAlphanumeric } from '@instincthub/react-ui/lib';

const validateForm = (formData) => {
  const errors = {};
  
  if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!isValidAlphanumeric(formData.username)) {
    errors.username = 'Username must be alphanumeric, 3+ characters';
  }
  
  return errors;
};
```

### Performance Monitoring

```tsx
import { elementIsVisibleInViewport } from '@instincthub/react-ui/lib';

const useViewportTracking = () => {
  const trackElement = (element, callback) => {
    const observer = () => {
      const isVisible = elementIsVisibleInViewport(element, true);
      callback(isVisible);
    };

    window.addEventListener('scroll', observer);
    return () => window.removeEventListener('scroll', observer);
  };

  return { trackElement };
};
```

## 📊 Performance Considerations

### Best Practices

1. **Throttle Scroll Events**: Use throttling for viewport detection
2. **Cache Results**: Store computed values when possible
3. **Conditional Loading**: Load utilities only when needed
4. **Memory Management**: Clean up event listeners properly

### Example Throttling

```tsx
const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  
  return (...args) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    }
  };
};

const handleScroll = throttle(() => {
  // Viewport checks here
}, 100);
```

## 🔗 Related Documentation

- [Components Documentation](../components/) - UI component documentation
- [Examples](../examples/) - Complete implementation examples
- [API Reference](../fetch/) - API handling utilities

## 🤝 Contributing

Found a bug or want to add a new utility? Please check our contribution guidelines and submit a pull request.

## 📝 License

These utilities are part of the InstinctHub React UI library and are available under the same license terms.