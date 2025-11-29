'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Avatar, Badge, Button } from '@/components/ui';
import { MOCK_USERS } from '@/mock-data';
import { getHobbyById } from '@/lib/data';

export default function HobbyMatchPage() {
  const t = useTranslations('dashboard.hobbyMatch');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  // Filter users who share hobbies (mock logic)
  const matchedUsers = MOCK_USERS.slice(1, 7);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matchedUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar src={user.image} alt={user.name} size="xl" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-lg font-bold mt-3 text-gray-800">{user.name}</h3>
              <p className="text-gray-500 text-xs mt-0.5">
                {user.age} • {user.gender}
              </p>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2 px-2">{user.bio}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {user.hobbies.slice(0, 3).map((hobbyId) => {
                  const hobby = getHobbyById(hobbyId);
                  return (
                    <span key={hobbyId} className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700">
                      {hobby?.icon} {hobby?.name}
                    </span>
                  );
                })}
                {user.hobbies.length > 3 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                    +{user.hobbies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-5 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/${locale}/profile/${user.id}`)}
                >
                  👀 {t('viewProfile')}
                </Button>
                <Button className="flex-1">💌 {t('sendInvite')}</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {matchedUsers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500">No matches found. Try updating your hobbies!</p>
        </div>
      )}
    </div>
  );
}
