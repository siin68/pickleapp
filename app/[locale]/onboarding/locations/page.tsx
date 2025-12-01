'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Card, CardContent } from '@/components/ui';
import { LOCATIONS } from '@/constants/locations';

export default function LocationsStep() {
  const t = useTranslations('onboarding.locations');
  const tCommon = useTranslations('onboarding');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleLocation = (locationId: string) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter((id) => id !== locationId));
    } else {
      if (selectedLocations.length < 3) {
        setSelectedLocations([...selectedLocations, locationId]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedLocations.length >= 1) {
      localStorage.setItem('onboarding-locations', JSON.stringify(selectedLocations));
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-sm font-medium text-primary-600">
          {tCommon('step', { current: 3, total: 3 })}
        </p>
        <h1 className="text-3xl font-extrabold mt-2 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-gray-600 mt-2">{t('subtitle')}</p>
        <p className="text-sm font-semibold text-primary-700 mt-3">
          {t('selected', { count: selectedLocations.length })} / 1-3 locations
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LOCATIONS.map((location) => {
            const isSelected = selectedLocations.includes(location.id);
            return (
              <button
                key={location.id}
                onClick={() => toggleLocation(location.id)}
                className={`p-5 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                  isSelected
                    ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 shadow-md'
                    : 'border-gray-200 hover:border-primary-300 bg-white'
                }`}
              >
                <div className={`font-bold text-lg ${
                  isSelected ? 'text-primary-700' : 'text-gray-800'
                }`}>{location.name}</div>
                <div className={`text-sm mt-1 ${
                  isSelected ? 'text-primary-600' : 'text-gray-500'
                }`}>{location.city}</div>
              </button>
            );
          })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          ← {tCommon('back')}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={selectedLocations.length < 1 || selectedLocations.length > 3}
        >
          {tCommon('finish')} ✓
        </Button>
      </div>
    </div>
  );
}
