# Logo Setup Instructions

To use your Lorvelle logo as the favicon and PWA icons, follow these steps:

## 1. Prepare Your Logo Image

You have provided the Lorvelle logo image. You need to create multiple sizes of this logo:

- `lorvelle-logo.png` - Main logo (any size, recommended 512x512)
- `lorvelle-logo-72.png` - 72x72 pixels
- `lorvelle-logo-96.png` - 96x96 pixels  
- `lorvelle-logo-128.png` - 128x128 pixels
- `lorvelle-logo-144.png` - 144x144 pixels
- `lorvelle-logo-152.png` - 152x152 pixels
- `lorvelle-logo-192.png` - 192x192 pixels
- `lorvelle-logo-384.png` - 384x384 pixels
- `lorvelle-logo-512.png` - 512x512 pixels

## 2. Add Logo Files to Public Directory

Place all the resized logo files in the `public/` directory of your project:

```
public/
├── lorvelle-logo.png
├── lorvelle-logo-72.png
├── lorvelle-logo-96.png
├── lorvelle-logo-128.png
├── lorvelle-logo-144.png
├── lorvelle-logo-152.png
├── lorvelle-logo-192.png
├── lorvelle-logo-384.png
└── lorvelle-logo-512.png
```

## 3. Alternative: Use Online Tools

You can use online tools to resize your logo:
- https://squoosh.app/ (by Google)
- https://www.icoconverter.com/
- https://tinypng.com/ (for compression)

## 4. Test the PWA

After adding the logo files:

1. Start the development server: `npm run dev`
2. Open Chrome DevTools (F12)
3. Go to the "Application" tab
4. Check "Manifest" to see if it loads correctly
5. Check "Service Workers" to see if it's registered
6. On mobile, you should see "Add to Home Screen" option

## 5. Build and Deploy

```bash
npm run build
```

The built files will include your logos and PWA configuration.

## Current Changes Made

✅ Updated store name to "Lorvelle" throughout the app
✅ Updated contact information:
   - WhatsApp: +234 916 304 7095
   - Email: estherglory149@gmail.com
   - Address: Number 3 Mercy Street, Banku Warewa
✅ Updated tagline to "Beauty. Elegance. You."
✅ Enhanced PWA manifest with proper icons configuration
✅ Improved service worker for better caching
✅ Updated HTML meta tags for PWA

## PWA Install Button

The PWA install button appears automatically when:
- The site is served over HTTPS (or localhost)
- The site has been visited at least twice
- The site has been open for at least 30 seconds
- The manifest is valid
- Service worker is registered

To test the install button:
1. Serve the site over HTTPS (or use localhost)
2. Visit the site and wait 30+ seconds
3. Visit again later
4. You should see a browser install prompt

## Mobile Testing

On mobile devices:
1. Open the site in Chrome or Safari
2. Tap the share button
3. Look for "Add to Home Screen" option
4. Tap it to install the app
