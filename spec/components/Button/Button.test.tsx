import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../../src/components/Button/Button';

describe('Button component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
