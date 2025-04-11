# Exporting New Components

## Overview

This guide will walk you through the process of exporting a new component from the `instincthub-react-ui` package. It will cover the following steps:

1. Creating a new component folder
2. Creating a new component file
3. Exporting the component
4. Importing the component in `/src/index.ts`
5. If it is utils in lib that you want to export like `@instincthub/react-ui/modals`

- In the rollup.config.ts file, add the file path to the input array

```json
  input: ["src/components/lib/modals.ts"], // js and css files
```

- In the tsconfig.json file, add the file path to the include array (you could add a repository or a specific file like so `src/components/lib/modals.ts`)

```json
"include": ["src/components/lib/**/*.ts"],
```

- In the package.json file, add the file to the exports

```json
"exports": {
    "./modals": {
      "import": "./dist/src/components/lib/modals.js",
      "require": "./dist/src/components/lib/modals.js",
      "types": "./dist/src/types/components/lib/modals.d.ts"
    },
}
```

6. Importing the component in your project

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine
- A text editor or IDE of your choice
- Familiarity with TypeScript and React

## Creating a New Component Folder

To create a new component folder, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the `instincthub-react-ui` directory.
3. Run the following command:

```bash
mkdir src/components/new-component-name
```

Replace `new-component-name` with the actual name of your new component.

## Creating a New Component File

Next, create a new file within the `src/components/new-component-name` folder. The file name should match the name of your component, but with a `.tsx` or `.jsx` extension.

For example, if your component is named `MyComponent`, create a file named `MyComponent.tsx` or `MyComponent.jsx`.

## Exporting the Component

In the new component file, export your component using the `export default` syntax. For example:

```typescript
import React from "react";

const MyComponent = () => {
  return <div>Hello, world!</div>;
};

export default MyComponent;
```

## Importing the Component in Your Project

Now that you have exported your component, you can import it into your project. For example:

```typescript
import MyComponent from "@instincthub/react-ui/src/components/new-component-name/MyComponent";
```

Replace `new-component-name` with the actual name of your component.

## Testing Your Component

To test your component, you can use the `npm run link-ui` command to link the package locally. This will allow you to import your component from the local package.

```bash
npm run link-ui
```

Once the linking process is complete, you can import your component in your project and start using it.

```typescript
import MyComponent from "@instincthub/react-ui/src/components/new-component-name/MyComponent";

const App = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};
```

## Conclusion

Congratulations! You have successfully exported a new component from the `instincthub-react-ui` package. You can now use this component in your project and customize it as needed.

Remember to follow the guidelines and best practices for TypeScript and React to ensure your code is clean, maintainable, and efficient.

Happy coding!
