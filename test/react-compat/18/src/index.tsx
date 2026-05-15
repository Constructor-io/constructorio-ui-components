import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Badge, Carousel } from '@constructor-io/constructorio-ui-components';

const App = () => (
  <div>
    <Button asChild>
      <a href='/x'>linked button</a>
    </Button>
    <Badge asChild variant='outline'>
      <a href='/y'>linked badge</a>
    </Badge>
    <Carousel items={[]} />
  </div>
);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
