# Invitación de Boda - Ana & Deimar

Sitio web de invitación de boda construido con Vue 3 + Vite + TypeScript.

## Setup

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## Configuración

Copia `.env.example` a `.env` y configura las variables:

```bash
VITE_ADMIN_PASSWORD=tu-contraseña-admin
VITE_VALID_CODES=AD001,AD002,AD003,...
VITE_WEDDING_DATE=2026-10-31T17:00:00
VITE_SPOTIFY_PLAYLIST_ID=tu-playlist-id
```

## Assets Requeridos

Copia los siguientes archivos a la carpeta `public/`:

1. **Video**: `boda-video.mp4` - Video hero vertical (1080x1920)

2. **Imágenes del carousel**: Copiar a `public/images/carousel/`
   - WhatsApp_Image_2026-01-18_at_6_52_18_PM__2_.jpeg
   - WhatsApp_Image_2026-01-18_at_6_52_18_PM.jpeg
   - 3.jpeg
   - 4.jpeg
   - 5.jpeg
   - WhatsApp_Image_2026-01-25_at_9_42_05_PM.jpeg
   - WhatsApp_Image_2026-01-25_at_9_42_06_PM.jpeg

## Estructura del Proyecto

```
src/
├── assets/styles/     # CSS global
├── components/
│   ├── envelope/      # Animación del sobre
│   ├── hero/          # Video hero
│   ├── sections/      # Secciones principales
│   ├── modals/        # Modales (RSVP, Upload, Admin)
│   ├── ui/            # Componentes base
│   └── layout/        # Footer
├── composables/       # Lógica reutilizable
├── stores/            # Pinia stores (galería)
└── config/            # Constantes y configuración
```

## Funcionalidades

- Animación 3D de sobre de invitación
- Video hero en loop
- Carousel de fotos con auto-avance
- Countdown hasta la boda
- Galería de fotos con upload (localStorage)
- Modo admin para eliminar fotos
- RSVP con validación de código
- Integración Spotify embed
- Google Maps embed
- Responsive (mobile/tablet/desktop)
