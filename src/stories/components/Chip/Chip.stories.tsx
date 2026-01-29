import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from '../../../components/chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['color', 'image'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Color Variant ---

export const Color: Story = {
  args: {
    type: 'color',
    value: '#3B82F6',
    name: 'Blue',
  },
};

// --- Image Variant ---

export const Image: Story = {
  args: {
    type: 'image',
    value: 'https://constructor.com/hubfs/constructor-favicon-2024-1.svg',
    name: 'Constructor',
  },
};

// --- Size Variants ---

export const SizeSmall: Story = {
  args: {
    type: 'color',
    value: '#3B82F6',
    name: 'Small Blue',
    size: 'sm',
  },
  name: 'Size - sm',
};

export const SizeMedium: Story = {
  args: {
    type: 'color',
    value: '#3B82F6',
    name: 'Medium Blue',
    size: 'md',
  },
  name: 'Size - md (default)',
};

export const SizeLarge: Story = {
  args: {
    type: 'color',
    value: '#3B82F6',
    name: 'Large Blue',
    size: 'lg',
  },
  name: 'Size - lg',
};

// --- Empty/Fallback ---

export const EmptyFallback: Story = {
  args: {
    type: 'color',
    value: '',
    name: 'No color specified',
  },
};

// --- componentOverrides ---

const componentOverrides = {
  chip: {
    reactNode: (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #ff0000, #0000ff)',
          border: '1px solid #ccc',
        }}></div>
    ),
  },
};

export const ComponentOverrideExample: Story = {
  args: {
    type: 'color',
    value: '#FF0000',
    name: 'Overridden',
    // @ts-expect-error: Composed types
    componentOverrides: componentOverrides.chip,
  },
  name: 'componentOverride Example',
  tags: ['!autodocs', '!dev'],
};

// --- Size Comparison ---

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Chip type='color' value='#3B82F6' name='Small' size='sm' />
        <div style={{ fontSize: 12, marginTop: 4 }}>sm</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Chip type='color' value='#3B82F6' name='Medium' size='md' />
        <div style={{ fontSize: 12, marginTop: 4 }}>md</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Chip type='color' value='#3B82F6' name='Large' size='lg' />
        <div style={{ fontSize: 12, marginTop: 4 }}>lg</div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
