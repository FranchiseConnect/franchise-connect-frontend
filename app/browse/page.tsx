'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
  ChevronDown,
  X,
  MapPin,
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  Dumbbell,
  Stethoscope,
  Wrench,
  Scissors,
  Car,
} from 'lucide-react';
import FranchiseCard from '@/components/franchise/franchise-card';
import type { FranchiseSector } from '@/lib/types';

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

const sectorLabels: Record<string, string> = {
  food_beverage: 'Food & Beverage',
  retail: 'Retail',
  education: 'Education',
  fitness: 'Fitness',
  healthcare: 'Healthcare',
  services: 'Services',
  beauty: 'Beauty',
  automotive: 'Automotive',
};

const budgetRanges = [
  { label: '₹5L - ₹10L', min: 500000, max: 1000000 },
  { label: '₹10L - ₹25L', min: 1000000, max: 2500000 },
  { label: '₹25L - ₹50L', min: 2500000, max: 5000000 },
  { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr+', min: 10000000, max: Infinity },
];

const locationOptions = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Pune'];

// Mock data
const allListings = [
  {
    id: '1',
    businessName: 'Brew & Bean Cafe',
    sector: 'food_beverage' as const,
    description: 'Premium artisanal coffee chain with a focus on specialty brews',
    headquarters: { city: 'Indiranagar', state: 'Bangalore' },
    establishedYear: 2019,
    existingOutlets: 3,
    franchiseFeeMin: 1200000,
    franchiseFeeMax: 1500000,
    totalInvestment: 1800000,
    expectedMonthlyRevenue: 350000,
    royaltyPercentage: 8,
    roiMonths: 18,
    support: ['Marketing & Brand', 'Training Program', 'Operations Manual'],
    isVerified: true,
    isPremium: true,
    gstVerified: true,
    documentsVerified: true,
    images: ['/images/cafe.jpg'],
    ownerId: '1',
    owner: {
      name: 'Rajesh Kumar',
      joinedDate: new Date('2025-01-15'),
      responseTime: '4 hours',
      responseRate: 92,
    },
    views: 234,
    contactUnlocks: 18,
    savedCount: 45,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-02-10'),
  },
  {
    id: '3',
    businessName: 'Little Minds Preschool',
    sector: 'education' as const,
    description: 'Play-based early childhood education for ages 2-6',
    headquarters: { city: 'Jubilee Hills', state: 'Hyderabad' },
    establishedYear: 2018,
    existingOutlets: 5,
    franchiseFeeMin: 800000,
    franchiseFeeMax: 1200000,
    totalInvestment: 1500000,
    expectedMonthlyRevenue: 280000,
    royaltyPercentage: 6,
    roiMonths: 20,
    support: ['Curriculum Design', 'Teacher Training', 'Marketing Support'],
    isVerified: true,
    isPremium: false,
    gstVerified: true,
    documentsVerified: true,
    images: ['/images/preschool.jpg'],
    ownerId: '3',
    owner: {
      name: 'Priya Menon',
      joinedDate: new Date('2025-01-10'),
      responseTime: '3 hours',
      responseRate: 96,
    },
    views: 312,
    contactUnlocks: 24,
    savedCount: 67,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-02-08'),
  },
  {
    id: '2',
    businessName: 'IronCore Fitness',
    sector: 'fitness' as const,
    description: 'Modern gym with smart equipment and personal training',
    headquarters: { city: 'Jubilee Hills', state: 'Hyderabad' },
    establishedYear: 2020,
    existingOutlets: 2,
    franchiseFeeMin: 4500000,
    franchiseFeeMax: 6000000,
    totalInvestment: 5500000,
    expectedMonthlyRevenue: 650000,
    royaltyPercentage: 10,
    roiMonths: 24,
    support: ['Marketing & Brand', 'Training Program', 'Equipment Sourcing'],
    isVerified: true,
    isPremium: true,
    gstVerified: true,
    documentsVerified: true,
    images: ['/images/gym.jpg'],
    ownerId: '2',
    owner: {
      name: 'Amit Sharma',
      joinedDate: new Date('2025-01-20'),
      responseTime: '2 hours',
      responseRate: 95,
    },
    views: 456,
    contactUnlocks: 32,
    savedCount: 89,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-02-12'),
  },
  {
    id: '4',
    businessName: 'StyleCraft Salon',
    sector: 'beauty' as const,
    description: 'Unisex salon with premium grooming services',
    headquarters: { city: 'Koramangala', state: 'Bangalore' },
    establishedYear: 2021,
    existingOutlets: 4,
    franchiseFeeMin: 600000,
    franchiseFeeMax: 900000,
    totalInvestment: 1200000,
    expectedMonthlyRevenue: 220000,
    royaltyPercentage: 7,
    roiMonths: 16,
    support: ['Brand Kit', 'Staff Training', 'Product Supply Chain'],
    isVerified: true,
    isPremium: false,
    gstVerified: true,
    documentsVerified: true,
    images: ['/images/salon.jpg'],
    ownerId: '4',
    owner: {
      name: 'Neha Kapoor',
      joinedDate: new Date('2025-02-01'),
      responseTime: '1 hour',
      responseRate: 98,
    },
    views: 189,
    contactUnlocks: 15,
    savedCount: 38,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-14'),
  },
  {
    id: '5',
    businessName: 'QuickFix Auto Care',
    sector: 'automotive' as const,
    description: 'Multi-brand car service and detailing center',
    headquarters: { city: 'Whitefield', state: 'Bangalore' },
    establishedYear: 2017,
    existingOutlets: 8,
    franchiseFeeMin: 2000000,
    franchiseFeeMax: 3000000,
    totalInvestment: 3500000,
    expectedMonthlyRevenue: 480000,
    royaltyPercentage: 5,
    roiMonths: 22,
    support: ['Technical Training', 'Equipment', 'Marketing & Brand'],
    isVerified: true,
    isPremium: false,
    gstVerified: true,
    documentsVerified: true,
    images: ['/images/autocare.jpg'],
    ownerId: '5',
    owner: {
      name: 'Vikram Patel',
      joinedDate: new Date('2024-11-15'),
      responseTime: '6 hours',
      responseRate: 88,
    },
    views: 567,
    contactUnlocks: 41,
    savedCount: 102,
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2025-02-11'),
  },
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<typeof budgetRanges[number] | null>(null);
  const [selectedSector, setSelectedSector] = useState<FranchiseSector | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showSectorDropdown, setShowSectorDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const activeFilters = useMemo(() => {
    const filters: { label: string; onRemove: () => void }[] = [];
    if (selectedBudget) {
      filters.push({ label: selectedBudget.label, onRemove: () => setSelectedBudget(null) });
    }
    if (selectedSector) {
      filters.push({ label: sectorLabels[selectedSector], onRemove: () => setSelectedSector(null) });
    }
    if (selectedLocation) {
      filters.push({ label: selectedLocation, onRemove: () => setSelectedLocation(null) });
    }
    return filters;
  }, [selectedBudget, selectedSector, selectedLocation]);

  const filteredListings = useMemo(() => {
    return allListings.filter((listing) => {
      if (verifiedOnly && !listing.isVerified) return false;
      if (selectedSector && listing.sector !== selectedSector) return false;
      if (selectedBudget) {
        if (listing.franchiseFeeMin > selectedBudget.max || listing.franchiseFeeMax < selectedBudget.min) {
          return false;
        }
      }
      if (selectedLocation) {
        const loc = `${listing.headquarters.city} ${listing.headquarters.state}`.toLowerCase();
        if (!loc.includes(selectedLocation.toLowerCase())) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          listing.businessName.toLowerCase().includes(q) ||
          listing.sector.toLowerCase().includes(q) ||
          listing.headquarters.city.toLowerCase().includes(q) ||
          listing.headquarters.state.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [verifiedOnly, selectedSector, selectedBudget, selectedLocation, searchQuery]);

  const closeAllDropdowns = () => {
    setShowBudgetDropdown(false);
    setShowSectorDropdown(false);
    setShowLocationDropdown(false);
  };

  return (
    <div className="min-h-screen md:ml-20 lg:ml-64" onClick={closeAllDropdowns}>
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex items-center gap-3 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search by name, sector, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 h-12 text-base rounded-xl border border-border/60 bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-border/60 bg-white hover:bg-muted/50 transition-colors flex-shrink-0">
              <SlidersHorizontal size={20} className="text-foreground" />
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
            {/* Verified Only */}
            <button
              onClick={(e) => { e.stopPropagation(); setVerifiedOnly(!verifiedOnly); }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                verifiedOnly
                  ? 'bg-secondary text-white shadow-sm shadow-secondary/20'
                  : 'bg-white text-foreground border border-border hover:border-secondary/40'
              }`}
            >
              <CheckCircle2 size={16} />
              Verified Only
            </button>

            {/* Budget Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowBudgetDropdown(!showBudgetDropdown); setShowSectorDropdown(false); setShowLocationDropdown(false); }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap border transition-all ${
                  selectedBudget ? 'bg-primary-50 text-primary border-primary/30' : 'bg-white text-foreground border-border hover:border-primary/40'
                }`}
              >
                Budget
                <ChevronDown size={14} className={`transition-transform ${showBudgetDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showBudgetDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg shadow-black/10 border border-border/50 py-1 z-40">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => { setSelectedBudget(range); setShowBudgetDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors ${
                        selectedBudget?.label === range.label ? 'text-primary font-medium bg-primary-50/50' : 'text-foreground'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sector Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowSectorDropdown(!showSectorDropdown); setShowBudgetDropdown(false); setShowLocationDropdown(false); }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap border transition-all ${
                  selectedSector ? 'bg-primary-50 text-primary border-primary/30' : 'bg-white text-foreground border-border hover:border-primary/40'
                }`}
              >
                Sector
                <ChevronDown size={14} className={`transition-transform ${showSectorDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSectorDropdown && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg shadow-black/10 border border-border/50 py-1 z-40">
                  {Object.entries(sectorLabels).map(([key, label]) => {
                    const Icon = sectorIcons[key];
                    return (
                      <button
                        key={key}
                        onClick={() => { setSelectedSector(key as FranchiseSector); setShowSectorDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2.5 ${
                          selectedSector === key ? 'text-primary font-medium bg-primary-50/50' : 'text-foreground'
                        }`}
                      >
                        <Icon size={16} className="text-muted-foreground" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setShowLocationDropdown(!showLocationDropdown); setShowBudgetDropdown(false); setShowSectorDropdown(false); }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap border transition-all ${
                  selectedLocation ? 'bg-primary-50 text-primary border-primary/30' : 'bg-white text-foreground border-border hover:border-primary/40'
                }`}
              >
                <MapPin size={14} />
                Location
                <ChevronDown size={14} className={`transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showLocationDropdown && (
                <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-48 bg-white rounded-xl shadow-lg shadow-black/10 border border-border/50 py-1 z-40">
                  {locationOptions.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setSelectedLocation(loc); setShowLocationDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors ${
                        selectedLocation === loc ? 'text-primary font-medium bg-primary-50/50' : 'text-foreground'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilters.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
              {activeFilters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={(e) => { e.stopPropagation(); filter.onRemove(); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-foreground text-white whitespace-nowrap hover:bg-foreground/80 transition-colors"
                >
                  {filter.label}
                  <X size={14} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredListings.length} {filteredListings.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {/* Listing Cards */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {filteredListings.map((listing) => (
            <FranchiseCard key={listing.id} listing={listing} variant="browse" />
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No results found
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Try adjusting your filters or search query to find franchise opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
