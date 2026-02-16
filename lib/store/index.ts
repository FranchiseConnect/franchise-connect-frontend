import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, SearchFilters } from '@/lib/types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

interface SearchStore {
  filters: SearchFilters;
  searchQuery: string;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  filters: {},
  searchQuery: '',
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearFilters: () => set({ filters: {}, searchQuery: '' }),
}));

interface SavedListingsStore {
  savedListings: string[];
  addListing: (id: string) => void;
  removeListing: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedListingsStore = create<SavedListingsStore>()(
  persist(
    (set, get) => ({
      savedListings: [],
      addListing: (id) =>
        set((state) => ({
          savedListings: [...state.savedListings, id],
        })),
      removeListing: (id) =>
        set((state) => ({
          savedListings: state.savedListings.filter((listingId) => listingId !== id),
        })),
      isSaved: (id) => get().savedListings.includes(id),
    }),
    {
      name: 'saved-listings',
    }
  )
);

interface UIStore {
  isInstallPromptVisible: boolean;
  setInstallPromptVisible: (visible: boolean) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isInstallPromptVisible: false,
  setInstallPromptVisible: (visible) => set({ isInstallPromptVisible: visible }),
  isOnline: true,
  setIsOnline: (online) => set({ isOnline: online }),
}));
