export const WEDDING_DATE = import.meta.env.VITE_WEDDING_DATE || '2026-10-31T17:00:00'
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''
export const VALID_CODES = (import.meta.env.VITE_VALID_CODES || '').split(',').filter(Boolean)
export const SPOTIFY_PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID || ''

export const CAROUSEL_IMAGES = [
  '/images/carousel/1.jpeg',
  '/images/carousel/2.jpeg',
  '/images/carousel/3.jpeg',
  '/images/carousel/4.jpeg',
  '/images/carousel/5.jpeg',
  '/images/carousel/6.jpeg',
  '/images/carousel/7.jpeg',
  '/images/carousel/8.jpeg',
  '/images/carousel/9.jpeg',
  '/images/carousel/10.jpeg',
  '/images/carousel/11.jpeg',
]

export const TIMELINE_EVENTS = [
  { time: '5:00 PM', event: 'Ceremonia', icon: '💒' },
  { time: '6:00 PM', event: 'Coctel de bienvenida', icon: '🥂' },
  { time: '6:30 PM', event: 'Entrada de los novios', icon: '👰🤵' },
  { time: '6:45 PM', event: 'Sesión de fotos', icon: '📸' },
  { time: '7:30 PM', event: 'Brindis', icon: '🍾' },
  { time: '8:00 PM', event: 'Cena', icon: '🍽️' },
  { time: '9:00 PM', event: 'Lanzamiento de ramo', icon: '💐' },
  { time: '9:40 PM', event: 'Postre', icon: '🍰' },
  { time: '10:00 PM', event: '¡Fiesta!', icon: '💃🕺' },
]

export const GOOGLE_DRIVE_FOLDER = 'https://drive.google.com/drive/folders/1q-tR7xR7sdMXl90aOSHlTOVYp1igxp6D?usp=sharing'

export const TRANSPORT_OPTIONS = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'carro_privado', label: 'Carro privado (requiero parqueadero)' },
  { value: 'bus_mosquera', label: 'Bus desde Mosquera - 4:00 PM' },
  { value: 'bus_danubio', label: 'Bus desde Danubio Azul - 3:00 PM' },
  { value: 'bus_portal80', label: 'Bus desde Portal 80 - 4:00 PM' },
]
