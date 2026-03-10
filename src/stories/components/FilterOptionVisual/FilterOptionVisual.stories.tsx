import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterOptionVisual from '../../../components/filter-option--visual';

const meta = {
  title: 'Components/FilterOptionVisual',
  component: FilterOptionVisual,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
        <Story />
      </ul>
    ),
  ],
  args: {
    onChange: () => {},
  },
  argTypes: {
    visualType: {
      control: 'radio',
      options: ['color', 'image'],
    },
  },
} satisfies Meta<typeof FilterOptionVisual>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Color Example ---

export const Color: Story = {
  args: {
    id: 'color-red',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '646',
    visualType: 'color',
    visualValue: '#EF4444',
  },
};

// --- Image Example ---

export const Image: Story = {
  args: {
    id: 'pattern-constructor',
    optionValue: 'constructor',
    displayValue: 'Constructor',
    displayCountValue: '128',
    visualType: 'image',
    visualValue: 'https://constructor.com/hubfs/constructor-favicon-2024-1.svg',
  },
};

// --- Checked State ---

export const CheckedState: Story = {
  args: {
    id: 'color-purple',
    optionValue: 'purple',
    displayValue: 'Purple',
    displayCountValue: '291',
    visualType: 'color',
    visualValue: '#A855F7',
    isChecked: true,
  },
};

// --- Complete Color Filter List (matching the reference image) ---

export const ColorFilterList: Story = {
  args: {
    id: 'color-list',
    optionValue: 'white',
    displayValue: 'White',
    visualType: 'color',
    visualValue: '#FFFFFF',
  },
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
      <FilterOptionVisual
        id='white'
        optionValue='white'
        displayValue='White'
        displayCountValue='1572'
        visualType='color'
        visualValue='#FFFFFF'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='black'
        optionValue='black'
        displayValue='Black'
        displayCountValue='685'
        visualType='color'
        visualValue='#000000'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='red'
        optionValue='red'
        displayValue='Red'
        displayCountValue='646'
        visualType='color'
        visualValue='#EF4444'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='blue'
        optionValue='blue'
        displayValue='Blue'
        displayCountValue='394'
        visualType='color'
        visualValue='#3B82F6'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='purple'
        optionValue='purple'
        displayValue='Purple'
        displayCountValue='291'
        visualType='color'
        visualValue='#A855F7'
        isChecked={true}
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='orange'
        optionValue='orange'
        displayValue='Orange'
        displayCountValue='224'
        visualType='color'
        visualValue='#F97316'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='pink'
        optionValue='pink'
        displayValue='Pink'
        displayCountValue='215'
        visualType='color'
        visualValue='#EC4899'
        isChecked={true}
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='yellow'
        optionValue='yellow'
        displayValue='Yellow'
        displayCountValue='201'
        visualType='color'
        visualValue='#EAB308'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='green'
        optionValue='green'
        displayValue='Green'
        displayCountValue='195'
        visualType='color'
        visualValue='#22C55E'
        onChange={() => {}}
      />
    </ul>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// --- Mixed Visual Types ---

export const MixedVisualTypes: Story = {
  args: {
    id: 'mixed-list',
    optionValue: 'solid-red',
    displayValue: 'Solid Red',
    visualType: 'color',
    visualValue: '#EF4444',
  },
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
      <FilterOptionVisual
        id='solid-red'
        optionValue='solid-red'
        displayValue='Solid Red'
        displayCountValue='523'
        visualType='color'
        visualValue='#EF4444'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='solid-blue'
        optionValue='solid-blue'
        displayValue='Solid Blue'
        displayCountValue='412'
        visualType='color'
        visualValue='#3B82F6'
        onChange={() => {}}
      />
      <FilterOptionVisual
        id='constructor'
        optionValue='constructor'
        displayValue='Constructor'
        displayCountValue='256'
        visualType='image'
        visualValue='https://constructor.com/hubfs/constructor-favicon-2024-1.svg'
        onChange={() => {}}
      />
    </ul>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// --- componentOverrides ---

const componentOverrides = {
  filterOptionVisual: {
    reactNode: (
      <li style={{ padding: '8px 12px', background: '#f0f0f0', borderRadius: 4 }}>
        Custom rendered visual option
      </li>
    ),
  },
};

export const ComponentOverrideExample: Story = {
  args: {
    id: 'override-1',
    optionValue: 'custom',
    displayValue: 'This will be overridden',
    visualType: 'color',
    visualValue: '#FF0000',
    componentOverrides: componentOverrides.filterOptionVisual,
  },
  name: 'componentOverride Example',
  tags: ['!autodocs', '!dev'],
};
