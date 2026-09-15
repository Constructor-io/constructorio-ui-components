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

    test('render-prop reactNode receives children so nested content can be re-emitted', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            reactNode: (props) => <li data-testid='custom-override'>{props.children}</li>,
          }}
          onChange={() => {}}>
          <span data-testid='nested-child'>Nested</span>
        </FilterOption>,
      );
      const override = screen.getByTestId('custom-override');
      expect(override).toBeInTheDocument();
      expect(screen.getByTestId('nested-child')).toBeInTheDocument();
      // The nested child is inside the overridden node, not lost.
      expect(override).toContainElement(screen.getByTestId('nested-child'));
    });
  });

  describe('radio selection type', () => {
    test('renders radio input with correct attributes and group name', () => {
      render(
        <FilterOption
          id='radio-1'
          optionValue='red'
          displayValue='Red'
          selectionType='radio'
          groupName='color-facet'
          onChange={() => {}}
        />,
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
      expect(radio).toHaveAttribute('id', 'radio-1');
      expect(radio).toHaveAttribute('value', 'red');
      expect(radio).toHaveAttribute('name', 'color-facet');
      expect(radio).not.toBeChecked();
    });

    test('renders radio visual indicator and responds to checked state', () => {
      render(
        <FilterOption
          id='radio-2'
          optionValue='blue'
          displayValue='Blue'
          selectionType='radio'
          groupName='color-facet'
          isChecked={true}
          onChange={() => {}}
        />,
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
      const radioIndicator = document.querySelector('.cio-radio');
      expect(radioIndicator).toBeInTheDocument();
      expect(document.querySelector('.cio-checkbox')).not.toBeInTheDocument();
    });

    test('calls onChange and respects checkboxPosition for radio', () => {
      const handleChange = vi.fn();
      render(
        <FilterOption
          id='radio-3'
          optionValue='green'
          displayValue='Green'
          selectionType='radio'
          groupName='color-facet'
          checkboxPosition='right'
          onChange={handleChange}
        />,
      );
      const radio = screen.getByRole('radio');
      fireEvent.click(radio);
      expect(handleChange).toHaveBeenCalledWith('green');
      const label = document.querySelector('.cio-filter-option-label');
      const radioIndicator = label?.querySelector('.cio-radio');
      const displayDiv = label?.querySelector('.cio-filter-multiple-option-display');
      expect(displayDiv?.nextElementSibling).toBe(radioIndicator);
    });

    test('hides radio indicator when checkboxPosition is none', () => {
      render(
        <FilterOption
          id='radio-4'
          optionValue='red'
          displayValue='Red'
          selectionType='radio'
          groupName='color-facet'
          checkboxPosition='none'
          onChange={() => {}}
        />,
      );
      expect(document.querySelector('.cio-radio')).not.toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
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

    test('has cio:text-base class by default', () => {
      render(<FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}} />);
      const listItem = screen.getByRole('listitem');
      expect(listItem.classList.contains('cio:text-base')).toBeTruthy();
    });

    test('label takes the leftover space rather than sizing to its text', () => {
      const { container } = render(
        <FilterOption id='test-1' optionValue='red' displayValue='Red' onChange={() => {}}>
          <button type='button'>beside the label</button>
        </FilterOption>,
      );
      // `grow basis-0 min-w-0`: a long display value wraps inside the label instead of claiming
      // the whole flex line and pushing a sibling (e.g. a hierarchy toggle) onto its own line.
      const label = container.querySelector('.cio-filter-option-label');
      expect(label?.classList.contains('cio:grow')).toBeTruthy();
      expect(label?.classList.contains('cio:basis-0')).toBeTruthy();
      expect(label?.classList.contains('cio:min-w-0')).toBeTruthy();
    });
  });

  describe('endContent prop', () => {
    test('renders endContent', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          endContent={<span data-testid='end-content'>›</span>}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('end-content')).toBeInTheDocument();
    });

    test('endContent renders after the count', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          endContent={<span data-testid='end-content'>›</span>}
          onChange={() => {}}
        />,
      );
      const display = document.querySelector('.cio-filter-multiple-option-display');
      expect(display?.lastElementChild).toHaveAttribute('data-testid', 'end-content');
    });

    test('renders both startContent and endContent', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          startContent={<span data-testid='start-content'>★</span>}
          endContent={<span data-testid='end-content'>›</span>}
          onChange={() => {}}
        />,
      );
      const display = document.querySelector('.cio-filter-multiple-option-display');
      expect(display?.firstElementChild).toHaveAttribute('data-testid', 'start-content');
      expect(display?.lastElementChild).toHaveAttribute('data-testid', 'end-content');
    });
  });

  describe('componentOverrides - inner parts', () => {
    test('indicator override replaces the checkbox indicator', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            indicator: { reactNode: <span data-testid='custom-indicator'>[x]</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
      expect(document.querySelector('.cio-checkbox')).not.toBeInTheDocument();
      // The rest of the row survives.
      expect(screen.getByText('Red')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('indicator override applies in radio mode too', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          selectionType='radio'
          componentOverrides={{
            indicator: { reactNode: <span data-testid='custom-indicator'>(o)</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
      expect(document.querySelector('.cio-radio')).not.toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    test('indicator override is not rendered when checkboxPosition is none', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          checkboxPosition='none'
          componentOverrides={{
            indicator: { reactNode: <span data-testid='custom-indicator'>[x]</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.queryByTestId('custom-indicator')).not.toBeInTheDocument();
    });

    test('name override replaces the display value', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          componentOverrides={{
            name: { reactNode: <span data-testid='custom-name'>Custom Name</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-name')).toBeInTheDocument();
      expect(screen.queryByText('Red')).not.toBeInTheDocument();
      // Count and indicator are untouched.
      expect(screen.getByText('1572')).toBeInTheDocument();
      expect(document.querySelector('.cio-checkbox')).toBeInTheDocument();
    });

    test('count override replaces the count', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          componentOverrides={{
            count: { reactNode: <span data-testid='custom-count'>lots</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-count')).toBeInTheDocument();
      expect(screen.queryByText('1572')).not.toBeInTheDocument();
      expect(screen.getByText('Red')).toBeInTheDocument();
    });

    test('count override does not render when displayCountValue is absent', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            count: { reactNode: <span data-testid='custom-count'>lots</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.queryByTestId('custom-count')).not.toBeInTheDocument();
    });

    test('inner override render-prop functions receive render props', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          isChecked
          componentOverrides={{
            name: {
              reactNode: (props) => (
                <span data-testid='custom-name'>
                  {props.displayValue}/{props.optionValue}/{String(props.isChecked)}
                </span>
              ),
            },
            count: {
              reactNode: (props) => (
                <span data-testid='custom-count'>{props.displayCountValue}</span>
              ),
            },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-name')).toHaveTextContent('Red/red/true');
      expect(screen.getByTestId('custom-count')).toHaveTextContent('1572');
    });

    test('inner overrides compose with each other', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          componentOverrides={{
            indicator: { reactNode: <span data-testid='custom-indicator'>[x]</span> },
            name: { reactNode: <span data-testid='custom-name'>Name</span> },
            count: { reactNode: <span data-testid='custom-count'>Count</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
      expect(screen.getByTestId('custom-name')).toBeInTheDocument();
      expect(screen.getByTestId('custom-count')).toBeInTheDocument();
    });

    test('root reactNode override still wins over inner parts', () => {
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='1572'
          componentOverrides={{
            reactNode: <li data-testid='root-override'>Whole row</li>,
            name: { reactNode: <span data-testid='custom-name'>Name</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('root-override')).toBeInTheDocument();
      expect(screen.queryByTestId('custom-name')).not.toBeInTheDocument();
    });

    test('inner override still fires onChange through the label', () => {
      const handleChange = vi.fn();
      render(
        <FilterOption
          id='test-1'
          optionValue='red'
          displayValue='Red'
          componentOverrides={{
            name: { reactNode: <span data-testid='custom-name'>Custom</span> },
          }}
          onChange={handleChange}
        />,
      );
      fireEvent.click(screen.getByTestId('custom-name'));
      expect(handleChange).toHaveBeenCalledWith('red');
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
