import Link from "next/link";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  TrendingUp,
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  Dumbbell,
  CheckCircle,
  ArrowRight,
  Shield,
  Star,
  Users,
} from "lucide-react";
import FranchiseCard from "@/components/franchise/franchise-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data - replace with API calls
const mockListings = [
  {
    id: "1",
    businessName: "Brew & Bean Cafe",
    sector: "food_beverage" as const,
    description: "Premium artisanal coffee chain",
    headquarters: { city: "Indiranagar", state: "Bangalore" },
    establishedYear: 2019,
    existingOutlets: 3,
    franchiseFeeMin: 1500000,
    franchiseFeeMax: 2000000,
    totalInvestment: 1800000,
    expectedMonthlyRevenue: 350000,
    royaltyPercentage: 8,
    roiMonths: 18,
    support: ["Marketing & Brand", "Training Program", "Operations Manual"],
    isVerified: true,
    isPremium: false,
    gstVerified: true,
    documentsVerified: true,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    ],
    ownerId: "1",
    owner: {
      name: "Rajesh Kumar",
      joinedDate: new Date("2025-01-15"),
      responseTime: "4 hours",
      responseRate: 92,
    },
    views: 234,
    contactUnlocks: 18,
    savedCount: 45,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "2",
    businessName: "IronCore Fitness",
    sector: "fitness" as const,
    description: "Modern gym with smart equipment",
    headquarters: { city: "Jubilee Hills", state: "Hyderabad" },
    establishedYear: 2020,
    existingOutlets: 2,
    franchiseFeeMin: 4500000,
    franchiseFeeMax: 6000000,
    totalInvestment: 5500000,
    expectedMonthlyRevenue: 650000,
    royaltyPercentage: 10,
    roiMonths: 24,
    support: ["Marketing & Brand", "Training Program", "Equipment Sourcing"],
    isVerified: true,
    isPremium: true,
    gstVerified: true,
    documentsVerified: true,
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    ],
    ownerId: "2",
    owner: {
      name: "Amit Sharma",
      joinedDate: new Date("2025-01-20"),
      responseTime: "2 hours",
      responseRate: 95,
    },
    views: 456,
    contactUnlocks: 32,
    savedCount: 89,
    createdAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-02-12"),
  },
  {
    id: "3",
    businessName: "Glam Studio",
    sector: "beauty" as const,
    description: "Premium unisex salon and spa",
    headquarters: { city: "Koramangala", state: "Bangalore" },
    establishedYear: 2021,
    existingOutlets: 5,
    franchiseFeeMin: 2500000,
    franchiseFeeMax: 3500000,
    totalInvestment: 3000000,
    expectedMonthlyRevenue: 450000,
    royaltyPercentage: 7,
    roiMonths: 20,
    support: ["Marketing & Brand", "Training Program", "Product Supply"],
    isVerified: true,
    isPremium: false,
    gstVerified: true,
    documentsVerified: true,
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    ],
    ownerId: "3",
    owner: {
      name: "Priya Mehta",
      joinedDate: new Date("2025-01-25"),
      responseTime: "3 hours",
      responseRate: 88,
    },
    views: 189,
    contactUnlocks: 15,
    savedCount: 34,
    createdAt: new Date("2025-01-25"),
    updatedAt: new Date("2025-02-14"),
  },
  {
    id: "4",
    businessName: "TechKids Academy",
    sector: "education" as const,
    description: "Coding and robotics for children",
    headquarters: { city: "Whitefield", state: "Bangalore" },
    establishedYear: 2018,
    existingOutlets: 8,
    franchiseFeeMin: 3000000,
    franchiseFeeMax: 4000000,
    totalInvestment: 3500000,
    expectedMonthlyRevenue: 500000,
    royaltyPercentage: 9,
    roiMonths: 22,
    support: ["Marketing & Brand", "Training Program", "Curriculum Support"],
    isVerified: true,
    isPremium: true,
    gstVerified: true,
    documentsVerified: true,
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    ],
    ownerId: "4",
    owner: {
      name: "Vikram Singh",
      joinedDate: new Date("2025-02-01"),
      responseTime: "1 hour",
      responseRate: 97,
    },
    views: 567,
    contactUnlocks: 45,
    savedCount: 102,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-15"),
  },
];

