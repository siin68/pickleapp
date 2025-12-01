'use client';

import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, Button, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { useState } from 'react';

// Inline Icons for styling without external dependencies
const UserIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const HeartIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const MapPinIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const GlobeIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const BellIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const LockIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const ShieldIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const LogOutIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const TrashIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;

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

  // Custom styled toggle switch
  const Toggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`relative w-14 h-8 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
        active 
          ? 'bg-gradient-to-r from-rose-400 to-purple-500 shadow-inner' 
          : 'bg-gray-200'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          active ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse delay-1000" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600">
            {t('title')}
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your personal vibe, preferences, and account security.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-rose-100/50 rounded-[2rem]">
          <div className="h-32 bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 relative">
             <div className="absolute inset-0 bg-white/10 pattern-dots"></div>
          </div>
          <CardContent className="pt-0 pb-8 px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              <Avatar className="w-32 h-32 border-[6px] border-white shadow-2xl ring-4 ring-rose-50">
                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} className="object-cover" />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-rose-400 to-purple-500 text-white font-bold">
                  {session?.user?.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left space-y-1 mb-2">
                <h2 className="text-xl font-bold text-gray-800 tracking-tight ">{session?.user?.name || 'Guest User'}</h2>
                <p className="text-rose-500 font-medium">{session?.user?.email}</p>
              </div>
              <Button
                onClick={() => router.push(`/dashboard/settings/profile`)}
                className="mb-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 shadow-lg px-6 font-semibold"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { 
              icon: <UserIcon className="w-6 h-6 text-white" />, 
              color: "from-blue-400 to-cyan-400", 
              title: "Edit Profile", 
              desc: "Update your personal details",
              action: () => router.push(`/dashboard/settings/profile`)
            },
            { 
              icon: <HeartIcon className="w-6 h-6 text-white" />, 
              color: "from-pink-400 to-rose-400", 
              title: "Manage Hobbies", 
              desc: "What makes you tick?",
              action: () => router.push(`/onboarding/hobbies`)
            },
            { 
              icon: <MapPinIcon className="w-6 h-6 text-white" />, 
              color: "from-emerald-400 to-teal-400", 
              title: "Preferred Locations", 
              desc: "Where you want to meet",
              action: () => router.push(`/onboarding/locations`)
            },
            { 
              icon: <GlobeIcon className="w-6 h-6 text-white" />, 
              color: "from-orange-400 to-amber-400", 
              title: "Language", 
              desc: locale === 'en' ? 'Currently: English' : 'Currently: Tiếng Việt',
              action: toggleLanguage
            },
          ].map((item, i) => (
             <Card 
               key={i} 
               className="group border-0 bg-white/60 hover:bg-white backdrop-blur-md shadow-lg shadow-rose-50/50 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden"
               onClick={item.action}
             >
              <CardContent className="p-5 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settings Sections */}
        <div className="grid gap-8">
          
          {/* Privacy */}
          <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-indigo-100/50 rounded-[2rem]">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600">
                  <ShieldIcon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Privacy & Safety</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-800">Private Profile</p>
                    <p className="text-sm text-gray-500">Only matched users can see your full details</p>
                  </div>
                  <Toggle active={privateProfile} onClick={() => setPrivateProfile(!privateProfile)} />
                </div>
                
                <div className="h-px bg-gray-100" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-800">Show Location</p>
                    <p className="text-sm text-gray-500">Allow others to see your approximate distance</p>
                  </div>
                  <Toggle active={showLocation} onClick={() => setShowLocation(!showLocation)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-purple-100/50 rounded-[2rem]">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
                  <BellIcon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{t('notifications')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-800">All Notifications</p>
                    <p className="text-sm text-gray-500">Pause all notifications temporarily</p>
                  </div>
                  <Toggle active={notificationsEnabled} onClick={() => setNotificationsEnabled(!notificationsEnabled)} />
                </div>
                
                <div className="h-px bg-gray-100" />
                
                <div className="flex items-center justify-between opacity-90">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-800">Email Updates</p>
                    <p className="text-sm text-gray-500">Receive match summaries via email</p>
                  </div>
                  <Toggle active={emailNotifications} onClick={() => setEmailNotifications(!emailNotifications)} />
                </div>
                
                <div className="h-px bg-gray-100" />
                
                <div className="flex items-center justify-between opacity-90">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-800">Push Alerts</p>
                    <p className="text-sm text-gray-500">Get notified instantly on your device</p>
                  </div>
                  <Toggle active={pushNotifications} onClick={() => setPushNotifications(!pushNotifications)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destructive Actions */}
          <Card className="border-2 border-red-50 bg-white/50 backdrop-blur-xl shadow-none rounded-[2rem]">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-red-100 rounded-xl text-red-600">
                  <LockIcon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Account Actions</h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex-1 border-gray-200 hover:bg-gray-50 hover:text-gray-900 text-gray-600 h-12 rounded-xl text-base"
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  {t('logout')}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-100 bg-red-50/50 text-red-600 hover:bg-red-100 hover:text-red-700 h-12 rounded-xl text-base"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      alert('Account deletion functionality will be implemented.');
                    }
                  }}
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
