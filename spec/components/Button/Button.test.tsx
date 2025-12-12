import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import Button from '@/components/button';

describe('Button component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockClick = vi.fn();
    render(<Button onClick={mockClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('spreads data attributes if passed', () => {
    render(<Button data-cnstrc-btn='add_to_cart'>Add to Cart</Button>);

    expect(screen.getByText('Add to Cart').dataset.cnstrcBtn).toBe('add_to_cart');
  });

  test('renders component as is when asChild is true', () => {
    render(
      <Button asChild data-cnstrc-btn='add_to_cart'>
        <a>Add to Cart</a>
      </Button>,
    );

    const renderedButton = screen.getByText('Add to Cart');
    expect(renderedButton.tagName).toBe('A');
    expect(renderedButton.dataset.cnstrcBtn).toBe('add_to_cart');
    expect(renderedButton.classList.contains('cio-button')).toBeTruthy();
  });

  test('renders componentOverride if passed', () => {
    render(
      <Button
        componentOverrides={{ reactNode: <ul className='cio-button-custom'>A random list</ul> }}>
        <a>Add to Cart</a>
      </Button>,
    );

    const renderedButton = screen.getByText('A random list');
    expect(renderedButton.tagName).toBe('UL');
    expect(renderedButton.classList.contains('cio-button')).toBeFalsy();
    expect(renderedButton.classList.contains('cio-button-custom')).toBeTruthy();
  });
});
