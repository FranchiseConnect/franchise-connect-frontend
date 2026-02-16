<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/PWA-Enabled-brightgreen?style=for-the-badge&logo=pwa" alt="PWA" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

<h1 align="center">FranchiseConnect</h1>

<p align="center">
  <strong>India's Modern Franchise Marketplace</strong><br/>
  Connecting franchise owners with serious investors through a verified, transparent platform.
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#tech-stack">Tech Stack</a> &middot;
  <a href="#getting-started">Getting Started</a> &middot;
  <a href="#project-structure">Project Structure</a> &middot;
  <a href="#design-system">Design System</a> &middot;
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

FranchiseConnect is a mobile-first, progressive web application that serves as a marketplace for franchise opportunities across India. Franchise owners can list their business opportunities with transparent investment details, while investors can browse, filter, and connect with verified businesses across sectors like Food & Beverage, Retail, Education, Fitness, Healthcare, Beauty, Automotive, and more.

## Features

### Core
- **Franchise Discovery** - Browse and search franchise listings with advanced filters (sector, budget, location)
- **Verified Listings** - Every business goes through GST and document verification
- **Detailed Investment Data** - Transparent fee structures, ROI estimates, and monthly revenue projections
- **Save & Compare** - Bookmark franchises and compare investment opportunities

### User Experience
- **Mobile-First Design** - Bottom navigation on mobile, collapsible sidebar on desktop
- **Progressive Web App** - Installable on any device with offline support and caching
- **Responsive Layout** - Horizontal scroll cards on mobile, grid layouts on desktop
- **Smooth Animations** - Fade-ins, slide-ups, and micro-interactions throughout

### Technical
- **Server-Side Rendering** - Fast initial loads with Next.js App Router
- **Persistent State** - Saved listings and user preferences survive page reloads (Zustand + localStorage)
- **Optimized Images** - AVIF/WebP formats with Next.js Image component
- **Custom Design System** - Tailwind-based tokens for colors, typography, and spacing

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (Dialog, Tabs, Select, Toast, etc.) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **PWA** | [next-pwa](https://github.com/shadowwalker/next-pwa) |
| **Fonts** | Inter (body) + Poppins (headings) via `next/font` |

## Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm** 9+ (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/FranchiseConnect/franchise-connect-frontend.git
cd franchise-connect-frontend

# Install dependencies
npm install

# Start the development server (runs on port 5000)
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 5000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Project Structure

```
franchise-connect-frontend/
├── app/                              # Next.js App Router
│   ├── browse/
│   │   └── page.tsx                  # Browse & filter listings
│   ├── globals.css                   # Global styles & design tokens
│   ├── layout.tsx                    # Root layout (fonts, metadata, PWA)
│   └── page.tsx                      # Home page (hero, search, featured)
│
├── components/
│   ├── franchise/
│   │   └── franchise-card.tsx        # Listing card (home & browse variants)
│   ├── layout/
│   │   └── bottom-nav.tsx            # Mobile bottom nav + desktop sidebar
│   ├── pwa/
│   │   ├── install-prompt.tsx        # PWA install banner
│   │   └── offline-banner.tsx        # Offline status indicator
│   └── ui/                           # Radix-based UI primitives
│       ├── button.tsx
│       ├── input.tsx
│       ├── toast.tsx
│       └── toaster.tsx
│
├── lib/
│   ├── hooks/
│   │   └── use-toast.ts              # Toast notification hook
│   ├── store/
│   │   └── index.ts                  # Zustand stores (user, search, saved, UI)
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces & types
│   └── utils.ts                      # Utility functions (currency, dates, etc.)
│
├── public/
│   └── manifest.json                 # PWA manifest
│
├── next.config.js                    # Next.js + PWA configuration
├── tailwind.config.ts                # Design system tokens
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| **Primary** | `#2563EB` | CTAs, links, active states |
| **Secondary** | `#10B981` | Verified badges, success states |
| **Accent** | `#F59E0B` | Premium badges, highlights |
| **Destructive** | `#EF4444` | Errors, delete actions |
| **Muted** | `#F9FAFB` | Backgrounds, disabled states |
| **Foreground** | `#1F2937` | Primary text |

### Typography

| Style | Font | Size | Weight |
|---|---|---|---|
| Heading XL | Poppins | 32px | Bold |
| Heading LG | Poppins | 24px | Semibold |
| Heading MD | Poppins | 20px | Semibold |
| Body LG | Inter | 16px | Regular |
| Body MD | Inter | 14px | Regular |
| Body SM | Inter | 12px | Regular |

### Gradient

The primary gradient (`bg-gradient-primary`) is a 135-degree linear gradient from Primary Blue to Secondary Green, used in the hero section, CTA cards, and the floating action button.

## Key Concepts

### Franchise Listing Data Model

Each listing includes:
- **Business Info** - Name, sector, headquarters, established year, outlet count
- **Investment Details** - Fee range, total investment, expected revenue, royalty %, ROI months
- **Verification** - GST verified, documents verified, platform verified status
- **Owner Info** - Name, response time, response rate
- **Engagement Stats** - Views, contact unlocks, saved count

### Sector Categories

Food & Beverage | Retail | Education | Fitness | Healthcare | Services | Beauty | Automotive

### State Management

The app uses four Zustand stores:
- **UserStore** - Authentication state (persisted)
- **SearchStore** - Active filters and search query
- **SavedListingsStore** - Bookmarked franchise IDs (persisted)
- **UIStore** - Install prompt visibility, online status

## PWA Support

FranchiseConnect is a fully installable Progressive Web App:

- **Service Worker** - Caches fonts, images, static assets, and page data
- **Offline Support** - Shows offline banner when connectivity drops
- **Install Prompt** - Custom install banner for mobile and desktop
- **App Manifest** - Standalone display mode with themed splash screen
- **Caching Strategy** - CacheFirst for fonts, StaleWhileRevalidate for images and styles, NetworkFirst for dynamic content

### Testing PWA Locally

```bash
npm run build && npm run start
```

Open Chrome DevTools > Application > Service Workers to inspect caching and offline behavior.

## Roadmap

- [ ] Franchise detail page with full breakdown
- [ ] Multi-step "List Your Business" form
- [ ] User authentication (login/signup)
- [ ] Investor and business owner profile pages
- [ ] Contact unlock payment flow (Razorpay integration)
- [ ] Search alerts and notification system
- [ ] Backend API routes with database (PostgreSQL + Prisma)
- [ ] Admin dashboard for listing moderation

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with care for the Indian franchise ecosystem.
</p>
