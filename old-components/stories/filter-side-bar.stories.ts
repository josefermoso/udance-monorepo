import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import FilterSidebar from '@/components/ui/own/filter-sidebar';

const meta = {
  title: 'Components/MapFilter',
  component: FilterSidebar,
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
} satisfies Meta<typeof FilterSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Filter locations...',
  },
};
