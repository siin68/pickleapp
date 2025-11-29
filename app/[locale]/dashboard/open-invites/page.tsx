'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Badge, Button } from '@/components/ui';
import { MOCK_EVENTS } from '@/mock-data';
import { getHobbyById, getLocationById, getUserById } from '@/lib/data';

export default function OpenInvitesPage() {
  const t = useTranslations('dashboard.openInvites');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const openEvents = MOCK_EVENTS.filter((e) => e.status === 'open');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Browse all available meetup invitations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {openEvents.map((event) => {
          const hobby = getHobbyById(event.hobbyId);
          const location = getLocationById(event.locationId);
          const host = getUserById(event.hostId);
          const spotsLeft = event.maxParticipants - event.currentParticipants.length;

          return (
            <Card
              key={event.id}
              onClick={() => router.push(`/${locale}/event/${event.id}`)}
              className="cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition">{event.title}</h3>
                <Badge variant={spotsLeft > 3 ? 'success' : 'warning'}>
                  {spotsLeft} spots
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
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
                  <span className="text-base">👤</span>
                  <span className="text-xs">Host: {host?.name}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {openEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500">No open invites available right now</p>
        </div>
      )}
    </div>
  );
}
