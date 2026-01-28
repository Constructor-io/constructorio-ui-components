import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import Chip from '@/components/chip';

describe('Chip component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('color type', () => {
    test('renders div with backgroundColor for color type', () => {
      render(<Chip type='color' value='#FF0000' name='Red' />);
      const element = screen.getByRole('img', { name: 'Red' });
      expect(element).toBeInTheDocument();
      expect(element.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    test('renders with hex color value', () => {
      render(<Chip type='color' value='#3B82F6' name='Blue' />);
      const element = screen.getByRole('img', { name: 'Blue' });
      expect(element.style.backgroundColor).toBe('rgb(59, 130, 246)');
    });
  });

  describe('image type', () => {
    test('renders img element with src for image type', () => {
      render(<Chip type='image' value='https://example.com/image.jpg' name='Pattern' />);
      const img = screen.getByAltText('Pattern');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(img.tagName).toBe('IMG');
    });

    test('renders img with correct alt text', () => {
      render(<Chip type='image' value='https://example.com/chip.png' name='Floral Pattern' />);
      const img = screen.getByAltText('Floral Pattern');
      expect(img).toBeInTheDocument();
    });

    test('wraps img in container with data-slot', () => {
      render(<Chip type='image' value='https://example.com/image.jpg' name='Pattern' data-testid='chip' />);
      const container = screen.getByTestId('chip');
      expect(container).toHaveAttribute('data-slot', 'chip');
      expect(container.querySelector('img')).toBeInTheDocument();
    });
  });

  describe('empty value fallback', () => {
    test('renders white fallback when value is empty string', () => {
      render(<Chip type='color' value='' name='Empty' />);
      const element = screen.getByRole('img', { name: 'Empty' });
      expect(element).toBeInTheDocument();
      expect(element.classList.contains('bg-white')).toBeTruthy();
    });

    test('renders white fallback when value is whitespace', () => {
      render(<Chip type='color' value='   ' name='Whitespace' />);
      const element = screen.getByRole('img', { name: 'Whitespace' });
      expect(element.classList.contains('bg-white')).toBeTruthy();
    });

    test('renders white fallback for image type with empty value', () => {
      render(<Chip type='image' value='' name='Empty Image' />);
      const element = screen.getByRole('img', { name: 'Empty Image' });
      expect(element.classList.contains('bg-white')).toBeTruthy();
    });
  });

  describe('size variants', () => {
    test('applies sm size class', () => {
      render(<Chip type='color' value='#000' name='Small' size='sm' />);
      const element = screen.getByRole('img', { name: 'Small' });
      expect(element.classList.contains('w-4')).toBeTruthy();
      expect(element.classList.contains('h-4')).toBeTruthy();
    });

    test('applies md size class (default)', () => {
      render(<Chip type='color' value='#000' name='Medium' />);
      const element = screen.getByRole('img', { name: 'Medium' });
      expect(element.classList.contains('w-6')).toBeTruthy();
      expect(element.classList.contains('h-6')).toBeTruthy();
    });

    test('applies lg size class', () => {
      render(<Chip type='color' value='#000' name='Large' size='lg' />);
      const element = screen.getByRole('img', { name: 'Large' });
      expect(element.classList.contains('w-8')).toBeTruthy();
      expect(element.classList.contains('h-8')).toBeTruthy();
    });
  });

  describe('componentOverrides', () => {
    test('renders componentOverride.reactNode when passed', () => {
      render(
        <Chip
          type='color'
          value='#FF0000'
          name='Overridden'
          componentOverrides={{
            reactNode: <div data-testid='custom-override'>Custom Chip</div>,
          }}
        />,
      );
      expect(screen.getByTestId('custom-override')).toBeInTheDocument();
      expect(screen.getByText('Custom Chip')).toBeInTheDocument();
    });

    test('does not render default content when override provided', () => {
      render(
        <Chip
          type='color'
          value='#FF0000'
          name='Overridden'
          componentOverrides={{
            reactNode: <span>Override</span>,
          }}
        />,
      );
      expect(screen.queryByRole('img', { name: 'Overridden' })).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    test('uses name prop for aria-label', () => {
      render(<Chip type='color' value='#FF0000' name='Crimson Red' />);
      const element = screen.getByLabelText('Crimson Red');
      expect(element).toBeInTheDocument();
    });

    test('has role="img"', () => {
      render(<Chip type='color' value='#000' name='Black' />);
      const element = screen.getByRole('img', { name: 'Black' });
      expect(element).toBeInTheDocument();
    });
  });

  describe('data attributes', () => {
    test('spreads data-* attributes correctly', () => {
      render(
        <Chip
          type='color'
          value='#FF0000'
          name='Test'
          data-testid='chip-test'
          data-cnstrc-filter='color'
        />,
      );
      const element = screen.getByTestId('chip-test');
      expect(element).toBeInTheDocument();
      expect(element.dataset.cnstrcFilter).toBe('color');
    });

    test('has data-slot attribute', () => {
      render(<Chip type='color' value='#000' name='Slot Test' />);
      const element = screen.getByRole('img', { name: 'Slot Test' });
      expect(element).toHaveAttribute('data-slot', 'chip');
    });
  });

  describe('CSS classes', () => {
    test('has cio-chip class', () => {
      render(<Chip type='color' value='#000' name='Class Test' />);
      const element = screen.getByRole('img', { name: 'Class Test' });
      expect(element.classList.contains('cio-chip')).toBeTruthy();
    });

    test('has cio-components class', () => {
      render(<Chip type='color' value='#000' name='Components Class' />);
      const element = screen.getByRole('img', { name: 'Components Class' });
      expect(element.classList.contains('cio-components')).toBeTruthy();
    });

    test('merges custom className', () => {
      render(<Chip type='color' value='#000' name='Custom Class' className='my-custom-class' />);
      const element = screen.getByRole('img', { name: 'Custom Class' });
      expect(element.classList.contains('my-custom-class')).toBeTruthy();
    });
  });
});
