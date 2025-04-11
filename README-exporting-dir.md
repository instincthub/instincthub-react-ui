To expose the `/lib` directory so that modules can be imported using the `@instincthub/react-ui/lib/*` alias, follow these steps:

---

### 1. **Ensure Proper Directory Structure**

Your directory structure looks good. You have a `lib` folder inside `src`, which contains utility files.

---

### 2. **Update `tsconfig.json` to Define Module Aliases**

Modify your `tsconfig.json` file to include a `paths` mapping:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@instincthub/react-ui/lib/*": ["src/lib/*"]
    }
  }
}
```

This tells TypeScript to resolve imports like:

```ts
import { openConfirmModal, openToast } from "@instincthub/react-ui/lib/modals";
import {
  extractSubDomain,
  convertArrayToFormData,
} from "@instincthub/react-ui/lib/helpFunction";
import handleFormErrors from "@instincthub/react-ui/lib/formError";
```

---

### 3. **Update `package.json` to Ensure Proper Exporting**

Modify `package.json` to explicitly define exports for `lib`:

```json
{
  "name": "@instincthub/react-ui",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    "./lib/*": "./dist/lib/*"
  }
}
```

Ensure that `dist/lib/` contains the compiled versions of your modules.

---

### 4. **Ensure Proper Build Configuration (`tsconfig.json`)**

Modify `tsconfig.json` to include:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

### 5. **Rebuild and Test**

Run:

```sh
npm run build
```

Ensure the `lib` directory is included in the `dist` output.

Now, when you import from `@instincthub/react-ui/lib/...`, it should resolve correctly.

Would you like help testing this setup?
