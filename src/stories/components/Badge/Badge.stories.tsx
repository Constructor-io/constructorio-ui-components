import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '../../../components/ui/badge';
import '@/styles.css';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
    asChild: false,
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  tags: ['!autodocs'],
};

export const DisabledVariant: Story = {
  args: {
    children: 'Disabled',
    state: 'disabled',
  },
};

export const SecondaryVariant: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
  name: 'Variant - Secondary',
};

export const DestructiveVariant: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
  name: 'Variant - Destructive',
};

export const OutlineVariant: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
  name: 'Variant - Outline',
};

export const SmVariant: Story = {
  args: {
    children: 'Badge size',
    size: 'sm',
  },
  name: 'Size - sm',
};

export const MdVariant: Story = {
  args: {
    children: 'Badge size',
    size: 'md',
  },
  name: 'Size - md',
};

export const LgVariant: Story = {
  args: {
    children: 'Badge size',
    size: 'lg',
  },
  name: 'Size - lg',
};

export const RoundedVariant: Story = {
  args: {
    children: 'Shape - Rounded',
    shape: 'rounded',
  },
  name: 'Shape - Rounded',
};

export const SharpVariant: Story = {
  args: {
    children: 'Shape - Sharp',
    shape: 'sharp',
  },
  name: 'Shape - Sharp',
};

export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <svg
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        Verified
      </>
    ),
  },
  name: 'With Left Icon',
};

export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        Status
        <svg
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5 12H19M19 12L12 5M19 12L12 19'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </>
    ),
  },
  name: 'With Right Icon',
};

export const WithBothIcons: Story = {
  args: {
    children: (
      <>
        <svg
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        Complete
        <svg
          width='12'
          height='12'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6 18L18 6M6 6L18 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </>
    ),
  },
  name: 'With Both Icons',
};

export const NumberBadgeSm: Story = {
  args: {
    children: '8',
    shape: 'rounded',
    size: 'sm',
    isNumber: true,
  },
  name: 'Number Badge - sm',
};

export const NumberBadgeMd: Story = {
  args: {
    children: '8',
    shape: 'rounded',
    size: 'md',
    isNumber: true,
  },
  name: 'Number Badge - md',
};

export const NumberBadgeLg: Story = {
  args: {
    children: '8',
    shape: 'rounded',
    size: 'lg',
    isNumber: true,
  },
  name: 'Number Badge - lg',
};

// --- Usage Examples

export const AsChildExample: Story = {
  args: {
    children: <a href='#'>A link that looks like a badge</a>,
    variant: 'outline',
    asChild: true,
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

const componentOverrides = {
  badge: {
    reactNode: <span>A span rendered in place of a badge</span>,
  },
};

export const TopLevelOverrideExample: Story = {
  args: {
    // @ts-expect-error: Composed types
    componentOverrides: componentOverrides.badge,
    children: 'This will be overridden',
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

export const DataAttributesExample: Story = {
  args: {
    // @ts-expect-error: Data Attribute
    'data-cnstrc-count': 42,
    children: 'Spreading Data Attributes',
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};
