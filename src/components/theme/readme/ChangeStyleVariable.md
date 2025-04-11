# ThemeChanger Component

A React component that dynamically updates CSS custom properties (variables) to change the theme colors of your application.

## Features

- Updates the primary color (--DarkCyan) CSS variable
- Supports adding multiple custom variables
- Provides loading state
- Optional callback when theme changes are applied

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `primaryColor` | `string` | The color to set for the --DarkCyan CSS variable | `undefined` |
| `variables` | `Record<string, string>` | Key-value pairs of CSS variables to set (without the -- prefix) | `{}` |
| `onComplete` | `() => void` | Callback function that runs when theme changes are applied | `undefined` |

## Usage Examples

### Basic Usage

```tsx
import ThemeChanger from './ThemeChanger';

function App() {
  return (
    <div>
      <ThemeChanger primaryColor="#00838f" />
      <h1>My Themed App</h1>
    </div>
  );
}
```

### Advanced Usage with Multiple Variables

```tsx
import ThemeChanger from './ThemeChanger';

function App() {
  const themeVariables = {
    TurkishRose: '#bc658d',
    Gunmetal: '#2c333a',
    ViridianGreen: '#009ba2',
  };

  return (
    <div>
      <ThemeChanger 
        primaryColor="#00838f"
        variables={themeVariables}
        onComplete={() => console.log('Theme applied!')}
      />
      <h1>Custom Themed App</h1>
    </div>
  );
}
```

## Implementation Notes

- Uses the DOM's CSS variable API through the :root element
- Only renders the loading animation during initialization
- Returns null after loading is complete to avoid adding unnecessary elements to the DOM