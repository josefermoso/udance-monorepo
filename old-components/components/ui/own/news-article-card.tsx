// NewsArticleCard.tsx
import Heading, { HeadingProps } from '../base/heading';
// Import Image from next/image
import { TextProps } from '../base/text';

interface Article {
  imageUrl: string;
  title: string;
  date: Date | string; // Allow both Date and string
}

interface NewsArticleCardProps {
  type: 'main-article' | 'sub-article' | 'other-big' | 'other-article';
  layout: 'vertical' | 'horizontal';
  article: Article;
}

const cardClasses: Record<
  'vertical' | 'horizontal',
  Record<NewsArticleCardProps['type'], string>
> = {
  vertical: {
    'main-article': 'w-[640px] h-[320px]',
    'sub-article': 'w-[350px] h-[320px]',
    'other-big': 'w-[350px] h-[180px]',
    'other-article': 'w-[200px] h-[180px]',
  },
  horizontal: {
    'main-article': 'w-[640px] h-[320px]',
    'sub-article': 'w-[350px] h-[320px]',
    'other-big': 'w-[350px] h-[180px]',
    'other-article': 'w-[200px] h-[180px]',
  },
};

const getHeadingVariant = (
  type: NewsArticleCardProps['type']
): HeadingProps['variant'] => {
  switch (type) {
    case 'main-article':
      return 'h2';
    case 'sub-article':
      return 'h4';
    case 'other-big':
      return 'h5';
    case 'other-article':
      return 'h6';
    default:
      return 'h4';
  }
};

const getTextVariant = (
  type: NewsArticleCardProps['type']
): TextProps['variant'] => {
  switch (type) {
    case 'main-article':
      return 'body-lg';
    default:
      return 'body-sm';
  }
};

const NewsArticleCard = ({ type, layout, article }: NewsArticleCardProps) => {
  if (!article || !article.date) {
    return null;
  }

  const cardSizeClass = cardClasses[layout][type];

  const parsedDate =
    article.date instanceof Date ? article.date : new Date(article.date);
  const formattedDate = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(parsedDate);

  return (
    <div className="p-1">
      <div className="group relative inline-block rounded-lg">
        {/* Gradient border that appears on hover - increased thickness */}
        <div
          className="absolute inset-[-3px] z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgb(74, 234, 220) 0%, rgb(151, 120, 209) 20%, rgb(207, 42, 186) 40%, rgb(238, 44, 130) 60%, rgb(251, 105, 98) 80%, rgb(254, 248, 76) 100%)',
          }}
        />

        {/* Main card - dynamic width and height based on layout */}
        <div
          className={`${cardSizeClass} relative z-[1] overflow-hidden rounded-lg bg-white`}
        >
          {/* Container for zoom effect */}
          <div className="absolute inset-[2px] overflow-hidden rounded-[6px]">
            {/* Image with zoom effect */}
            <div className="h-full w-full transition-all duration-300 group-hover:scale-110">
              {/* Replace Image component with img tag */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Darkening overlay on hover */}
          <div className="absolute inset-0 z-[1] bg-black opacity-0 transition-all duration-300 group-hover:opacity-40" />
          {/* Content container with consistent gradient for both layouts */}
          <div
            className="absolute bottom-[-8px] left-0 right-0 z-[2]"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
            }}
          >
            <div className={`p-3 ${layout === 'horizontal' ? 'w-full' : ''}`}>
              <Heading
                variant={getHeadingVariant(type)}
                className="mb-1 text-white"
              >
                {article.title}
              </Heading>
              {/* <Text variant={getTextVariant(type)} className="text-gray-300 flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-2" /> {formattedDate}
              </Text> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticleCard;
