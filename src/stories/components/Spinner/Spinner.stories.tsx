import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from '../../../components/spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// --- Size Variants ---

export const SizeSmall: Story = {
  args: {
    size: 'sm',
  },
  name: 'Size - sm',
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
  name: 'Size - md (default)',
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
  },
  name: 'Size - lg',
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size='sm' />
        <div style={{ fontSize: 12, marginTop: 4 }}>sm</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size='md' />
        <div style={{ fontSize: 12, marginTop: 4 }}>md</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size='lg' />
        <div style={{ fontSize: 12, marginTop: 4 }}>lg</div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

// --- Color ---

export const InheritsColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ color: '#3B82F6' }}>
        <Spinner />
      </div>
      <div style={{ color: '#EF4444' }}>
        <Spinner />
      </div>
      <div style={{ color: '#10B981' }}>
        <Spinner />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'Inherits color (currentColor)',
};

// --- Centering ---

/**
 * The Spinner applies no positioning of its own. Consumers centre it themselves,
 * for example with an absolutely positioned wrapper over the loading area.
 */
export const CentreItYourself: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 180,
        border: '1px dashed #ccc',
        borderRadius: 8,
      }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Spinner size='lg' />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
  name: 'Centre it yourself',
};

// --- Custom label ---

export const CustomLabel: Story = {
  args: {
    label: 'Fetching products',
  },
};

// --- componentOverrides ---

const componentOverrides = {
  spinner: {
    reactNode: (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '3px solid #eee',
          borderTopColor: '#3B82F6',
          animation: 'spin 1s linear infinite',
        }}
      />
    ),
  },
};

export const ComponentOverrideExample: Story = {
  args: {
    // @ts-expect-error: Composed types
    componentOverrides: componentOverrides.spinner,
  },
  name: 'componentOverride Example',
  tags: ['!autodocs', '!dev'],
};
