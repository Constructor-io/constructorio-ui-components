# Creating a Component using ShadCN

## What is ShadCN

[ShadCN](https://ui.shadcn.com/docs) isn't a traditional component library. It acts as a base that provides the actual component code via the "copy-paste" pattern. This means no traditional imports, and we'll be modifying the actual ShadCN code to create our own components.

## Getting Started

1. Head to the [list of components](https://ui.shadcn.com/docs/components) and select the component you want to extend.
2. Using the terminal, run the `npx` command provided in the CLI installation steps.
   1. You could opt for the Manual route where you can copy-paste the actual code, but this is not recommended as there might be dependencies that are not installed yet.
3. Once complete, the component should be imported in the `/src/components` folder. **Edit your component file directly**, replacing any references to components that already exist, and begin dev-ing!

## Conventions

1. For complex components, we follow the "Folder-per-Component" structure with the principle of "co-location" in mind. Components should have their own folder, with the following general structure:

```
- src/
  - components/
    - YourNewComponent/
      - index.ts - imports and exports relevant components & types
      - YourNewComponent.tsx - The actual component code that imports the modified ShadCN files
      - YourNewComponent.css - Additional CSS styles, if any (Note: Use Tailwind whenever possible!)
      - ... any other component-specific files
```

## React 16/17 compatibility

This library declares `peerDependencies.react: ">=16.12.0"` and is smoke-tested against React 16, 17, 18, and 19 by the matrix workflow at `.github/workflows/react-compat.yml`. Each cell builds a tiny consumer fixture and runs a jsdom render of the library's public components.

When adding a runtime dependency, prefer packages whose ESM output does not import `react/jsx-runtime` directly. React 16 and 17 lack an `exports` map, so consumers using strict-ESM bundler configurations cannot resolve that specifier. The matrix catches consumer-runtime breakage; for build-resolver edge cases (e.g. Next.js with strict ESM), test against the customer's actual build setup.
