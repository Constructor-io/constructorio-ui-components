import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterOptionsList, {
  type FilterOptionData,
  type FilterOptionsListOverrides,
} from '../../../components/filter-options-list';

const meta = {
  title: 'Components/FilterOptionsList',
  component: FilterOptionsList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => {},
  },
  argTypes: {
    checkboxPosition: {
      control: 'radio',
      options: ['left', 'right', 'none'],
    },
  },
} satisfies Meta<typeof FilterOptionsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Note: some editors may flag the fixtures below with a false "missing properties
// (isChecked, startContent)" error. `src/stories/**` is excluded from every tsconfig, so the
// TS server type-checks these files in an inferred project that ignores the `@/*` path alias
// and mis-resolves `FilterOptionData`'s optional fields. It is IDE-only — `tsc` and the build
// pass clean, and Vite compiles Storybook, not tsc.

// A multi-level fixture with counts and pre-selected options at different depths.
const hierarchicalOptions: FilterOptionData[] = [
  {
    id: 'apparel',
    optionValue: 'apparel',
    displayValue: 'Apparel',
    displayCountValue: '1240',
    options: [
      {
        id: 'apparel-mens',
        optionValue: 'apparel/mens',
        displayValue: "Men's",
        displayCountValue: '540',
        options: [
          {
            id: 'apparel-mens-shirts',
            optionValue: 'apparel/mens/shirts',
            displayValue: 'Shirts',
            displayCountValue: '210',
          },
          {
            id: 'apparel-mens-pants',
            optionValue: 'apparel/mens/pants',
            displayValue: 'Pants',
            displayCountValue: '330',
            isChecked: true,
          },
        ],
      },
      {
        id: 'apparel-women',
        optionValue: 'apparel/women',
        displayValue: "Women's",
        displayCountValue: '700',
        options: [
          {
            id: 'apparel-women-dresses',
            optionValue: 'apparel/women/dresses',
            displayValue: 'Dresses',
            displayCountValue: '400',
          },
        ],
      },
    ],
  },
  {
    id: 'electronics',
    optionValue: 'electronics',
    displayValue: 'Electronics',
    displayCountValue: '860',
    isChecked: true,
    options: [
      {
        id: 'electronics-phones',
        optionValue: 'electronics/phones',
        displayValue: 'Phones',
        displayCountValue: '312',
      },
      {
        id: 'electronics-laptops',
        optionValue: 'electronics/laptops',
        displayValue: 'Laptops',
        displayCountValue: '548',
      },
    ],
  },
];

// Options with no nested `options` render as a flat list — flatness is a property of the data.
const flatOptions: FilterOptionData[] = [
  { id: 'white', optionValue: 'white', displayValue: 'White', displayCountValue: '1572' },
  { id: 'black', optionValue: 'black', displayValue: 'Black', displayCountValue: '685' },
  { id: 'red', optionValue: 'red', displayValue: 'Red', displayCountValue: '646' },
  {
    id: 'blue',
    optionValue: 'blue',
    displayValue: 'Blue',
    displayCountValue: '394',
    isChecked: true,
  },
];

// An option renders as a swatch row (`FilterOptionVisual`) as soon as it carries a
// `visual` — there is no `isVisual` flag to set; it is derived.
const visualOptions: FilterOptionData[] = [
  {
    id: 'visual-white',
    optionValue: 'white',
    displayValue: 'White',
    displayCountValue: '1572',
    visual: { type: 'color', value: '#FFFFFF' },
  },
  {
    id: 'visual-black',
    optionValue: 'black',
    displayValue: 'Black',
    displayCountValue: '685',
    visual: { type: 'color', value: '#000000' },
    isChecked: true,
  },
  {
    id: 'visual-red',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '646',
    visual: { type: 'color', value: '#EF4444' },
  },
  {
    id: 'visual-pattern',
    optionValue: 'constructor',
    displayValue: 'Constructor',
    displayCountValue: '128',
    visual: {
      type: 'image',
      value: 'https://constructor.com/hubfs/constructor-favicon-2024-1.svg',
    },
  },
];

// Visual and plain options are the same shape, so they nest and mix at any depth: a plain
// parent row with visual children, and a visual parent with visual children.
const mixedOptions: FilterOptionData[] = [
  {
    id: 'mixed-color',
    optionValue: 'color',
    displayValue: 'Color',
    displayCountValue: '2903',
    options: [
      {
        id: 'mixed-blue',
        optionValue: 'blue',
        displayValue: 'Blue',
        displayCountValue: '394',
        visual: { type: 'color', value: '#3B82F6' },
        options: [
          {
            id: 'mixed-navy',
            optionValue: 'navy',
            displayValue: 'Navy',
            displayCountValue: '112',
            visual: { type: 'color', value: '#1E3A8A' },
            isChecked: true,
          },
        ],
      },
      {
        id: 'mixed-green',
        optionValue: 'green',
        displayValue: 'Green',
        displayCountValue: '221',
        visual: { type: 'color', value: '#22C55E' },
      },
    ],
  },
  {
    id: 'mixed-size',
    optionValue: 'size',
    displayValue: 'Size',
    displayCountValue: '860',
    options: [{ id: 'mixed-small', optionValue: 'small', displayValue: 'Small' }],
  },
];

export const Default: Story = {
  args: {
    options: hierarchicalOptions,
  },
};

export const Flat: Story = {
  args: {
    options: flatOptions,
  },
};

export const DeepHierarchy: Story = {
  args: {
    options: hierarchicalOptions,
  },
  parameters: {
    controls: { disable: true },
  },
};

