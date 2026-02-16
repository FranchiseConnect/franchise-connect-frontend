export type UserType = 'investor' | 'business_owner';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  avatar?: string;
  isPremium: boolean;
  createdAt: Date;
}

export type FranchiseSector = 
  | 'food_beverage'
  | 'retail'
  | 'education'
  | 'fitness'
  | 'healthcare'
  | 'services'
  | 'beauty'
  | 'automotive';

export interface FranchiseListing {
  id: string;
  businessName: string;
  sector: FranchiseSector;
  description: string;
  headquarters: Location;
  establishedYear: number;
  existingOutlets: number;
  
  // Investment Details
  franchiseFeeMin: number;
  franchiseFeeMax: number;
  totalInvestment: number;
  expectedMonthlyRevenue: number;
  royaltyPercentage: number;
  roiMonths: number;
  
  // What franchisees get
  support: string[];
  additionalDetails?: string;
  
  // Verification
  isVerified: boolean;
  isPremium: boolean;
  gstVerified: boolean;
  documentsVerified: boolean;
  lastVerified?: Date;
  
  // Media
  images: string[];
  
  // Owner
  ownerId: string;
  owner: {
    name: string;
    avatar?: string;
    joinedDate: Date;
    responseTime: string;
    responseRate: number;
  };
  
  // Stats
  views: number;
  contactUnlocks: number;
  savedCount: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  city: string;
  state: string;
  pincode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface InvestorProfile extends User {
  preferences: {
    budgetMin: number;
    budgetMax: number;
    sectors: FranchiseSector[];
    locations: string[];
  };
  savedListings: string[];
  contactedBusinesses: string[];
  searchAlerts: SearchAlert[];
}

export interface BusinessOwnerProfile extends User {
  listings: string[];
  totalViews: number;
  totalContactUnlocks: number;
  responseRate: number;
  avgResponseTime: string;
  subscriptionTier: 'free' | 'basic' | 'premium';
  subscriptionValidUntil?: Date;
}

export interface SearchAlert {
  id: string;
  query: string;
  filters: SearchFilters;
  isActive: boolean;
  createdAt: Date;
}

export interface SearchFilters {
  sectors?: FranchiseSector[];
  budgetMin?: number;
  budgetMax?: number;
  locations?: string[];
  verifiedOnly?: boolean;
  sortBy?: 'newest' | 'lowest_investment' | 'highest_roi' | 'most_viewed';
}

export interface Lead {
  id: string;
  franchiseId: string;
  investorId: string;
  investor: {
    name: string;
    budgetRange: string;
  };
  status: 'new' | 'in_discussion' | 'closed';
  message?: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  type: 'gst' | 'business_registration' | 'bank_statement' | 'franchise_agreement' | 'photo';
  filename: string;
  url: string;
  uploadedAt: Date;
  verified: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_lead' | 'document_verified' | 'listing_approved' | 'new_match' | 'subscription_expiry';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

// Form types
export interface ListingFormData {
  // Step 1: Basic Info
  businessName: string;
  sector: FranchiseSector;
  headquarters: Location;
  establishedYear: number;
  existingOutlets: number;
  
  // Step 2: Investment Details
  franchiseFeeMin: number;
  franchiseFeeMax: number;
  totalInvestment: number;
  expectedMonthlyRevenue: number;
  royaltyPercentage: number;
  roiMonths: number;
  
  // Step 3: Verification
  gstNumber: string;
  documents: File[];
  photos: File[];
  
  // Step 4: Offerings
  support: string[];
  additionalDetails: string;
}

export interface ContactUnlock {
  franchiseId: string;
  amount: number;
  paymentId: string;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
  };
  unlockedAt: Date;
}
