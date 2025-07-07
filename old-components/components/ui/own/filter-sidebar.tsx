'use client';

import { useState } from 'react';

import { Search, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import Heading from '@/components/ui/base/heading';
import Text from '@/components/ui/base/text';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';

// Tipos
interface FilterState {
  dateFilter: string | null;
  selectedDays: string[];
  selectedTypes: string[];
  selectedStyles: string[];
  selectedLevels: string[];
  selectedLocations: string[];
  selectedTimesOfDay: string[];
}

// Datos estáticos
const dateFilters = [
  { id: 'today', label: 'Hoy' },
  { id: 'week', label: 'Esta Semana' },
  { id: 'month', label: 'Este Mes' },
  { id: 'custom', label: 'Días Específicos' },
];

const weekDays = [
  { id: 'mon', label: 'Lun' },
  { id: 'tue', label: 'Mar' },
  { id: 'wed', label: 'Mié' },
  { id: 'thu', label: 'Jue' },
  { id: 'fri', label: 'Vie' },
  { id: 'sat', label: 'Sáb' },
  { id: 'sun', label: 'Dom' },
];

const eventTypes = [
  { id: 'social_dance', label: 'Baile social' },
  { id: 'class', label: 'Clases' },
  { id: 'other', label: 'Eventos / Otros' },
];

const allDanceStyles = [
  { id: 'tango', label: 'Tango' },
  { id: 'salsa', label: 'Salsa' },
  { id: 'bachata', label: 'Bachata' },
  { id: 'kizomba', label: 'Kizomba' },
  { id: 'swing', label: 'Swing' },
  { id: 'folklorico', label: 'Folclórico' },
  { id: 'contemporaneo', label: 'Contemporáneo' },
  { id: 'ballet', label: 'Ballet' },
  { id: 'jazz', label: 'Jazz' },
  { id: 'hiphop', label: 'Hip Hop' },
  { id: 'breakdance', label: 'Breakdance' },
  { id: 'afro', label: 'Afro' },
  { id: 'flamenco', label: 'Flamenco' },
];

const levels = [
  { id: 'beginner', label: 'Principiante' },
  { id: 'intermediate', label: 'Intermedio' },
  { id: 'advanced', label: 'Avanzado' },
];

const locations = [
  { id: 'city_center', label: 'Centro de la ciudad' },
  { id: 'north', label: 'Norte' },
  { id: 'south', label: 'Sur' },
  { id: 'east', label: 'Este' },
  { id: 'west', label: 'Oeste' },
  // ... otros lugares
];

const timesOfDay = [
  { id: 'morning', label: 'Mañana' },
  { id: 'afternoon', label: 'Tarde' },
  { id: 'evening', label: 'Noche' },
];

// Componente Principal
export default function FilterSidebar() {
  // Estados
  const [sections, setSections] = useState({
    dates: true,
    styles: true,
    locations: true,
    types: true,
    timesOfDay: true,
    levels: true,
  });

  const [filters, setFilters] = useState<FilterState>({
    dateFilter: 'week', // "Esta Semana" seleccionada por defecto
    selectedDays: [], // No días específicos seleccionados por defecto
    selectedTypes: ['class', 'social_dance', 'other'], // Tipos seleccionados por defecto
    selectedStyles: ['tango', 'salsa', 'bachata'], // Estilos seleccionados por defecto
    selectedLevels: ['beginner', 'intermediate', 'advanced'], // Todos los niveles seleccionados por defecto
    selectedLocations: ['city_center', 'north', 'south', 'east', 'west'], // All locations selected by default
    selectedTimesOfDay: ['morning', 'afternoon', 'evening'], // All times selected by default
  });

  // Estados para controlar la apertura de las búsquedas
  const [isStyleSearchOpen, setIsStyleSearchOpen] = useState(false);

  // Handlers
  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDateFilterChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateFilter: value,
      selectedDays: value === 'custom' ? prev.selectedDays : [], // Reset selectedDays si no es 'custom'
    }));
  };

  const toggleDay = (day: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const handleStyleSelect = (style: { id: string; label: string }) => {
    setFilters((prev) => ({
      ...prev,
      selectedStyles: [...prev.selectedStyles, style.id],
    }));
    setIsStyleSearchOpen(false); // Cerrar el buscador al seleccionar un estilo
  };

  const removeStyle = (styleId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedStyles: prev.selectedStyles.filter((id) => id !== styleId),
    }));
  };

  const toggleType = (typeId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(typeId)
        ? prev.selectedTypes.filter((id) => id !== typeId)
        : [...prev.selectedTypes, typeId],
    }));
  };

  const toggleLevel = (levelId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedLevels: prev.selectedLevels.includes(levelId)
        ? prev.selectedLevels.filter((id) => id !== levelId)
        : [...prev.selectedLevels, levelId],
    }));
  };

  const toggleLocation = (locationId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedLocations: prev.selectedLocations.includes(locationId)
        ? prev.selectedLocations.filter((id) => id !== locationId)
        : [...prev.selectedLocations, locationId],
    }));
  };

  const toggleTimeOfDay = (timeId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTimesOfDay: prev.selectedTimesOfDay.includes(timeId)
        ? prev.selectedTimesOfDay.filter((id) => id !== timeId)
        : [...prev.selectedTimesOfDay, timeId],
    }));
  };

  return (
    <div className="h-full w-72 bg-white p-4">
      <div className="space-y-2">
        {/* Fechas */}
        <div>
          <Heading variant="h5" className="mb-2 font-semibold">
            Fechas
          </Heading>
          <RadioGroup
            value={filters.dateFilter || ''}
            onValueChange={handleDateFilterChange}
            className="flex flex-col"
          >
            {dateFilters.map((filter) => (
              <div
                key={filter.id}
                className="hover:bg-primary-hover flex cursor-pointer items-center space-x-2 rounded-md px-2"
              >
                <RadioGroupItem value={filter.id} id={filter.id} />
                <label
                  htmlFor={filter.id}
                  className="cursor-pointer text-sm font-medium text-gray-500"
                >
                  {filter.label}
                </label>
              </div>
            ))}
          </RadioGroup>

          {filters.dateFilter === 'custom' && (
            <div className="mt-4">
              <Text
                variant="body-sm"
                className="mb-2 font-medium text-gray-500"
              >
                Selecciona los días
              </Text>
              <div className="grid grid-cols-4 gap-2">
                {weekDays.map((day) => (
                  <Button
                    key={day.id}
                    variant={
                      filters.selectedDays.includes(day.id)
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    onClick={() => toggleDay(day.id)}
                    className={`w-full ${
                      filters.selectedDays.includes(day.id)
                        ? 'bg-warm-gradient text-white'
                        : 'bg-gray-100 text-gray-700'
                    } cursor-pointer transition-colors duration-200 hover:bg-accent-gradient hover:text-white`}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estilos de Baile */}
        <div>
          <Heading variant="h5" className="mb-2 font-semibold">
            Estilos de Baile
          </Heading>
          <div className="space-y-4">
            {/* Botón para abrir la búsqueda de estilos */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStyleSearchOpen((prev) => !prev)}
              className="flex w-full items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              {isStyleSearchOpen ? 'Cerrar Búsqueda' : 'Buscar Estilo'}
            </Button>

            {/* Área de búsqueda que se muestra solo si está abierta */}
            {isStyleSearchOpen && (
              <Command className="border-gray-200 mt-2 rounded-lg border">
                <CommandInput
                  placeholder="Buscar estilo..."
                  className="font-sans text-gray-500"
                />
                <CommandList>
                  <CommandEmpty>No se encontraron estilos.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-48">
                      {allDanceStyles
                        .filter(
                          (style) => !filters.selectedStyles.includes(style.id)
                        )
                        .map((style) => (
                          <CommandItem
                            key={style.id}
                            onSelect={() => handleStyleSelect(style)}
                            className="hover:bg-accent-hover cursor-pointer"
                          >
                            {style.label}
                          </CommandItem>
                        ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            )}

            {/* Muestra los estilos seleccionados como badges */}
            <div className="flex flex-wrap gap-2">
              {filters.selectedStyles.map((styleId) => {
                const style = allDanceStyles.find((s) => s.id === styleId);
                if (style) {
                  return (
                    <Badge
                      key={styleId}
                      variant="outline"
                      onClick={() => removeStyle(styleId)}
                      className="flex cursor-pointer items-center gap-1 bg-warm-gradient px-3 py-1 text-white transition-all duration-300 hover:bg-accent-gradient"
                    >
                      {style.label}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div>
          <Heading variant="h5" className="mb-2 font-semibold">
            Ubicación
          </Heading>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => {
              const isSelected = filters.selectedLocations.includes(
                location.id
              );
              return (
                <Badge
                  key={location.id}
                  variant="outline"
                  onClick={() => toggleLocation(location.id)}
                  className={`flex cursor-pointer items-center gap-1 px-3 py-1 ${isSelected ? 'bg-warm-gradient text-white' : 'bg-gray-100 text-gray-700'} transition-all duration-300 hover:bg-accent-gradient hover:text-white`}
                >
                  {location.label}
                  {isSelected && <X className="ml-1 h-3 w-3" />}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Tipos de Evento */}
        <div>
          <Heading variant="h5" className="mb-2 font-semibold">
            Tipos de Evento
          </Heading>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => {
              const isSelected = filters.selectedTypes.includes(type.id);
              return (
                <Badge
                  key={type.id}
                  variant="outline"
                  onClick={() => toggleType(type.id)}
                  className={`flex cursor-pointer items-center gap-1 px-3 py-1 ${isSelected ? 'bg-warm-gradient text-white' : 'bg-gray-100 text-gray-700'} transition-all duration-300 hover:bg-accent-gradient hover:text-white`}
                >
                  {type.label}
                  {isSelected && <X className="ml-1 h-3 w-3" />}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Hora del Día */}
        <div>
          <Heading variant="h5" className="mb-2 font-semibold">
            Hora del Día
          </Heading>
          <div className="flex flex-wrap gap-2">
            {timesOfDay.map((time) => {
              const isSelected = filters.selectedTimesOfDay.includes(time.id);
              return (
                <Badge
                  key={time.id}
                  variant="outline"
                  onClick={() => toggleTimeOfDay(time.id)}
                  className={`flex cursor-pointer items-center gap-1 px-3 py-1 ${isSelected ? 'bg-warm-gradient text-white' : 'bg-gray-100 text-gray-700'} transition-all duration-300 hover:bg-accent-gradient hover:text-white`}
                >
                  {time.label}
                  {isSelected && <X className="ml-1 h-3 w-3" />}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Niveles (condicional) */}
        {filters.selectedTypes.includes('class') && (
          <div>
            <Heading variant="h5" className="mb-2 font-semibold">
              Nivel
            </Heading>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => {
                const isSelected = filters.selectedLevels.includes(level.id);
                return (
                  <Badge
                    key={level.id}
                    variant="outline"
                    onClick={() => toggleLevel(level.id)}
                    className={`flex cursor-pointer items-center gap-1 px-3 py-1 ${
                      isSelected
                        ? 'bg-warm-gradient text-white'
                        : 'bg-gray-100 text-gray-700'
                    } transition-all duration-300 hover:bg-accent-gradient hover:text-white`}
                  >
                    {level.label}
                    {isSelected && <X className="ml-1 h-3 w-3" />}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
