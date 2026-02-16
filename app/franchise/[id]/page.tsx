'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle2,
  MapPin,
  Megaphone,
  GraduationCap,
  Truck,
  ShieldCheck,
  Check,
  MessageSquare,
  Clock,
  Eye,
  Bookmark,
  ChevronDown,
  ChevronUp,
  UtensilsCrossed,
  ShoppingBag,
  Dumbbell,
  Stethoscope,
  Wrench,
  Scissors,
  Car,
} from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
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

const sectorColors: Record<string, { text: string; bg: string; border: string }> = {
  food_beverage: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  retail: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  education: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  fitness: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  healthcare: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  services: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  beauty: { text: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' },
  automotive: { text: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
};

const supportDetails: Record<string, { icon: React.ElementType; description: string }> = {
  'Marketing & Brand': { icon: Megaphone, description: 'National marketing support and brand assets' },
  'Brand & Marketing': { icon: Megaphone, description: 'National marketing support and brand assets' },
  'Brand Kit': { icon: Megaphone, description: 'Complete brand kit and marketing materials' },
  'Training Program': { icon: GraduationCap, description: '15-day onsite training for staff and manager' },
  'Training & Support': { icon: GraduationCap, description: '15-day onsite training for staff and manager' },
  'Teacher Training': { icon: GraduationCap, description: 'Comprehensive teacher training program' },
  'Staff Training': { icon: GraduationCap, description: 'Complete staff training and onboarding' },
  'Technical Training': { icon: GraduationCap, description: 'Technical skills training for your team' },
  'Operations Manual': { icon: Truck, description: 'Detailed operations manual and SOPs' },
  'Product Supply': { icon: Truck, description: 'Access to verified product suppliers' },
  'Product Supply Chain': { icon: Truck, description: 'Access to verified product suppliers' },
  'Equipment Sourcing': { icon: Truck, description: 'Equipment sourcing and setup support' },
  'Equipment': { icon: Truck, description: 'Equipment sourcing and setup support' },
  'Supplier Network': { icon: Truck, description: 'Access to verified ingredient suppliers' },
  'Curriculum Design': { icon: GraduationCap, description: 'Proven curriculum and teaching materials' },
  'Curriculum Support': { icon: GraduationCap, description: 'Ongoing curriculum updates and support' },
  'Marketing Support': { icon: Megaphone, description: 'Local and digital marketing support' },
};

const verifiedDocuments = [
  { label: 'GST Registration', verified: true },
  { label: 'Bank Statements (6mo)', verified: true },
  { label: 'Franchise Agreement', verified: true },
];

// Mock data - matches the pattern from home/browse pages
function getMockListing(id: string): FranchiseListing | null {
  const listings: Record<string, FranchiseListing> = {
    '1': {
      id: '1',
      businessName: 'Bean & Brew Coffee Co.',
      sector: 'food_beverage',
      description: 'Bean & Brew is a premium artisanal coffee chain established in Hyderabad. We focus on farm-to-cup experiences with ethically sourced beans from Coorg. Our cafes offer a warm, modern ambience perfect for work and leisure. With a proven business model and strong brand recognition, we are expanding across South India through franchise partnerships. Our franchisees benefit from comprehensive training, marketing support, and a dedicated supply chain for premium coffee beans and cafe equipment.',
      headquarters: { city: 'Jubilee Hills', state: 'Hyderabad' },
      establishedYear: 2019,
      existingOutlets: 3,
      franchiseFeeMin: 800000,
      franchiseFeeMax: 1000000,
      totalInvestment: 1200000,
      expectedMonthlyRevenue: 280000,
      royaltyPercentage: 8,
      roiMonths: 18,
      support: ['Brand & Marketing', 'Training & Support', 'Supplier Network'],
      isVerified: true,
      isPremium: false,
      gstVerified: true,
      documentsVerified: true,
      lastVerified: new Date('2025-02-04'),
      images: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      ],
      ownerId: '1',
      owner: {
        name: 'Rajesh Kumar',
        avatar: undefined,
        joinedDate: new Date('2025-01-15'),
        responseTime: '4 hours',
        responseRate: 92,
      },
      views: 245,
      contactUnlocks: 18,
      savedCount: 45,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-02-10'),
    },
    '2': {
      id: '2',
      businessName: 'IronCore Fitness',
      sector: 'fitness',
      description: 'IronCore Fitness is a modern gym chain featuring smart equipment, personal training, and group fitness classes. Founded in Hyderabad, we combine technology with fitness to deliver measurable results for our members. Our franchise model includes complete gym setup, equipment sourcing, staff training, and ongoing operational support.',
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
      lastVerified: new Date('2025-02-01'),
      images: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      ],
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
    '3': {
      id: '3',
      businessName: 'Little Minds Preschool',
      sector: 'education',
      description: 'Little Minds Preschool offers play-based early childhood education for ages 2-6. Our proven curriculum focuses on holistic development through experiential learning. With 5 successful centers across Hyderabad, we provide franchisees with complete setup support, teacher training, and ongoing curriculum updates.',
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
      lastVerified: new Date('2025-01-28'),
      images: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      ],
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
    '4': {
      id: '4',
      businessName: 'StyleCraft Salon',
      sector: 'beauty',
      description: 'StyleCraft is a premium unisex salon offering cutting-edge grooming and beauty services. With 4 outlets in Bangalore, we provide franchisees with brand identity, staff training, and a reliable product supply chain to deliver consistent quality.',
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
      lastVerified: new Date('2025-02-05'),
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      ],
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
    '5': {
      id: '5',
      businessName: 'QuickFix Auto Care',
      sector: 'automotive',
      description: 'QuickFix Auto Care is a multi-brand car service and detailing center with 8 outlets across Bangalore. We offer franchisees technical training, equipment support, and a strong brand presence in the automotive service industry.',
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
      lastVerified: new Date('2025-01-20'),
      images: [
        'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
      ],
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
  };

  return listings[id] || null;
}

function formatLakhs(amount: number): string {
  const lakhs = amount / 100000;
  if (lakhs >= 100) {
    return `${(lakhs / 100).toFixed(1)} Cr`;
  }
  return `${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakhs`;
}

export default function FranchiseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const listing = getMockListing(id);

  const { isSaved, addListing, removeListing } = useSavedListingsStore();
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!listing) {
    return (
      <div className="min-h-screen md:ml-20 lg:ml-64 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Franchise not found</h2>
          <p className="text-sm text-muted-foreground mb-4">The listing you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/browse')}
            className="text-primary font-medium text-sm hover:underline"
          >
            Browse all franchises
          </button>
        </div>
      </div>
    );
  }

  const saved = isSaved(listing.id);
  const currentYear = new Date().getFullYear();
  const yearsOld = currentYear - listing.establishedYear;
  const sectorLabel = listing.sector.replace('_', ' & ');
  const sectorLabelFormatted = sectorLabel.charAt(0).toUpperCase() + sectorLabel.slice(1);
  const colors = sectorColors[listing.sector] || sectorColors.services;
  const SectorIcon = sectorIcons[listing.sector] || Wrench;
  const descriptionPreview = listing.description.slice(0, 180);
  const hasMoreDescription = listing.description.length > 180;

  const lastVerifiedDays = listing.lastVerified
    ? Math.ceil((Date.now() - new Date(listing.lastVerified).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleSave = () => {
    if (saved) {
      removeListing(listing.id);
    } else {
      addListing(listing.id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: listing.businessName,
        text: `Check out ${listing.businessName} on FranchiseConnect`,
        url: window.location.href,
      });
    }
  };

  const joinedMonth = new Date(listing.owner.joinedDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen md:ml-20 lg:ml-64 bg-muted pb-44 md:pb-36">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full">
        <Image
          src={listing.images[0] || '/images/placeholder.jpg'}
          alt={listing.businessName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={handleSave}
              className="w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
            >
              <Heart
                size={18}
                className={cn(saved && 'fill-red-500 text-red-500')}
              />
            </button>
          </div>
        </div>

        {/* Verified Badge */}
        {listing.isVerified && (
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-secondary rounded-lg shadow-md">
            <CheckCircle2 size={16} />
            Verified Listing
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10">
          <div className="px-5 sm:px-6 pt-6 pb-6">
            {/* Sector Chip */}
            <div className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border mb-3',
              colors.text, colors.bg, colors.border
            )}>
              <SectorIcon size={14} />
              {sectorLabelFormatted}
            </div>

            {/* Business Name */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {listing.businessName}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <MapPin size={16} className="flex-shrink-0" />
              <span>{listing.headquarters.city}, {listing.headquarters.state}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-1">Investment Required</p>
                <p className="text-base font-bold text-foreground">
                  ₹{formatLakhs(listing.franchiseFeeMin)} - {formatLakhs(listing.franchiseFeeMax)}
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-1">Claimed Revenue</p>
                <p className="text-base font-bold text-foreground">
                  ₹{formatLakhs(listing.expectedMonthlyRevenue)}/mo
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-1">Established</p>
                <p className="text-base font-bold text-foreground">
                  {listing.establishedYear} ({yearsOld} Years)
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-1">Existing Outlets</p>
                <p className="text-base font-bold text-foreground">
                  {listing.existingOutlets} Franchises
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 mb-6" />

            {/* What You Get */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-primary" />
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground">What You Get</h2>
              </div>

              <div className="space-y-4">
                {listing.support.map((item) => {
                  const detail = supportDetails[item] || { icon: CheckCircle2, description: item };
                  const Icon = detail.icon;
                  return (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{item}</p>
                        <p className="text-sm text-muted-foreground">{detail.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 mb-6" />

            {/* About the Business */}
            <div className="mb-8">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">About the Business</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {showFullDescription ? listing.description : descriptionPreview}
                {!showFullDescription && hasMoreDescription && '...'}
              </p>
              {hasMoreDescription && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="flex items-center gap-1 text-primary font-medium text-sm mt-2 hover:underline"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                  {showFullDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 mb-6" />

            {/* Verified Documents */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-secondary-50 rounded-lg flex items-center justify-center">
                  <ShieldCheck size={18} className="text-secondary" />
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground">Verified Documents</h2>
              </div>

              <div className="space-y-3">
                {verifiedDocuments.map((doc) => (
                  <div
                    key={doc.label}
                    className="flex items-center justify-between px-4 py-3.5 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-secondary flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{doc.label}</span>
                    </div>
                    {doc.verified && (
                      <Check size={20} className="text-secondary flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 mb-6" />

            {/* Listed By */}
            <div className="mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Listed By</h2>

              <div className="flex items-center gap-3 mb-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {getInitials(listing.owner.name)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{listing.owner.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Owner &bull; Joined {joinedMonth}
                  </p>
                </div>

                <button className="w-10 h-10 flex items-center justify-center bg-muted/50 rounded-xl border border-border/50 hover:bg-muted transition-colors">
                  <MessageSquare size={18} className="text-muted-foreground" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Verified {lastVerifiedDays} days ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{listing.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-20 lg:left-64 bg-white border-t border-border/50 z-40 pb-safe">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-3">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handleSave}
              className={cn(
                'flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all',
                saved
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-border hover:bg-muted/50 text-foreground'
              )}
            >
              <Bookmark size={18} className={cn(saved && 'fill-red-500')} />
              Save
            </button>
            <button className="flex-1 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.3)]">
              Unlock Contact (₹999)
            </button>
          </div>
          <button className="w-full py-3 text-sm font-semibold text-primary rounded-xl border-2 border-primary/20 bg-white hover:bg-primary-50 transition-all">
            Request More Information
          </button>
        </div>
      </div>
    </div>
  );
}
