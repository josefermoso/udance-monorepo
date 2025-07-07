'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ChevronDown, ChevronUp, Menu, Search, X } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const navigation = [
  { name: 'Calendario', href: '/calendar' },
  {
    name: 'Comunidad',
    href: '/community',
    subItems: [
      { name: 'Profesores', href: '/community/teachers' },
      { name: 'Escuelas', href: '/community/schools' },
      { name: 'Grupos', href: '/community/groups' },
    ],
  },
  { name: 'Noticias', href: '/news' },
  { name: 'Artículos', href: '/articles' },
];

function useHover() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { isOpen, ref };
}

// Add the NavigationItem component
function NavigationItem({
  item,
  isActive,
}: {
  item: (typeof navigation)[0];
  isActive: (href: string) => boolean;
}) {
  const { isOpen, ref } = useHover();

  return (
    <div className="relative" ref={ref}>
      {item.subItems ? (
        <div className="relative">
          <Link
            href={item.href}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              isActive(item.href)
                ? 'bg-warm-gradient text-white'
                : 'text-gray-700 hover:bg-warm-gradient hover:text-white'
            } transition-all duration-200`}
          >
            {item.name}
          </Link>
          {isOpen && (
            <div className="absolute left-0 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={`block px-4 py-2 text-sm ${
                      isActive(subItem.href)
                        ? 'bg-warm-gradient text-white'
                        : 'text-gray-700 hover:bg-warm-gradient hover:text-white'
                    } transition-all duration-200`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.href}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            isActive(item.href)
              ? 'bg-warm-gradient text-white'
              : 'text-gray-700 hover:bg-warm-gradient hover:text-white'
          } transition-all duration-200`}
        >
          {item.name}
        </Link>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Función para determinar si un link está activo
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="border-gray-200 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y Marca */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <span className="font-display bg-primary-gradient bg-clip-text text-2xl font-bold text-transparent">
                Donde Bailo
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mx-8 hidden max-w-md flex-1 sm:flex">
            <div className="relative w-full">
              <Search className="text-gray-400 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                type="search"
                placeholder="Busca eventos, lugares, profesores y más"
                className="bg-gray-50 w-full pl-10 transition-colors focus:bg-white"
              />
            </div>
          </div>

          {/* Links de Navegación - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navigation.map((item) => (
              <NavigationItem key={item.name} item={item} isActive={isActive} />
            ))}
          </div>

          {/* Botón de Menú Móvil */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="focus:ring-primary-500 inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-all duration-200 hover:bg-warm-gradient hover:text-white focus:outline-none focus:ring-2 focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div
          className="border-gray-200 border-t bg-white/95 backdrop-blur-md sm:hidden"
          id="mobile-menu"
        >
          {/* Mobile Search */}
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="text-gray-400 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                type="search"
                placeholder="Busca eventos, lugares, profesores y más"
                className="bg-gray-50 w-full pl-10 transition-colors focus:bg-white"
              />
            </div>
          </div>
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {/* Link Principal */}
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-warm-gradient text-white'
                      : 'text-gray-700 hover:bg-warm-gradient hover:text-white'
                  } transition-all duration-200`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {/* Submenú para Móvil */}
                {item.subItems && (
                  <MobileDropdown
                    subItems={item.subItems}
                    parentName={item.name}
                    isActive={activeDropdown === item.name}
                    setActiveDropdown={setActiveDropdown}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Componente para manejar submenús en dispositivos móviles
interface MobileDropdownProps {
  subItems: { name: string; href: string }[];
  parentName: string;
  isActive: boolean;
  setActiveDropdown: (name: string | null) => void;
}

function MobileDropdown({
  subItems,
  parentName,
  isActive,
  setActiveDropdown,
}: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(isOpen ? null : parentName);
  };

  const isActiveLink = (href: string) => pathname === href;

  return (
    <div className="ml-4 mt-1 space-y-1">
      <button
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-warm-gradient hover:text-white focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Submenú</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-1">
          {subItems.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              className={`block rounded-md px-6 py-2 text-sm font-medium ${
                isActiveLink(subItem.href)
                  ? 'bg-warm-gradient text-white'
                  : 'text-gray-700 hover:bg-warm-gradient hover:text-white'
              } transition-all duration-200`}
              onClick={() => setActiveDropdown(null)}
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
