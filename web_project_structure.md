# Estructura del Proyecto Web (Next.js 15) - UDance

Basado en los mockups y las especificaciones del monorepo, esta es la estructura recomendada para la aplicación web de UDance, siguiendo las mejores prácticas de Next.js 15 con el `app` router.

## Visión General

La aplicación web (`apps/web`) será una aplicación Next.js 15 que se enfocará en el descubrimiento de contenido (eventos, noticias, lugares, profesores) y la interacción del usuario final. Se priorizará el SEO y el rendimiento mediante Server-Side Rendering (SSR) e Incremental Static Regeneration (ISR) donde sea apropiado.

## Estructura de Directorios Propuesta

```
apps/
└── web/
    ├── public/                 # Archivos estáticos (imágenes, favicons, etc.)
    │   └── ...
    ├── src/
    │   ├── app/                # Directorio principal del App Router
    │   │   ├── (auth)/         # Grupo de rutas para autenticación (login, register, etc.)
    │   │   │   └── login/route.tsx
    │   │   │   └── register/route.tsx
    │   │   ├── (main)/         # Grupo de rutas para la aplicación principal
    │   │   │   ├── layout.tsx  # Layout principal de la aplicación (Header, Footer)
    │   │   │   ├── page.tsx    # Página de inicio (Dashboard principal)
    │   │   │   ├── eventos/    # Rutas para eventos
    │   │   │   │   ├── page.tsx          # Lista de todos los eventos
    │   │   │   │   └── [id]/page.tsx     # Detalle de un evento específico
    │   │   │   ├── noticias/   # Rutas para noticias
    │   │   │   │   ├── page.tsx          # Lista de todas las noticias
    │   │   │   │   └── [id]/page.tsx     # Detalle de una noticia específica
    │   │   │   ├── lugares/    # Rutas para lugares de baile
    │   │   │   │   ├── page.tsx          # Lista de lugares y mapa
    │   │   │   │   └── [id]/page.tsx     # Perfil de un lugar específico
    │   │   │   ├── profesores/ # Rutas para profesores
    │   │   │   │   ├── page.tsx          # Directorio de profesores
    │   │   │   │   └── [id]/page.tsx     # Perfil de un profesor específico
    │   │   │   ├── perfil/     # Ruta para el perfil del usuario
    │   │   │   │   └── page.tsx
    │   │   │   └── comunidad/  # Ruta para la comunidad (futuro)
    │   │   │       └── page.tsx
    │   │   ├── api/            # Rutas de API (si se necesitan APIs internas)
    │   │   │   └── auth/[...nextauth]/route.ts # Ejemplo para NextAuth.js
    │   │   ├── actions.ts      # Server Actions globales
    │   │   └── globals.css     # Estilos globales (Tailwind CSS)
    │   ├── components/         # Componentes reutilizables específicos de `web`
    │   │   ├── ui/             # Componentes UI básicos (botones, inputs, etc.)
    │   │   │   └── Button.tsx
    │   │   ├── EventCard.tsx
    │   │   ├── NewsCard.tsx
    │   │   ├── PlaceCard.tsx
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── ...
    │   ├── lib/                # Utilidades, helpers, clientes de API
    │   │   ├── supabase/
    │   │   │   └── client.ts   # Cliente Supabase para el lado del cliente
    │   │   │   └── server.ts   # Cliente Supabase para el lado del servidor
    │   │   ├── api.ts          # Funciones para interactuar con APIs externas/internas
    │   │   ├── utils.ts        # Utilidades generales
    │   │   ├── hooks/          # Custom React Hooks (lógica de UI)
    │   │   │   └── useFetch.ts
    │   │   ├── store/          # Estado global con Zustand
    │   │   │   ├── useUserStore.ts
    │   │   │   └── useUIStore.ts
    │   │   └── ...
    │   ├── types/              # Definiciones de tipos TypeScript
    │   │   ├── index.d.ts
    │   │   └── event.d.ts
    │   │   └── ...
    │   └── middleware.ts       # Middleware de Next.js (para autenticación, etc.)
    ├── next.config.ts
    ├── package.json
    ├── tsconfig.json
    └── tailwind.config.ts
```

