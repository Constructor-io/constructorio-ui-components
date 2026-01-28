import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import VisualFilterOptionListRow from '@/components/visual-filter-option-list-row';

describe('VisualFilterOptionListRow component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('basic rendering', () => {
    test('renders with display value', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      expect(screen.getByText('Red')).toBeInTheDocument();
    });

    test('renders with display count', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='685'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      expect(screen.getByText('685')).toBeInTheDocument();
    });

    test('renders as list item', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
    });
  });

  describe('visual swatch - color type', () => {
    test('renders color swatch with hex value', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toBeInTheDocument();
      expect(swatch).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    test('renders black color swatch', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='black'
          displayValue='Black'
          visualType='color'
          visualValue='#000000'
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' });
    });

    test('renders white color swatch', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='white'
          displayValue='White'
          visualType='color'
          visualValue='#FFFFFF'
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });
    });
  });

  describe('visual swatch - image type', () => {
    test('renders image swatch with src', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='floral'
          displayValue='Floral'
          visualType='image'
          visualValue='https://example.com/pattern.jpg'
        />,
      );
      const img = screen.getByAltText('Floral');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/pattern.jpg');
    });
  });

  describe('checkbox behavior', () => {
    test('checkbox is unchecked by default', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    test('checkbox is checked when isChecked is true', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          isChecked={true}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    test('calls onChange when checkbox is clicked', () => {
      const handleChange = vi.fn();
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='purple'
          displayValue='Purple'
          visualType='color'
          visualValue='#A855F7'
          onChange={handleChange}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith('purple');
    });

    test('calls onChange when label is clicked', () => {
      const handleChange = vi.fn();
      render(
        <VisualFilterOptionListRow
          id='test-label'
          optionValue='blue'
          displayValue='Blue'
          visualType='color'
          visualValue='#0000FF'
          onChange={handleChange}
        />,
      );
      fireEvent.click(screen.getByText('Blue'));
      expect(handleChange).toHaveBeenCalledWith('blue');
    });
  });

  describe('showCheckbox prop', () => {
    test('shows checkbox indicator by default', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const checkboxIndicator = document.querySelector('.cio-checkbox');
      expect(checkboxIndicator).toBeInTheDocument();
    });

    test('hides checkbox indicator when checkboxPosition is none', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          checkboxPosition='none'
        />,
      );
      const checkboxIndicator = document.querySelector('.cio-checkbox');
      expect(checkboxIndicator).not.toBeInTheDocument();
    });
  });

  describe('componentOverrides', () => {
    test('renders componentOverride.reactNode when passed', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            reactNode: <li data-testid='custom-override'>Custom Visual Row</li>,
          }}
        />,
      );
      expect(screen.getByTestId('custom-override')).toBeInTheDocument();
      expect(screen.getByText('Custom Visual Row')).toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    test('has cio-visual-filter-option-list-row class', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-visual-filter-option-list-row')).toBeTruthy();
    });

    test('has cio-filter-multiple-option class', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-filter-multiple-option')).toBeTruthy();
    });

    test('swatch has cio-filter-visual-swatch class', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toBeInTheDocument();
    });

    test('has text-base class by default', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('text-base')).toBeTruthy();
    });
  });

  describe('data attributes', () => {
    test('has data-slot attribute', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveAttribute('data-slot', 'visual-filter-option-list-row');
    });

    test('spreads data-* attributes correctly', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          data-testid='visual-filter-row'
          data-facet='color'
        />,
      );
      const listItem = screen.getByTestId('visual-filter-row');
      expect(listItem.dataset.facet).toBe('color');
    });
  });

  describe('layout structure', () => {
    test('swatch appears before option name in DOM order', () => {
      render(
        <VisualFilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
        />,
      );
      const display = document.querySelector('.cio-filter-multiple-option-display');
      const children = display?.children;
      expect(children?.[0]?.classList.contains('cio-filter-visual-swatch')).toBeTruthy();
      expect(children?.[1]?.classList.contains('cio-filter-option-name')).toBeTruthy();
    });
  });
});
