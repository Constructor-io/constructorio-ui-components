import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import FilterOptionVisual from '@/components/filter-option--visual';

/**
 * Tests unique to FilterOptionVisual.
 * Common functionality (checkbox behavior, basic rendering, onChange, etc.)
 * is tested in FilterOption.test.tsx since this component wraps it.
 */
describe('FilterOptionVisual component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('visual swatch - color type', () => {
    test('renders color swatch with hex value', () => {
      render(
        <FilterOptionVisual
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
        <FilterOptionVisual
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
        <FilterOptionVisual
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
        <FilterOptionVisual
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
        <FilterOptionVisual
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

    test('chip override replaces the swatch', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            chip: { reactNode: <span data-testid='custom-chip'>swatch</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-chip')).toBeInTheDocument();
      expect(document.querySelector('.cio-filter-visual-swatch')).not.toBeInTheDocument();
      // The rest of the row survives.
      expect(screen.getByText('Red')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    test('chip override render-prop function receives the chip props', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            chip: {
              reactNode: (props) => (
                <span data-testid='custom-chip'>
                  {props.type}/{props.value}/{props.name}
                </span>
              ),
            },
          }}
          onChange={() => {}}
        />,
      );
      // `chip` forwards to `Chip`, so it sees the chip's props - not the row's. Every other key
      // sees the row's; this is the one asymmetry on the type, and it is documented there.
      expect(screen.getByTestId('custom-chip')).toHaveTextContent('color/#FF0000/Red');
    });

    test('inherited keys receive the row props, unlike chip', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='646'
          isChecked
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            name: {
              reactNode: (props) => (
                <span data-testid='custom-name'>
                  {props.displayValue}/{props.optionValue}/{String(props.isChecked)}
                </span>
              ),
            },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-name')).toHaveTextContent('Red/red/true');
    });

    test('inherited inner overrides still reach FilterOption', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          displayCountValue='646'
          visualType='color'
          visualValue='#FF0000'
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
      // The swatch is untouched by the inherited keys.
      expect(document.querySelector('.cio-filter-visual-swatch')).toBeInTheDocument();
    });

    test('chip and inherited overrides compose', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            chip: { reactNode: <span data-testid='custom-chip'>swatch</span> },
            name: { reactNode: <span data-testid='custom-name'>Name</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByTestId('custom-chip')).toBeInTheDocument();
      expect(screen.getByTestId('custom-name')).toBeInTheDocument();
    });

    test('componentOverrides is not forwarded to the DOM', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          componentOverrides={{
            chip: { reactNode: <span data-testid='custom-chip'>swatch</span> },
          }}
          onChange={() => {}}
        />,
      );
      expect(screen.getByRole('listitem')).not.toHaveAttribute('componentoverrides');
    });

    test('endContent renders on a visual row', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          endContent={<span data-testid='end-content'>›</span>}
          onChange={() => {}}
        />,
      );
      const display = document.querySelector('.cio-filter-multiple-option-display');
      expect(display?.lastElementChild).toHaveAttribute('data-testid', 'end-content');
    });
  });

  describe('CSS classes', () => {
    test('has cio-visual-filter-option class', () => {
      render(
        <FilterOptionVisual
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
        <FilterOptionVisual
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

    test('swatch has cio:mr-2 and cio:shrink-0 spacing classes', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const swatch = document.querySelector('.cio-filter-visual-swatch');
      expect(swatch).toHaveClass('cio:mr-2');
      expect(swatch).toHaveClass('cio:shrink-0');
    });
  });

  describe('data attributes', () => {
    test('has data-slot attribute with visual-filter value', () => {
      render(
        <FilterOptionVisual
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

  describe('radio selection type', () => {
    test('renders radio input with group name and visual swatch', () => {
      render(
        <FilterOptionVisual
          id='visual-radio-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          selectionType='radio'
          groupName='color-facet'
          onChange={() => {}}
        />,
      );
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
      expect(radio).toHaveAttribute('name', 'color-facet');
      expect(document.querySelector('.cio-radio')).toBeInTheDocument();
      expect(document.querySelector('.cio-checkbox')).not.toBeInTheDocument();
      expect(document.querySelector('.cio-filter-visual-swatch')).toBeInTheDocument();
    });
  });

  describe('layout structure', () => {
    test('swatch appears before option name in DOM order', () => {
      render(
        <FilterOptionVisual
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

  describe('children', () => {
    test('renders children inside the row', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}>
          <span data-testid='nested'>Nested</span>
        </FilterOptionVisual>,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem).toContainElement(screen.getByTestId('nested'));
    });

    test('renders children outside the label, after it', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}>
          <button type='button' data-testid='nested-control'>
            Toggle
          </button>
        </FilterOptionVisual>,
      );
      const child = screen.getByTestId('nested-control');
      // Interactive children must stay out of the <label>: a nested control is invalid markup
      // there and its clicks would also fire the row's checkbox.
      expect(child.closest('label')).toBeNull();
      expect(child.previousElementSibling).toBe(document.querySelector('.cio-filter-option-label'));
    });

    test('renders no extra nodes when children are omitted', () => {
      render(
        <FilterOptionVisual
          id='test-1'
          optionValue='red'
          displayValue='Red'
          visualType='color'
          visualValue='#FF0000'
          onChange={() => {}}
        />,
      );
      const listItem = screen.getByRole('listitem');
      expect(listItem.children).toHaveLength(1);
      expect(listItem.children[0].classList.contains('cio-filter-option-label')).toBeTruthy();
    });
  });

  describe('checkbox default position', () => {
    test('checkbox defaults to right position', () => {
      render(
        <FilterOptionVisual
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
