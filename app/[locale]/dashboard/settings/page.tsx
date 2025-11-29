'use client';

import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui';
import { useState } from 'react';

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings');
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showLocation, setShowLocation] = useState(true);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = `/login`;
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'vi' : 'en';
    const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Account Section */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-xl">👤</span>
            Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</label>
              <div className="mt-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700">
                {session?.user?.email || 'Not available'}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</label>
              <div className="mt-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-700">
                {session?.user?.name || 'Not set'}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}/onboarding/profile`)}
              className="w-full"
            >
              {t('profile')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Preferences
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">Language</p>
                <p className="text-xs text-gray-500">Current: {locale === 'en' ? 'English' : 'Tiếng Việt'}</p>
              </div>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 font-medium text-sm hover:shadow-md transition"
              >
                {locale === 'en' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
              </button>
            </div>
            <hr className="border-pink-100" />
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}/onboarding/hobbies`)}
              className="w-full"
            >
              {t('hobbies')}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}/onboarding/locations`)}
              className="w-full"
            >
              {t('locations')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy Section */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-xl">🔒</span>
            Privacy & Safety
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">Private Profile</p>
                <p className="text-xs text-gray-500">Only matched users can see your details</p>
              </div>
              <button
                onClick={() => setPrivateProfile(!privateProfile)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  privateProfile ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    privateProfile ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
            <hr className="border-pink-100" />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">Show Location</p>
                <p className="text-xs text-gray-500">Display your location on profile</p>
              </div>
              <button
                onClick={() => setShowLocation(!showLocation)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showLocation ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    showLocation ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-xl">🔔</span>
            {t('notifications')}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">All Notifications</p>
                <p className="text-xs text-gray-500">Enable or disable all notifications</p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
            <hr className="border-pink-100" />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive updates via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    emailNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
            <hr className="border-pink-100" />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-xs text-gray-500">Get instant push alerts</p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  pushNotifications ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    pushNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Actions */}
      <Card>
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-red-600 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            Account Actions
          </h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
            >
              🚪 {t('logout')}
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  alert('Account deletion functionality will be implemented.');
                }
              }}
            >
              🗑️ Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
