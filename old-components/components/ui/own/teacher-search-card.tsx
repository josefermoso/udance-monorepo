import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeacherReviewCardProps {
  name: string;
  photoUrl: string;
  danceType: string;
  schedule: string;
  location: string;
}

const TeacherSearchCard: React.FC<TeacherReviewCardProps> = ({
  name,
  photoUrl,
  danceType,
  schedule,
  location,
}) => (
  <div className="w-64 transition-all duration-300 hover:-translate-y-1">
    <div className="relative overflow-hidden rounded-lg bg-white shadow-soft-md hover:shadow-soft-lg">
      <div className="absolute inset-0 bg-primary-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      {/* Header with dance type */}
      <div className="bg-accent-gradient/5 relative h-32">
        <img
          src="https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070"
          alt="Dancing"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content section */}
      <div className="p-3">
        {/* Teacher info with avatar */}
        <div className="relative z-10 -mt-6 mb-2 flex items-center">
          <Avatar className="h-12 w-12 shadow-soft ring-2 ring-white">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback className="bg-primary-gradient text-white">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 mt-2">
            <h3 className="font-display text-sm font-medium text-gray-700">
              {name}
            </h3>
            <p className="text-xs font-medium text-magenta-500">{danceType}</p>
          </div>
        </div>

        {/* Class details */}
        <div className="space-y-1">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="truncate text-xs">{schedule}</span>
          </div>
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
            <span className="truncate text-xs">{location}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TeacherSearchCard;
