import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import Button from '../../../src/components/ui/button';

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

  test('renders component as is when asChild is true', () => {
    render(
      <Button asChild>
        <a>hello</a>
      </Button>,
    );

    const renderedButton = screen.getByText('hello');
    expect(renderedButton.tagName).toBe('A');
    expect(renderedButton.classList.contains('cio-button')).toBeTruthy();
  });

  test('renders componentOverride if passed', () => {
    render(
      <Button
        componentOverrides={{ reactNode: <ul className='cio-button-custom'>A random list</ul> }}>
        <a>hello</a>
      </Button>,
    );

    const renderedButton = screen.getByText('A random list');
    expect(renderedButton.tagName).toBe('UL');
    expect(renderedButton.classList.contains('cio-button')).toBeFalsy();
    expect(renderedButton.classList.contains('cio-button-custom')).toBeTruthy();
  });
});
