'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Input, TextArea, Card } from '@/components/ui';

export default function ProfileStep() {
  const t = useTranslations('onboarding.profile');
  const tCommon = useTranslations('onboarding');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    bio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('onboarding-profile', JSON.stringify(formData));
    router.push(`/${locale}/onboarding/hobbies`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-sm font-medium text-primary-600">
          {tCommon('step', { current: 1, total: 3 })}
        </p>
        <h1 className="text-3xl font-extrabold mt-2 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">{t('title')}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label={t('name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Enter your full name"
          />

          <Input
            label={t('age')}
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            min="18"
            max="100"
            placeholder="18+"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t('gender')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['male', 'female', 'other'] as const).map((gender) => (
                <label
                  key={gender}
                  className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition ${
                    formData.gender === gender
                      ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-accent-50 font-semibold text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value as any })
                    }
                    className="sr-only"
                  />
                  {t(gender)}
                </label>
              ))}
            </div>
          </div>

          <TextArea
            label={t('bio')}
            placeholder={t('bioPlaceholder')}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            required
          />

          <div className="flex justify-end pt-2">
            <Button type="submit" className="px-8">
              {tCommon('next')} →
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
