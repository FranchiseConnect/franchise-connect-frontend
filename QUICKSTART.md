# 🚀 QUICKSTART GUIDE

Get FranchiseConnect running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages (~2-3 minutes).

## Step 2: Create PWA Icons (REQUIRED)

**Option A: Use an online generator (Recommended)**
1. Go to https://realfavicongenerator.net/
2. Upload your logo (minimum 512x512px PNG)
3. Download the generated icon pack
4. Extract and copy all icons to `public/icons/`

**Option B: Manual creation**
Create these icon sizes and place in `public/icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png
- apple-touch-icon.png (180x180px)

**Temporary placeholder** (just to start development):
```bash
# Create a simple placeholder icon (requires ImageMagick)
mkdir -p public/icons
convert -size 512x512 xc:#2563EB -gravity center -pointsize 72 \
  -fill white -annotate +0+0 'FC' public/icons/icon-512x512.png

# Resize to other sizes
for size in 72 96 128 144 152 192 384; do
  convert public/icons/icon-512x512.png -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done

cp public/icons/icon-192x192.png public/icons/apple-touch-icon.png
```

## Step 3: Add Placeholder Images

Create these files in `public/images/`:

**placeholder.jpg** - Default franchise image (any image will do for now)
```bash
mkdir -p public/images
# Download a placeholder or use your own image
curl -o public/images/placeholder.jpg https://via.placeholder.com/800x600/2563EB/ffffff?text=Franchise
```

**og-image.png** - Social media preview (1200x630px)
```bash
curl -o public/images/og-image.png https://via.placeholder.com/1200x630/2563EB/ffffff?text=FranchiseConnect
cp public/images/og-image.png public/og-image.png
```

## Step 4: Create Environment File

```bash
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api" > .env.local
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 🎉 You're Ready!

The app should now be running with:
- ✅ Home page with gradient hero
- ✅ Bottom navigation
- ✅ PWA install prompt (after 30 seconds)
- ✅ Offline banner (try disabling network)
- ✅ Franchise cards
- ✅ Mobile-responsive design

## 📱 Test PWA Features

1. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

2. **Open in Chrome:** http://localhost:3000

3. **Test offline mode:**
   - Open DevTools → Application → Service Workers
   - Check "Offline" checkbox
   - Reload page - it should still work!

4. **Test install prompt:**
   - Wait 30 seconds or trigger manually
   - Click "Install App"
   - Check your desktop/home screen

## 🔧 What to Build Next?

Based on your designs, here's the priority order:

1. **Auth Pages** (`app/(auth)/login/page.tsx`)
   - Login with OTP
   - Signup flow
   - User type selection

2. **Browse Page** (`app/browse/page.tsx`)
   - Filter sidebar/bottom sheet
   - Search functionality
   - Sorting options

3. **List Franchise Flow** (`app/list/page.tsx`)
   - 4-step form (already have types)
   - Document upload
   - Preview before submit

4. **Franchise Detail** (`app/franchise/[id]/page.tsx`)
   - Full listing details
   - Image carousel
   - Unlock contact button

5. **Profile Pages** (`app/profile/page.tsx`)
   - Investor profile
   - Business owner profile
   - Settings

6. **Saved Page** (`app/saved/page.tsx`)
   - Saved franchises list
   - Recently viewed

## 💡 Tips

- All TypeScript types are in `lib/types/index.ts`
- Global state uses Zustand (see `lib/store/index.ts`)
- Design system tokens in `tailwind.config.ts`
- Utility functions in `lib/utils.ts`
- Add more shadcn/ui components: `npx shadcn-ui@latest add [component]`

## 🆘 Problems?

**Icons not showing?**
- Make sure all icon files exist in `public/icons/`
- Check browser console for 404 errors

**PWA not installing?**
- Run production build (`npm run build && npm run start`)
- Use HTTPS (or localhost)
- Check manifest.json is accessible

**Styles broken?**
- Restart dev server
- Clear `.next` folder: `rm -rf .next`
- Check `globals.css` is imported in `app/layout.tsx`

## 🚢 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow prompts, and you're live!

---

**Need help?** Check the full README.md for detailed documentation.
