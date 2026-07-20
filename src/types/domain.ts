export type PlanCategory =
  | 'Cafecito'
  | 'Cine'
  | 'Restaurante'
  | 'Crear contenido'
  | 'Taller'
  | 'Museo'
  | 'Compras'
  | 'Karaoke'
  | 'Evento'
  | 'Plan tranquilo';

export type Plan = {
  id: string;
  title: string;
  category: PlanCategory;
  place: string;
  district: string;
  dateLabel: string;
  time: string;
  spots: number;
  budget: string;
  interested: number;
  image: string;
  verifiedVenue: boolean;
};

export type Person = {
  id: string;
  name: string;
  age: number;
  district: string;
  bio: string;
  interests: string[];
  commonPlans: number;
  verified: boolean;
  completedActivities: number;
  socialStyle: string;
  image: string;
};

export type Place = {
  id: string;
  name: string;
  category: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  budget: string;
  rating: number;
  lastUpdated: string;
  amenities: string[];
  image: string;
  verified: boolean;
};

export type Event = {
  id: string;
  title: string;
  brand: string;
  place: string;
  dateLabel: string;
  benefit: string;
  spots: number;
  image: string;
  sponsored: true;
};

export type ChatMessage = {
  id: string;
  author: 'me' | 'other' | 'system';
  body: string;
  sentAt: string;
  blocked?: boolean;
};