// Swatch rows: colors and an image, driven purely by each option's `visual` in the data.
export const Visual: Story = {
  args: {
    options: visualOptions,
  },
};

// Plain and visual rows in one tree. `checkboxPosition` is set explicitly here because the
// two row types default differently (plain → left, visual → right).
export const MixedVisualAndPlain: Story = {
  args: {
    options: mixedOptions,
    checkboxPosition: 'left',
  },
};

// --- Collapsing branches -----------------------------------------------------------
// Rows with nested `options` carry a toggle for their own nested list — it collapses branches
// *within* the list, never the list itself. Expansion is uncontrolled: the data sets the
// starting point and the component owns it from there, since nothing outside the list depends
// on which branches are open.

// Every branch starts closed — except the path down to a checked option, which is expanded
// automatically so an applied filter is never hidden. Here "Pants" is checked, so Apparel and
// Men's open; Women's and Electronics stay closed.
export const CollapsedByDefault: Story = {
  args: {
    options: hierarchicalOptions,
    defaultCollapsed: true,
  },
};

// Opting out entirely: branches render exactly as they did before collapsing existed.
export const NonCollapsibleHierarchies: Story = {
  args: {
    options: hierarchicalOptions,
    collapsible: false,
  },
};

// Per-row control wins over the list-level defaults, so one tree can mix all three states:
// a branch pinned open with no toggle, a branch that starts closed, and a branch left at the
// list default.
const perRowCollapseOptions: FilterOptionData[] = [
  {
    id: 'pinned',
    optionValue: 'pinned',
    displayValue: 'Always open (no toggle)',
    collapsible: false,
    options: [
      { id: 'pinned-a', optionValue: 'pinned/a', displayValue: 'Child A' },
      { id: 'pinned-b', optionValue: 'pinned/b', displayValue: 'Child B' },
    ],
  },
  {
    id: 'starts-closed',
    optionValue: 'starts-closed',
    displayValue: 'Starts collapsed',
    defaultCollapsed: true,
    options: [
      { id: 'closed-a', optionValue: 'closed/a', displayValue: 'Child C' },
      { id: 'closed-b', optionValue: 'closed/b', displayValue: 'Child D' },
    ],
  },
  {
    id: 'list-default',
    optionValue: 'list-default',
    displayValue: 'Follows the list default',
    options: [{ id: 'default-a', optionValue: 'default/a', displayValue: 'Child E' }],
  },
];

export const PerRowCollapseControl: Story = {
  args: {
    options: perRowCollapseOptions,
  },
};

// `componentOverrides` supports three levels of customization, each demonstrated below:
//   1. The whole list  — `reactNode` replaces the entire `<ul>`.
//   2. Every option    — `filterOption` as an object overrides every row at every depth.
//   3. A single option — `filterOption` as a function overrides only the rows it opts into.

// --- 1. Override the whole list -------------------------------------------------------
// A list-level `reactNode` replaces the default `<ul>` wholesale. The render-prop form
// receives the list's props (`options`, `onChange`, …) so you can render your own layout
// while still driving it from the same data.
const listOverride: FilterOptionsListOverrides = {
  reactNode: (props) => (
    <div style={{ border: '2px dashed #6c5ce7', borderRadius: 8, padding: 12 }}>
      <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Custom list wrapper</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 4 }}>
        {props?.options?.map((option) => (
          <li
            key={option.id}
            style={{ padding: '4px 8px', background: '#f4f2ff', borderRadius: 4 }}>
            {option.displayValue}
          </li>
        ))}
      </ul>
    </div>
  ),
};

export const ListOverrideExample: Story = {
  args: {
    options: flatOptions,
    componentOverrides: listOverride,
  },
  name: 'Override the whole list',
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

// --- 2. Override every option ---------------------------------------------------------
// `filterOption` as an object applies to every `FilterOption` row at every depth.
// Shown with flat options: a `reactNode` override replaces the whole `<li>`, so it
// suits flat/leaf rows. The render-prop function form receives per-row render props.
const allOptionsOverride: FilterOptionsListOverrides = {
  filterOption: {
    reactNode: (props) => (
      <li style={{ padding: '6px 10px', background: '#f0f0f0', borderRadius: 4 }}>
        {props?.displayValue} (custom)
      </li>
    ),
  },
};

export const AllOptionsOverrideExample: Story = {
  args: {
    options: flatOptions,
    componentOverrides: allOptionsOverride,
  },
  name: 'Override every option',
  tags: ['!autodocs', '!dev'],
};

// --- 3. Override a single option ------------------------------------------------------
// `filterOption` as a function is called per option; return overrides only for the rows
// you want to customize and `undefined` for the rest. The matched row here is a parent,
// and re-emitting `props.children` keeps its nested list, so the override customizes one
// row without collapsing the branch beneath it.
const singleOptionOverride: FilterOptionsListOverrides = {
  filterOption: (option) =>
    option.id === 'apparel-mens'
      ? {
          reactNode: (props) => (
            <li style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ padding: '6px 10px', background: '#fff3cd', borderRadius: 4 }}>
                {props?.displayValue} (highlighted)
              </strong>
              {props?.children}
            </li>
          ),
        }
      : undefined,
};

export const SingleOptionOverrideExample: Story = {
  args: {
    options: hierarchicalOptions,
    componentOverrides: singleOptionOverride,
  },
  name: 'Override a specific option (keeps nesting)',
  tags: ['!autodocs', '!dev'],
};
