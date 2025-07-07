import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Navbar from '@/components/ui/own/nav-bar';

const meta = {
  title: 'Navbar/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFilterChange: { action: 'filter changed' },
    initialValue: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { onFilterChange: fn() },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Filter locations...',
  },
};
