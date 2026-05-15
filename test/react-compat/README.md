# React compatibility fixtures

Each subdirectory is a tiny consumer of `@constructor-io/constructorio-ui-components` pinned to one React major version (16, 17, 18, 19). Each fixture builds with webpack 5 and runs a minimal jsdom render of `<Button asChild>` and `<Badge asChild>` to confirm the library works at runtime under that React version.

The CI workflow `.github/workflows/react-compat.yml` runs all four fixtures on every PR. A failing cell in any major fails the workflow.

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
