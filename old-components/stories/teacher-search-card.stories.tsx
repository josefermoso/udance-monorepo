import type { Meta, StoryObj } from '@storybook/react';

import TeacherSearchCard from '@/components/ui/own/teacher-search-card';

const meta = {
  title: 'Components/TeacherSearchCard',
  component: TeacherSearchCard,
} satisfies Meta<typeof TeacherSearchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    photoUrl: '/images/teacher-john.jpg',
    danceType: 'Salsa',
    schedule: 'Mon-Fri 6pm-8pm',
    location: 'Dance Studio A',
  },
};
