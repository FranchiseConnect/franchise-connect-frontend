'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  MapPin,
  CheckCircle2,
  Star,
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  Dumbbell,
  Stethoscope,
  Wrench,
  Scissors,
  Car,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useSavedListingsStore } from '@/lib/store';
import type { FranchiseListing } from '@/lib/types';

const sectorIcons: Record<string, React.ElementType> = {
  food_beverage: UtensilsCrossed,
  retail: ShoppingBag,
  education: GraduationCap,
  fitness: Dumbbell,
  healthcare: Stethoscope,
  services: Wrench,
  beauty: Scissors,
  automotive: Car,
};

interface FranchiseCardProps {
  listing: FranchiseListing;
  className?: string;
  variant?: 'home' | 'browse';
}

export default function FranchiseCard({ listing, className, variant = 'home' }: FranchiseCardProps) {
  const { isSaved, addListing, removeListing } = useSavedListingsStore();
  const saved = isSaved(listing.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeListing(listing.id);
    } else {
      addListing(listing.id);
    }
  };

  const sectorColors: Record<string, string> = {
    food_beverage: 'text-blue-600',
    retail: 'text-purple-600',
    education: 'text-indigo-600',
    fitness: 'text-red-600',
    healthcare: 'text-emerald-600',
    services: 'text-orange-600',
    beauty: 'text-pink-600',
    automotive: 'text-gray-600',
  };

  const sectorLabel = listing.sector.replace('_', ' & ');
  const sectorLabelUpper = sectorLabel.charAt(0).toUpperCase() + sectorLabel.slice(1);
  const colorClass = sectorColors[listing.sector] || sectorColors.services;
  const SectorIcon = sectorIcons[listing.sector] || Wrench;

  // --- HOME VARIANT (compact card for horizontal scroll) ---
  if (variant === 'home') {
    return (
      <Link href={`/franchise/${listing.id}`} className="block">
        <div className={cn(
          'bg-white rounded-2xl overflow-hidden w-[280px] sm:w-auto flex-shrink-0',
          'shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-0.5',
          className
        )}>
          {/* Image */}
          <div className="relative h-44 w-full">
            <Image
              src={listing.images[0] || '/images/placeholder.jpg'}
              alt={listing.businessName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Verified Badge */}
            {listing.isVerified && (
              <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-secondary rounded-full shadow-sm">
                <CheckCircle2 size={13} />
                VERIFIED
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3.5">
            {/* Sector */}
            <p className={cn('text-xs font-semibold uppercase tracking-wide mb-1', colorClass)}>
              {sectorLabel.toUpperCase()}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-base text-foreground line-clamp-1 mb-1">
              {listing.businessName}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin size={13} className="flex-shrink-0" />
              <span className="line-clamp-1">{listing.headquarters.city}, {listing.headquarters.state}</span>
            </div>

            {/* Investment + ROI */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase font-medium">Investment</div>
                <div className="font-semibold text-sm text-foreground">
                  {formatCurrency(listing.franchiseFeeMin)} - {formatCurrency(listing.franchiseFeeMax)}
                </div>
              </div>
              <div className="px-3 py-1.5 bg-primary-50 rounded-lg">
                <span className="text-sm font-semibold text-primary">
                  ROI: {Math.round((listing.expectedMonthlyRevenue * 12 / listing.totalInvestment) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // --- BROWSE VARIANT (full-width card for listing page) ---
  return (
    <Link href={`/franchise/${listing.id}`} className="block">
      <div className={cn(
        'bg-white rounded-2xl overflow-hidden',
        'shadow-[0_2px_16px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.03)]',
        'hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all',
        className
      )}>
        {/* Image */}
        <div className="relative h-48 sm:h-56 w-full">
          <Image
            src={listing.images[0] || '/images/placeholder.jpg'}
            alt={listing.businessName}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {listing.isVerified && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-secondary rounded-full shadow-sm">
                <CheckCircle2 size={13} />
                Verified
              </div>
            )}
            {listing.isPremium && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-accent rounded-full shadow-sm">
                <Star size={13} />
                Premium
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all active:scale-95"
          >
            <Heart
              size={20}
              className={cn(
                'transition-colors',
                saved ? 'fill-red-500 text-red-500' : 'text-gray-500'
              )}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Sector with Icon */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <SectorIcon size={15} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {sectorLabelUpper}
            </span>
          </div>

          {/* Business Name */}
          <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-1.5">
            {listing.businessName}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <MapPin size={14} className="flex-shrink-0" />
            <span>{listing.headquarters.city}, {listing.headquarters.state}</span>
          </div>

          {/* Investment & Revenue Row */}
          <div className="flex items-start gap-6 sm:gap-10 mb-4">
            <div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase font-medium tracking-wider mb-1">
                Investment
              </div>
              <div className="font-bold text-base text-primary">
                {formatCurrency(listing.franchiseFeeMin)} - {formatCurrency(listing.franchiseFeeMax)}
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase font-medium tracking-wider mb-1">
                Claimed Rev.
              </div>
              <div className="font-semibold text-base text-foreground">
                {formatCurrency(listing.expectedMonthlyRevenue)}<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
            </div>
          </div>

          {/* View Details Button - Skeuomorphic style */}
          <button className="w-full py-3 text-sm font-semibold text-primary rounded-xl border-2 border-border/70 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-[inset_0_-2px_0_rgba(0,0,0,0.05)] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] active:translate-y-px">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
