# UDance Mockup System - Documentación Interactiva

## Propósito

Este sistema permite visualizar y planificar la arquitectura de información de UDance mediante HTML interactivo. Incluye **wireframes visuales** y detalles técnicos, diseñado para ser simple pero completo, permitiendo a LLMs continuar el trabajo iterativamente.

## Características Clave

### 🎨 Wireframes Visuales

- **Layout grids** que muestran la estructura visual de cada página
- **Componentes posicionados** exactamente como aparecerán en la interfaz
- **Color coding** diferenciado por tipo de componente
- **Responsive design** para desktop y mobile

### 🔧 Detalles Técnicos por Componente

- **Vista visual** de cómo se verá cada elemento (con ejemplos)
- **Especificaciones técnicas** de implementación
- **APIs y endpoints** necesarios
- **Consideraciones UX** específicas

## Arquitectura del Proyecto

UDance es una plataforma de baile con 3 aplicaciones distintas:

### 1. Web App (Puerto 3000) - Usuarios Finales

- **Target**: Desktop users, navegadores web
- **Funcionalidad**: Buscar eventos, leer noticias, encontrar lugares de baile, perfiles
- **UX**: Layout de escritorio, filtros avanzados, navegación horizontal
- **Tecnología**: Next.js 15, Tailwind CSS 4.x, Supabase
- **Layout Visual**: Grid 2x3 con noticias (izq), eventos (der vertical), mapa (abajo izq)

### 2. Admin App (Puerto 4000) - Administradores

- **Target**: Administradores del sistema
- **Funcionalidad**: CRUD eventos/noticias/usuarios, dashboard, moderación
- **UX**: Interfaz tipo admin panel, tables, forms, modals
- **Tecnología**: Next.js 15, DaisyUI v5, Tailwind CSS 4.x, Supabase
- **Layout Visual**: Sidebar + topbar + content area (patrón admin clásico)

### 3. PWA/Mobile (Puerto 5000) - Usuarios Móviles

- **Target**: Móviles, tablets, PWA
- **Funcionalidad**: Eventos cercanos, offline-first, notificaciones push
- **UX**: Bottom navigation, gestos touch, geolocalización
- **Tecnología**: Next.js 15, Tailwind CSS 4.x, PWA features
- **Layout Visual**: Header + content + bottom navigation

## Estructura de Archivos

```
mockup/
├── README.md (este archivo)
├── style.css (estilos compartidos + wireframe styles)
├── index.html (selector principal de apps)
├── web/
│   ├── index.html (con wireframe visual del layout)
│   ├── eventos.html
│   ├── noticias.html
│   ├── lugares.html
│   └── perfil.html
├── admin/
│   ├── index.html (con wireframe del dashboard)
│   ├── dashboard.html
│   ├── eventos-admin.html
│   ├── usuarios-admin.html
│   └── contenido-admin.html
└── mobile/
    ├── index.html (con wireframe mobile layout)
    ├── eventos-mobile.html
    ├── cerca-mobile.html
    └── perfil-mobile.html
```

## Estado Actual del Proyecto (Según Memory Bank)

### ✅ Completado (100% Foundation)

- Multi-app monorepo operacional
- Autenticación Google OAuth funcionando
- CI/CD pipelines configurados
- Base de datos Supabase conectada
- DaisyUI v5 integrado en admin
- Testing setup en todas las apps

### 🔄 En Desarrollo

- Sistema de diseño y component library (próximos 3-4 semanas)
- UI components específicos por app
- Features de negocio (eventos, noticias, etc.)

## Especificaciones de Mockup

### Estilo Visual

- **Color coding por app**:
  - Web: `#3498db` (azul)
  - Admin: `#e74c3c` (rojo)
  - Mobile: `#2ecc71` (verde)
- **Indicadores de complejidad**:
  - 🟢 Simple (componente básico)
  - 🟡 Medio (lógica moderada)
  - 🔴 Complejo (múltiples integraciones)
- **Estado de implementación**:
  - ✅ Implementado
  - 🔄 En progreso
  - ❌ Pendiente
  - 📋 Planificado

