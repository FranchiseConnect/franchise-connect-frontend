'use client';

import { useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { useUIStore } from '@/lib/store';

export default function OfflineBanner() {
  const { isOnline, setIsOnline } = useUIStore();

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOnline]);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
      <WifiOff size={16} />
      <span>You&apos;re offline. Some features may be limited.</span>
    </div>
  );
}
