// src/components/EventDetails.jsx
import { useEffect, useRef, useState } from 'react';

// Importa AvatarImage y AvatarFallback
import 'tailwindcss/tailwind.css';

// Asegúrate de que la ruta es correcta
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import Heading from '../base/heading';
// Asegúrate de que Tailwind CSS está importado
import Text from '../base/text';

const EventDetails = () => {
  // Datos de ejemplo para el evento
  const event = {
    title: 'Gran Festival de Danza',
    date: '25 de noviembre de 2023',
    description:
      'Únete a nosotros en el gran festival de danza donde podrás disfrutar de múltiples estilos y presentaciones de talento internacional.',
    address: '📍Avenida Siempre Viva 742, Springfield',
    organizer: {
      name: 'Academia de Danza Springfield',
      avatar:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&h=200&w=200',
    },
    sellers: [
      {
        name: 'Juan Pérez',
        avatar:
          'https://images.unsplash.com/photo-1502767089025-6572583495b0?crop=faces&fit=crop&h=200&w=200',
      },
      {
        name: 'María García',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&h=200&w=200',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=60', // Ciudad Nocturna
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60', // Montañas al Amanecer
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60', // Playa Paradisíaca
    ],
  };

  // Estado para el índice de la imagen actual del slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderInterval = useRef<NodeJS.Timeout | null>(null);

  // Estado para controlar la pausa del slider
  const [isPaused, setIsPaused] = useState(false);

  // Función para avanzar a la siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === event.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para retroceder a la imagen anterior
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? event.images.length - 1 : prevIndex - 1
    );
  };

  // Función para establecer el slider automático
  const startSlider = () => {
    sliderInterval.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === event.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia de imagen cada 5 segundos
  };

  // Función para detener el slider automático
  const stopSlider = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startSlider();
    } else {
      stopSlider();
    }

    return () => {
      stopSlider();
    };
  }, [isPaused]);

  // Función para manejar la pausa al interactuar
  const handleInteraction = () => {
    setIsPaused(true);
    stopSlider();
    // Reanudar el slider después de 10 segundos de inactividad
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header with Gradient */}
      <div className="mb-6 rounded-lg bg-primary-gradient p-6 shadow-lg">
        {/* Title and date */}
        <div>
          <Heading variant="h1" className="text-white">
            {event.title}
          </Heading>
          <Text variant="body-lg" className="text-white/90">
            {event.date}
          </Text>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-4">
          <Button
            variant="ghost"
            className="flex items-center bg-white/20 transition-colors duration-200 hover:bg-white/30 hover:bg-accent-gradient"
            onClick={handleInteraction}
          >
            {/* Ícono de corazón */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-magenta-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.828a4 4 0 010-5.656z" />
            </svg>
            <Text variant="body-sm" className="text-white">
              Me gusta
            </Text>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center bg-white bg-opacity-20 transition-colors duration-200 hover:bg-opacity-30 hover:bg-accent-gradient"
            onClick={handleInteraction}
          >
            {/* Ícono de compartir */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 8a3 3 0 100-6 3 3 0 000 6zm0 0v6m0 0l-3-3m3 3l3-3M9 8a3 3 0 100-6 3 3 0 000 6zm0 0v6m0 0l-3-3m3 3l3-3"
              />
            </svg>
            <Text variant="body-sm" className="text-white">
              Compartir
            </Text>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center bg-white bg-opacity-20 transition-colors duration-200 hover:bg-opacity-30 hover:bg-accent-gradient"
            onClick={handleInteraction}
          >
            {/* Ícono de check */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-purple-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <Text variant="body-sm" className="text-white">
              Voy a ir
            </Text>
          </Button>
        </div>
      </div>

      {/* Image Slider */}
      <div
        className="relative mb-6 overflow-hidden rounded-lg shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Main Image */}
        <img
          src={event.images[currentImageIndex]}
          alt={`Imagen ${currentImageIndex + 1}`}
          className="h-80 w-full object-cover transition-transform duration-500"
        />

        {/* Botón de retroceder */}
        <button
          onClick={() => {
            prevImage();
            handleInteraction();
          }}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition hover:bg-opacity-75"
          aria-label="Anterior"
        >
          {/* Ícono de flecha izquierda */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Botón de avanzar */}
        <button
          onClick={() => {
            nextImage();
            handleInteraction();
          }}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition hover:bg-opacity-75"
          aria-label="Siguiente"
        >
          {/* Ícono de flecha derecha */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicadores de Slider */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
          {event.images.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50'
              }`}
              onClick={() => {
                setCurrentImageIndex(index);
                handleInteraction();
              }}
              aria-label={`Ir a la imagen ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Galería de Miniaturas */}
      <div className="mb-6 flex justify-center space-x-2">
        {event.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Miniatura ${index + 1}`}
            className={`h-16 w-16 cursor-pointer rounded object-cover ${
              currentImageIndex === index ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => {
              setCurrentImageIndex(index);
              handleInteraction();
            }}
          />
        ))}
      </div>

      {/* Sección de Descripción */}
      <div className="bg-warm-gradient/5 mb-6 rounded-lg p-6">
        <Heading
          variant="h2"
          className="bg-warm-gradient bg-clip-text text-transparent"
        >
          Descripción
        </Heading>
        <Text variant="body-base" className="text-gray-500">
          {event.description}
        </Text>
      </div>

      {/* Sección de Ubicación */}
      <div className="bg-accent-gradient/5 mb-6 rounded-lg p-6">
        <Heading
          variant="h2"
          className="bg-accent-gradient bg-clip-text text-transparent"
        >
          Ubicación
        </Heading>
        <Text variant="body-base" className="mb-4 text-gray-500">
          {event.address}
        </Text>
        {/* Mapa estilizado */}
        <div className="overflow-hidden rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1584270354949-0be2f7e22ab8?auto=format&fit=crop&w=800&q=60"
            alt="Mapa de ubicación"
            className="h-80 w-full object-cover"
          />
        </div>
      </div>

      {/* Sección de Organizador */}
      <div className="bg-warm-gradient/5 mb-6 rounded-lg p-6">
        <Heading
          variant="h2"
          className="bg-warm-gradient bg-clip-text text-transparent"
        >
          Organiza
        </Heading>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src={event.organizer.avatar}
              alt={event.organizer.name}
            />
            <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Text variant="body-lg" className="ml-4 font-medium text-gray-500">
            {event.organizer.name}
          </Text>
        </div>
      </div>

      {/* Sección de Vendedores */}
      <div className="bg-primary-gradient/5 mb-6 rounded-lg p-6">
        <Heading
          variant="h2"
          className="bg-primary-gradient bg-clip-text text-transparent"
        >
          Puntos de contacto
        </Heading>
        <div className="flex space-x-4">
          {event.sellers.map((seller, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src={seller.avatar} alt={seller.name} />
                <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Text variant="body-sm" className="mt-2 text-gray-500">
                {seller.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
