import React, { useState } from 'react';

interface DanceClass {
  id: string;
  name: string;
  teacher: {
    name: string;
  };
  day: string;
  startTime: string;
  endTime: string;
  style: string;
  level: string;
  room: string;
}

const DAYS = [
  { full: 'Lunes', short: 'Lun' },
  { full: 'Martes', short: 'Mar' },
  { full: 'Miércoles', short: 'Mié' },
  { full: 'Jueves', short: 'Jue' },
  { full: 'Viernes', short: 'Vie' },
  { full: 'Sábado', short: 'Sáb' },
  { full: 'Domingo', short: 'Dom' },
];

const START_HOUR = 8;
const END_HOUR = 22;
const INTERVAL = 30;

const STYLE_COLORS: { [key: string]: string } = {
  Salsa: 'bg-magenta-500',
  Bachata: 'bg-purple-500',
  Tango: 'bg-blue-500',
  'Hip Hop': 'bg-blue-300',
  'Dance Hall': 'bg-gray-300',
  Kizomba: 'bg-magenta-300',
  Todos: 'bg-gray-500',
};

// Datos de ejemplo con la propiedad 'room' añadida
const DANCE_CLASSES: DanceClass[] = [
  {
    id: '1',
    name: 'Salsa Intermedio',
    teacher: { name: 'Ana López' },
    day: 'Lunes',
    startTime: '18:30',
    endTime: '20:00',
    style: 'Salsa',
    level: 'Intermedio',
    room: 'Sala 1',
  },
  {
    id: '2',
    name: 'Bachata Principiantes',
    teacher: { name: 'Carlos Ruiz' },
    day: 'Lunes',
    startTime: '20:15',
    endTime: '21:45',
    style: 'Bachata',
    level: 'Principiante',
    room: 'Sala 2',
  },
  {
    id: '3',
    name: 'Tango Avanzado',
    teacher: { name: 'María Sánchez' },
    day: 'Martes',
    startTime: '19:00',
    endTime: '20:30',
    style: 'Tango',
    level: 'Avanzado',
    room: 'Sala 1',
  },
  {
    id: '4',
    name: 'Hip Hop Kids',
    teacher: { name: 'Juan Pérez' },
    day: 'Miércoles',
    startTime: '17:00',
    endTime: '18:15',
    style: 'Hip Hop',
    level: 'Kids',
    room: 'Sala 2',
  },
  {
    id: '5',
    name: 'Dance Hall',
    teacher: { name: 'Laura García' },
    day: 'Miércoles',
    startTime: '20:00',
    endTime: '21:30',
    style: 'Dance Hall',
    level: 'Todos los niveles',
    room: 'Sala 1',
  },
  {
    id: '6',
    name: 'Kizomba',
    teacher: { name: 'Pedro Martínez' },
    day: 'Jueves',
    startTime: '19:30',
    endTime: '21:00',
    style: 'Kizomba',
    level: 'Intermedio',
    room: 'Sala 2',
  },
  {
    id: '7',
    name: 'Salsa Casino',
    teacher: { name: 'Ana López' },
    day: 'Viernes',
    startTime: '18:00',
    endTime: '19:30',
    style: 'Salsa',
    level: 'Todos los niveles',
    room: 'Sala 1',
  },
  {
    id: '8',
    name: 'Bachata Sensual',
    teacher: { name: 'Carlos Ruiz' },
    day: 'Viernes',
    startTime: '19:45',
    endTime: '21:15',
    style: 'Bachata',
    level: 'Intermedio',
    room: 'Sala 2',
  },
  {
    id: '9',
    name: 'Tango Principiantes',
    teacher: { name: 'María Sánchez' },
    day: 'Sábado',
    startTime: '10:00',
    endTime: '11:30',
    style: 'Tango',
    level: 'Principiante',
    room: 'Sala 1',
  },
  {
    id: '10',
    name: 'Salsa Shines',
    teacher: { name: 'Pedro Martínez' },
    day: 'Sábado',
    startTime: '11:45',
    endTime: '13:15',
    style: 'Salsa',
    level: 'Intermedio',
    room: 'Sala 2',
  },
  {
    id: '11',
    name: 'Práctica Libre',
    teacher: { name: 'Todos' },
    day: 'Domingo',
    startTime: '17:00',
    endTime: '20:00',
    style: 'Todos',
    level: 'Todos los niveles',
    room: 'Sala 1',
  },
];

// Obtenemos las salas únicas
const ROOMS = Array.from(new Set(DANCE_CLASSES.map((cls) => cls.room)));

// Mapeo de colores de fondo para cada sala
const ROOM_COLORS: { [key: string]: string } = {
  'Sala 1': 'bg-magenta-500',
  'Sala 2': 'bg-blue-500',
  // Agrega más salas y colores si es necesario
};

// Mapeo de colores de borde para el contenedor del horario
const ROOM_BORDER_COLORS: { [key: string]: string } = {
  'Sala 1': 'border-magenta-500',
  'Sala 2': 'border-blue-500',
  // Agrega más salas y colores si es necesario
};

const ROOM_COLOR_NAMES: { [key: string]: string } = {
  'Sala 1': 'magenta-500',
  'Sala 2': 'blue-500',
  // Add more rooms as needed
};

