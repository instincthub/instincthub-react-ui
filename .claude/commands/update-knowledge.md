# Update Knowledge Base

When you create, modify, or update a component or library utility, follow this checklist.

## 1. Pick the right list

| What you're adding | Register in | Docs folder |
|--------------------|-------------|-------------|
| React component (UI, form, navbar, status, tab, cursor, theme, auth) | `src/components/ui/ComponentLists.tsx` | `docs/static-docs/components/<Name>.md` and `docs/static-docs/data/components.json` |
| Library / utility function (data manipulation, validation, formatting, hooks helpers, redux helpers) | `src/components/ui/LibraryList.tsx` | `docs/static-docs/libs/<Name>.md` and (if there's a libraries index) `docs/static-docs/data/libraries.json` |

Pick exactly one. A visual React component goes in ComponentLists; a pure function or hook goes in LibraryList.

## 2. Component Changes

- **If component/utility name changed:**
  - Update `src/components/ui/ComponentLists.tsx` **or** `src/components/ui/LibraryList.tsx`
  - Update `docs/static-docs/data/components.json` **or** `docs/static-docs/data/libraries.json`
  - Update `~/.claude/skills/instincthub-ui-components/SKILL.md` (rename in category list, update counts)

- **If new component/utility created:**
  - Add an entry to `ComponentLists.tsx` **or** `LibraryList.tsx` (see entry shape below)
  - Add the matching JSON entry to `components.json` **or** `libraries.json`
  - Add to the appropriate category in `~/.claude/skills/instincthub-ui-components/SKILL.md`
  - Bump the total count in the frontmatter `description` and the Overview section
  - Bump the per-category count (e.g., "Forms (38 components)")

- **If component name or structure changed:**
  - Update the markdown in `docs/static-docs/components/` or `docs/static-docs/libs/`
  - Regenerate component documentation if automated tools are available

### Entry shape (ComponentLists.tsx)

```ts
{
  name: "DangerousRenderer",
  description: "...",
  category: "UI",
  repo_path: "src/components/ui/viewer/DangerousRenderer.tsx",
  example_path: "docs/static-docs/components/DangerousRenderer.md",
  visual_demo_url: "/components/ui/dangerous-renderer",
}
```

### Entry shape (LibraryList.tsx)

```ts
{
  name: "convertArrayToObject",
  description: "...",
  category: "Data Manipulation",
  repo_path: "src/components/lib/...",
  example_path: "docs/static-docs/libs/convertArrayToObject.md",
}
```

`visual_demo_url` is mandatory for components (every component should have a live demo route); optional for library utilities.

## 3. Create the interactive example page

Every new component MUST ship with a working demo page under `src/__examples__/`.

1. **Create the example component** at
   `src/__examples__/src/components/ui/<Name>Example.tsx`
   - Start with `"use client"`
   - Import from `../../../../index` (e.g. `import { DangerousRenderer } from "../../../../index"`)
   - Demonstrate the main usage + any notable variants (prop modes, children wrapper, error states)
   - Include realistic sample data; if the component sanitizes / transforms input, pick payloads that visibly prove it (e.g. include a `<script>` that gets stripped)

2. **Create the Next.js route** at
   `src/__examples__/src/app/components/ui/<kebab-name>/page.tsx`
   - Follow the `content-viewer` pattern: the page itself includes `<MainNavigation />` then the example. No separate `layout.tsx` is needed.

   ```tsx
   import <Name>Example from "../../../../components/ui/<Name>Example";
   import MainNavigation from "../../../../components/navbars/MainNavigation";

   export default async function <Name>Page() {
     return (
       <>
         <MainNavigation />
         <<Name>Example />
       </>
     );
   }
   ```

3. **Match the URL to `visual_demo_url`** in `ComponentLists.tsx` — use the same `/components/ui/<kebab-name>` path.

4. **Clear the fixed navbar.** The InstinctHub site's top nav is position-fixed. Give the example's root container top padding so content isn't hidden:

   ```tsx
   <section style={{ padding: "6rem 1.5rem 3rem" }}>…</section>
   ```

5. **Verify it renders in the browser** (Chrome or Playwright):
   - Load `http://localhost:3000/components/ui/<kebab-name>`
   - Confirm no console errors (especially "Maximum update depth exceeded")
   - Click through every interactive control in the demo
   - Sanity-check dark mode via the navbar toggle if the component has themed styles

6. **If the utility is a library function (LibraryList):** an example page is recommended but optional. If added, place it under `src/__examples__/src/app/libs/<kebab-name>/page.tsx` and a component at `src/__examples__/src/components/lib/<Name>Example.tsx`.

## 4. Export Updates

- **If new component/utility created:**
  - Add to the appropriate `index.ts` file in the component/lib directory
  - Export `default` and any public types (e.g. `export type { XyzProps }`)
  - Update `src/index.ts` if the symbol should be exported from the library

## 5. Documentation

- **For all component changes:**
  - Update or create the component's docs markdown in `docs/static-docs/components/<Name>.md` or `docs/static-docs/libs/<Name>.md`
  - Update or create README.md in the component's readme folder (if the component has one)
  - Update examples in `src/__examples__/` if applicable
  - Verify TypeScript types are properly exported

## 6. Testing & Verification

- **After changes:**
  - `npx tsc --noEmit` (typecheck) must be clean
  - Run the example page in the browser and verify no console errors
  - Exercise every interactive state (tabs, modes, props) you added in the demo
  - Verify component examples still work elsewhere in the repo
  - Update example usage if the component API changed
