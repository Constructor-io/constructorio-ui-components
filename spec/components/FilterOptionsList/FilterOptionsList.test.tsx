import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import FilterOptionsList, { type FilterOptionData } from '@/components/filter-options-list';

// A 3-level fixture reused across tests.
const nestedOptions: FilterOptionData[] = [
  {
    id: 'l0',
    optionValue: 'level-0',
    displayValue: 'Level 0',
    displayCountValue: '100',
    hierarchies: [
      {
        id: 'l1',
        optionValue: 'level-1',
        displayValue: 'Level 1',
        isChecked: true,
        hierarchies: [
          {
            id: 'l2',
            optionValue: 'level-2',
            displayValue: 'Level 2',
          },
        ],
      },
    ],
  },
];

const flatOptions: FilterOptionData[] = [
  { id: 'a', optionValue: 'a', displayValue: 'Alpha' },
  { id: 'b', optionValue: 'b', displayValue: 'Bravo' },
  { id: 'c', optionValue: 'c', displayValue: 'Charlie' },
];

describe('FilterOptionsList component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('flat data', () => {
    test('renders all options as sibling rows', () => {
      render(<FilterOptionsList options={flatOptions} onChange={() => { }} />);
      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Bravo')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    test('renders a single top-level list without indentation', () => {
      const { container } = render(<FilterOptionsList options={flatOptions} onChange={() => { }} />);
      const lists = container.querySelectorAll('[data-slot="filter-options-list"]');
      expect(lists).toHaveLength(1);
      expect(lists[0].classList.contains('cio:pl-4')).toBeFalsy();
    });
  });

  describe('hierarchical rendering', () => {
    test('recurses into hierarchies at every depth', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => { }} />);
      // A leaf several levels deep is present.
      expect(screen.getByText('Level 0')).toBeInTheDocument();
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 2')).toBeInTheDocument();
    });

    test('renders a nested list per level with a data-slot', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} onChange={() => { }} />,
      );
      // Root + Level 0's children + Level 1's children = 3 lists.
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(3);
    });

    test('indents nested lists but not the root', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} onChange={() => { }} />,
      );
      const lists = Array.from(container.querySelectorAll('[data-slot="filter-options-list"]'));
      const indented = lists.filter((el) => el.classList.contains('cio:pl-4'));
      // Every list except the root is indented.
      expect(indented).toHaveLength(lists.length - 1);
      expect(lists[0].classList.contains('cio:pl-4')).toBeFalsy();
    });

    test('parent rows with children get cio:flex-col to stack the nested list below', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => { }} />);
      const parentRow = screen.getByText('Level 0').closest('li');
      expect(parentRow?.classList.contains('cio:flex-col')).toBeTruthy();
      const leafRow = screen.getByText('Level 2').closest('li');
      expect(leafRow?.classList.contains('cio:flex-col')).toBeFalsy();
    });
  });

  describe('selection at each depth', () => {
    test.each([
      ['Level 0', 'level-0'],
      ['Level 1', 'level-1'],
      ['Level 2', 'level-2'],
    ])('calls onChange with the option value when %s is clicked', (label, value) => {
      const handleChange = vi.fn();
      render(<FilterOptionsList options={nestedOptions} onChange={handleChange} />);
      fireEvent.click(screen.getByText(label));
      expect(handleChange).toHaveBeenCalledWith(value);
    });

    test('reflects isChecked state per depth', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => { }} />);
      // Level 1 is the only pre-checked node.
      expect(screen.getByText('Level 0').closest('li')?.querySelector('input')).not.toBeChecked();
      expect(screen.getByText('Level 1').closest('li')?.querySelector('input')).toBeChecked();
      expect(screen.getByText('Level 2').closest('li')?.querySelector('input')).not.toBeChecked();
    });
  });

  describe('componentOverrides', () => {
    test('list-level reactNode replaces the entire list', () => {
      render(
        <FilterOptionsList
          options={flatOptions}
          onChange={() => { }}
          componentOverrides={{
            reactNode: <ul data-testid='custom-list'>Custom list</ul>,
          }}
        />,
      );
      expect(screen.getByTestId('custom-list')).toBeInTheDocument();
      expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    });

    test('filterOption slot overrides every row', () => {
      render(
        <FilterOptionsList
          options={flatOptions}
          onChange={() => { }}
          componentOverrides={{
            filterOption: {
              reactNode: <li data-testid='custom-row'>Custom row</li>,
            },
          }}
        />,
      );
      expect(screen.getAllByTestId('custom-row')).toHaveLength(3);
      expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    });

    test('filterOption function targets a single option, leaving others at default', () => {
      render(
        <FilterOptionsList
          options={flatOptions}
          onChange={() => { }}
          componentOverrides={{
            filterOption: (option) =>
              option.id === 'b'
                ? { reactNode: <li data-testid='only-bravo'>Custom Bravo</li> }
                : undefined,
          }}
        />,
      );
      // Only Bravo is overridden; Alpha and Charlie render normally.
      expect(screen.getByTestId('only-bravo')).toBeInTheDocument();
      expect(screen.queryByText('Bravo')).not.toBeInTheDocument();
      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    test('filterOption function targets an option at depth', () => {
      render(
        <FilterOptionsList
          options={nestedOptions}
          onChange={() => { }}
          componentOverrides={{
            filterOption: (option) =>
              option.id === 'l2'
                ? { reactNode: <li data-testid='deep-override'>Deep</li> }
                : undefined,
          }}
        />,
      );
      // The depth-2 leaf is overridden; its ancestors render normally.
      expect(screen.getByTestId('deep-override')).toBeInTheDocument();
      expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
      expect(screen.getByText('Level 0')).toBeInTheDocument();
      expect(screen.getByText('Level 1')).toBeInTheDocument();
    });

    test('render-prop override on a parent row re-emits its nested children', () => {
      const { container } = render(
        <FilterOptionsList
          options={nestedOptions}
          onChange={() => { }}
          componentOverrides={{
            filterOption: (option) =>
              option.id === 'l0'
                ? {
                  reactNode: (props) => (
                    <li data-testid='parent-override'>
                      {props.displayValue}
                      {props.children}
                    </li>
                  ),
                }
                : undefined,
          }}
        />,
      );
      // The parent row is overridden but its subtree survives via props.children.
      expect(screen.getByTestId('parent-override')).toBeInTheDocument();
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 2')).toBeInTheDocument();
      // Nested list is still rendered beneath the overridden parent.
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(3);
    });
  });

  describe('empty hierarchies guard', () => {
    test('a node with an empty hierarchies array renders no nested list and no flex-col', () => {
      const options: FilterOptionData[] = [
        { id: 'leaf', optionValue: 'leaf', displayValue: 'Leaf', hierarchies: [] },
      ];
      const { container } = render(<FilterOptionsList options={options} onChange={() => { }} />);
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(1);
      expect(
        screen.getByText('Leaf').closest('li')?.classList.contains('cio:flex-col'),
      ).toBeFalsy();
    });
  });

  describe('conventions', () => {
    test('has data-slot attribute on the root list', () => {
      render(<FilterOptionsList options={flatOptions} onChange={() => { }} />);
      expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'filter-options-list');
    });

    test('has cio-filter-options-list class', () => {
      render(<FilterOptionsList options={flatOptions} onChange={() => { }} />);
      expect(screen.getByRole('list').classList.contains('cio-filter-options-list')).toBeTruthy();
    });

    test('merges custom className onto the root list', () => {
      render(
        <FilterOptionsList options={flatOptions} className='my-custom-class' onChange={() => { }} />,
      );
      expect(screen.getByRole('list').classList.contains('my-custom-class')).toBeTruthy();
    });

    test('spreads data-* attributes onto the root list', () => {
      render(
        <FilterOptionsList
          options={flatOptions}
          data-testid='my-list'
          data-facet='color'
          onChange={() => { }}
        />,
      );
      expect(screen.getByTestId('my-list').dataset.facet).toBe('color');
    });
  });

  describe('unique-id contract', () => {
    test('rows across branches toggle only their own input', () => {
      const handleChange = vi.fn();
      const options: FilterOptionData[] = [
        {
          id: 'branch-a',
          optionValue: 'branch-a',
          displayValue: 'Branch A',
          hierarchies: [{ id: 'a-child', optionValue: 'a-child', displayValue: 'A Child' }],
        },
        {
          id: 'branch-b',
          optionValue: 'branch-b',
          displayValue: 'Branch B',
          hierarchies: [{ id: 'b-child', optionValue: 'b-child', displayValue: 'B Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={handleChange} />);
      fireEvent.click(screen.getByText('A Child'));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('a-child');
    });
  });
});
