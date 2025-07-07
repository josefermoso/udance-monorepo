import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import EventDetails from '@/components/ui/own/event-details';

const meta = {
  title: 'EventDetails/EventDetails',
  component: EventDetails,
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
} satisfies Meta<typeof EventDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Filter locations...',
  },
};
