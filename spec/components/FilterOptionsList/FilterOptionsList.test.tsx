import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import FilterOptionsList, {
  type FilterOptionData,
  type FilterOptionVisualData,
} from '@/components/filter-options-list';

// A 3-level fixture reused across tests.
const nestedOptions: FilterOptionData[] = [
  {
    id: 'l0',
    optionValue: 'level-0',
    displayValue: 'Level 0',
    displayCountValue: '100',
    options: [
      {
        id: 'l1',
        optionValue: 'level-1',
        displayValue: 'Level 1',
        isChecked: true,
        options: [
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
      render(<FilterOptionsList options={flatOptions} onChange={() => {}} />);
      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Bravo')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    test('renders a single top-level list without indentation', () => {
      const { container } = render(<FilterOptionsList options={flatOptions} onChange={() => {}} />);
      const lists = container.querySelectorAll('[data-slot="filter-options-list"]');
      expect(lists).toHaveLength(1);
      expect(lists[0].classList.contains('cio:pl-4')).toBeFalsy();
    });
  });

  describe('hierarchical rendering', () => {
    test('recurses into nested options at every depth', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      // A leaf several levels deep is present.
      expect(screen.getByText('Level 0')).toBeInTheDocument();
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 2')).toBeInTheDocument();
    });

    test('renders a nested list per level with a data-slot', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} onChange={() => {}} />,
      );
      // Root + Level 0's children + Level 1's children = 3 lists.
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(3);
    });

    test('indents rows in nested lists but not root rows', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      // Indentation sits on the nested rows rather than on the nested list itself, so the list
      // can stay width-neutral (next test). It still compounds with depth via DOM nesting.
      const isIndented = (label: string) =>
        screen.getByText(label).closest('li')?.classList.contains('cio:pl-4');
      expect(isIndented('Level 0')).toBeFalsy();
      expect(isIndented('Level 1')).toBeTruthy();
      expect(isIndented('Level 2')).toBeTruthy();
    });

    test('nested lists cannot widen the list when a branch expands', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} onChange={() => {}} />,
      );
      const lists = Array.from(container.querySelectorAll('[data-slot="filter-options-list"]'));
      // `w-0` keeps a nested list out of the list's intrinsic width - expanding a branch cannot
      // widen a content-sized panel - and `min-w-full` sizes it back to its row's full width.
      const widthNeutral = lists.filter(
        (el) => el.classList.contains('cio:w-0') && el.classList.contains('cio:min-w-full'),
      );
      expect(widthNeutral).toHaveLength(lists.length - 1);
      expect(lists[0].classList.contains('cio:w-0')).toBeFalsy();
    });

    test('parent rows wrap so the nested list takes the line below the row', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      const parentRow = screen.getByText('Level 0').closest('li');
      expect(parentRow?.classList.contains('cio:flex-wrap')).toBeTruthy();
      const leafRow = screen.getByText('Level 2').closest('li');
      expect(leafRow?.classList.contains('cio:flex-wrap')).toBeFalsy();
    });

    test('nested lists are full-width flex items so they wrap onto their own line', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} onChange={() => {}} />,
      );
      const lists = Array.from(container.querySelectorAll('[data-slot="filter-options-list"]'));
      const fullWidth = lists.filter((el) => el.classList.contains('cio:basis-full'));
      expect(fullWidth).toHaveLength(lists.length - 1);
      expect(lists[0].classList.contains('cio:basis-full')).toBeFalsy();
    });
  });

  describe('selection at each depth', () => {
    test.each([
      ['Level 0', 'level-0', 'l0'],
      ['Level 1', 'level-1', 'l1'],
      ['Level 2', 'level-2', 'l2'],
    ])('calls onChange with the value and the option when %s is clicked', (label, value, id) => {
      const handleChange = vi.fn();
      render(<FilterOptionsList options={nestedOptions} onChange={handleChange} />);
      fireEvent.click(screen.getByText(label));
      expect(handleChange).toHaveBeenCalledWith(value, expect.objectContaining({ id }));
    });

    test('passes the option object the consumer supplied, not a copy', () => {
      const handleChange = vi.fn();
      render(<FilterOptionsList options={nestedOptions} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Level 1'));
      // Identity is preserved, so consumers can compare with `===` and reach the option's own
      // fields - including its nested `options`.
      expect(handleChange.mock.calls[0][1]).toBe(nestedOptions[0].options?.[0]);
    });

    test('distinguishes options that share an optionValue across branches', () => {
      const handleChange = vi.fn();
      const options: FilterOptionData[] = [
        {
          id: 'black',
          optionValue: 'black',
          displayValue: 'Black',
          options: [{ id: 'black-blue', optionValue: 'blue', displayValue: 'Blue under Black' }],
        },
        { id: 'blue', optionValue: 'blue', displayValue: 'Blue' },
      ];
      render(<FilterOptionsList options={options} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Blue under Black'));
      fireEvent.click(screen.getByText('Blue'));
      // Both report the value 'blue'; only the second argument tells them apart.
      expect(handleChange.mock.calls.map(([value]) => value)).toEqual(['blue', 'blue']);
      expect(handleChange.mock.calls.map(([, option]) => option.id)).toEqual([
        'black-blue',
        'blue',
      ]);
    });

    test('reflects isChecked state per depth', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      // Level 1 is the only pre-checked node.
      expect(screen.getByText('Level 0').closest('li')?.querySelector('input')).not.toBeChecked();
      expect(screen.getByText('Level 1').closest('li')?.querySelector('input')).toBeChecked();
      expect(screen.getByText('Level 2').closest('li')?.querySelector('input')).not.toBeChecked();
    });
  });

  describe('collapsible branches', () => {
    // Scoped by data-slot rather than by role, so these counts keep meaning the number of
    // hierarchy toggles if a row ever grows a button of its own.
    const toggles = () =>
      Array.from(document.querySelectorAll('[data-slot="filter-option-hierarchy-toggle"]'));
    const spacers = () =>
      Array.from(document.querySelectorAll('[data-slot="filter-option-hierarchy-toggle-spacer"]'));

    test('only rows that have nested options get a toggle', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      // Level 0 and Level 1 are parents; Level 2 is a leaf.
      expect(toggles()).toHaveLength(2);
      expect(screen.getByText('Level 2').closest('li')?.querySelector('button')).toBeNull();
    });

    test('a flat list renders no toggles', () => {
      render(<FilterOptionsList options={flatOptions} onChange={() => {}} />);
      expect(toggles()).toHaveLength(0);
    });

    test('branches start expanded, with aria-expanded reflecting it', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      expect(screen.getByText('Level 2')).toBeInTheDocument();
      toggles().forEach((toggle) => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
    });

    test('clicking a toggle collapses the branch, and clicking again restores it', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      const toggle = screen.getByRole('button', { name: 'Collapse Level 0' });
      fireEvent.click(toggle);
      // The whole subtree below Level 0 is gone.
      expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
      expect(screen.getByText('Level 0')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand Level 0' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );

      fireEvent.click(screen.getByRole('button', { name: 'Expand Level 0' }));
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 2')).toBeInTheDocument();
    });

    test('collapsing one branch leaves its siblings expanded', () => {
      const options: FilterOptionData[] = [
        {
          id: 'a',
          optionValue: 'a',
          displayValue: 'Alpha',
          options: [{ id: 'a1', optionValue: 'a1', displayValue: 'Alpha Child' }],
        },
        {
          id: 'b',
          optionValue: 'b',
          displayValue: 'Bravo',
          options: [{ id: 'b1', optionValue: 'b1', displayValue: 'Bravo Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Alpha' }));
      expect(screen.queryByText('Alpha Child')).not.toBeInTheDocument();
      expect(screen.getByText('Bravo Child')).toBeInTheDocument();
    });

    test('clicking a toggle does not select the option', () => {
      const handleChange = vi.fn();
      render(<FilterOptionsList options={nestedOptions} onChange={handleChange} />);
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Level 0' }));
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('the toggle sits beside the label, never inside it', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      const row = screen.getByText('Level 0').closest('li');
      const toggle = row?.querySelector('[data-slot="filter-option-hierarchy-toggle"]');
      // A <button> inside a <label> is invalid and would double-fire onto the checkbox.
      expect(toggle?.parentElement).toBe(row);
      expect(row?.querySelector('label')?.querySelector('button')).toBeNull();
    });

    test('aria-controls points at the nested list while it is mounted', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      const toggle = screen.getByRole('button', { name: 'Collapse Level 0' });
      const controls = toggle.getAttribute('aria-controls');
      // Derived from the row's own id, so it stays predictable for consumers styling or
      // querying the nested list.
      expect(controls).toBe('l0-hierarchy');
      expect(document.getElementById(controls as string)).toHaveAttribute(
        'data-slot',
        'filter-options-list',
      );
      // Collapsing unmounts the list, so the reference is dropped rather than left dangling.
      fireEvent.click(toggle);
      expect(
        screen.getByRole('button', { name: 'Expand Level 0' }).getAttribute('aria-controls'),
      ).toBeNull();
    });

    test('branches with no toggle get no generated id at all', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} collapsible={false} onChange={() => {}} />,
      );
      container.querySelectorAll('[data-slot="filter-options-list"]').forEach((list) => {
        expect(list.id).toBe('');
      });
    });

    test('option ids that collide with Object.prototype keys still respect their default', () => {
      // `toggledIds['constructor']` resolves through the prototype chain, so a naive
      // `!== undefined` check reads these rows as "already toggled by the user".
      const options: FilterOptionData[] = ['constructor', 'toString', 'hasOwnProperty'].map(
        (id) => ({
          id,
          optionValue: id,
          displayValue: id,
          defaultCollapsed: true,
          options: [{ id: `${id}-1`, optionValue: `${id}-1`, displayValue: `${id} child` }],
        }),
      );
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      options.forEach((option) => {
        expect(screen.queryByText(`${option.id} child`)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: `Expand ${option.id}` })).toHaveAttribute(
          'aria-expanded',
          'false',
        );
      });
    });

    test('option ids that collide with Object.prototype keys are still toggleable', () => {
      const options: FilterOptionData[] = [
        {
          id: 'constructor',
          optionValue: 'constructor',
          displayValue: 'Constructor',
          options: [{ id: 'brand-1', optionValue: 'brand-1', displayValue: 'Brand Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Constructor' }));
      expect(screen.queryByText('Brand Child')).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Expand Constructor' }));
      expect(screen.getByText('Brand Child')).toBeInTheDocument();
    });

    test('collapsible={false} renders branches with no toggles', () => {
      const { container } = render(
        <FilterOptionsList options={nestedOptions} collapsible={false} onChange={() => {}} />,
      );
      expect(toggles()).toHaveLength(0);
      expect(screen.getByText('Level 2')).toBeInTheDocument();
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(3);
    });

    test('defaultCollapsed starts every branch closed', () => {
      const options: FilterOptionData[] = [
        {
          id: 'a',
          optionValue: 'a',
          displayValue: 'Alpha',
          options: [{ id: 'a1', optionValue: 'a1', displayValue: 'Alpha Child' }],
        },
      ];
      render(<FilterOptionsList options={options} defaultCollapsed onChange={() => {}} />);
      expect(screen.queryByText('Alpha Child')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand Alpha' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    test('auto-expands the path to a checked option even when collapsed by default', () => {
      render(<FilterOptionsList options={nestedOptions} defaultCollapsed onChange={() => {}} />);
      // Level 1 is checked, so its ancestor opens to reveal it...
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      // ...but Level 1's own branch has nothing checked, so it stays closed.
      expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
    });

    test('row-level collapsible overrides the list', () => {
      const options: FilterOptionData[] = [
        {
          id: 'fixed',
          optionValue: 'fixed',
          displayValue: 'Fixed',
          collapsible: false,
          options: [{ id: 'fixed-1', optionValue: 'fixed-1', displayValue: 'Fixed Child' }],
        },
        {
          id: 'toggleable',
          optionValue: 'toggleable',
          displayValue: 'Toggleable',
          options: [{ id: 'tog-1', optionValue: 'tog-1', displayValue: 'Toggleable Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      expect(toggles()).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'Collapse Toggleable' })).toBeInTheDocument();
      // The non-collapsible branch is always shown.
      expect(screen.getByText('Fixed Child')).toBeInTheDocument();
    });

    test('row-level collapsible={true} overrides a list that opted out', () => {
      const options: FilterOptionData[] = [
        {
          id: 'toggleable',
          optionValue: 'toggleable',
          displayValue: 'Toggleable',
          collapsible: true,
          options: [{ id: 'tog-1', optionValue: 'tog-1', displayValue: 'Toggleable Child' }],
        },
        {
          id: 'fixed',
          optionValue: 'fixed',
          displayValue: 'Fixed',
          options: [{ id: 'fixed-1', optionValue: 'fixed-1', displayValue: 'Fixed Child' }],
        },
      ];
      render(<FilterOptionsList options={options} collapsible={false} onChange={() => {}} />);
      // Only the row that opted back in gets a toggle, and it still collapses.
      expect(toggles()).toHaveLength(1);
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Toggleable' }));
      expect(screen.queryByText('Toggleable Child')).not.toBeInTheDocument();
      expect(screen.getByText('Fixed Child')).toBeInTheDocument();
    });

    test('row-level defaultCollapsed overrides the list default', () => {
      const options: FilterOptionData[] = [
        {
          id: 'closed',
          optionValue: 'closed',
          displayValue: 'Closed',
          defaultCollapsed: true,
          options: [{ id: 'closed-1', optionValue: 'closed-1', displayValue: 'Closed Child' }],
        },
        {
          id: 'open',
          optionValue: 'open',
          displayValue: 'Open',
          options: [{ id: 'open-1', optionValue: 'open-1', displayValue: 'Open Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      expect(screen.queryByText('Closed Child')).not.toBeInTheDocument();
      expect(screen.getByText('Open Child')).toBeInTheDocument();
    });

    test('row-level defaultCollapsed={false} overrides a collapsed-by-default list', () => {
      const options: FilterOptionData[] = [
        {
          id: 'open',
          optionValue: 'open',
          displayValue: 'Open',
          defaultCollapsed: false,
          options: [{ id: 'open-1', optionValue: 'open-1', displayValue: 'Open Child' }],
        },
        {
          id: 'follows',
          optionValue: 'follows',
          displayValue: 'Follows',
          options: [{ id: 'follows-1', optionValue: 'follows-1', displayValue: 'Follows Child' }],
        },
      ];
      render(<FilterOptionsList options={options} defaultCollapsed onChange={() => {}} />);
      // An explicit `false` is a value, not an absent prop, so it must beat the list default.
      expect(screen.getByText('Open Child')).toBeInTheDocument();
      expect(screen.queryByText('Follows Child')).not.toBeInTheDocument();
    });

    test('row-level defaultCollapsed also overrides the auto-expand rule', () => {
      const options: FilterOptionData[] = [
        {
          id: 'closed',
          optionValue: 'closed',
          displayValue: 'Closed',
          defaultCollapsed: true,
          options: [
            {
              id: 'closed-1',
              optionValue: 'closed-1',
              displayValue: 'Closed Child',
              isChecked: true,
            },
          ],
        },
      ];
      render(<FilterOptionsList options={options} defaultCollapsed onChange={() => {}} />);
      // An explicit value in the data wins over the derived "never hide a selection" rule.
      expect(screen.queryByText('Closed Child')).not.toBeInTheDocument();
    });

    test('a row-level default still yields to a user toggle', () => {
      const options: FilterOptionData[] = [
        {
          id: 'closed',
          optionValue: 'closed',
          displayValue: 'Closed',
          defaultCollapsed: true,
          options: [{ id: 'closed-1', optionValue: 'closed-1', displayValue: 'Closed Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Expand Closed' }));
      expect(screen.getByText('Closed Child')).toBeInTheDocument();
    });

    describe('toggle alignment spacer', () => {
      // A level that shows any toggle gives every other row on that level an equal-width
      // stand-in, so counts stay in one column instead of stepping left row to row.
      const mixedLevel: FilterOptionData[] = [
        {
          id: 'parent',
          optionValue: 'parent',
          displayValue: 'Parent',
          options: [{ id: 'child', optionValue: 'child', displayValue: 'Child' }],
        },
        { id: 'leaf', optionValue: 'leaf', displayValue: 'Leaf' },
      ];

      test('leaf rows on a level that has a toggle get a spacer instead', () => {
        render(<FilterOptionsList options={mixedLevel} onChange={() => {}} />);
        const leafRow = screen.getByText('Leaf').closest('li');
        expect(
          leafRow?.querySelector('[data-slot="filter-option-hierarchy-toggle-spacer"]'),
        ).toBeInTheDocument();
        // The row that owns the toggle needs no stand-in for it.
        const parentRow = screen.getByText('Parent').closest('li');
        expect(
          parentRow?.querySelector('[data-slot="filter-option-hierarchy-toggle-spacer"]'),
        ).toBeNull();
        expect(spacers()).toHaveLength(1);
      });

      test('a level with no toggles gets no spacers', () => {
        render(<FilterOptionsList options={mixedLevel} onChange={() => {}} />);
        // 'Child' is the only row on the nested level, and nothing there has a toggle.
        const childRow = screen.getByText('Child').closest('li');
        expect(
          childRow?.querySelector('[data-slot="filter-option-hierarchy-toggle-spacer"]'),
        ).toBeNull();
      });

      test('a flat list renders no spacers', () => {
        render(<FilterOptionsList options={flatOptions} onChange={() => {}} />);
        expect(spacers()).toHaveLength(0);
      });

      test('collapsible={false} renders no spacers either', () => {
        render(<FilterOptionsList options={mixedLevel} collapsible={false} onChange={() => {}} />);
        expect(toggles()).toHaveLength(0);
        expect(spacers()).toHaveLength(0);
      });

      test('a parent row that opted out of collapsing gets a spacer', () => {
        const options: FilterOptionData[] = [
          ...mixedLevel,
          {
            id: 'pinned',
            optionValue: 'pinned',
            displayValue: 'Pinned',
            collapsible: false,
            options: [{ id: 'pinned-1', optionValue: 'pinned-1', displayValue: 'Pinned Child' }],
          },
        ];
        render(<FilterOptionsList options={options} onChange={() => {}} />);
        const pinnedRow = screen.getByText('Pinned').closest('li');
        expect(
          pinnedRow?.querySelector('[data-slot="filter-option-hierarchy-toggle-spacer"]'),
        ).toBeInTheDocument();
      });

      test('the spacer matches the footprint of the toggle it stands in for', () => {
        render(<FilterOptionsList options={mixedLevel} onChange={() => {}} />);
        const footprint = ['cio:w-6', 'cio:ml-1', 'cio:shrink-0'];
        footprint.forEach((className) => {
          expect(toggles()[0].classList.contains(className)).toBeTruthy();
          expect(spacers()[0].classList.contains(className)).toBeTruthy();
        });
      });

      test('the spacer is hidden from assistive technology', () => {
        render(<FilterOptionsList options={mixedLevel} onChange={() => {}} />);
        expect(spacers()[0]).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('collapsing a parent preserves the toggles the user made inside it', () => {
      render(<FilterOptionsList options={nestedOptions} onChange={() => {}} />);
      // Close the inner branch, then close and reopen its parent.
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Level 1' }));
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Level 0' }));
      fireEvent.click(screen.getByRole('button', { name: 'Expand Level 0' }));
      // Level 1 comes back the way the user left it rather than reset to the default.
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
    });

    test('visual rows get a toggle too', () => {
      const options: FilterOptionData[] = [
        {
          id: 'v-blue',
          optionValue: 'blue',
          displayValue: 'Blue',
          visual: { type: 'color', value: '#0000FF' },
          options: [
            {
              id: 'v-navy',
              optionValue: 'navy',
              displayValue: 'Navy',
              visual: { type: 'color', value: '#000080' },
            },
          ],
        },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Collapse Blue' }));
      expect(screen.queryByText('Navy')).not.toBeInTheDocument();
      expect(document.querySelectorAll('.cio-filter-visual-swatch')).toHaveLength(1);
    });
  });

  describe('visual options', () => {
    const visualOptions: FilterOptionData[] = [
      {
        id: 'v-red',
        optionValue: 'red',
        displayValue: 'Red',
        visual: { type: 'color', value: '#FF0000' },
      },
      {
        id: 'v-floral',
        optionValue: 'floral',
        displayValue: 'Floral',
        visual: { type: 'image', value: 'https://example.com/pattern.jpg' },
      },
    ];

    test('renders a visual row for options carrying a visual', () => {
      render(<FilterOptionsList options={visualOptions} onChange={() => {}} />);
      const rows = screen.getAllByRole('listitem');
      expect(rows).toHaveLength(2);
      rows.forEach((row) => expect(row).toHaveAttribute('data-slot', 'visual-filter-option'));
    });

    test('renders a color swatch and an image swatch from the data', () => {
      render(<FilterOptionsList options={visualOptions} onChange={() => {}} />);
      const swatches = document.querySelectorAll('.cio-filter-visual-swatch');
      expect(swatches).toHaveLength(2);
      expect(swatches[0]).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
      expect(screen.getByAltText('Floral')).toHaveAttribute(
        'src',
        'https://example.com/pattern.jpg',
      );
    });

    test('falls back to a plain row when only one half of the visual is present', () => {
      // TypeScript requires both halves of `visual`, so only a JS consumer can build these -
      // hence the casts. They must degrade to plain rows rather than render an empty swatch.
      const partial: FilterOptionData[] = [
        {
          id: 'p1',
          optionValue: 'p1',
          displayValue: 'Type only',
          visual: { type: 'color' } as FilterOptionVisualData,
        },
        {
          id: 'p2',
          optionValue: 'p2',
          displayValue: 'Value only',
          visual: { value: '#FF0000' } as FilterOptionVisualData,
        },
      ];
      render(<FilterOptionsList options={partial} onChange={() => {}} />);
      screen.getAllByRole('listitem').forEach((row) => {
        expect(row).toHaveAttribute('data-slot', 'filter-option');
      });
      expect(document.querySelector('.cio-filter-visual-swatch')).toBeNull();
    });

    test('mixes visual and plain rows in the same list', () => {
      const options: FilterOptionData[] = [
        ...visualOptions,
        { id: 'plain', optionValue: 'plain', displayValue: 'Plain' },
      ];
      render(<FilterOptionsList options={options} onChange={() => {}} />);
      expect(screen.getByText('Plain').closest('li')).toHaveAttribute('data-slot', 'filter-option');
      expect(screen.getByText('Red').closest('li')).toHaveAttribute(
        'data-slot',
        'visual-filter-option',
      );
    });

    test('a visual row keeps its nested options', () => {
      const options: FilterOptionData[] = [
        {
          id: 'v-blue',
          optionValue: 'blue',
          displayValue: 'Blue',
          visual: { type: 'color', value: '#0000FF' },
          options: [
            {
              id: 'v-navy',
              optionValue: 'navy',
              displayValue: 'Navy',
              visual: { type: 'color', value: '#000080' },
            },
          ],
        },
      ];
      const { container } = render(<FilterOptionsList options={options} onChange={() => {}} />);
      expect(screen.getByText('Navy')).toBeInTheDocument();
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(2);
      const parentRow = screen.getByText('Blue').closest('li');
      expect(parentRow?.classList.contains('cio:flex-wrap')).toBeTruthy();
    });

    test('calls onChange with the value and the option when a visual row is clicked', () => {
      const handleChange = vi.fn();
      render(<FilterOptionsList options={visualOptions} onChange={handleChange} />);
      fireEvent.click(screen.getByText('Floral'));
      expect(handleChange).toHaveBeenCalledWith('floral', visualOptions[1]);
    });

    test('forwards checkboxPosition to visual rows, overriding their default', () => {
      render(
        <FilterOptionsList options={visualOptions} checkboxPosition='left' onChange={() => {}} />,
      );
      const label = screen.getByText('Red').closest('label');
      const display = label?.querySelector('.cio-filter-multiple-option-display');
      // 'left' puts the checkbox before the display block.
      expect(display?.previousElementSibling?.classList.contains('cio-checkbox')).toBeTruthy();
    });

    test('the swatch wins over a startContent passed alongside it', () => {
      render(
        <FilterOptionsList
          options={[{ ...visualOptions[0], startContent: <span>custom start</span> }]}
          onChange={() => {}}
        />,
      );
      expect(screen.queryByText('custom start')).not.toBeInTheDocument();
      expect(document.querySelector('.cio-filter-visual-swatch')).toBeInTheDocument();
    });

    test('row-level overrides apply to visual rows too', () => {
      render(
        <FilterOptionsList
          options={visualOptions}
          onChange={() => {}}
          componentOverrides={{
            filterOption: (option) =>
              option.visual?.type === 'image'
                ? { reactNode: <li data-testid='visual-override'>Custom</li> }
                : undefined,
          }}
        />,
      );
      expect(screen.getByTestId('visual-override')).toBeInTheDocument();
      expect(screen.queryByText('Floral')).not.toBeInTheDocument();
      expect(screen.getByText('Red')).toBeInTheDocument();
    });
  });

  describe('componentOverrides', () => {
    test('list-level reactNode replaces the entire list', () => {
      render(
        <FilterOptionsList
          options={flatOptions}
          onChange={() => {}}
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
          onChange={() => {}}
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
          onChange={() => {}}
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
          onChange={() => {}}
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
          onChange={() => {}}
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

  describe('empty nested options guard', () => {
    test('a node with an empty options array renders as a plain leaf row', () => {
      const options: FilterOptionData[] = [
        { id: 'leaf', optionValue: 'leaf', displayValue: 'Leaf', options: [] },
      ];
      const { container } = render(<FilterOptionsList options={options} onChange={() => {}} />);
      expect(container.querySelectorAll('[data-slot="filter-options-list"]')).toHaveLength(1);
      expect(
        screen.getByText('Leaf').closest('li')?.classList.contains('cio:flex-wrap'),
      ).toBeFalsy();
      // No nested options means nothing to collapse, so no toggle either.
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('conventions', () => {
    test('has data-slot attribute on the root list', () => {
      render(<FilterOptionsList options={flatOptions} onChange={() => {}} />);
      expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'filter-options-list');
    });

    test('has cio-filter-options-list class', () => {
      render(<FilterOptionsList options={flatOptions} onChange={() => {}} />);
      expect(screen.getByRole('list').classList.contains('cio-filter-options-list')).toBeTruthy();
    });

    test('merges custom className onto the root list', () => {
      render(
        <FilterOptionsList options={flatOptions} className='my-custom-class' onChange={() => {}} />,
      );
      expect(screen.getByRole('list').classList.contains('my-custom-class')).toBeTruthy();
    });

    test('spreads data-* attributes onto the root list', () => {
      render(
        <FilterOptionsList
          options={flatOptions}
          data-testid='my-list'
          data-facet='color'
          onChange={() => {}}
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
          options: [{ id: 'a-child', optionValue: 'a-child', displayValue: 'A Child' }],
        },
        {
          id: 'branch-b',
          optionValue: 'branch-b',
          displayValue: 'Branch B',
          options: [{ id: 'b-child', optionValue: 'b-child', displayValue: 'B Child' }],
        },
      ];
      render(<FilterOptionsList options={options} onChange={handleChange} />);
      fireEvent.click(screen.getByText('A Child'));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        'a-child',
        expect.objectContaining({ id: 'a-child' }),
      );
    });
  });
});
