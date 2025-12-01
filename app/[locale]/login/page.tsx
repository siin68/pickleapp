'use client';

import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui';

// Icons
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.09H2.18V16.93C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
    <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z" fill="#FBBC05"/>
    <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.37 3.86C17.46 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.84 9.91C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"/></svg>
);

export default function LoginPage() {
  const t = useTranslations('login');

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: `/onboarding` });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#FAFAFA] flex items-center justify-center p-4">
      {/* Dynamic Background Blobs */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-indigo-200/40 to-purple-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-1000" />
      <div className="fixed top-[20%] left-[20%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px] mix-blend-multiply" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Floating Badges (Decorations) */}
        <div className="absolute -top-12 -left-8 animate-bounce delay-700 hidden md:block">
           <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-2 transform -rotate-12">
             <span className="text-2xl">🎉</span>
             <div className="flex flex-col">
               <span className="text-xs font-bold text-gray-500 uppercase">Events</span>
               <span className="text-sm font-black text-gray-800">500+ Weekly</span>
             </div>
           </div>
        </div>

        <div className="absolute -bottom-8 -right-4 animate-bounce delay-300 hidden md:block">
           <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-2 transform rotate-6">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i+10}')] bg-cover`} />)}
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-bold text-gray-500 uppercase">Community</span>
               <span className="text-sm font-black text-gray-800">10k+ Members</span>
             </div>
           </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl shadow-indigo-100/50 p-8 md:p-10 text-center">
          
          {/* Logo Section */}
          <div className="mb-8 flex flex-col items-center">
             <div className="w-24 h-24 bg-gradient-to-tr from-rose-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-rose-200 mb-6 group cursor-pointer hover:scale-105 transition-transform duration-300">
                <HeartIcon className="w-12 h-12 text-white drop-shadow-md animate-pulse" />
             </div>
             <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
               {t('title')}
             </h1>
             <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-[280px] mx-auto">
               {t('subtitle')}
             </p>
          </div>

          {/* Action Section */}
          <div className="space-y-6">
            <Button
              size="lg"
              onClick={handleGoogleLogin}
              className="w-full h-16 rounded-2xl bg-white hover:bg-gray-50 text-gray-700 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-gray-100 flex items-center justify-center gap-4 group"
            >
              <GoogleIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>{t('googleLogin')}</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-gray-400">
                <span className="bg-transparent px-4 backdrop-blur-sm">Secure Entry</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-medium px-4 leading-relaxed">
              By continuing, you agree to our Terms of Service & Privacy Policy. 
              We promise to keep your vibes safe. ✌️
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
           <p className="text-sm font-semibold text-gray-400">
             Match. Meet. Memories.
           </p>
        </div>

      </div>
    </div>
  );
}