const getGridPosition = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = (hours - START_HOUR) * 60 + minutes;
  return totalMinutes + 2; // +2 para considerar la fila del encabezado
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const WeeklySchedule: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);

  const scheduleStart = START_HOUR * 60;
  const scheduleEnd = END_HOUR * 60;
  const scheduleDuration = scheduleEnd - scheduleStart;
  const totalRows = scheduleDuration; // Una fila por minuto

  const calculateClassPosition = (
    startTime: string,
    endTime: string,
    day: string
  ) => {
    const startPosition = getGridPosition(startTime);
    const endPosition = getGridPosition(endTime);
    const column = DAYS.findIndex((d) => d.full === day) + 1;

    return {
      gridColumn: column,
      gridRow: `${startPosition} / ${endPosition}`,
    };
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const durationMinutes = endMinutes - startMinutes;
    const durationHours = (durationMinutes / 60).toFixed(1);
    return `${durationHours} horas`;
  };

  // Generar etiquetas de tiempo para cada hora
  const generateTimeLabels = (startHour: number, endHour: number) => {
    const labels = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      labels.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return labels;
  };
  const timeLabels = generateTimeLabels(START_HOUR, END_HOUR);

  return (
    <div className="container mx-auto p-6">
      {/* Encabezado con Gradiente */}
      <div className="mb-6 rounded-lg bg-primary-gradient p-6 text-white shadow-lg">
        <h1 className="text-display-1 font-display font-bold">
          Horario Semanal
        </h1>
      </div>

      {/* Selector de Salas */}
      <div className="ml-4 flex">
        {ROOMS.map((room) => (
          <button
            key={room}
            className={`text-body-sm relative rounded-t-lg px-4 py-2 font-medium focus:outline-none ${
              selectedRoom === room
                ? `bg-${ROOM_COLOR_NAMES[room]} text-white`
                : `border-2 bg-white border-${ROOM_COLOR_NAMES[room]} text-gray-300 opacity-60`
            }`}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Contenedor del Horario */}
      <div
        className={`relative overflow-x-auto border-2 bg-white bg-opacity-80 shadow-lg ${ROOM_BORDER_COLORS[selectedRoom]} rounded-lg`}
        style={{ marginTop: '-1px' }}
      >
        {/* Leyenda de Estilos */}
        <div className="mb-4 flex flex-wrap gap-2 p-4">
          {Object.entries(STYLE_COLORS).map(([style, color]) => (
            <div key={style} className="text-body-sm flex items-center">
              <div className={`h-3 w-3 rounded-sm ${color} mr-1`}></div>
              <span className="text-gray-700">{style}</span>
            </div>
          ))}
        </div>

        <div className="relative">
          {/* Columna de horas */}
          <div
            className="absolute bottom-0 left-0 top-0 z-20 grid w-14 border-r border-gray-300 bg-white"
            style={{
              gridTemplateRows: `32px repeat(${totalRows}, 1px)`,
            }}
          >
            {/* Encabezado */}
            <div className="border-gray-200 text-caption flex h-8 items-center justify-center border-b font-medium text-gray-500">
              Hora
            </div>
            {/* Etiquetas de tiempo */}
            {timeLabels.map((time) => {
              const position = getGridPosition(time);
              return (
                <div
                  key={time}
                  className="flex items-center justify-center"
                  style={{
                    gridRowStart: position,
                    gridRowEnd: 'span 1',
                  }}
                >
                  <span className="text-caption bg-white px-1 font-medium text-gray-500">
                    {time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Grid principal */}
          <div
            className="relative ml-14 grid"
            style={{
              gridTemplateColumns: `repeat(${DAYS.length}, minmax(100px, 1fr))`,
              gridTemplateRows: `32px repeat(${totalRows}, 1px)`,
              minWidth: '700px',
              minHeight: '800px',
            }}
          >
            {/* Encabezado días */}
            {DAYS.map((day) => (
              <div
                key={day.full}
                className="border-gray-200 text-body-sm text-gray-600 sticky top-0 z-10 border-b border-l bg-white px-1 py-1 text-center font-medium"
              >
                <span className="hidden sm:inline">{day.full}</span>
                <span className="sm:hidden">{day.short}</span>
              </div>
            ))}

            {/* Líneas horizontales para cada hora */}
            {timeLabels.map((time) => {
              const position = getGridPosition(time);
              return (
                <div
                  key={`line-${time}`}
                  className="col-span-full border-t border-gray-300"
                  style={{
                    gridRowStart: position,
                    gridRowEnd: 'span 1',
                  }}
                />
              );
            })}

            {/* Líneas verticales para cada día */}
            {DAYS.map((_, index) => (
              <div
                key={`vline-${index}`}
                className="row-span-full border-l border-gray-300"
                style={{
                  gridColumn: index + 1,
                  gridRow: `2 / span ${totalRows}`, // Start from row 2 (after headers)
                }}
              />
            ))}

            {/* Clases filtradas por sala */}
            {DANCE_CLASSES.filter(
              (danceClass) => danceClass.room === selectedRoom
            ).map((danceClass) => {
              const { gridColumn, gridRow } = calculateClassPosition(
                danceClass.startTime,
                danceClass.endTime,
                danceClass.day
              );
              const duration = calculateDuration(
                danceClass.startTime,
                danceClass.endTime
              );

              return (
                <div
                  key={danceClass.id}
                  className={`z-30 mx-0.5 cursor-pointer rounded p-1 shadow-sm transition-shadow hover:shadow-md ${STYLE_COLORS[danceClass.style] || 'bg-gray-500'}`}
                  style={{
                    gridColumn,
                    gridRow,
                  }}
                >
                  <div className="text-body-sm truncate font-medium text-white">
                    {danceClass.name}
                  </div>
                  <div className="text-caption truncate text-white/90">
                    {danceClass.teacher.name}
                  </div>
                  <div className="text-caption truncate text-white/80">
                    {danceClass.startTime} - {danceClass.endTime} ({duration})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
