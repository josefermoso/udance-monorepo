import type React from 'react';

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

interface GroupedDanceClass {
  id: string;
  name: string;
  teacher: {
    name: string;
  };
  days: string[];
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
  {
    id: '11',
    name: 'Práctica Libre',
    teacher: { name: 'Todos' },
    day: 'Lunes',
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

const groupIdenticalClasses = (classes: DanceClass[]): GroupedDanceClass[] => {
  const grouped = classes.reduce(
    (acc: { [key: string]: GroupedDanceClass }, curr) => {
      const key = `${curr.name}-${curr.startTime}-${curr.endTime}-${curr.room}-${curr.teacher.name}`;
      if (!acc[key]) {
        acc[key] = {
          ...curr,
          days: [curr.day],
          id: key,
        };
      } else {
        acc[key].days.push(curr.day);
      }
      return acc;
    },
    {}
  );

  return Object.values(grouped);
};

export const WeeklySchedule: React.FC = () => {
  // Remove selectedRoom state since we don't need it anymore

  const scheduleStart = START_HOUR * 60;
  const scheduleEnd = END_HOUR * 60;
  const scheduleDuration = scheduleEnd - scheduleStart;
  const totalRows = scheduleDuration; // Una fila por minuto

  const calculateClassPosition = (startTime: string, day: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    // Redondear a la hora anterior más cercana
    const roundedHours = minutes > 0 ? hours : hours;
    const totalMinutes = (roundedHours - START_HOUR) * 60;
    const startPosition = totalMinutes + 2; // +2 para considerar la fila del encabezado
    const column = DAYS.findIndex((d) => d.full === day) + 1;

    return {
      gridColumn: column,
      gridRow: startPosition,
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

  // Replace the existing sorting function with this one
  const sortedClasses = groupIdenticalClasses([...DANCE_CLASSES]).sort(
    (a, b) => {
      const timeA = timeToMinutes(a.startTime);
      const timeB = timeToMinutes(b.startTime);
      return timeA - timeB;
    }
  );

  return (
    <div className="w-full max-w-screen-lg overflow-hidden p-6">
      {/* Encabezado con Gradiente */}
      <div className="mb-6 rounded-lg bg-primary-gradient p-6 text-white shadow-lg">
        <h1 className="text-display-1 font-display font-bold">
          Horario Semanal
        </h1>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border-2 bg-white bg-opacity-80 shadow-lg">
        {/* Leyenda de Estilos */}
        <div className="mb-4 flex w-full flex-wrap gap-2 p-4">
          {Object.entries(STYLE_COLORS).map(([style, color]) => (
            <div key={style} className="text-body-sm flex items-center">
              <div className={`h-3 w-3 rounded-sm ${color} mr-1`}></div>
              <span className="text-gray-700">{style}</span>
            </div>
          ))}
        </div>

        <div className="min-w-[1024px] overflow-x-auto">
          {/* Header row */}
          <div className="flex border-b border-gray-300">
            <div className="z-10 w-16 shrink-0 border-r border-gray-300 bg-white p-2 text-center font-medium text-gray-500">
              Inicio
            </div>
            <div className="w-16 shrink-0 border-r border-gray-300 bg-white p-2 text-center font-medium text-gray-500">
              Cierre
            </div>
            {DAYS.map((day) => (
              <div
                key={day.full}
                className="text-gray-600 min-w-[115px] flex-1 border-r border-gray-300 p-2 text-center font-medium"
              >
                <span className="hidden sm:inline">{day.full}</span>
                <span className="sm:hidden">{day.short}</span>
              </div>
            ))}
            <div className="text-gray-600 w-24 shrink-0 border-r border-gray-300 p-2 text-center font-medium">
              Profesor
            </div>
          </div>

          {/* Class rows */}
          {sortedClasses.map((danceClass) => (
            <div
              key={danceClass.id}
              className="flex min-h-[64px] border-b border-gray-300"
            >
              <div className="flex h-[64px] w-16 shrink-0 items-center justify-center border-r border-gray-300 bg-white p-2 text-center text-gray-500">
                {danceClass.startTime}
              </div>
              <div className="flex h-[64px] w-16 shrink-0 items-center justify-center border-r border-gray-300 bg-white p-2 text-center text-gray-500">
                {danceClass.endTime}
              </div>
              {DAYS.map((day) => (
                <div
                  key={`${danceClass.id}-${day.full}`}
                  className="h-[64px] min-w-[115px] flex-1 border-r border-gray-300 p-1"
                >
                  {danceClass.days.includes(day.full) && (
                    <div
                      className={`h-full rounded p-2 ${STYLE_COLORS[danceClass.style] || 'bg-gray-500'} flex flex-col justify-center`}
                    >
                      <div className="text-body-sm text-center font-medium text-white">
                        {danceClass.name
                          .split(' ')
                          .reduce((acc: string[], word, i, arr) => {
                            if (i % 2 === 0 && i + 1 < arr.length) {
                              // Combinar pares de palabras
                              acc.push(`${word} ${arr[i + 1]}`);
                            } else if (i % 2 === 0) {
                              // Si es la última palabra y está sola
                              acc.push(word);
                            }
                            return acc;
                          }, [])
                          .map((line, index) => (
                            <div key={index}>{line}</div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="text-caption text-gray-600 flex h-[64px] w-24 shrink-0 items-center justify-center border-r border-gray-300 p-2 text-center">
                {danceClass.teacher.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