const sectors = [
  {
    id: "food",
    label: "Food",
    icon: UtensilsCrossed,
    color: "text-orange-600",
    bg: "bg-orange-50",
    ring: "ring-orange-100",
  },
  {
    id: "retail",
    label: "Retail",
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    ring: "ring-indigo-100",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Dumbbell,
    color: "text-red-600",
    bg: "bg-red-50",
    ring: "ring-red-100",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen md:ml-20 lg:ml-64">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-32 sm:pb-36 lg:pb-40">
          <div className="md:hidden mb-6">
            <h1 className="text-lg font-display font-bold tracking-tight">
              FranchiseConnect
            </h1>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight tracking-tight">
              Find Your Perfect
              <br />
              Franchise Opportunity
            </h2>
            <p className="text-white/85 text-base sm:text-lg mb-0 max-w-lg leading-relaxed">
              Verified businesses. Real opportunities.
              <br className="hidden sm:block" />
              Transparent investments.
            </p>
          </div>
        </div>
      </section>

      {/* Search Card */}
      <div className="relative -mt-20 sm:-mt-24 px-4 sm:px-6 lg:px-8 pb-6 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 p-4 sm:p-6">
            <div className="relative mb-4">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search by location, budget, sector..."
                className="pl-11 h-12 sm:h-14 text-base rounded-xl border-border/60 bg-muted/30 focus:bg-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button className="chip chip-inactive whitespace-nowrap rounded-xl">
                <MapPin size={15} />
                Location
              </button>
              <button className="chip chip-inactive whitespace-nowrap rounded-xl">
                <DollarSign size={15} />
                Budget
              </button>
              <button className="chip chip-inactive whitespace-nowrap rounded-xl">
                <Briefcase size={15} />
                Sector
              </button>
            </div>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-white rounded-xl p-3 sm:p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="flex items-center justify-center mb-2">
                <Shield size={18} className="text-primary mr-1.5" />
                <span className="text-xl sm:text-2xl font-bold font-display text-primary">
                  500+
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Verified Listings
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp size={18} className="text-secondary mr-1.5" />
                <span className="text-xl sm:text-2xl font-bold font-display text-secondary">
                  ₹2Cr+
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Invested Total
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 sm:p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="flex items-center justify-center mb-2">
                <Star size={18} className="text-accent mr-1.5" />
                <span className="text-xl sm:text-2xl font-bold font-display text-accent">
                  98%
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Sectors - Circular Icons matching design */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">
            Browse Sectors
          </h3>

          <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-md sm:max-w-lg mx-auto lg:max-w-none lg:grid-cols-4">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Link
                  key={sector.id}
                  href={`/browse?sector=${sector.id}`}
                  className="group flex flex-col items-center"
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${sector.bg} ring-2 ${sector.ring} rounded-full flex items-center justify-center mb-2.5 group-hover:shadow-lg group-hover:scale-105 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.5)]`}
                  >
                    <Icon
                      size={28}
                      className={`${sector.color} sm:w-8 sm:h-8`}
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                    {sector.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Opportunities - Horizontal scroll on mobile, grid on desktop */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Featured Opportunities
            </h3>
            <Link
              href="/browse"
              className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:hidden pb-2">
            {mockListings.map((listing) => (
              <FranchiseCard
                key={listing.id}
                listing={listing}
                variant="home"
              />
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-8">
            {mockListings.map((listing) => (
              <FranchiseCard
                key={listing.id}
                listing={listing}
                variant="home"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground text-center mb-8">
            Why FranchiseConnect?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.04)]">
                <CheckCircle size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Verified Listings
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every business is verified with GST and document checks
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.04)]">
                <Shield size={24} className="text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Secure Investments
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transparent fee structures with no hidden costs
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.04)]">
                <Users size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Expert Support
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect directly with business owners and get guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-primary rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white text-center relative overflow-hidden shadow-[0_8px_32px_rgba(37,99,235,0.3)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">
                Ready to Grow Your Business?
              </h3>
              <p className="text-white/85 mb-6 max-w-md mx-auto text-sm sm:text-base">
                List your franchise opportunity and connect with serious
                investors across India.
              </p>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="rounded-xl shadow-[0_4px_14px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
              >
                <Link href="/list">List Your Business</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
