import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import FilterOptionListRow from '@/components/filter-option-list-row';

describe('FilterOptionListRow component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('basic rendering', () => {
    test('renders with display value', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      expect(screen.getByText('Red')).toBeInTheDocument();
    });

    test('renders with display count', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          onChange={() => {}}
        />,
      );
      expect(screen.getByText('1572')).toBeInTheDocument();
    });

    test('renders as list item', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
    });

    test('renders checkbox input', () => {
      render(
        <FilterOptionListRow
          id='test-checkbox'
          optionValue='blue'
          displayValue='Blue'
          onChange={() => {}}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
      expect(checkbox).toHaveAttribute('value', 'blue');
    });
  });

  describe('checkbox behavior', () => {
    test('checkbox is unchecked by default', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    test('checkbox is checked when isChecked is true', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          isChecked={true}
          onChange={() => {}}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    test('calls onChange when checkbox is clicked', () => {
      const handleChange = vi.fn();
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={handleChange}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith('red');
    });

    test('calls onChange with correct value', () => {
      const handleChange = vi.fn();
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='my-custom-value'
          displayValue='Custom'
          onChange={handleChange}
        />,
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith('my-custom-value');
    });

    test('calls onChange when label is clicked', () => {
      const handleChange = vi.fn();
      render(
        <FilterOptionListRow
          id='test-label'
          optionValue='blue'
          displayValue='Blue'
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
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const checkboxIndicator = document.querySelector('.cio-checkbox');
      expect(checkboxIndicator).toBeInTheDocument();
    });

    test('hides checkbox indicator when checkboxPosition is none', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          checkboxPosition='none'
          onChange={() => {}}
        />,
      );
      const checkboxIndicator = document.querySelector('.cio-checkbox');
      expect(checkboxIndicator).not.toBeInTheDocument();
    });
  });

  describe('startContent prop', () => {
    test('renders startContent before display value', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          startContent={<span data-testid='start-content'>★</span>}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('start-content')).toBeInTheDocument();
    });

    test('startContent appears in correct position', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          startContent={<span data-testid='start-content'>★</span>}
          onChange={() => {}}
        />,
      );
      const display = document.querySelector('.cio-filter-multiple-option-display');
      expect(display?.firstElementChild).toHaveAttribute('data-testid', 'start-content');
    });
  });

  describe('componentOverrides', () => {
    test('renders componentOverride.reactNode when passed', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            reactNode: <li data-testid='custom-override'>Custom Row</li>,
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-override')).toBeInTheDocument();
      expect(screen.getByText('Custom Row')).toBeInTheDocument();
    });

    test('does not render default content when override provided', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            reactNode: <li>Override</li>,
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.queryByText('Red')).not.toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    test('has cio-filter-option-list-row class', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-filter-option-list-row')).toBeTruthy();
    });

    test('has cio-filter-multiple-option class', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-filter-multiple-option')).toBeTruthy();
    });

    test('merges custom className', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          className='my-custom-class'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('my-custom-class')).toBeTruthy();
    });

    test('has text-base class by default', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('text-base')).toBeTruthy();
    });
  });

  describe('data attributes', () => {
    test('has data-slot attribute', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveAttribute('data-slot', 'filter-option-list-row');
    });

    test('spreads data-* attributes correctly', () => {
      render(
        <FilterOptionListRow
          id='test-1'
          optionValue='red'
          displayValue='Red'
          data-testid='filter-row'
          data-facet='color'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByTestId('filter-row');
      expect(listItem.dataset.facet).toBe('color');
    });
  });
});
