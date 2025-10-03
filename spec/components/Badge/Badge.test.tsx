import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import Badge from '../../../src/components/ui/badge';

describe('Badge component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders badge with text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('spreads data attributes if passed', () => {
    render(<Badge data-cnstrc-count='5'>Badge with Data</Badge>);

    expect(screen.getByText('Badge with Data').dataset.cnstrcCount).toBe('5');
  });

  test('renders component as is when asChild is true', () => {
    render(
      <Badge asChild data-cnstrc-count='3'>
        <a>Badge Link</a>
      </Badge>,
    );

    const renderedBadge = screen.getByText('Badge Link');
    expect(renderedBadge.tagName).toBe('A');
    expect(renderedBadge.dataset.cnstrcCount).toBe('3');
    expect(renderedBadge.classList.contains('cio-badge')).toBeTruthy();
  });

  test('renders componentOverride if passed', () => {
    render(
      <Badge
        componentOverrides={{ reactNode: <div className='cio-badge-custom'>Custom Badge</div> }}>
        <span>Original Badge</span>
      </Badge>,
    );

    const renderedBadge = screen.getByText('Custom Badge');
    expect(renderedBadge.tagName).toBe('DIV');
    expect(renderedBadge.classList.contains('cio-badge')).toBeFalsy();
    expect(renderedBadge.classList.contains('cio-badge-custom')).toBeTruthy();
  });
});
