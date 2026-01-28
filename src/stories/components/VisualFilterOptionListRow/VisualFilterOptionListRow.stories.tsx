import type { Meta, StoryObj } from '@storybook/react-vite';
import VisualFilterOptionListRow from '../../../components/visual-filter-option-list-row';

const meta = {
  title: 'Components/VisualFilterOptionListRow',
  component: VisualFilterOptionListRow,
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
  argTypes: {
    visualType: {
      control: 'radio',
      options: ['color', 'image'],
    },
  },
} satisfies Meta<typeof VisualFilterOptionListRow>;

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
  name: 'Color',
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
  name: 'Image',
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
  name: 'Checked State',
};

// --- Complete Color Filter List (matching the reference image) ---

export const ColorFilterList: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
      <VisualFilterOptionListRow
        id='white'
        optionValue='white'
        displayValue='White'
        displayCountValue='1572'
        visualType='color'
        visualValue='#FFFFFF'
      />
      <VisualFilterOptionListRow
        id='black'
        optionValue='black'
        displayValue='Black'
        displayCountValue='685'
        visualType='color'
        visualValue='#000000'
      />
      <VisualFilterOptionListRow
        id='red'
        optionValue='red'
        displayValue='Red'
        displayCountValue='646'
        visualType='color'
        visualValue='#EF4444'
      />
      <VisualFilterOptionListRow
        id='blue'
        optionValue='blue'
        displayValue='Blue'
        displayCountValue='394'
        visualType='color'
        visualValue='#3B82F6'
      />
      <VisualFilterOptionListRow
        id='purple'
        optionValue='purple'
        displayValue='Purple'
        displayCountValue='291'
        visualType='color'
        visualValue='#A855F7'
        isChecked={true}
      />
      <VisualFilterOptionListRow
        id='orange'
        optionValue='orange'
        displayValue='Orange'
        displayCountValue='224'
        visualType='color'
        visualValue='#F97316'
      />
      <VisualFilterOptionListRow
        id='pink'
        optionValue='pink'
        displayValue='Pink'
        displayCountValue='215'
        visualType='color'
        visualValue='#EC4899'
        isChecked={true}
      />
      <VisualFilterOptionListRow
        id='yellow'
        optionValue='yellow'
        displayValue='Yellow'
        displayCountValue='201'
        visualType='color'
        visualValue='#EAB308'
      />
      <VisualFilterOptionListRow
        id='green'
        optionValue='green'
        displayValue='Green'
        displayCountValue='195'
        visualType='color'
        visualValue='#22C55E'
      />
    </ul>
  ),
  name: 'Color Filter List',
  parameters: {
    controls: { disable: true },
  },
};

// --- Mixed Visual Types ---

export const MixedVisualTypes: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
      <VisualFilterOptionListRow
        id='solid-red'
        optionValue='solid-red'
        displayValue='Solid Red'
        displayCountValue='523'
        visualType='color'
        visualValue='#EF4444'
      />
      <VisualFilterOptionListRow
        id='solid-blue'
        optionValue='solid-blue'
        displayValue='Solid Blue'
        displayCountValue='412'
        visualType='color'
        visualValue='#3B82F6'
      />
      <VisualFilterOptionListRow
        id='constructor'
        optionValue='constructor'
        displayValue='Constructor'
        displayCountValue='256'
        visualType='image'
        visualValue='https://constructor.com/hubfs/constructor-favicon-2024-1.svg'
      />
    </ul>
  ),
  name: 'Mixed Visual Types',
  parameters: {
    controls: { disable: true },
  },
};

// --- componentOverrides ---

const componentOverrides = {
  visualFilterOptionListRow: {
    reactNode: (
      <li style={{ padding: '8px 12px', background: '#f0f0f0', borderRadius: 4 }}>
        Custom rendered visual row
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
    // @ts-expect-error: Composed types
    componentOverrides: componentOverrides.visualFilterOptionListRow,
  },
  name: 'componentOverride Example',
  tags: ['!autodocs', '!dev'],
};
