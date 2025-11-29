import { MOCK_USERS, MOCK_EVENTS, MOCK_CHATS, MOCK_MESSAGES } from '@/mock-data';
import { HOBBIES } from '@/constants/hobbies';
import { LOCATIONS } from '@/constants/locations';

export function getUserById(id: string) {
  return MOCK_USERS.find((user) => user.id === id);
}

export function getEventById(id: string) {
  return MOCK_EVENTS.find((event) => event.id === id);
}

export function getChatById(id: string) {
  return MOCK_CHATS.find((chat) => chat.id === id);
}

export function getMessagesByChatId(chatId: string) {
  return MOCK_MESSAGES.filter((message) => message.chatId === chatId);
}

export function getHobbyById(id: string) {
  return HOBBIES.find((hobby) => hobby.id === id);
}

export function getLocationById(id: string) {
  return LOCATIONS.find((location) => location.id === id);
}

export function getUsersByHobby(hobbyId: string, excludeUserId?: string) {
  return MOCK_USERS.filter(
    (user) => user.hobbies.includes(hobbyId) && user.id !== excludeUserId
  );
}

export function getEventsByUserId(userId: string) {
  return MOCK_EVENTS.filter(
    (event) =>
      event.hostId === userId || event.currentParticipants.includes(userId)
  );
}

export function getOpenEvents() {
  return MOCK_EVENTS.filter((event) => event.status === 'open');
}

export function getChatsByUserId(userId: string) {
  return MOCK_CHATS.filter((chat) => chat.participants.includes(userId));
}
