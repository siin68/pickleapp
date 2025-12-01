'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Avatar, AvatarImage, AvatarFallback, Button } from '@/components/ui';
import { MOCK_CHATS, MOCK_MESSAGES } from '@/mock-data';
import { getUserById, getEventById, getHobbyById } from '@/lib/data';

// Icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const MessageCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export default function MessagesPage() {
  const t = useTranslations('dashboard.messages');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter chats based on event title
  const filteredChats = MOCK_CHATS.filter(chat => {
      const event = getEventById(chat.eventId);
      return event?.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse delay-700" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
             <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/60 text-rose-500 text-xs font-bold tracking-widest uppercase backdrop-blur-sm border border-rose-100 shadow-sm">
                Inbox
             </span>
             <h1 className="text-4xl font-black tracking-tight text-gray-900">
               {t('title')}
             </h1>
             <p className="text-gray-500 font-medium">Your conversations and event squads.</p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full md:w-72">
             <input 
               type="text" 
               placeholder="Search chats..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-12 pl-10 pr-4 rounded-2xl bg-white/60 border border-white backdrop-blur-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all font-medium text-gray-700 placeholder:text-gray-400"
             />
          </div>
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {filteredChats.map((chat) => {
            const event = getEventById(chat.eventId);
            const hobby = getHobbyById(event?.hobbyId || '');
            const lastMessage = MOCK_MESSAGES.filter((m) => m.chatId === chat.id).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
            const otherParticipant = getUserById(chat.participants.find((p) => p !== '1') || ''); // Mock ID 1
            
            // Format time
            const time = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
            
            return (
              <div
                key={chat.id}
                onClick={() => router.push(`/chat/${chat.id}`)}
                className="group relative bg-white/70 hover:bg-white backdrop-blur-xl rounded-[1.5rem] p-4 border border-white shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-pointer flex items-center gap-4 hover:-translate-y-0.5"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <Avatar className="w-16 h-16 border-[3px] border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${event?.id}`} />
                    <AvatarFallback className="bg-gradient-to-br from-rose-100 to-purple-100 text-purple-600 font-bold text-xl">
                      {event?.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Hobby Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-sm border border-gray-100">
                     {hobby?.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 py-1">
                   <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-900 truncate pr-2 group-hover:text-rose-600 transition-colors">
                        {event?.title}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs font-bold text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded-full">
                          {time}
                        </span>
                      )}
                   </div>
                   
                   <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                      <span>with</span>
                      <span className="text-gray-600">{otherParticipant?.name || 'Group'}</span>
                   </div>

                   <p className="text-sm font-medium text-gray-500 truncate group-hover:text-gray-700 transition-colors">
                     {lastMessage ? (
                        <>
                          <span className="text-gray-400 font-normal">{lastMessage.senderId === '1' ? 'You: ' : ''}</span>
                          {lastMessage.content}
                        </>
                     ) : (
                       <span className="italic text-gray-400">No messages yet</span>
                     )}
                   </p>
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                   <ChevronRightIcon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-rose-100 mb-6 text-4xl text-rose-400">
               <MessageCircleIcon className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-black text-gray-800 mb-2">No conversations found</h3>
             <p className="text-gray-500 mb-8 max-w-sm">
               Join an event to start chatting with your future squad!
             </p>
             <Button 
               onClick={() => router.push('/dashboard/open-invites')}
               className="rounded-full h-12 px-8 bg-gray-900 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
             >
               Find Events
             </Button>
          </div>
        )}

      </div>
    </div>
  );
}