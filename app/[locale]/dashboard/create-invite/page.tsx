'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Input, TextArea, Button } from '@/components/ui';
import { HOBBIES } from '@/constants/hobbies';
import { LOCATIONS } from '@/constants/locations';

export default function CreateInvitePage() {
  const t = useTranslations('dashboard.createInvite');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hobbyId: '',
    locationId: '',
    date: '',
    time: '',
    maxParticipants: '5',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create event logic here
    console.log('Creating event:', formData);
    router.push(`/${locale}/dashboard/my-events`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Create a new meetup invitation for your hobby
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label={t('eventTitle')}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Morning Coffee & Chat"
            required
          />

          <TextArea
            label={t('description')}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe what you'd like to do..."
            rows={4}
            required
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('hobby')}
            </label>
            <select
              value={formData.hobbyId}
              onChange={(e) => setFormData({ ...formData, hobbyId: e.target.value })}
              className="input-tinder w-full"
              required
            >
              <option value="">Select a hobby</option>
              {HOBBIES.map((hobby) => (
                <option key={hobby.id} value={hobby.id}>
                  {hobby.icon} {hobby.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('location')}
            </label>
            <select
              value={formData.locationId}
              onChange={(e) =>
                setFormData({ ...formData, locationId: e.target.value })
              }
              className="input-tinder w-full"
              required
            >
              <option value="">Select a location</option>
              {LOCATIONS.map((location) => (
                <option key={location.id} value={location.id}>
                  📍 {location.name} ({location.city})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('date')}
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <Input
              label={t('time')}
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <Input
            label={t('maxParticipants')}
            type="number"
            value={formData.maxParticipants}
            onChange={(e) =>
              setFormData({ ...formData, maxParticipants: e.target.value })
            }
            min="2"
            max="20"
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              ❌ {t('cancel')}
            </Button>
            <Button type="submit" className="flex-1">
              ✨ {t('publish')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
