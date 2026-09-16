import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import Spinner from '@/components/spinner';

describe('Spinner component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    test('renders an svg with role="status"', () => {
      render(<Spinner />);
      const element = screen.getByRole('status');
      expect(element).toBeInTheDocument();
      expect(element.tagName.toLowerCase()).toBe('svg');
    });

    test('has data-slot attribute', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveAttribute('data-slot', 'spinner');
    });

    test('inherits color via currentColor', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveAttribute('stroke', 'currentColor');
    });
  });

  describe('size variants', () => {
    test('applies sm size class', () => {
      render(<Spinner size='sm' />);
      expect(screen.getByRole('status').classList.contains('cio:size-4')).toBeTruthy();
    });

    test('applies md size class (default)', () => {
      render(<Spinner />);
      expect(screen.getByRole('status').classList.contains('cio:size-8')).toBeTruthy();
    });

    test('applies lg size class', () => {
      render(<Spinner size='lg' />);
      expect(screen.getByRole('status').classList.contains('cio:size-16')).toBeTruthy();
    });
  });

  describe('label', () => {
    test('uses default label as accessible name', () => {
      render(<Spinner />);
      expect(screen.getByRole('status', { name: 'Loading…' })).toBeInTheDocument();
    });

    test('uses custom label as accessible name', () => {
      render(<Spinner label='Fetching products' />);
      expect(screen.getByRole('status', { name: 'Fetching products' })).toBeInTheDocument();
    });
  });

  describe('animation', () => {
    test('animates and opts out under prefers-reduced-motion', () => {
      render(<Spinner />);
      const element = screen.getByRole('status');
      expect(element.classList.contains('cio:animate-spin')).toBeTruthy();
      expect(element.classList.contains('cio:motion-reduce:animate-none')).toBeTruthy();
    });
  });

  describe('componentOverrides', () => {
    test('renders componentOverrides.reactNode when passed', () => {
      render(
        <Spinner
          componentOverrides={{
            reactNode: <div data-testid='custom-override'>Custom Spinner</div>,
          }}
        />,
      );
      expect(screen.getByTestId('custom-override')).toBeInTheDocument();
      expect(screen.getByText('Custom Spinner')).toBeInTheDocument();
    });

    test('does not render default content when override provided', () => {
      render(<Spinner componentOverrides={{ reactNode: <span>Override</span> }} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('passes render props to componentOverrides.reactNode function', () => {
      render(
        <Spinner
          size='lg'
          label='Loading results'
          componentOverrides={{
            reactNode: (props) => (
              <div data-testid='render-props'>{`${props?.size}:${props?.label}`}</div>
            ),
          }}
        />,
      );
      expect(screen.getByTestId('render-props')).toHaveTextContent('lg:Loading results');
    });
  });

  describe('CSS classes', () => {
    test('has cio-spinner class', () => {
      render(<Spinner />);
      expect(screen.getByRole('status').classList.contains('cio-spinner')).toBeTruthy();
    });

    test('has cio-components class', () => {
      render(<Spinner />);
      expect(screen.getByRole('status').classList.contains('cio-components')).toBeTruthy();
    });

    test('merges custom className', () => {
      render(<Spinner className='my-custom-class' />);
      expect(screen.getByRole('status').classList.contains('my-custom-class')).toBeTruthy();
    });

    test('is display:block, standing in for absent Tailwind preflight', () => {
      render(<Spinner />);
      expect(screen.getByRole('status').classList.contains('cio:block')).toBeTruthy();
    });

    test('applies no positioning of its own', () => {
      render(<Spinner />);
      // SVG elements expose `className` as an SVGAnimatedString, so read the attribute
      const className = screen.getByRole('status').getAttribute('class') ?? '';
      expect(className).not.toMatch(/absolute|fixed|relative/);
    });
  });

  describe('passthrough props', () => {
    test('spreads data-* attributes correctly', () => {
      render(<Spinner data-testid='spinner-test' data-cnstrc-loading='true' />);
      const element = screen.getByTestId('spinner-test');
      expect(element.dataset.cnstrcLoading).toBe('true');
    });

    test('allows overriding aria-label via props', () => {
      render(<Spinner aria-label='Custom aria' />);
      expect(screen.getByRole('status', { name: 'Custom aria' })).toBeInTheDocument();
    });
  });
});
