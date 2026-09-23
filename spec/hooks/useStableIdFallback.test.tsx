import React from 'react';
import { renderToString } from 'react-dom/server';
import { render } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// React 16 and 17 have no `useId`, so `useStableId` falls back to a module counter. That path cannot
// be reached on the React this repo develops against, so it is forced here by hiding `useId` and
// re-importing the hook. Without these tests the fallback ships untested against every version in
// the declared `react: >=16.12.0` range.
const loadWithoutUseId = async () => {
  const descriptor = Object.getOwnPropertyDescriptor(React, 'useId');
  Object.defineProperty(React, 'useId', { value: undefined, configurable: true });
  vi.resetModules();
  const { useStableId } = await import('@/hooks/useStableId');
  return {
    useStableId,
    restore: () => {
      if (descriptor) Object.defineProperty(React, 'useId', descriptor);
    },
  };
};

describe('useStableId without React.useId (16/17)', () => {
  let restore = () => {};

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    restore();
    vi.resetModules();
  });

  test('renders no id on the server, so hydration cannot mismatch', async () => {
    const loaded = await loadWithoutUseId();
    restore = loaded.restore;
    const Probe = () => React.createElement('div', { id: loaded.useStableId('cio-panel') });

    const first = renderToString(React.createElement(Probe));
    const second = renderToString(React.createElement(Probe));
    const third = renderToString(React.createElement(Probe));

    // The counter used to advance per render, so the same element serialized as `-1`, `-2`, `-3`
    // across requests while the freshly loaded client always produced `-1`.
    expect(first).not.toMatch(/\sid=/);
    expect(first).toBe(second);
    expect(second).toBe(third);
  });

  test('assigns an id once mounted on the client', async () => {
    const loaded = await loadWithoutUseId();
    restore = loaded.restore;
    const Probe = () =>
      React.createElement('div', { 'data-testid': 'p', id: loaded.useStableId('cio-panel') });

    const { getByTestId } = render(React.createElement(Probe));
    expect(getByTestId('p').id).toMatch(/^cio-panel-\d+$/);
  });

  test('still gives two instances distinct ids after mount', async () => {
    const loaded = await loadWithoutUseId();
    restore = loaded.restore;
    const Probe = ({ n }: { n: number }) =>
      React.createElement('div', { 'data-testid': `p${n}`, id: loaded.useStableId('cio-panel') });

    const { getByTestId } = render(
      React.createElement(
        'div',
        null,
        React.createElement(Probe, { n: 1, key: 1 }),
        React.createElement(Probe, { n: 2, key: 2 }),
      ),
    );
    const a = getByTestId('p1').id;
    const b = getByTestId('p2').id;
    expect(a).toBeTruthy();
    expect(a).not.toBe(b);
  });
});
