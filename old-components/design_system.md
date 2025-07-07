por # Design System

## Typography

### Fonts

- **Roboto**: Used for general text. Weights: 400, 500, 700.
- **Montserrat**: Used for headings. Weights: 300, 400, 500, 600, 700.

## Colors

### Color Palette

The core color palette is defined in `tailwind.config.ts` and used to generate the light and dark mode themes.

| Color   | Shade | HEX       |
| ------- | ----- | --------- |
| Magenta | 100   | `#FFE6ED` |
|         | 300   | `#FF809F` |
|         | 500   | `#FF3366` |
|         | 700   | `#991F47` |
|         | 900   | `#330A18` |
| Blue    | 100   | `#EDF5FC` |
|         | 300   | `#9DCBEE` |
|         | 500   | `#4A90E2` |
|         | 700   | `#246497` |
|         | 900   | `#0A273B` |
| Purple  | 100   | `#F3E6F5` |
|         | 300   | `#CE80D6` |
|         | 500   | `#9B59B6` |
|         | 700   | `#5E356E` |
|         | 900   | `#1F1225` |
| Gray    | 100   | `#F8F9FA` |
|         | 300   | `#C4C9D1` |
|         | 500   | `#2C3E50` |
|         | 700   | `#1A2530` |
|         | 900   | `#080C10` |

### Theming (Light/Dark Mode)

Color variables for both light and dark modes are defined in `src/app/globals.css` using CSS custom properties.

#### Light Mode

| Name       | HSL Value     | HEX       | Description     |
| ---------- | ------------- | --------- | --------------- |
| Background | `0 0% 100%`   | `#FFFFFF` | Page background |
| Foreground | `210 29% 24%` | `#2C3E50` | Main text color |
| ...        | ...           | ...       | ...             |

#### Dark Mode

| Name       | HSL Value     | HEX       | Description     |
| ---------- | ------------- | --------- | --------------- |
| Background | `210 29% 24%` | `#2C3E50` | Page background |
| Foreground | `210 33% 98%` | `#F8F9FA` | Main text color |
| ...        | ...           | ...       | ...             |

## Layout

### Container

The main container has the following properties:

- Centered (`center: true`)
- Default padding: `2rem`
- Max-width on `2xl` screens: `1400px`

## Gradients

### Background Gradients

| Class Name                  | CSS                                         |
| --------------------------- | ------------------------------------------- |
| `bg-primary-gradient`       | `linear-gradient(135deg, #FF3366, #9B59B6)` |
| `bg-accent-gradient`        | `linear-gradient(135deg, #4A90E2, #9B59B6)` |
| `bg-warm-gradient`          | `linear-gradient(135deg, #FF3366, #FF8E3C)` |
| `bg-cool-gradient`          | `linear-gradient(45deg, #4A90E2, #2C3E50)`  |
| `bg-hover-primary-gradient` | `linear-gradient(135deg, #CC295F, #7D4792)` |
| `bg-hover-accent-gradient`  | `linear-gradient(135deg, #357ABD, #7D4792)` |
| `bg-hover-warm-gradient`    | `linear-gradient(135deg, #CC295F, #E67E35)` |
| `bg-hover-cool-gradient`    | `linear-gradient(45deg, #357ABD, #233240)`  |

### Border Gradients

| Class Name                |
| ------------------------- |
| `border-gradient-primary` |
| `border-gradient-accent`  |
| `border-gradient-warm`    |
| `border-gradient-cool`    |

## Shadows

A set of soft shadows are available:

| Class Name          | CSS Value                          |
| ------------------- | ---------------------------------- |
| `shadow-soft-sm`    | `0 2px 4px rgba(0,0,0,0.05)`       |
| `shadow-soft`       | `0 4px 6px rgba(0,0,0,0.07)`       |
| `shadow-soft-md`    | `0 6px 10px rgba(0,0,0,0.1)`       |
| `shadow-soft-lg`    | `0 10px 15px rgba(0,0,0,0.1)`      |
| `shadow-inner-soft` | `inset 0 2px 4px rgba(0,0,0,0.05)` |

## Animations

Custom animations are defined in `tailwind.config.ts`.

### Keyframes

| Name             | Description                          |
| ---------------- | ------------------------------------ |
| `slideIn`        | Slides in from the left.             |
| `slideUp`        | Slides up from the bottom.           |
| `slideDown`      | Slides down from the top.            |
| `fadeIn`         | Fades in.                            |
| `pulse`          | Pulses with opacity.                 |
| `shimmer`        | A shimmer effect for loading states. |
| `accordion-down` | Opens an accordion.                  |
| `accordion-up`   | Closes an accordion.                 |

### Animation Classes

| Class Name               | Animation Properties                             |
| ------------------------ | ------------------------------------------------ |
| `animate-slideIn`        | `slideIn 0.2s ease-out`                          |
| `animate-slideUp`        | `slideUp 0.2s ease-out`                          |
| `animate-slideDown`      | `slideDown 0.2s ease-out`                        |
| `animate-fadeIn`         | `fadeIn 0.2s ease-out`                           |
| `animate-pulse`          | `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite` |
| `animate-shimmer`        | `shimmer 2s linear infinite`                     |
| `animate-accordion-down` | `accordion-down 0.2s ease-out`                   |
| `animate-accordion-up`   | `accordion-up 0.2s ease-out`                     |

## Components

### Custom Components

- `articles-data.ts`
- `background-view.tsx`
- `event-calendar.tsx`
- `event-card.tsx`
- `event-carousel.tsx`
- `event-details.jsx`
- `event-details.tsx`
- `filter-sidebar.tsx`
- `map-view-container.tsx`
- `map-view-content.tsx`
- `map-view.tsx`
- `map.d.ts`
- `nav-bar.tsx`
- `news-article-card.tsx`
- `news-article-carousel.tsx`
- `place-search-card.tsx`
- `teacher-search-card.tsx`
- `types.ts`
- `weekly-schedule-all.tsx`
- `weekly-schedule.tsx`
