'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui';

export default function LandingPage() {
  const t = useTranslations('landing');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-tinder rounded-full flex items-center justify-center text-white text-2xl font-bold">
              💝
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              RND APP
            </span>
          </div>
          <Button variant="outline" onClick={() => router.push(`/${locale}/login`)}>
            {t('login')}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-float">
            <div className="text-8xl mb-4">💕</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent leading-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium">
            {t('subtitle')}
          </p>
          <Button size="lg" onClick={() => router.push(`/${locale}/login`)} className="text-xl px-12 py-5">
            {t('cta')} ✨
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="card-tinder p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center text-4xl shadow-tinder">
              🎯
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t('features.hobby')}</h3>
            <p className="text-gray-600">{t('features.hobbyDesc')}</p>
          </div>
          <div className="card-tinder p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl flex items-center justify-center text-4xl shadow-tinder">
              📍
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t('features.location')}</h3>
            <p className="text-gray-600">{t('features.locationDesc')}</p>
          </div>
          <div className="card-tinder p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center text-4xl shadow-tinder">
              💬
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t('features.chat')}</h3>
            <p className="text-gray-600">{t('features.chatDesc')}</p>
          </div>
        </div>
      </main>

      {/* Footer Wave */}
      <div className="mt-20">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="url(#gradient)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fe1659" />
              <stop offset="100%" stopColor="#ff6b8e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
