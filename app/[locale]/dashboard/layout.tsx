'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations('dashboard.nav');
  const pathname = usePathname();
  const router = useRouter();

  // Derive locale if not passed (fallback parsing)
  const locale = params?.locale || pathname.split('/')[1] || 'en';

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = `/${locale}/login`;
  };

  const base = `/${locale}/dashboard`;
  const navItems = [
    { name: t('home'), path: base, icon: '🏠' },
    { name: t('openInvites'), path: `${base}/open-invites`, icon: '📬' },
    { name: t('hobbyMatch'), path: `${base}/hobby-match`, icon: '🎯' },
    { name: t('createInvite'), path: `${base}/create-invite`, icon: '✨' },
    { name: t('myEvents'), path: `${base}/my-events`, icon: '📅' },
    { name: t('messages'), path: `${base}/messages`, icon: '💬' },
    { name: t('settings'), path: `${base}/settings`, icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 border-b border-pink-100">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-tinder rounded-full flex items-center justify-center text-white text-lg font-bold shadow-tinder">
                💝
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                RND APP
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content (reserve space for bottom nav) */}
      <main className="flex-1 w-full mx-auto max-w-5xl px-4 pb-24 pt-6">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-pink-100 shadow-[0_-4px_12px_-2px_rgba(255,105,180,0.15)]">
        <div className="mx-auto max-w-5xl grid grid-cols-7 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md scale-95'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                <span className="text-lg leading-none">
                  {item.icon}
                </span>
                <span className="leading-tight hidden sm:inline">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
