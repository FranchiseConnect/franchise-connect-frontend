'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/lib/store';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { isInstallPromptVisible, setInstallPromptVisible } = useUIStore();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 30 seconds on first visit
      setTimeout(() => {
        setInstallPromptVisible(true);
      }, 30000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstallPromptVisible(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [setInstallPromptVisible]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setInstallPromptVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setInstallPromptVisible(false);
    // Don't show again for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (!isInstallPromptVisible || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-4 md:left-auto md:right-4 md:max-w-sm animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg border border-border p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        
        <div className="pr-8">
          <h3 className="font-semibold text-lg mb-1">Install FranchiseConnect</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get quick access and work offline. Install our app on your home screen.
          </p>
          
          <div className="flex gap-2">
            <Button onClick={handleInstall} className="flex-1">
              Install App
            </Button>
            <Button onClick={handleDismiss} variant="outline">
              Not Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
