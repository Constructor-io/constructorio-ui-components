# React compatibility fixtures

Each subdirectory is a tiny consumer of `@constructor-io/constructorio-ui-components` pinned to one React major version (16, 17, 18, 19). Each fixture builds with webpack 5 in ESM-output mode (`experiments.outputModule: true`) — strict bare-specifier resolution, the same mode that surfaced the original `react/jsx-runtime` resolver failure on React 16/17 (CDX-458) — and runs a minimal jsdom render of `<Button asChild>` and `<Badge asChild>`.

The CI workflow `.github/workflows/react-compat.yml` runs all four fixtures on every PR. A failing cell in any major fails the workflow.

If any future runtime dependency reintroduces a published ESM `import 'react/jsx-runtime'` (or any other bare specifier that React 16/17 doesn't expose via `exports`), the React 16 and 17 cells will fail with `Module not found: ... react/jsx-runtime doesn't exist`.

The fixture's `webpack.base.cjs` pins `resolve.modules` to the fixture's own `node_modules` so webpack cannot fall through to the library's hoisted React install and mask the failure.

## Local repro

```bash
npm ci
npm run compile
npm pack --pack-destination .
mv constructor-io-constructorio-ui-components-*.tgz constructorio-ui-components.tgz
cd test/react-compat/16
npm install
npm run build
npm test
```
