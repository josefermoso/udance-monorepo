import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MapViewContainer } from '@/components/ui/own/map-view-container';

const meta = {
  title: 'Components/MapView',
  component: MapViewContainer,
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
} satisfies Meta<typeof MapViewContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Filter locations...',
  },
};
