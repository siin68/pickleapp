'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    router.push(`/onboarding/profile`);
  }, [router, locale]);

  return null;
}
