import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterOption from '../../../components/filter-option';
import {
  COUNT_BADGE_STYLE,
  END_CONTENT_CHEVRON_STYLE,
  END_CONTENT_PILL_STYLE,
  OVERRIDE_NAME_STYLE,
} from '../../constants';

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
    selectionType: {
      control: 'radio',
      options: ['checkbox', 'radio'],
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

// --- Radio Selection Type ---

export const Radio: Story = {
  args: {
    id: 'radio-1',
    optionValue: 'small',
    displayValue: 'Small',
    displayCountValue: '320',
    selectionType: 'radio',
    groupName: 'size',
  },
  name: 'Radio',
};

export const RadioChecked: Story = {
  args: {
    id: 'radio-2',
    optionValue: 'medium',
    displayValue: 'Medium',
    displayCountValue: '512',
    selectionType: 'radio',
    groupName: 'size',
    isChecked: true,
  },
  name: 'Radio Checked',
};

export const RadioList: Story = {
  args: {
    id: 'radio-list',
    optionValue: 'small',
    displayValue: 'Small',
  },
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 300 }}>
      <FilterOption
        id='size-small'
        optionValue='small'
        displayValue='Small'
        displayCountValue='320'
        selectionType='radio'
        groupName='size'
        onChange={() => {}}
      />
      <FilterOption
        id='size-medium'
        optionValue='medium'
        displayValue='Medium'
        displayCountValue='512'
        selectionType='radio'
        groupName='size'
        isChecked={true}
        onChange={() => {}}
      />
      <FilterOption
        id='size-large'
        optionValue='large'
        displayValue='Large'
        displayCountValue='198'
        selectionType='radio'
        groupName='size'
        onChange={() => {}}
      />
      <FilterOption
        id='size-xl'
        optionValue='xl'
        displayValue='XL'
        displayCountValue='87'
        selectionType='radio'
        groupName='size'
        onChange={() => {}}
      />
    </ul>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'Radio List (Single Select)',
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

// --- endContent ---

export const WithEndContent: Story = {
  args: {
    id: 'filter-end',
    optionValue: 'sale',
    displayValue: 'On Sale',
    displayCountValue: '128',
    endContent: <span style={END_CONTENT_PILL_STYLE}>NEW</span>,
  },
  name: 'With End Content',
};

export const WithStartAndEndContent: Story = {
  args: {
    id: 'filter-both',
    optionValue: 'featured',
    displayValue: 'Featured',
    displayCountValue: '42',
    startContent: <span style={{ marginRight: 8 }}>⭐</span>,
    endContent: <span style={END_CONTENT_CHEVRON_STYLE}>›</span>,
  },
  name: 'With Start and End Content',
};

// --- Inner-part componentOverrides ---
// Each key below replaces one part of the row and leaves the rest intact — unlike the
// top-level `reactNode`, which replaces the whole `<li>`.

export const IndicatorOverrideExample: Story = {
  args: {
    id: 'indicator-override',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '646',
    isChecked: true,
    componentOverrides: {
      indicator: {
        reactNode: (props) => (
          <span
            style={{
              marginRight: 8,
              width: 20,
              textAlign: 'center',
              color: props.isChecked ? '#66bf3c' : '#ccc',
            }}>
            {props.isChecked ? '✔' : '○'}
          </span>
        ),
      },
    },
  },
  name: 'Override the indicator',
  tags: ['!autodocs', '!dev'],
};

// A `name` replacement has to bring its own `flexGrow` (it lives in OVERRIDE_NAME_STYLE): the
// default name element carries `grow`, which is what holds the count at the row's right edge.
export const NameOverrideExample: Story = {
  args: {
    id: 'name-override',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '646',
    componentOverrides: {
      name: {
        reactNode: (props) => (
          <span style={{ ...OVERRIDE_NAME_STYLE, textTransform: 'uppercase' }}>
            {props.displayValue}
          </span>
        ),
      },
    },
  },
  name: 'Override the name',
  tags: ['!autodocs', '!dev'],
};

export const CountOverrideExample: Story = {
  args: {
    id: 'count-override',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '646',
    componentOverrides: {
      count: {
        reactNode: (props) => <span style={COUNT_BADGE_STYLE}>{props.displayCountValue}</span>,
      },
    },
  },
  name: 'Override the count',
  tags: ['!autodocs', '!dev'],
};

export const MultipleInnerOverridesExample: Story = {
  args: {
    id: 'multi-override',
    optionValue: 'red',
    displayValue: 'Red',
    displayCountValue: '646',
    isChecked: true,
    componentOverrides: {
      indicator: {
        reactNode: <span style={{ marginRight: 8, width: 20, textAlign: 'center' }}>✔</span>,
      },
      name: {
        reactNode: (props) => <span style={OVERRIDE_NAME_STYLE}>{props.displayValue}</span>,
      },
      count: {
        reactNode: (props) => <span style={COUNT_BADGE_STYLE}>{props.displayCountValue}</span>,
      },
    },
  },
  name: 'Override several inner parts',
  tags: ['!autodocs', '!dev'],
};
