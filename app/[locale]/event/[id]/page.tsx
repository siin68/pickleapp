'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, Button, Avatar, Badge } from '@/components/ui';
import { getEventById, getHobbyById, getLocationById, getUserById } from '@/lib/data';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('event');
  
  const event = getEventById(params.id as string);
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500">Event not found</p>
          <Button onClick={() => router.push(`/${locale}/dashboard`)} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const hobby = getHobbyById(event.hobbyId);
  const location = getLocationById(event.locationId);
  const host = getUserById(event.hostId);
  const isFull = event.currentParticipants.length >= event.maxParticipants;
  const spotsLeft = event.maxParticipants - event.currentParticipants.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          ← Back
        </Button>

        <Card className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-extrabold text-gray-800">{event.title}</h1>
            <Badge variant={event.status === 'open' ? 'success' : 'secondary'}>
              {event.status}
            </Badge>
          </div>
          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('host')}</h3>
              <div className="flex items-center gap-3">
                <Avatar src={host?.image} alt={host?.name || ''} />
                <div>
                  <div className="font-semibold text-gray-800">{host?.name}</div>
                  <button
                    onClick={() => router.push(`/${locale}/profile/${host?.id}`)}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View profile
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('hobby')}</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{hobby?.icon}</span>
                <span className="font-semibold text-gray-800">{hobby?.name}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('location')}</h3>
              <div className="font-semibold text-gray-800">{location?.name}</div>
              <div className="text-sm text-gray-600">{location?.city}</div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('when')}</h3>
              <div className="font-semibold text-gray-800">{event.date}</div>
              <div className="text-sm text-gray-600">{event.time}</div>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
            {t('participants', { current: event.currentParticipants.length, max: event.maxParticipants })}
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {event.currentParticipants.map((participantId) => {
              const participant = getUserById(participantId);
              return (
                <div
                  key={participantId}
                  onClick={() => router.push(`/${locale}/profile/${participantId}`)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                >
                  <Avatar src={participant?.image} alt={participant?.name || ''} size="sm" />
                  <span className="text-sm font-medium text-gray-700">{participant?.name}</span>
                </div>
              );
            })}
          </div>
          {spotsLeft > 0 && (
            <p className="text-sm text-gray-500">{spotsLeft} spot{spotsLeft > 1 ? 's' : ''} available</p>
          )}
        </Card>

        <div className="flex gap-3">
          <Button
            disabled={isFull || event.status !== 'open'}
            className="flex-1"
            onClick={() => alert('Join functionality will be implemented')}
          >
            {isFull ? 'Event Full' : t('join')}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/chat/${event.id}`)}
          >
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
