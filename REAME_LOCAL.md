## 🔄 Local Development with `yalc`

If you're actively working on this package and want to test changes in a separate React Native project, follow these steps using [`yalc`](https://github.com/wclr/yalc), which is better suited than `npm link` for React Native environments.

### 📦 Step 1: Install `yalc` (once globally)

```bash
npm install -g yalc
```

### 🚀 Step 2: Publish the package locally

From the root of the `@instincthub/reactnative-ui` package:

```bash
yalc publish
```

### 🧩 Step 3: Add it to your React Native project

In the consuming app (e.g., `workboku`):

```bash
yalc add @instincthub/reactnative-ui
```

### 🔁 Step 4: Push changes after edits

Whenever you make changes to the UI package, just run:

```bash
yalc push
```

This updates the consuming app with the latest version.

### 🧹 Cleanup (optional)

To remove the linked package and clean up:

```bash
yalc remove @instincthub/reactnative-ui
rm -rf .yalc yalc.lock
```
