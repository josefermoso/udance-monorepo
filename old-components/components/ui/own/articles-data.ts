import { Article } from './types';

const titles = [
  'Contemporary Dance Workshop',
  'Ballet Masterclass Series',
  'Hip Hop Championship',
  'Dance Festival 2024',
  'Latin Dance Night',
  'Jazz Dance Performance',
  'Dance Academy Showcase',
  'Street Dance Competition',
  'Classical Ballet Performance',
  'Modern Dance Exhibition',
];

const imageUrls = [
  'https://source.unsplash.com/random/800x600/?ballet',
  'https://source.unsplash.com/random/800x600/?dance',
  'https://source.unsplash.com/random/800x600/?hiphop',
  'https://source.unsplash.com/random/800x600/?contemporary-dance',
  'https://source.unsplash.com/random/800x600/?dancer',
];

export const generateRandomArticles = (count: number): Article[] => {
  return Array.from({ length: count }, () => ({
    title: titles[Math.floor(Math.random() * titles.length)],
    imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ), // Random date within last 30 days
  }));
};
