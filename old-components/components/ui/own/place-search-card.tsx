import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PlaceSearchCardProps {
  name: string;
  photoUrl: string;
  danceTypes: string[];
  address: string;
}

const PlaceSearchCard: React.FC<PlaceSearchCardProps> = ({
  name = 'Dance Studio',
  photoUrl = 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2080',
  danceTypes = ['Salsa', 'Bachata', 'Kizomba'],
  address = '123 Dance Street, Dance City',
}) => (
  <div className="w-64 transition-all duration-300 hover:-translate-y-1">
    <div className="relative overflow-hidden rounded-lg bg-white shadow-soft-md hover:shadow-soft-lg">
      <div className="absolute inset-0 bg-primary-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      {/* Header with place image */}
      <div className="bg-accent-gradient/5 relative h-32">
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content section */}
      <div className="p-3">
        {/* Place info with logo */}
        <div className="relative z-10 -mt-6 mb-2 flex items-center">
          <Avatar className="h-12 w-12 shadow-soft ring-2 ring-white">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback className="bg-primary-gradient text-white">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <h3 className="font-display text-sm font-medium text-gray-700">
              {name}
            </h3>
          </div>
        </div>

        {/* Dance styles */}
        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {danceTypes.map((style, index) => (
              <span
                key={index}
                className="bg-magenta-50 rounded-full px-1.5 py-0.5 text-[12px] font-medium text-magenta-500"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center text-gray-500">
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate text-xs">{address}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PlaceSearchCard;
