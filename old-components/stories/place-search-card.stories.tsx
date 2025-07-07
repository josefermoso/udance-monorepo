import type { Meta, StoryObj } from '@storybook/react';

import PlaceSearchCard from '@/components/ui/own/place-search-card';

const meta: Meta<typeof PlaceSearchCard> = {
  title: 'Components/PlaceSearchCard',
  component: PlaceSearchCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Dance Studio',
    photoUrl: '/images/dance-studio.jpg',
    danceTypes: ['Salsa', 'Bachata'],
  },
};
