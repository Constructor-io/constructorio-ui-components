import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import VisualFilterOption from '@/components/visual-filter-option';

/**
 * Tests unique to VisualFilterOption.
 * Common functionality (checkbox behavior, basic rendering, onChange, etc.)
 * is tested in FilterOption.test.tsx since this component wraps it.
 */
describe('VisualFilterOption component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('visual swatch - color type', () => {
    test('renders color swatch with hex value', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toBeInTheDocument();
      expect(swatch).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    test('renders black color swatch', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='black'
          displayValue='Black'
          visualType='color'
          visualValue='#000000'
          onChange={() => {}}
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' });
    });

    test('renders white color swatch', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='white'
          displayValue='White'
          visualType='color'
          visualValue='#FFFFFF'
          onChange={() => {}}
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
    });
  });

  describe('visual swatch - image type', () => {
    test('renders image swatch with src', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='floral'
          displayValue='Floral'
          visualType='image'
          visualValue='https://example.com/pattern.jpg'
          onChange={() => {}}
        />,
      );
      const img = screen.getByAltText('Floral');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/pattern.jpg');
    });
  });

  describe('componentOverrides', () => {
    test('renders componentOverride.reactNode when passed', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            reactNode: <li data-testid='custom-override'>Custom Visual Option</li>,
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-override')).toBeInTheDocument();
      expect(screen.getByText('Custom Visual Option')).toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    test('has cio-visual-filter-option class', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-visual-filter-option')).toBeTruthy();
    });

    test('swatch has cio-filter-visual-swatch class', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toBeInTheDocument();
    });
  });

  describe('data attributes', () => {
    test('has data-slot attribute with visual-filter value', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveAttribute('data-slot', 'visual-filter-option');
    });
  });

  describe('layout structure', () => {
    test('swatch appears before option name in DOM order', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const display = document.querySelector('.cio-filter-multiple-option-display');
      const children = display?.children;
      expect(children?.[0]?.classList.contains('cio-filter-visual-swatch')).toBeTruthy();
      expect(children?.[1]?.classList.contains('cio-filter-option-name')).toBeTruthy();
    });
  });

  describe('checkbox default position', () => {
    test('checkbox defaults to right position', () => {
      render(
        <VisualFilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const label = document.querySelector('.cio-filter-option-label');
      const checkbox = label?.querySelector('.cio-checkbox');
      // Checkbox should be after the display div (right position)
      const displayDiv = label?.querySelector('.cio-filter-multiple-option-display');
      expect(displayDiv?.nextElementSibling).toBe(checkbox);
    });
  });
});
