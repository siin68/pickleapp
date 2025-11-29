'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { MOCK_EVENTS } from '@/mock-data';
import { getHobbyById, getLocationById } from '@/lib/data';

export default function DashboardHome() {
  const t = useTranslations('dashboard.home');
  const tNav = useTranslations('dashboard.nav');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const upcomingEvents = MOCK_EVENTS.filter((e) => e.status === 'open').slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('welcome', { name: 'User' })}
        </h1>
        <p className="text-sm text-gray-600">
          {t('subtitle', { defaultValue: 'Discover invites & match hobbies.' })}
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('actions')}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6"
            onClick={() => router.push(`/${locale}/open-invites`)}
          >
            <span>{tNav('openInvites')}</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6"
            onClick={() => router.push(`/${locale}/hobby-match`)}
          >
            <span>{tNav('hobbyMatch')}</span>
          </Button>
          <Button
            className="flex flex-col items-center gap-2 h-auto py-6"
            onClick={() => router.push(`/${locale}/create-invite`)}
          >
            <span>{tNav('createInvite')}</span>
          </Button>
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('upcoming')}
        </h2>
        <div className="space-y-3">
          {upcomingEvents.map((event) => {
            const hobby = getHobbyById(event.hobbyId);
            const location = getLocationById(event.locationId);
            return (
              <div
                key={event.id}
                className="p-4 rounded-xl cursor-pointer transition group bg-white/60 backdrop-blur hover:shadow-md border border-pink-100 hover:border-primary-300"
                onClick={() => router.push(`event/${event.id}`)}
              >
                <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition">
                  {event.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs font-medium text-gray-700">
                  <span className="px-2 py-1 rounded-md bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700">
                    {hobby?.icon} {hobby?.name}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-pink-50 text-primary-700">
                    {location?.name}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {event.date} • {event.time}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
