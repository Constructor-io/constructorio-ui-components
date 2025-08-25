import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Input from '../../../components/Input/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onSubmit: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Type your question...',
  },
};

export const NoPlaceholder: Story = {
  args: {
    placeholder: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
