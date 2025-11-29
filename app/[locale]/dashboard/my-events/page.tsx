'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Badge } from '@/components/ui';
import { MOCK_EVENTS } from '@/mock-data';
import { getHobbyById, getLocationById } from '@/lib/data';

export default function MyEventsPage() {
  const t = useTranslations('dashboard.myEvents');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [activeTab, setActiveTab] = useState<'created' | 'joined' | 'history'>('created');

  // Mock user ID
  const userId = '1';

  const createdEvents = MOCK_EVENTS.filter((e) => e.hostId === userId);
  const joinedEvents = MOCK_EVENTS.filter((e) =>
    e.currentParticipants.includes(userId) && e.hostId !== userId
  );
  const historyEvents = MOCK_EVENTS.filter((e) => e.status === 'closed');

  const getActiveEvents = () => {
    switch (activeTab) {
      case 'created':
        return createdEvents;
      case 'joined':
        return joinedEvents;
      case 'history':
        return historyEvents;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage events you've created or joined
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-pink-100">
        {(['created', 'joined', 'history'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 font-semibold transition-all rounded-t-xl ${
              activeTab === tab
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                : 'text-gray-600 hover:text-primary-600 hover:bg-pink-50'
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getActiveEvents().map((event) => {
          const hobby = getHobbyById(event.hobbyId);
          const location = getLocationById(event.locationId);

          return (
            <Card
              key={event.id}
              onClick={() => router.push(`/${locale}/event/${event.id}`)}
              className="cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition">{event.title}</h3>
                <Badge
                  variant={event.status === 'open' ? 'success' : event.status === 'closed' ? 'secondary' : 'danger'}
                >
                  {event.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-base">{hobby?.icon}</span>
                  <span className="font-medium">{hobby?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-base">📍</span>
                  <span>{location?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-base">📅</span>
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-base">👥</span>
                  <span className="text-xs">{event.currentParticipants.length}/{event.maxParticipants} joined</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {getActiveEvents().length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-500">No events in this category</p>
        </div>
      )}
    </div>
  );
}
