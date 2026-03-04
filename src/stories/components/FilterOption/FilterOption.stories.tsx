import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterOption from '../../../components/filter-option';

const meta = {
  title: 'Components/FilterOption',
  component: FilterOption,
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
  decorators: [
    (Story) => (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof FilterOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'filter-1',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '1572',
  },
};

export const Checked: Story = {
  args: {
    id: 'filter-2',
    optionValue: 'blue',
    displayValue: 'Blue',
    displayCountValue: '394',
    isChecked: true,
  },
  name: 'Checked State',
};

export const WithoutCount: Story = {
  args: {
    id: 'filter-3',
    optionValue: 'green',
    displayValue: 'Green',
  },
};

export const WithoutCheckbox: Story = {
  args: {
    id: 'filter-4',
    optionValue: 'purple',
    displayValue: 'Purple',
    displayCountValue: '291',
    checkboxPosition: 'none',
  },
  name: 'Without Checkbox Indicator',
};

export const WithStartContent: Story = {
  args: {
    id: 'filter-5',
    optionValue: 'featured',
    displayValue: 'Featured',
    displayCountValue: '42',
    startContent: <span style={{ marginRight: 8 }}>⭐</span>,
  },
};

// Multiple options list
export const FilterList: Story = {
  args: {
    id: 'filter-list',
    optionValue: 'white',
    displayValue: 'White',
  },
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
      <FilterOption
        id='white'
        optionValue='white'
        displayValue='White'
        displayCountValue='1572'
        onChange={() => {}}
      />
      <FilterOption
        id='black'
        optionValue='black'
        displayValue='Black'
        displayCountValue='685'
        onChange={() => {}}
      />
      <FilterOption
        id='red'
        optionValue='red'
        displayValue='Red'
        displayCountValue='646'
        onChange={() => {}}
      />
      <FilterOption
        id='blue'
        optionValue='blue'
        displayValue='Blue'
        displayCountValue='394'
        onChange={() => {}}
      />
      <FilterOption
        id='purple'
        optionValue='purple'
        displayValue='Purple'
        displayCountValue='291'
        isChecked={true}
        onChange={() => {}}
      />
      <FilterOption
        id='orange'
        optionValue='orange'
        displayValue='Orange'
        displayCountValue='224'
        onChange={() => {}}
      />
      <FilterOption
        id='pink'
        optionValue='pink'
        displayValue='Pink'
        displayCountValue='215'
        isChecked={true}
        onChange={() => {}}
      />
    </ul>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// componentOverrides example
const componentOverrides = {
  filterOption: {
    reactNode: (
      <li style={{ padding: '8px 12px', background: '#f0f0f0', borderRadius: 4 }}>
        Custom rendered option
      </li>
    ),
  },
};

export const ComponentOverrideExample: Story = {
  args: {
    id: 'override-1',
    optionValue: 'custom',
    displayValue: 'This will be overridden',
    // @ts-expect-error: Composed types
    componentOverrides: componentOverrides.filterOption,
  },
  name: 'componentOverride Example',
  tags: ['!autodocs', '!dev'],
};
