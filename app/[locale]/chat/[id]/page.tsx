'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { getChatById, getEventById, getUserById, getMessagesByChatId } from '@/lib/data';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('chat');
  const [message, setMessage] = useState('');
  
  const chat = getChatById(params.id as string);
  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-500">Chat not found</p>
          <Button onClick={() => router.push(`/dashboard/messages`)} className="mt-4">
            Back to Messages
          </Button>
        </div>
      </div>
    );
  }

  const event = getEventById(chat.eventId);
  const messages = getMessagesByChatId(chat.id);
  const currentUserId = '1';

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.back()} className="px-3">
                ←
              </Button>
              <div>
                <h1 className="font-bold text-gray-800">{event?.title}</h1>
                <p className="text-sm text-gray-500">
                  {chat.participants.length} {t('participants')}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(`/event/${event?.id}`)}
            >
              Event
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-3xl overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => {
            const sender = getUserById(msg.senderId);
            const isCurrentUser = msg.senderId === currentUserId;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
              >
                {!isCurrentUser && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={sender?.image} alt={sender?.name || ''} />
                    <AvatarFallback>{sender?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-md">
                  {!isCurrentUser && (
                    <div className="text-sm font-medium mb-1 text-gray-700 px-1">
                      {sender?.name}
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 px-1 ${
                    isCurrentUser ? 'text-right' : 'text-left'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-pink-100 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('typePlaceholder', { defaultValue: 'Type a message...' })}
              className="flex-1 px-4 py-3 rounded-full border-2 border-pink-100 focus:border-primary-400 focus:outline-none transition"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="px-6 rounded-full"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
