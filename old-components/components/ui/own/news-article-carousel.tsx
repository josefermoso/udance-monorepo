'use client';

import { useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { generateRandomArticles } from './articles-data';
// Import arrow icons
import NewsArticleCard from './news-article-card';
import { Article } from './types';

export default function NewsArticleCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | NodeJS.Timeout | null>(null); // Added ref
  const [currentPage, setCurrentPage] = useState(0);
  const SCROLL_DELAY = 4000; // Configurable delay in milliseconds
  const totalPages = 2; // Updated total pages
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(generateRandomArticles(11));
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Get the width of the visible container
    const getVisibleWidth = () => scrollContainer.clientWidth;

    const scroll = () => {
      const visibleWidth = getVisibleWidth();
      const maxScroll = scrollContainer.scrollWidth - visibleWidth;

      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        setCurrentPage(0);
      } else {
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft + visibleWidth,
          behavior: 'smooth',
        });
        setCurrentPage((curr) => curr + 1);
      }
    };

    // Update current page on scroll
    const handleScroll = () => {
      if (!scrollContainer) return;
      const visibleWidth = getVisibleWidth();
      const newPage = Math.round(scrollContainer.scrollLeft / visibleWidth);
      setCurrentPage(newPage);
    };

    const handleMouseEnter = () => {
      // Added handler
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };

    const handleMouseLeave = () => {
      // Added handler
      scrollIntervalRef.current = setInterval(scroll, SCROLL_DELAY);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('mouseenter', handleMouseEnter); // Added event listener
    scrollContainer.addEventListener('mouseleave', handleMouseLeave); // Added event listener
    scrollIntervalRef.current = setInterval(scroll, SCROLL_DELAY); // Assign interval

    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current); // Clear interval
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter); // Remove event listener
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave); // Remove event listener
    };
  }, []);

  const goToPreviousPage = () => {
    const newPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
    setCurrentPage(newPage);
    scrollContainerRef.current?.scrollTo({
      left: newPage * scrollContainerRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  const goToNextPage = () => {
    const newPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
    setCurrentPage(newPage);
    scrollContainerRef.current?.scrollTo({
      left: newPage * scrollContainerRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleMouseEnter = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  const handleMouseLeave = () => {
    scrollIntervalRef.current = setInterval(scroll, SCROLL_DELAY);
  };

  if (articles.length === 0) {
    return null; // or return a loading state
  }

  return (
    <section className="relative">
      <div
        ref={scrollContainerRef}
        onMouseEnter={handleMouseEnter} // Added prop
        onMouseLeave={handleMouseLeave} // Added prop
        className="scrollbar-hide flex gap-4 overflow-x-hidden scroll-smooth"
      >
        {articles.map((article, index) => (
          <NewsArticleCard
            key={index}
            type={
              index % 3 === 0
                ? 'other-article'
                : index % 3 === 1
                  ? 'sub-article'
                  : 'main-article'
            }
            layout="vertical"
            article={article}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPreviousPage}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition hover:bg-opacity-75"
        aria-label="Anterior"
      >
        <ChevronLeft className="text-gray-800 h-6 w-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNextPage}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition hover:bg-opacity-75"
        aria-label="Siguiente"
      >
        <ChevronRight className="text-gray-800 h-6 w-6" />
      </button>

      {/* Updated Pagination Dots */}
      <div className="mt-2 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentPage === index ? 'scale-125 bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
