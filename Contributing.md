# Creating a Component using ShadCN

## What is ShadCN

[ShadCN](https://ui.shadcn.com/docs) isn't a traditional component library. It acts as a base that provides the actual component code via the "copy-paste" pattern. This means no traditional imports, and we'll be modifying the actual ShadCN code to create our own components.

## Getting Started

1. Head to the [list of components](https://ui.shadcn.com/docs/components) and select the component you want to extend.
2. Using the terminal, run the `npx` command provided in the CLI installation steps.
   2a. You could opt for the Manual route where you can copy-paste the actual code, but this is not recommended as there might be dependencies that might be missing.
3. Once complete, the component should be imported in the `/src/components/ui` folder. Copy-paste into your component file and begin dev-ing!

## Conventions

We follow the "Folder-per-Component" structure with the principle of "co-location" in mind. Components should have their own folder, with the following general structure:

```
- src/
  - components/
    - YourNewComponent/
      - index.ts - imports and exports relevant components & types
      - YourNewComponent.tsx - The actual component code
      - YourNewComponentVariants.ts - Tailwind variants merged together using `class-variant-authority`
      - YourNewComponent.css - Additional CSS styles, if any
      - ... any other component-specific files
```
