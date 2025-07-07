import Heading from '../base/heading';
import Text from '../base/text';

type EventCardProps = {
  size: 'small' | 'medium' | 'large';
  layout?: 'vertical' | 'horizontal';
};

const cardClasses = {
  vertical: {
    small: 'w-[256px] h-[320px]', // 1x width (256px)
    medium: 'w-[512px] h-[320px]', // 2x width (512px)
    large: 'w-[768px] h-[320px]', // 3x width (768px)
  },
  horizontal: {
    small: 'w-[230px] h-[128px]',
    medium: 'w-[230px] h-[128px]',
    large: 'w-[230px] h-[128px]',
    default: 'w-[230px] h-[128px]',
  },
} as const;

const EventCard = ({ size, layout = 'vertical' }: EventCardProps) => {
  const cardSizeClass =
    layout === 'vertical'
      ? cardClasses.vertical[size]
      : cardClasses.horizontal[size] || cardClasses.horizontal.default;

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
              <img
                // src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1000&auto=format&fit=crop"
                src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&amp;w=2369&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Ballet Performance"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Darkening overlay on hover */}
          <div className="absolute inset-0 z-[1] bg-black opacity-0 transition-all duration-300 group-hover:opacity-40" />

          {/* Date container with gradient - now on the right */}
          <div className="absolute right-0 top-0 z-[2]">
            <div
              className="relative w-fit py-2 pl-8 pr-3"
              style={{
                background:
                  'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 100%)',
              }}
            >
              <span className="text-gray-800 whitespace-nowrap font-[Roboto] text-lg font-medium">
                Nov 15
              </span>
            </div>
          </div>

          {/* Content container with consistent gradient for both layouts */}
          <div
            className="absolute bottom-[-8px] left-0 right-0 z-[2]"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
            }}
          >
            <div className={`p-3 ${layout === 'horizontal' ? 'w-full' : ''}`}>
              <Heading variant="h5" className="mb-1 text-white">
                Presentación de Ballet
              </Heading>
              <Text
                variant="body-sm"
                className="flex items-center gap-2 text-white/90"
              >
                <span>📍</span> Teatro Principal
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
