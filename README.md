# Constructor UI Components Library

![minzipped size](https://img.shields.io/bundlephobia/minzip/@constructor-io/constructorio-ui-components?color=green)
[![NPM Version](https://img.shields.io/npm/v/@constructor-io/constructorio-ui-components)](https://www.npmjs.com/package/@constructor-io/constructorio-ui-components)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Constructor-io/constructorio-ui-components/blob/main/LICENSE)

## Introduction

UI Components Library is a collection of React components that can be used to build UI for Constructor.io products.

Our [Storybook Docs](https://constructor-io.github.io/constructorio-ui-components/?path=/docs/general-introduction--variants) provide a comprehensive overview of each component, including its behavior, variations, and configuration options.


## Requirements

- Node.js v22.18.0 (LTS Jod)
- React >=16.12.0
- React DOM >=16.12.0


## Installation

```bash
npm i @constructor-io/constructorio-ui-components
```

## Usage Patterns

### Normal Usage

```tsx
import { Button } from '@constructor-io/constructorio-ui-components';
import '@constructor-io/constructorio-ui-components/styles.css'

function App() {
  return <Button>Click me</Button>;
}
```

### Render Other Components using `asChild`

```tsx
import { Badge } from '@constructor-io/constructorio-ui-components';
import '@constructor-io/constructorio-ui-components/styles.css'

function App() {
  return (
    <Badge asChild variant="outline">
      <a href="#">
        A link that looks like a badge
      </a>
    </Badge>
  );
}
```

### Component Overrides

```tsx
import { Button } from '@constructor-io/constructorio-ui-components';
import '@constructor-io/constructorio-ui-components/styles.css'

function App() {
  return (
    <Button
      componentOverrides={{
        reactNode: <span>A span rendered in place of a button</span>
      }}
    >
      This will be overridden
    </Button>
  );
}
```

### Passing Data Attributes

```tsx
import { Button } from '@constructor-io/constructorio-ui-components';
import '@constructor-io/constructorio-ui-components/styles.css'

function App() {
  return <Button data-cnstrc-price={23.25}>Purchase</Button>;
}
```

### Compound Components

```tsx
import { ProductCard } from '@constructor-io/constructorio-ui-components';
import '@constructor-io/constructorio-ui-components/styles.css'

function App() {
  return (
    <ProductCard
      product={{
        id: 'highland-golf-pants',
        variationId: 'highland-golf-pants--navy',
        name: "Highland Golf Pants",
        imageUrl: 'https://example.com/pants.jpg',
        price: '799',
        rating: 4.8,
        reviewsCount: 203,
        description: 'Premium golf pants designed for comfort and performance on the course',
      }}
      className='overflow-hidden max-w-md'
    >
      <div className='grid grid-cols-2 gap-4 p-4'>
        <ProductCard.ImageSection />
        <div className='space-y-2'>
          <ProductCard.PriceSection />
          <ProductCard.TitleSection />
          <ProductCard.RatingSection />
        </div>
      </div>
      <ProductCard.Footer>
        <ProductCard.AddToCartButton />
      </ProductCard.Footer>
    </ProductCard>
  );
}
```

## Tailwind CSS Prefix

This library uses Tailwind CSS v4 with a `cio:` prefix to avoid conflicts with your application's Tailwind classes. All utility classes and CSS variables are namespaced to ensure styles don't leak or collide.

### Class Naming Convention

When adding or customizing Tailwind classes in this library, always use the `cio:` prefix:

```tsx
// Correct
<div className="cio:flex cio:items-center cio:gap-2">

// Incorrect - will not work
<div className="flex items-center gap-2">
```

### Variants and Modifiers

The prefix must come **before** any variants (hover, focus, responsive, etc.):

```tsx
// Correct - prefix first, then variant, then utility
<button className="cio:bg-primary cio:hover:bg-primary/90 cio:disabled:opacity-50">

// Incorrect - variant before prefix
<button className="hover:cio:bg-primary/90 disabled:cio:opacity-50">
```

### Responsive Breakpoints

```tsx
// Correct
<div className="cio:p-2 cio:sm:p-4 cio:lg:p-6">

// Incorrect
<div className="cio:p-2 sm:cio:p-4 lg:cio:p-6">
```

### Arbitrary Values and Selectors

```tsx
// Correct
<div className="cio:w-[200px] cio:[&_svg]:size-4">

// Incorrect
<div className="[&_svg]:cio:size-4">
```

### CSS Variables

CSS variables are prefixed with `--cio-`:

```css
:root {
  --cio-primary: oklch(0.1969 0.0101 276.49);
  --cio-background: oklch(1 0 0);
  --cio-radius: 0.625rem;
}
```

### Customizing Theme

You can override the default theme by setting the CSS variables in your application:

```css
:root {
  --cio-primary: #your-brand-color;
  --cio-radius: 0.5rem;
}
```

## Local Development

### Development Scripts
```bash
npm ci                         # Install dependencies for local dev
npm run dev                    # Start a local dev server for Storybook
npm run lint                   # Run lint
npm run test                   # Run unit tests
```

### Build scripts
```bash
npm run compile                # Compile the library, remove aliases, copy styles
npm run build-storybook        # Build Storybook
npm run serve-built-storybook  # Serve the built Storybook
```

## Contributing

- Fork the repo & create a new branch.
- Run npm install to install dependencies.
- Submit a PR for review.

## License

MIT © Constructor.io
