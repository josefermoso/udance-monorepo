import type { Meta, StoryObj } from '@storybook/react';

import BackgroundView from './background-view';

const meta: Meta<typeof BackgroundView> = {
  title: 'Components/BackgroundView',
  component: BackgroundView,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