### Wireframes y Layout

#### Clases CSS para Wireframes:

- `.wireframe-container` - Contenedor principal del wireframe
- `.wireframe-layout` - Grid layout específico por página
- `.wire-box` - Cajas individuales que representan componentes
- `.layout-web-home` - Layout específico de la página web principal
- `.layout-admin-dashboard` - Layout del dashboard admin
- `.layout-mobile-home` - Layout mobile con bottom navigation

#### Ejemplos de Grid Areas:

```css
/* Web App Home Layout */
.layout-web-home {
  grid-template-areas:
    'header header'
    'news events'
    'map events';
}

/* Admin Dashboard Layout */
.layout-admin-dashboard {
  grid-template-areas:
    'sidebar topbar'
    'sidebar content';
}
```

### Contenido de Cada Página

Cada archivo HTML debe incluir:

1. **Header con contexto**:
   - Nombre de la app
   - Tipo de usuario target
   - Estado de implementación

2. **Wireframe visual**:
   - Layout grid que muestra la estructura
   - Cajas posicionadas por componente
   - Descripción breve de cada área

3. **Detalles de componentes**:
   - Vista visual (mockup de contenido)
   - Especificaciones técnicas
   - APIs necesarias
   - Consideraciones UX

4. **Secciones principales** (cajitas clickeables):
   - Título descriptivo
   - Funcionalidad esperada
   - Datos que maneja
   - Complejidad estimada
   - Links a pantallas relacionadas

5. **Navegación**:
   - Breadcrumb hacia app parent
   - Links hacia otras pantallas
   - Vuelta al index principal

6. **Notas técnicas**:
   - Componentes compartidos vs únicos
   - APIs/endpoints necesarios
   - Consideraciones de UX específicas
   - Dependencias de implementación

### Flujos Principales por App

#### Web App Flow:

```
Home → Lista Eventos → Detalle Evento → Perfil Organizador
Home → Noticias → Artículo → Comentarios
Home → Lugares → Mapa → Detalle Lugar → Eventos del Lugar
```

#### Admin App Flow:

```
Dashboard → Gestión Eventos → Crear/Editar → Preview → Publicar
Dashboard → Usuarios → Ver Perfil → Moderar → Acciones
Dashboard → Contenido → Noticias → Moderar → Publicar
```

#### Mobile App Flow:

```
Home → Eventos Cerca → Detalle → Guardar Offline
Home → Buscar → Filtros → Resultados → Favoritos
Profile → Configuración → Notificaciones → Sincronizar
```

## Guías de Implementación

### Para Continuar el Trabajo

1. **Leer contexto**: Siempre revisar el estado actual en Memory Bank
2. **Mantener consistencia**: Usar el CSS compartido y color coding
3. **Pensar en componentes**: Identificar qué puede reutilizarse entre apps
4. **Considerar datos**: Qué info viene del backend vs cliente
5. **UX diferenciado**: Cada app tiene patrones distintos pero coherentes
6. **Wireframes primero**: Crear la estructura visual antes que los detalles

### Comandos para LLM

Cuando crees/modifiques archivos:

- Usar máximo 400 líneas por archivo HTML
- Referenciar `style.css` para estilos
- Incluir wireframe visual con `wireframe-container`
- Agregar detalles de componentes con `component-details`
- Incluir meta información en comentarios
- Mantener navegación bidireccional
- Documentar decisiones en comentarios

### Ejemplo de Estructura para Nueva Página:

```html
<!-- App Header -->
<div class="app-header [web/admin/mobile]">...</div>

<!-- Wireframe Layout -->
<div class="wireframe-container">
  <div class="wireframe-title">📐 Layout Visual</div>
  <div class="wireframe-layout layout-[page-name]">
    <div class="wire-box [area-name]">
      <h4>Component Name</h4>
      <p>Brief description</p>
    </div>
  </div>
</div>

<!-- Component Details -->
<div class="component-details">
  <div class="detail-grid">
    <div class="detail-card">
      <h4>Component Name</h4>
      <div class="detail-visual">Visual mockup...</div>
      <div class="detail-tech [web/admin/mobile]">Tech specs...</div>
    </div>
  </div>
</div>

<!-- Function Sections -->
<div class="section-grid">...</div>
```

