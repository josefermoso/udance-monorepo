'use client';

import { useEffect, useRef, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import EventCard from './event-card';

export default function EventCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const SCROLL_DELAY = 3000; // Retardo en milisegundos

  // Definimos los eventos
  const eventCards = [
    <EventCard key={1} size="large" layout="horizontal" />,
    <EventCard key={2} size="large" layout="horizontal" />,
    <EventCard key={3} size="large" layout="horizontal" />,
    <EventCard key={4} size="large" layout="horizontal" />,
    <EventCard key={5} size="large" layout="horizontal" />,
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const getCardHeight = () => {
      const firstCard = scrollContainer.children[0];
      return firstCard ? firstCard.clientHeight : 0;
    };

    const scroll = () => {
      const cardHeight = getCardHeight();
      const maxScrollTop = cardHeight * (eventCards.length - 1);

      if (currentIndex >= eventCards.length - 1) {
        // Si estamos en el último elemento, volver al principio sin animación
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'auto',
        });
        setCurrentIndex(0);
      } else {
        // Avanzar normalmente al siguiente elemento
        scrollContainer.scrollTo({
          top: (currentIndex + 1) * cardHeight,
          behavior: 'smooth',
        });
        setCurrentIndex(currentIndex + 1);
      }
    };

    // Iniciar la animación automática
    scrollIntervalRef.current = setInterval(scroll, SCROLL_DELAY);

    const handleMouseEnter = () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };

    const handleMouseLeave = () => {
      scrollIntervalRef.current = setInterval(scroll, SCROLL_DELAY);
    };

    const handleScroll = () => {
      if (!scrollContainer) return;
      const cardHeight = getCardHeight();
      if (cardHeight === 0) return;

      const scrollTop = scrollContainer.scrollTop;
      const maxScrollTop = cardHeight * (eventCards.length - 1);

      // Asegurarse de que el índice esté dentro de los límites
      let newIndex = Math.round(scrollTop / cardHeight);
      newIndex = Math.max(0, Math.min(newIndex, eventCards.length - 1));

      setCurrentIndex(newIndex);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [currentIndex, eventCards.length]);

  const goToPreviousCard = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardHeight = scrollContainer.children[0]?.clientHeight || 0;
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : eventCards.length - 1;

    scrollContainer.scrollTo({
      top: newIndex * cardHeight,
      behavior: 'smooth',
    });
    setCurrentIndex(newIndex);
  };

  const goToNextCard = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardHeight = scrollContainer.children[0]?.clientHeight || 0;
    const newIndex =
      currentIndex < eventCards.length - 1 ? currentIndex + 1 : 0;

    scrollContainer.scrollTo({
      top: newIndex * cardHeight,
      behavior: 'smooth',
    });
    setCurrentIndex(newIndex);
  };

  return (
    <section className="relative">
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex h-[430px] flex-col overflow-y-auto scroll-smooth"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {eventCards.map((card, index) => (
          <div key={index} style={{ scrollSnapAlign: 'start' }}>
            {card}
          </div>
        ))}
      </div>

      <button
        onClick={goToPreviousCard}
        className="absolute left-1/2 top-2 z-10 -translate-x-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition hover:bg-opacity-75"
        aria-label="Anterior"
      >
        <ChevronUp className="text-gray-800 h-6 w-6" />
      </button>

      <button
        onClick={goToNextCard}
        className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition hover:bg-opacity-75"
        aria-label="Siguiente"
      >
        <ChevronDown className="text-gray-800 h-6 w-6" />
      </button>
    </section>
  );
}
