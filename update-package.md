# Update UI Package

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test instinctHub UI npm package locally

To test `@instincthub/react-ui` locally in a Next.js project before publishing it on npm, follow these steps:

### **Step 1: Build Your Package**

Ensure your package is set up correctly and built before testing.

1. Navigate to your `instincthub-react-ui` project:
   ```sh
   cd path/to/instincthub-react-ui
   ```
2. Run the build command:
   ```sh
   npm run rollup
   ```
   This generates the `dist/` folder with the compiled package.

### **Step 2: Link the Package Locally**

Instead of publishing, use `npm link`:

1. Inside the `instincthub-react-ui` directory, run:
   ```sh
   npm link
   ```
   This creates a global symlink to your package.

### **Step 3: Use It in Your Next.js Project**

Now, in your Next.js project:

1. Navigate to the project directory:
   ```sh
   cd path/to/nextjs-project
   ```
2. Link the package:
   ```sh
   npm link @instincthub/react-ui
   ```
3. Restart the Next.js dev server if it's running:
   ```sh
   npm run dev
   ```

### **Step 4: Import and Use the Package**

Now you can import components from `@instincthub/react-ui` inside your Next.js project:

```tsx
import { TextField, NewSubmitBtn } from "@instincthub/react-ui";

export default function FormField() {
  return (
    <div>
      <TextField
        names="school_name"
        types="text"
        labels="High School Name *"
        requireds={true}
      />
      <NewSubmitBtn labels="Submit" status={true} />
    </div>
  );
}
```

### **Alternative: Using `file:` Dependency**

If `npm link` causes issues (e.g., Next.js not detecting changes properly), try:

1. Inside your Next.js `package.json`:
   ```json
   {
     "dependencies": {
       "@instincthub/react-ui": "file:node_modules/@instincthub/react-ui/dist"
     }
   }
   ```
2. Inside your tsconfig.json:
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@instincthub/react-ui": ["node_modules/@instincthub/react-ui/dist"]
       }
     }
   }
   ```
3. Run `npm install` to link it.

This method ensures Next.js detects changes more reliably.

---

## After Each Update to the Package

After each update to the package, you should run the following commands to test locally:

1. Build the package from the package directory:

```sh
npm run rollup
```

2. If not already linked locally, link the package:

```sh
npm link
```

3. In your Next.js project, link the package:

```sh
npm link @instincthub/react-ui
```

4. Restart the Next.js dev server if it's running:

```sh
npm run dev
```

5. Import and use the package in your Next.js project:

````tsx
import { TextField, NewSubmitBtn } from "@instincthub/react-ui";

export default function FormField() {
  return (
    <div>
      <TextField
        names="school_name"
        types="text"
        labels="High School Name *"
        requireds={true}
      />
      <NewSubmitBtn labels="Submit" status={true} />
    </div>
  );
}

This regenerates the `dist/` folder with the updated package.

Once you're satisfied with testing, you can publish `@instincthub/react-ui` to npm using:

```sh
npm publish --access public
````
