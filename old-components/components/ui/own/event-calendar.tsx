import React, { useEffect, useRef, useState } from 'react';

import Heading from '../base/heading';
import Text from '../base/text';

// Separator Component
const Separator = () => <hr className="my-4 border-t border-gray-300" />;

// ChevronDown Icon
const ChevronDown = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

// ChevronUp Icon
const ChevronUp = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 15l7-7 7 7"
    />
  </svg>
);

// Add interfaces
interface CollapsibleProps {
  children: (
    isOpen: boolean,
    onOpenChange: (open: boolean) => void
  ) => React.ReactNode;
}

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  onToggle: () => void;
}

interface CollapsibleContentProps {
  children: React.ReactNode;
  isOpen: boolean;
}

interface CalendarEventProps {
  startDate: string;
  startMonth: string;
  endDate: string;
  endMonth: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  moreInfoUrl?: string;
}

interface CalendarMonthProps {
  month: string;
  events: CalendarEventProps[];
}

// Collapsible Component
const Collapsible: React.FC<CollapsibleProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <div>{children(isOpen, setIsOpen)}</div>;
};

// CollapsibleTrigger Component
const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  children,
  onToggle,
}) => (
  <button onClick={onToggle} className="w-full focus:outline-none">
    {children}
  </button>
);

// CollapsibleContent Component with smooth height transition
const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  isOpen,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      style={{ maxHeight: height }}
      className={
        'transition-max-height overflow-hidden duration-500 ease-in-out'
      }
    >
      <div className="bg-gray-50 mt-4 rounded-lg p-4">{children}</div>
    </div>
  );
};

// CalendarEvent Component
const CalendarEvent: React.FC<CalendarEventProps> = ({
  startDate,
  startMonth,
  endDate,
  endMonth,
  title,
  location,
  imageUrl,
  description,
  moreInfoUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible>
      {(open, onOpenChange) => (
        <>
          <CollapsibleTrigger onToggle={() => setIsOpen(!isOpen)}>
            <div className="flex items-start rounded-lg border-4 border-transparent p-4 transition-all duration-300 hover:border-magenta-500">
              <div className="mr-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-300">
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-start">
                  <div className="mr-4 text-center">
                    <Heading variant="h4" className="text-gray-800 font-bold">
                      {startDate}
                    </Heading>
                    <Text variant="body-xs" className="text-gray-600 uppercase">
                      {startMonth}
                    </Text>
                  </div>
                  <span className="text-gray-600 mt-2 self-start text-xl font-bold">
                    -
                  </span>
                  <div className="ml-4 text-center">
                    <Heading variant="h4" className="text-gray-800 font-bold">
                      {endDate}
                    </Heading>
                    <Text variant="body-xs" className="text-gray-600 uppercase">
                      {endMonth}
                    </Text>
                  </div>
                  <div className="ml-6">
                    <Heading variant="h4" className="font-semi">
                      {title}
                    </Heading>
                    <Text variant="body-base" className="text-gray-600">
                      {location}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="ml-4 self-center">
                {isOpen ? (
                  <ChevronUp className="text-gray-600 h-5 w-5" />
                ) : (
                  <ChevronDown className="text-gray-600 h-5 w-5" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent isOpen={isOpen}>
            <div className="mb-4 h-64 w-full overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>

            <Heading variant="h3" className="mb-2 font-bold">
              Detalles del Evento
            </Heading>
            <Text variant="body-base" className="text-gray-600">
              {description}
            </Text>

            {moreInfoUrl && (
              <a
                href={moreInfoUrl}
                className="inline-block rounded-lg bg-primary-gradient px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-hover-primary-gradient"
                target="_blank"
                rel="noopener noreferrer"
              >
                Más Información →
              </a>
            )}
          </CollapsibleContent>
        </>
      )}
    </Collapsible>
  );
};

// CalendarMonth Component
const CalendarMonth: React.FC<CalendarMonthProps> = ({ month, events }) => {
  return (
    <div className="relative mb-8">
      <div className="mb-2 ml-8 flex items-center">
        <Heading variant="h2" className="font-bold">
          {month}
        </Heading>
      </div>
      <div className="absolute bottom-0 left-8 top-8 w-1 bg-primary-gradient"></div>
      <div className="ml-12">
        {events.map((event, index) => (
          <div key={index}>
            <CalendarEvent {...event} />
            {index < events.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
};

// EventCalendar Component
const EventCalendar = () => {
  const months = [
    {
      month: 'NOVIEMBRE 2024',
      events: [
        {
          startDate: '8',
          startMonth: 'Nov',
          endDate: '11',
          endMonth: 'Nov',
          title: 'Noche Social de Bachata',
          location: 'Nueva York, USA',
          imageUrl: '/images/dance-event-1.jpg',
          description:
            'Únete a nosotros para una increíble noche de baile de Bachata con música en vivo y actuaciones profesionales.',
          moreInfoUrl: 'https://example.com/bachata-night',
        },
        {
          startDate: '12',
          startMonth: 'Nov',
          endDate: '15',
          endMonth: 'Nov',
          title: 'Taller de Kizomba',
          location: 'Los Ángeles, USA',
          imageUrl: '/images/dance-event-2.jpg',
          description:
            'Aprende el hermoso baile de Kizomba con nuestros instructores expertos.',
          moreInfoUrl: 'https://example.com/kizomba-workshop',
        },
      ],
    },
    {
      month: 'DICIEMBRE 2024',
      events: [
        {
          startDate: '5',
          startMonth: 'Dec',
          endDate: '8',
          endMonth: 'Dec',
          title: 'Festival de Salsa',
          location: 'Miami, USA',
          imageUrl: '/images/dance-event-3.jpg',
          description:
            'Experimenta la vibrante cultura de la Salsa en nuestro festival anual.',
          moreInfoUrl: 'https://example.com/salsa-festival',
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-lg p-6">
      {months.map((monthData, index) => (
        <CalendarMonth key={index} {...monthData} />
      ))}
    </div>
  );
};

export default EventCalendar;
