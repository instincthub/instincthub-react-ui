# Fix Aliases import

When I install @instincthub/react-ui package package in other projects, I dont want to be adding this aliases in ts file each time I install in a project.

Looking at the `tsconfig.json`, in other projects, I manually configuring path aliases for the `@instincthub/react-ui` package. I want to eliminate the need for these manual configurations in every project for this `@instincthub/react-ui` package.

## Requirements:

- **Zero Configuration**: Projects can import directly without path aliases
- **Type Safety**: Full TypeScript support out of the box
- **Better DX**: Cleaner imports like `import { SubmitButton } from '@instincthub/react-ui'`
- **Consistency**: Works the same across all projects