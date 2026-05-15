import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Badge } from '@constructor-io/constructorio-ui-components';

const App = () => (
  <div>
    <Button asChild>
      <a href='/x'>linked button</a>
    </Button>
    <Badge asChild variant='outline'>
      <a href='/y'>linked badge</a>
    </Badge>
  </div>
);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
