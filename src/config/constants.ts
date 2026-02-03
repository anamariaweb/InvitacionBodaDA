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

export const GUEST_CODES: Record<string, string> = {
  'VL01': 'Vicente Trujillo y Ligia Larrotta',
  'MT02': 'Marcela Trujillo',
  'JV03': 'Jose Vicente',
  'PD04': 'Pedro y Doris',
  'WA05': 'Wilmer y Alejandra',
  'DF06': 'Dumar y Familia',
  'AS07': 'Ana Sosa',
  'LEC08': 'Leisa, Edilberto y Cesar',
  'VC09': 'Vanesa y Cesar',
  'HA10': 'Harold y Angela',
  'VM11': 'Valentina y Manuel',
  'NF12': 'Nury y familia',
  'AE13': 'Alba y Esneider',
  'AS14': 'Angie y Santi',
  'DM15': 'Dorania y Mauricio',
  'CV16': 'Cesar y Viviana',
  'NC17': 'Nelson Castro',
  'NA18': 'Nancy y Angel',
  'JM19': 'Jaime y Mery',
  'CA20': 'Carlos y Angie',
  'WC21': 'Waldo y Claudia',
  'CLV22': 'Cleisman y Valentina',
  'AA23': 'Andres y Ana',
  'AT24': 'Anderson y Tatiana',
  'JOM25': 'Jose y Maryuri',
  'PC26': 'Paula y Cristian',
  'CM27': 'Carlos Matallana',
  'GB28': 'Gonzalo y Beatriz',
  'HC29': 'Hernan Castro',
  'MC30': 'Mario Castro',
  'MG31': 'Maria Paula y Gus',
  'SC32': 'Samuel Castro',
  'CR33': 'Cristian',
  'LC34': 'Lorena y Camilo',
  'ES35': 'Edgar y Sandra',
  'FJ36': 'Fidela y Jorge',
  'DS37': 'Diego y Sandra',
  'ESS38': 'Enrique, Samuel y Sofia',
  'EO39': 'Eli y Osvaldo',
  'YJ40': 'Yudi y Jorge',
  'LA41': 'Lined y Aleja',
  'JJ42': 'Jessica Jimenez',
  'HR43': 'Heidy Rodriguez',
  'DG44': 'Daniela Guaqueta',
  'PP45': 'Paula Penagos',
  'KZ46': 'Karolaint Zarate',
  'JR47': 'Javier y Rocio',
  'JR48': 'Jose Ramos',
  'AD50': 'Novios - Ana y Deimar',
}

export const TRANSPORT_OPTIONS = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'carro_privado', label: 'Carro privado (requiero parqueadero)' },
  { value: 'bus_mosquera', label: 'Bus desde Mosquera - 4:00 PM' },
  { value: 'bus_danubio', label: 'Bus desde Danubio Azul - 3:00 PM' },
  { value: 'bus_portal80', label: 'Bus desde Portal 80 - 4:00 PM' },
]
