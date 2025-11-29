export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  hobbies: string[];
  preferredLocations: string[];
  createdAt: string;
}

export interface Hobby {
  id: string;
  name: string;
  nameVi: string;
  category: string;
  icon: string;
}

export interface Location {
  id: string;
  name: string;
  nameVi: string;
  city: string;
  latitude?: number;
  longitude?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  hostId: string;
  hobbyId: string;
  locationId: string;
  date: string;
  time: string;
  maxParticipants: number;
  currentParticipants: string[];
  status: 'open' | 'closed' | 'cancelled';
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  eventId: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: string;
}

export interface OnboardingData {
  profile?: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    bio: string;
  };
  hobbies?: string[];
  locations?: string[];
}
