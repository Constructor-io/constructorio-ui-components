import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../../components/Button';
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
    children: 'Button',
    asChild: false,
  },
  tags: ['!autodocs'],
};

export const SecondaryVariant: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const DestructiveVariant: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const GhostVariant: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const LinkVariant: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};
