// NewsArticleCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import NewsArticleCard from '@/components/ui/own/news-article-card';

const meta = {
  title: 'Components/NewsArticleCard',
  component: NewsArticleCard,
  parameters: {
    layout: 'centered',
    variants: {
      enable: true,
      include: ['type', 'layout'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['main-article', 'sub-article', 'other-big', 'other-article'],
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof NewsArticleCard>;

export default meta;
type Story = StoryObj<typeof NewsArticleCard>;

const mockArticle = {
  imageUrl:
    'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&amp;w=2369&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  title: 'Sample Article Title',
  date: new Date(),
};

export const MainArticle: Story = {
  args: {
    type: 'main-article',
    layout: 'horizontal',
    article: mockArticle,
  },
};

export const SubArticle: Story = {
  args: {
    type: 'sub-article',
    layout: 'horizontal',
    article: mockArticle,
  },
};

export const OtherBig: Story = {
  args: {
    type: 'other-big',
    layout: 'horizontal',
    article: mockArticle,
  },
};

export const OtherArticle: Story = {
  args: {
    type: 'other-article',
    layout: 'vertical',
    article: mockArticle,
  },
};
