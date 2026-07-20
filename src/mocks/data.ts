import type { Event, Person, Place, Plan } from '@/types/domain';

export const categories = [
  'Cafecito',
  'Cine',
  'Restaurante',
  'Crear contenido',
  'Taller',
  'Museo',
  'Compras',
  'Karaoke',
  'Evento',
  'Plan tranquilo',
] as const;

export const interests = [
  'Cine',
  'Cafés',
  'Beauty',
  'K-pop',
  'Fotografía',
  'Moda',
  'Libros',
  'Museos',
  'Cerámica',
  'Pilates',
  'Gimnasio',
  'Conciertos',
  'Anime',
  'Videojuegos',
  'Emprendimiento',
  'Creación de contenido',
  'Brunch',
  'Restaurantes',
  'Running',
  'Arte',
] as const;

export const plans: Plan[] = [
  {
    id: 'matcha-domingo',
    title: 'Matcha, cámara y chisme',
    category: 'Cafecito',
    place: 'Matcha House',
    district: 'Miraflores',
    dateLabel: 'Domingo 26',
    time: '4:30 p. m.',
    spots: 4,
    budget: 'S/ 25–45',
    interested: 18,
    image:
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=80',
    verifiedVenue: true,
  },
  {
    id: 'cine-clasico',
    title: 'Romcom de los 2000 + postre',
    category: 'Cine',
    place: 'Centro Cultural Aurora',
    district: 'Barranco',
    dateLabel: 'Viernes 24',
    time: '7:00 p. m.',
    spots: 6,
    budget: 'S/ 35–60',
    interested: 31,
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    verifiedVenue: true,
  },
  {
    id: 'ceramica-sabado',
    title: 'Pinta tu primera taza',
    category: 'Taller',
    place: 'Estudio Rosa',
    district: 'San Isidro',
    dateLabel: 'Sábado 25',
    time: '11:00 a. m.',
    spots: 8,
    budget: 'S/ 70–95',
    interested: 12,
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
    verifiedVenue: true,
  },
];

export const people: Person[] = [
  {
    id: 'valeria',
    name: 'Valeria',
    age: 24,
    district: 'San Borja',
    bio: 'Siempre digo que iré al museo y termino en un café. Quiero corregir ese patrón, quizá.',
    interests: ['Cine', 'Cafés', 'Fotografía'],
    commonPlans: 4,
    verified: true,
    completedActivities: 7,
    socialStyle: 'Conversadora · planes pequeños',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mica',
    name: 'Mica',
    age: 25,
    district: 'Surco',
    bio: 'Beauty, conciertos y brunch. Mi talento es encontrar el spot con la mejor luz.',
    interests: ['Beauty', 'K-pop', 'Brunch'],
    commonPlans: 3,
    verified: true,
    completedActivities: 11,
    socialStyle: 'Creativa · prefiero grupos',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'alessia',
    name: 'Alessia',
    age: 24,
    district: 'Miraflores',
    bio: 'Librerías, talleres y planes que sí empiezan a la hora.',
    interests: ['Libros', 'Cerámica', 'Museos'],
    commonPlans: 2,
    verified: true,
    completedActivities: 5,
    socialStyle: 'Tranquila · planes pequeños',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
  },
];

export const places: Place[] = [
  {
    id: 'cafe-lila',
    name: 'Café Lila',
    category: 'Cafetería',
    district: 'San Borja',
    address: 'Av. Primavera 410 · dirección comercial ficticia',
    latitude: -12.1041,
    longitude: -76.9992,
    budget: 'S/ 20–45',
    rating: 4.7,
    lastUpdated: 'Actualizado hace 2 días',
    amenities: ['Baño limpio', 'Wi-Fi', 'Enchufes', 'Ganchos para cartera', 'Buena luz para fotos'],
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    verified: true,
  },
  {
    id: 'libreria-central',
    name: 'Librería Central',
    category: 'Librería',
    district: 'Miraflores',
    address: 'Calle Aurora 220 · dirección comercial ficticia',
    latitude: -12.1191,
    longitude: -77.031,
    budget: 'Entrada libre',
    rating: 4.8,
    lastUpdated: 'Actualizado hace 6 días',
    amenities: [
      'Baño gratuito',
      'Personal visible',
      'Acceso sin escaleras',
      'Apto para primera salida',
    ],
    image:
      'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1200&q=80',
    verified: true,
  },
  {
    id: 'aurora',
    name: 'Centro Cultural Aurora',
    category: 'Centro cultural',
    district: 'Barranco',
    address: 'Jr. Estrella 154 · dirección comercial ficticia',
    latitude: -12.1483,
    longitude: -77.0217,
    budget: 'S/ 15–40',
    rating: 4.6,
    lastUpdated: 'Información pendiente de confirmar',
    amenities: ['Zona concurrida', 'Transporte cercano', 'Apto para grupos', 'Accesibilidad'],
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80',
    verified: false,
  },
];

export const events: Event[] = [
  {
    id: 'matcha-bloom',
    title: 'Matcha Bloom Day',
    brand: 'Matcha House',
    place: 'Café Lila · San Borja',
    dateLabel: 'Sábado 1 · 3:00 p. m.',
    benefit: 'Incluye un matcha y un postre',
    spots: 20,
    image:
      'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=1200&q=80',
    sponsored: true,
  },
];
