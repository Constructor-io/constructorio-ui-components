import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../../components/button';
import '@/styles.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    asChild: false,
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  tags: ['!autodocs'],
};

export const DisabledVariant: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const SecondaryVariant: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
  name: 'variant - Secondary',
};

export const DestructiveVariant: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
  name: 'variant - Destructive',
};

export const GhostVariant: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
  name: 'variant - Ghost',
};

export const LinkVariant: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
  name: 'variant - Link',
};

export const XlVariant: Story = {
  args: {
    children: 'Button Size',
    size: 'xl',
  },
  name: 'Size - xl',
};

export const DefaultSizeVariant: Story = {
  args: {
    children: 'Button Size',
    size: 'default',
  },
  name: 'Size - default',
};

export const MdVariant: Story = {
  args: {
    children: 'Button Size',
    size: 'md',
  },
  name: 'Size - md',
};

export const SmVariant: Story = {
  args: {
    children: 'Button Size',
    size: 'sm',
  },
  name: 'Size - sm',
};

export const IconVariant: Story = {
  args: {
    children: (
      <svg
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12.4199 9.5H14.4199V6.5H17.4199V4.5H14.4199V1.5H12.4199V4.5H9.41992V6.5H12.4199V9.5ZM8.41992 18.5C7.31992 18.5 6.42992 19.4 6.42992 20.5C6.42992 21.6 7.31992 22.5 8.41992 22.5C9.51992 22.5 10.4199 21.6 10.4199 20.5C10.4199 19.4 9.51992 18.5 8.41992 18.5ZM18.4199 18.5C17.3199 18.5 16.4299 19.4 16.4299 20.5C16.4299 21.6 17.3199 22.5 18.4199 22.5C19.5199 22.5 20.4199 21.6 20.4199 20.5C20.4199 19.4 19.5199 18.5 18.4199 18.5ZM9.51992 13.5H16.9699C17.7199 13.5 18.3799 13.09 18.7199 12.47L22.5799 5.46L20.8399 4.5L16.9699 11.5H9.94992L5.68992 2.5H2.41992V4.5H4.41992L8.01992 12.09L6.66992 14.53C5.93992 15.87 6.89992 17.5 8.41992 17.5H20.4199V15.5H8.41992L9.51992 13.5Z'
          fill='white'
        />
      </svg>
    ),
    size: 'icon',
  },
  name: 'Size - Icon',
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

// --- Usage Examples

export const AsChildExample: Story = {
  args: {
    children: <div>A div that looks like a button</div>,
    size: 'xl',
    asChild: true,
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

const componentOverrides = {
  button: {
    reactNode: <span>A span rendered in place of a button</span>,
  },
};

export const TopLevelOverrideExample: Story = {
  args: {
    // @ts-expect-error: Composed types
    componentOverrides: componentOverrides.button,
    children: 'This will be overridden',
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};

export const DataAttributesExample: Story = {
  args: {
    // @ts-expect-error: Data Attribute
    'data-cnstrc-price': 23.25,
    children: 'Spreading Data Attributes',
  },
  // '!autodocs' removes this story from being rendered as part of the <Stories /> component in the auto-generated docs.
  // '!dev' prevents a story from being listed in the sidebar.
  tags: ['!autodocs', '!dev'],
};
