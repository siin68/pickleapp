'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Avatar } from '@/components/ui';
import { MOCK_CHATS, MOCK_EVENTS, MOCK_MESSAGES } from '@/mock-data';
import { getUserById, getEventById } from '@/lib/data';

export default function MessagesPage() {
  const t = useTranslations('dashboard.messages');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Your conversation threads
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_CHATS.map((chat) => {
          const event = getEventById(chat.eventId);
          const lastMessage = MOCK_MESSAGES.filter(
            (m) => m.chatId === chat.id
          ).pop();
          const otherParticipant = getUserById(
            chat.participants.find((p) => p !== '1') || ''
          );

          return (
            <Card
              key={chat.id}
              onClick={() => router.push(`/chat/${chat.id}`)}
              className="cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar src={otherParticipant?.image} alt={otherParticipant?.name || ''} size="lg" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition">{event?.title}</h3>
                    <span className="text-xs text-gray-400 ml-2">
                      {lastMessage?.timestamp.split('T')[0]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    💬 with {otherParticipant?.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {lastMessage?.content}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {MOCK_CHATS.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-500">{t('noChats')}</p>
          <p className="text-sm text-gray-400 mt-2">Join an event to start chatting!</p>
        </div>
      )}
    </div>
  );
}
