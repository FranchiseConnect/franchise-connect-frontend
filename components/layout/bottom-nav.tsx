'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/browse', icon: Search, label: 'Browse' },
  { href: '/list', icon: Plus, label: 'List', isFab: true },
  { href: '/saved', icon: Heart, label: 'Saved' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Side Nav */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-white border-r border-border z-50 flex-col py-6">
        <div className="px-4 lg:px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg font-display">F</span>
            </div>
            <span className="hidden lg:block font-display font-bold text-lg text-foreground">
              FranchiseConnect
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 px-3 lg:px-4">
          {navItems.map(({ href, icon: Icon, label, isFab }) => {
            const isActive = pathname === href;

            if (isFab) {
              return (
                <Link
                  key={href}
                  href={href}
                  className="mt-4 mb-4 flex items-center justify-center lg:justify-start gap-3 h-12 rounded-xl bg-gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all px-3 lg:px-4"
                >
                  <Plus size={22} strokeWidth={2.5} />
                  <span className="hidden lg:block text-sm font-semibold">List Business</span>
                </Link>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center justify-center lg:justify-start gap-3 h-12 rounded-xl transition-all px-3 lg:px-4',
                  isActive
                    ? 'bg-primary-50 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="flex-shrink-0"
                />
                <span className={cn(
                  'hidden lg:block text-sm',
                  isActive ? 'font-semibold' : 'font-medium'
                )}>
                  {label}
                </span>
                {isActive && (
                  <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom">
        <div className="relative">
          {/* Nav Background */}
          <div className="bg-white/95 backdrop-blur-lg border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex justify-around items-end h-16 px-2">
              {navItems.map(({ href, icon: Icon, label, isFab }) => {
                const isActive = pathname === href;

                if (isFab) {
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="flex flex-col items-center justify-center -mt-6"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                        <Plus size={26} strokeWidth={2.5} className="text-white" />
                      </div>
                      <span className="text-[10px] font-medium mt-1 text-muted-foreground">
                        {label}
                      </span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex flex-col items-center justify-center flex-1 py-2 transition-colors touch-target',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <div className="relative">
                      <Icon
                        size={22}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className={cn(
                      'text-[10px] mt-1.5',
                      isActive ? 'font-semibold' : 'font-medium'
                    )}>
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
