import type { Meta, StoryObj } from '@storybook/react';

import EventCard from '@/components/ui/own/event-card';

const meta = {
  title: 'EventCard/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
    variants: {
      enable: true,
      include: ['size', 'layout'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {},
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof EventCard>;

export const Small: Story = {
  args: {
    size: 'small',
    layout: 'vertical',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    layout: 'vertical',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    layout: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    size: 'medium',
    layout: 'horizontal',
  },
};
