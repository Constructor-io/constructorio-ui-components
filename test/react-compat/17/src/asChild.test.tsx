import * as React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button, Badge } from '@constructor-io/constructorio-ui-components';

describe('react-compat-17: asChild', () => {
  it('Button asChild renders an anchor with cio-button classes', () => {
    const { container } = render(
      <Button asChild>
        <a href='/x'>linked button</a>
      </Button>,
    );
    const a = container.querySelector('a');
    expect(a).not.toBeNull();
    expect(a?.getAttribute('href')).toBe('/x');
    expect(a?.className).toContain('cio-button');
  });

  it('Badge asChild renders an anchor with cio-badge classes', () => {
    const { container } = render(
      <Badge asChild>
        <a href='/y'>linked badge</a>
      </Badge>,
    );
    const a = container.querySelector('a');
    expect(a).not.toBeNull();
    expect(a?.className).toContain('cio-badge');
  });
});
