'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';

export default function LoginPage() {
  const t = useTranslations('login');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: `/${locale}/onboarding` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block animate-float">
            <div className="w-24 h-24 bg-gradient-tinder rounded-full flex items-center justify-center text-6xl shadow-tinder mb-4">
              💝
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 text-lg">{t('subtitle')}</p>
        </div>

        {/* Login Card */}
        <div className="card-tinder p-8">
          <Button
            className="w-full flex items-center justify-center gap-3 mb-6"
            size="lg"
            onClick={handleGoogleLogin}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('googleLogin')}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">{t('terms')}</p>
            <div className="flex items-center justify-center gap-2 text-primary-600">
              <span className="text-2xl">✨</span>
              <span className="text-2xl">💕</span>
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">1000+</div>
            <div className="text-xs text-gray-600">Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600">500+</div>
            <div className="text-xs text-gray-600">Events</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">98%</div>
            <div className="text-xs text-gray-600">Happy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
