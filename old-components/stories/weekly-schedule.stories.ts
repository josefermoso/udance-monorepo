import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import WeeklySchedule from '@/components/ui/own/weekly-schedule';

const meta = {
  title: 'Components/WeeklySchedule',
  component: WeeklySchedule,
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
} satisfies Meta<typeof WeeklySchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Filter locations...',
  },
};
