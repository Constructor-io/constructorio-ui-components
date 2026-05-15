import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<App />, root);
}
