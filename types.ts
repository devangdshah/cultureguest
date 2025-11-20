export enum EventCategory {
  WEDDING = 'Wedding',
  BABY_SHOWER = 'Baby Shower',
  MUNDAN = 'Mundan Ceremony',
  FESTIVAL = 'Cultural Festival',
  COMING_OF_AGE = 'Coming of Age',
  DINNER_PARTY = 'Traditional Dinner',
  OTHER = 'Other'
}

export interface Event {
  id: string;
  title: string;
  hostName: string;
  category: EventCategory;
  date: string;
  location: string;
  price: number;
  capacity: number;
  bookedCount: number;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isHost: boolean;
}

export interface AiInsight {
  title: string;
  content: string;
}
