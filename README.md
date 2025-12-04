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

function App() {
  return <Button>Click me</Button>;
}
```

### Render Other Components using `asChild`

```tsx
import { Badge } from '@constructor-io/constructorio-ui-components';

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

function App() {
  return <Button data-cnstrc-price={23.25}>Purchase</Button>;
}
```

### Compound Components

```tsx
import { ProductCard } from '@constructor-io/constructorio-ui-components';

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
