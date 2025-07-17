# Update Knowledge Base

When you create, modify, or update a component, follow this checklist:

## Component Changes
- **If component name changed:**
  - Update `src/components/ui/ComponentLists.tsx`
  - Update `docs/static-docs/data/components.json`
  
- **If component name changed OR structure modified:**
  - Update documentation in `docs/static-docs/components/`
  - Regenerate component documentation if automated tools are available

## Export Updates
- **If new component created:**
  - Add to appropriate `index.ts` file in component directory
  - Update main `src/index.ts` if component should be exported from library

## Documentation
- **For all component changes:**
  - Update or create README.md in component's readme folder
  - Update examples in `src/__examples__/` if applicable
  - Verify TypeScript types are properly exported

## Testing
- **After changes:**
  - Run build process to check for errors
  - Verify component examples still work
  - Update example usage if component API changed