## Explicación de Directorios Clave

- **`public/`**: Contiene activos estáticos como imágenes, fuentes y el `favicon.ico`. Next.js sirve estos archivos directamente.

- **`src/app/`**: El corazón de la aplicación con el App Router de Next.js. Cada carpeta dentro de `app` define un segmento de ruta. Los archivos `page.tsx` son las UI de las rutas, y `layout.tsx` define la UI compartida para un segmento de ruta y sus hijos.
  - **`(auth)/` y `(main)/`**: Son "Route Groups" (grupos de rutas). Permiten organizar rutas sin afectar la URL. `(auth)` podría tener su propio layout (ej. sin header/footer) y `(main)` el layout principal de la aplicación.
  - **`[id]/`**: Indica un segmento de ruta dinámico, como `/eventos/123` donde `123` es el `id` del evento.
  - **`api/`**: Para crear API Routes si la aplicación web necesita endpoints de API propios (ej. para autenticación con NextAuth.js).
  - **`globals.css`**: Archivo CSS principal donde se importan las directivas de Tailwind CSS y cualquier estilo global.

- **`src/components/`**: Contiene componentes React reutilizables que son específicos de la aplicación web. Se recomienda organizarlos por funcionalidad o tipo (ej. `ui/` para componentes genéricos).

- **`src/lib/`**: Para código no-React que contiene lógica de negocio, utilidades, configuración de clientes de API (como Supabase), y funciones de ayuda. Separar la lógica de la UI mejora la mantenibilidad y la reusabilidad.

- **`src/types/`**: Para todas las definiciones de tipos de TypeScript (`.d.ts`). Esto es crucial para mantener un código robusto y tipado.

- **`middleware.ts`**: Para lógica que se ejecuta antes de que una solicitud se complete, útil para autenticación, redirecciones, etc.

## Integración con el Monorepo (`packages/`)

Dado que UDance es un monorepo, la aplicación web (`apps/web`) hará uso extensivo de los paquetes compartidos:

- **`packages/shared/`**: Para utilidades, constantes, tipos y lógica de negocio que es común a las tres aplicaciones (web, admin, pwa). Por ejemplo, tipos de datos de eventos, funciones de formateo de fechas, etc.

- **`packages/ui/`**: Si existe un paquete de componentes UI genéricos que pueden ser usados por cualquier aplicación (ej. un `Button` o `Input` base).

- **`packages/ui-web/`**: Para componentes UI específicos de la web que son demasiado complejos para estar en `apps/web/src/components` pero que se consideran parte de una biblioteca de componentes más grande para la web. (Aunque los mockups no lo detallan, es una buena práctica para monorepos grandes).

- **`packages/database/`**: Para esquemas de base de datos, ORMs, y cualquier lógica de acceso a datos compartida.

- **`packages/testing/`**: Para configuraciones de testing compartidas y utilidades.

## Consideraciones Adicionales

- **Tailwind CSS**: La configuración de Tailwind (`tailwind.config.ts`) estará en la raíz de `apps/web` y se integrará con los estilos globales en `src/app/globals.css`.
- **Supabase**: Se recomienda tener clientes de Supabase separados para el lado del cliente y el lado del servidor (`src/lib/supabase/`).
- **Autenticación**: Se reutilizará la configuración de Google OAuth ya existente, probablemente a través de NextAuth.js o directamente con el cliente Supabase.
- **Rendimiento**: Utilizar `loading.tsx` para estados de carga, `error.tsx` para manejo de errores, y `Suspense` para streaming de UI.
- **SEO**: Asegurarse de que cada `page.tsx` tenga metadatos adecuados (usando la API de metadatos de Next.js 15) para mejorar la visibilidad en motores de búsqueda.

Esta estructura proporciona una base sólida, escalable y mantenible para el desarrollo de la aplicación web de UDance.