## Próximos Pasos

### Inmediatos (Primera Iteración) ✅ COMPLETADO

1. [x] Crear `style.css` con estilos base y wireframe styles
2. [x] Implementar `index.html` principal con selector de apps
3. [x] Crear estructura base de cada app con wireframes visuales
4. [x] Documentar flujos principales de cada app
5. [x] Establecer navegación entre pantallas principales

### Desarrollo Iterativo (Siguientes Iteraciones)

1. [ ] **Web App Screens**:
   - [ ] `eventos.html` - Lista y filtros de eventos (incluir wireframe de página completa)
   - [ ] `evento-detalle.html` - Información completa del evento
   - [ ] `noticias.html` - Feed de noticias y artículos
   - [ ] `lugares.html` - Mapa y búsqueda de lugares
   - [ ] `perfil.html` - Perfil de usuario/profesor

2. [ ] **Admin App Screens**:
   - [ ] `dashboard.html` - Métricas y overview (incluir wireframe con widgets)
   - [ ] `eventos-admin.html` - CRUD de eventos
   - [ ] `usuarios-admin.html` - Gestión de usuarios
   - [ ] `contenido-admin.html` - Moderación de contenido
   - [ ] `reportes.html` - Analytics y reportes

3. [ ] **Mobile App Screens**:
   - [ ] `eventos-mobile.html` - Lista mobile-optimized (incluir gestos touch)
   - [ ] `cerca-mobile.html` - Eventos por geolocalización
   - [ ] `favoritos-mobile.html` - Contenido guardado offline
   - [ ] `perfil-mobile.html` - Perfil touch-friendly
   - [ ] `notificaciones-mobile.html` - Push notifications

### Refinamiento (Iteraciones Avanzadas)

1. [ ] **Cross-App Integration**:
   - [ ] Deep links entre aplicaciones
   - [ ] Shared components documentation
   - [ ] API endpoints mapping
   - [ ] Data flow diagrams

2. [ ] **Technical Specifications**:
   - [ ] Component specifications per screen
   - [ ] Backend requirements per feature
   - [ ] Performance considerations
   - [ ] Accessibility requirements

3. [ ] **Implementation Planning**:
   - [ ] Priority matrix por pantalla
   - [ ] Dependencies mapping
   - [ ] Development timeline
   - [ ] Testing scenarios

## Instrucciones para LLM

Cuando trabajés en este sistema:

1. **Lee este README completo** antes de crear cualquier archivo
2. **Mantén el contexto** del proyecto UDance y su estado actual
3. **Usa el color coding** y estructura establecida
4. **Crea wireframes visuales** con la estructura de layout antes que detalles
5. **Incluye componente details** con vista visual + specs técnicas
6. **Piensa en la experiencia del usuario** específica para cada app
7. **Documenta decisiones** en comentarios HTML
8. **Mantén navegación clara** entre todas las pantallas
9. **Considera la implementación real** basada en el stack tecnológico

### Patrón para Wireframes:

**Para Web App:**

- Desktop-first con grids de 2-3 columnas
- Header sticky + contenido principal + sidebar/filters
- Navegación horizontal en header

**Para Admin App:**

- Sidebar navigation + topbar + content area
- Tables, forms, modals como componentes principales
- Dashboard con widgets modulares

**Para Mobile:**

- Single column layout
- Header + content + bottom navigation
- Touch-friendly con gestos swipe

## Notas Técnicas

- Proyecto base: Next.js 15 monorepo
- Base de datos: Supabase con Google OAuth
- Styling: Tailwind CSS 4.x + DaisyUI v5 (solo admin)
- Testing: Jest + Testing Library configurado
- CI/CD: GitHub Actions multi-app
- Estado: Foundation 100% completa, listo para features

---

**Última actualización**: Enero 2025 - Wireframes visuales agregados
**Próxima revisión**: Al completar wireframes de todas las pantallas principales
