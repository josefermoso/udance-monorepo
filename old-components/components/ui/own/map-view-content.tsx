'use client';

import { FunctionComponent, useCallback, useRef, useState } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ReactDOMServer from 'react-dom/server';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import Text from '../base/text';
import PlaceSearchCard from './place-search-card';

interface PlaceDetails {
  title: string;
  description: string;
  fullDescription: string;
  address: string;
  website?: string;
}

interface CustomMarkerProps {
  position: [number, number];
  text: string;
  details: PlaceDetails;
}

const MapViewContent: FunctionComponent = () => {
  const CustomMarker = ({ position, text, details }: CustomMarkerProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState<{
      x: number;
      y: number;
    } | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout>();

    const handleMouseOver = useCallback((e: L.LeafletMouseEvent) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      const { containerPoint } = e;
      setIsHovered(true);
      setTooltipPosition({ x: containerPoint.x, y: containerPoint.y - 70 }); // Changed from -100 to -50
    }, []);

    const handleMouseOut = useCallback(() => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setTooltipPosition(null);
      }, 100); // pequeño delay para evitar parpadeos
    }, []);

    const createIcon = (hovered: boolean) => {
      const displayText = hovered ? 'Ver más' : text;
      const textComponent = ReactDOMServer.renderToString(
        <Text variant="body-xs" className="font-semibold">
          {displayText}
        </Text>
      );

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative p-px rounded-xl cursor-pointer ${
            hovered
              ? 'bg-gradient-to-r from-purple-500 to-blue-500'
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }">
            <div class="bg-white rounded-xl p-2 shadow-md relative">
              ${textComponent}
            </div>
            <div class="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2">
              <div class="w-4 h-4 bg-white transform rotate-45">
                <div class="absolute inset-0 bg-white" style="clip-path: polygon(0 0, 100% 0, 50% 100%)"></div>
                <div class="absolute bottom-0 left-0 right-0 h-[2px] ${
                  hovered
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }"></div>
              </div>
            </div>
          </div>
        `,
        iconSize: [100, 60],
        iconAnchor: [50, 60],
      });
    };

    const popupContent = `
      <div class="overflow-hidden">
        <div class="bg-primary-gradient p-4 text-white">
          <h2 class="text-xl font-bold mb-1">${details.title}</h2>
          <p class="text-white/90 text-sm">${details.address}</p>
        </div>
        <div class="p-4">
          <p class="mb-4 text-gray-500">${details.fullDescription}</p>
          ${
            details.website
              ? `<a href="${details.website}" 
                target="_blank" 
                class="inline-flex items-center px-4 py-2 rounded-md bg-accent-gradient text-white hover:bg-hover-accent-gradient transition-all duration-200">
              <span>Visitar sitio web</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>`
              : ''
          }
        </div>
      </div>
    `;

    return (
      <>
        <Marker
          position={position}
          icon={createIcon(isHovered)}
          eventHandlers={{
            click: (e) => {
              L.DomEvent.stopPropagation(e);
              const popup = L.popup()
                .setLatLng(position)
                .setContent(popupContent)
                .openOn(e.target._map);
            },
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,
          }}
        />
        {isHovered && tooltipPosition && (
          <div
            className="absolute z-[1000] transition-all duration-200 ease-in-out"
            style={{
              left: tooltipPosition.x - 128, // centered based on card width (256px/2)
              top: tooltipPosition.y,
              transform: 'translateY(-100%)',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0,
            }}
          >
            <PlaceSearchCard
              name={details.title}
              photoUrl="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=2080"
              danceTypes={details.description.split(', ')}
              address={details.address}
            />
          </div>
        )}
      </>
    );
  };

  const placeDetails: PlaceDetails = {
    title: 'Dance Studio Ritmo',
    description: 'Salsa, Bachata',
    fullDescription:
      'Professional dance studio offering classes in Salsa and Bachata for all levels. Join our vibrant community of dancers!',
    address: '123 Dance Street, London',
    website: 'https://example.com',
  };

  return (
    <>
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          border-radius: 0.75rem;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 300px;
        }
        .leaflet-popup-tip {
          display: none;
        }
        .leaflet-popup-close-button {
          color: white !important;
          margin: 0.5rem !important;
        }
        .leaflet-container,
        .leaflet-control,
        .leaflet-top,
        .leaflet-bottom,
        .leaflet-popup {
          z-index: 0 !important;
        }
      `}</style>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <CustomMarker
          position={[51.515, -0.09]}
          text="Dance Studio"
          details={placeDetails}
        />
      </MapContainer>
    </>
  );
};

export default MapViewContent;
