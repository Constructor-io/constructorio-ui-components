import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import FilterOption from '@/components/filter-option';

describe('FilterOption component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('basic rendering', () => {
    test('renders with display value', () => {
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      expect(screen.getByText('Red')).toBeInTheDocument();
    });

    test('renders with display count', () => {
      render(
        <FilterOption
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
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
    });

    test('renders checkbox input', () => {
      render(
        <FilterOption
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
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    test('checkbox is checked when isChecked is true', () => {
      render(
        <FilterOption
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
        <FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={handleChange} />,
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith('red');
    });

    test('calls onChange with correct value', () => {
      const handleChange = vi.fn();
      render(
        <FilterOption
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
        <FilterOption
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
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const checkboxIndicator = document.querySelector('.cio-checkbox');
      expect(checkboxIndicator).toBeInTheDocument();
    });

    test('hides checkbox indicator when checkboxPosition is none', () => {
      render(
        <FilterOption
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

    test('calls onChange when checkboxPosition is none and label is clicked', () => {
      const handleChange = vi.fn();
      render(
        <FilterOption
          id='test-none'
          optionValue='red'
          displayValue='Red'
          checkboxPosition='none'
          onChange={handleChange}
        />,
      );
      fireEvent.click(screen.getByText('Red'));
      expect(handleChange).toHaveBeenCalledWith('red');
    });
  });

  describe('startContent prop', () => {
    test('renders startContent before display value', () => {
      render(
        <FilterOption
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
        <FilterOption
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
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            reactNode: <li data-testid='custom-override'>Custom Option</li>,
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-override')).toBeInTheDocument();
      expect(screen.getByText('Custom Option')).toBeInTheDocument();
    });

    test('does not render default content when override provided', () => {
      render(
        <FilterOption
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
    test('has cio-filter-option class', () => {
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-filter-option')).toBeTruthy();
    });

    test('has cio-filter-multiple-option class', () => {
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio-filter-multiple-option')).toBeTruthy();
    });

    test('merges custom className', () => {
      render(
        <FilterOption
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
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('text-base')).toBeTruthy();
    });
  });

  describe('data attributes', () => {
    test('has data-slot attribute', () => {
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const listItem = screen.getByRole('listitem');
      expect(listItem).toHaveAttribute('data-slot', 'filter-option');
    });

    test('spreads data-* attributes correctly', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          data-testid='filter-option'
          data-facet='color'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByTestId('filter-option');
      expect(listItem.dataset.facet).toBe('color');
    });
  });
});
