# InstinctHub Cursor Library

A TypeScript-based custom cursor library for React applications with magnetic effects, cursor trails, and interactive states.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Components](#components)
  - [Cursor](#cursor)
  - [MagneticButton](#magneticbutton)
  - [CursorProvider](#cursorprovider)
- [Hooks](#hooks)
  - [useCursor](#usecursor)
- [Higher-Order Components](#higher-order-components)
  - [withCursorEffect](#withcursoreffect)
- [Examples](#examples)
- [API Reference](#api-reference)
- [CSS Classes](#css-classes)
- [Advanced Usage](#advanced-usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The InstinctHub Cursor Library provides interactive cursor effects for modern web applications. It includes custom cursor designs, magnetic effects for buttons, and a context API for controlling cursor behavior throughout your application.

Key features:
- Custom cursor with trailing effect
- Magnetic buttons that attract the cursor
- Context-based cursor type system
- Automatic cursor state changes based on hovered elements
- Highly customizable through props and CSS

## Installation

First, add the package to your project:

```bash
npm install @instincthub/react-ui
# or
yarn add @instincthub/react-ui
```

Then import the required components and CSS:

```tsx
import { Cursor, CursorProvider, MagneticButton } from '@instincthub/react-ui/cursors';
import '@instincthub/react-ui/styles.css';
```

## Components

### Cursor

The main custom cursor component with trailing effect.

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | string | 'var(--DarkCyan)' | Color of the cursor |
| size | number | 10 | Size of the main cursor in pixels |
| trailingSize | number | 30 | Size of the trailing cursor in pixels |
| trailingDuration | number | 200 | Duration of the trailing effect in ms |
| hideDefaultCursor | boolean | true | Whether to hide the default cursor |
| clickEffect | boolean | true | Whether to activate click animation |

#### Usage

```tsx
import { Cursor } from '@instincthub/react-ui/cursors';

const App = () => {
  return (
    <>
      <Cursor 
        color="var(--DarkCyan)" 
        size={10} 
        trailingSize={30} 
      />
      <div>Your application content</div>
    </>
  );
};
```

### MagneticButton

A button component with a magnetic cursor effect.

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Button content |
| className | string | '' | Optional CSS class names |
| distanceFactor | number | 0.5 | Distance factor for magnetic effect |
| type | 'button' \| 'submit' \| 'reset' | 'button' | Button type attribute |
| onClick | function | - | Click handler |
| disabled | boolean | false | Whether the button is disabled |

#### Usage

```tsx
import { MagneticButton } from '@instincthub/react-ui/cursors';

const Example = () => {
  return (
    <MagneticButton 
      className="ihub-important-btn" 
      distanceFactor={0.7}
      onClick={() => console.log('Button clicked!')}
    >
      Click Me
    </MagneticButton>
  );
};
```

### CursorProvider

Provider component for the cursor context.

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Children components |
| enabled | boolean | true | Whether to enable cursor tracking |

#### Usage

```tsx
import { CursorProvider, Cursor } from '@instincthub/react-ui/cursors';

const App = () => {
  return (
    <CursorProvider enabled={true}>
      <Cursor />
      <div>Your application content</div>
    </CursorProvider>
  );
};
```

## Hooks

### useCursor

Hook to use cursor context in any component.

#### Returns

| Name | Type | Description |
|------|------|-------------|
| cursorType | CursorType | Current cursor type |
| setCursorType | function | Update the cursor type |
| addCursorClass | function | Add a custom class to the cursor |
| removeCursorClass | function | Remove a custom class from the cursor |
| toggleCursorVisibility | function | Toggle cursor visibility |
| isCursorVisible | boolean | Whether the cursor is currently visible |

#### Usage

```tsx
import { useCursor } from '@instincthub/react-ui/cursors';

const TextInput = () => {
  const { setCursorType } = useCursor();
  
  return (
    <input
      type="text"
      onFocus={() => setCursorType('text')}
      onBlur={() => setCursorType('default')}
      className="ihub-input"
    />
  );
};
```

## Higher-Order Components

### withCursorEffect

HOC to add cursor hover effect to any component.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| Component | React.ComponentType | The component to wrap |
| cursorType | CursorType | Cursor type to apply on hover |

#### Usage

```tsx
import { withCursorEffect } from '@instincthub/react-ui/cursors';

const Button = ({ children }) => <button>{children}</button>;
const ButtonWithCursor = withCursorEffect(Button, 'pointer');

const Example = () => {
  return <ButtonWithCursor>Hover Me</ButtonWithCursor>;
};
```

## Examples

### Basic Setup

```tsx
import React from 'react';
import { CursorProvider, Cursor, MagneticButton } from '@instincthub/react-ui/cursors';

const App = () => {
  return (
    <CursorProvider>
      <Cursor color="var(--DarkCyan)" />
      
      <header>
        <h1>My Awesome Website</h1>
      </header>
      
      <main>
        <p>Welcome to my website with a custom cursor!</p>
        
        <MagneticButton className="ihub-important-btn">
          Click Me
        </MagneticButton>
      </main>
    </CursorProvider>
  );
};

export default App;
```

### Dynamic Cursor Types

```tsx
import React from 'react';
import { useCursor } from '@instincthub/react-ui/cursors';

const DragDropArea = () => {
  const { setCursorType } = useCursor();
  
  return (
    <div 
      className="ihub-drop-zone"
      onMouseEnter={() => setCursorType('draggable')}
      onMouseLeave={() => setCursorType('default')}
      onDragOver={(e) => {
        e.preventDefault();
        setCursorType('pointer');
      }}
      onDrop={() => setCursorType('default')}
    >
      Drag and drop files here
    </div>
  );
};
```

## API Reference

### CursorType

Available cursor types:

- `'default'` - Standard cursor
- `'pointer'` - For clickable elements
- `'text'` - For text inputs
- `'loading'` - Loading state
- `'draggable'` - For draggable elements
- `'not-allowed'` - For disabled elements

## CSS Classes

### Cursor Classes

| Class | Description |
|-------|-------------|
| `.ihub-cursor-hidden` | Hides the default cursor |
| `.ihub-cursor-pointer` | Styles for pointer cursor |
| `.ihub-cursor-click` | Styles for click animation |
| `.ihub-cursor-text-hover` | Styles for text hover |
| `.ihub-cursor-link-hover` | Styles for link hover |
| `.ihub-cursor-loading` | Styles for loading cursor |
| `.ihub-cursor-draggable` | Styles for draggable cursor |
| `.ihub-cursor-not-allowed` | Styles for not allowed cursor |
| `.ihub-magnetic-cursor` | Styles for magnetic cursor effect |

### Animations

The library includes several CSS animations:

- `ihub-cursor-pulse` - Click animation
- `ihub-cursor-rotate` - Loading animation

## Advanced Usage

### Custom Cursor Effects

You can create custom cursor effects by adding CSS classes:

```tsx
import { useCursor } from '@instincthub/react-ui/cursors';

const CustomComponent = () => {
  const { addCursorClass, removeCursorClass } = useCursor();
  
  return (
    <div
      onMouseEnter={() => addCursorClass('my-custom-cursor-effect')}
      onMouseLeave={() => removeCursorClass('my-custom-cursor-effect')}
    >
      Custom cursor effect here
    </div>
  );
};
```

### Combining with Page Transitions

For smooth page transitions:

```tsx
import { useRouter } from 'next/router';
import { useCursor } from '@instincthub/react-ui/cursors';

const PageTransitionHandler = () => {
  const router = useRouter();
  const { setCursorType } = useCursor();
  
  useEffect(() => {
    const handleStart = () => setCursorType('loading');
    const handleComplete = () => setCursorType('default');
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, setCursorType]);
  
  return null;
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.