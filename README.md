# Beauty Queen E-Commerce Website

A premium beauty and cosmetics e-commerce website with WhatsApp-based checkout system.

## Features

### Storefront
- **Product Catalog**: Browse and search products with category filtering
- **Product Details**: Detailed product pages with images, variants, and reviews
- **Shopping Cart**: Persistent cart with localStorage
- **WhatsApp Checkout**: Complete orders via WhatsApp with formatted messages
- **Wishlist**: Save favorite products
- **Responsive Design**: Mobile-first, works on all devices

### Admin Dashboard
- **Dashboard**: Overview of store performance and statistics
- **Product Management**: Add, edit, delete products with image uploads
- **Category Management**: Manage product categories
- **Order Management**: View and manage customer orders
- **Customer Management**: View customer information from orders
- **Discount Management**: Create and manage discount campaigns
- **Settings**: Configure store settings including WhatsApp number

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Routing**: React Router
- **Icons**: Lucide React
- **State Management**: React Context (Cart, Auth, Toast)

## Setup Instructions

### 1. Environment Setup

1. Copy the environment file:
```bash
cp .env.example .env
```

2. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

1. Create a Supabase project
2. Run the SQL migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_policies.sql`

3. Create a storage bucket named `product-images` in Supabase

4. Run the seed data:
   - `supabase/seed.sql`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin-specific components
│   ├── store/          # Storefront components
│   └── ui/             # Reusable UI components
├── contexts/           # React Context providers
├── lib/                # Utility libraries
├── pages/
│   ├── admin/          # Admin pages
│   └── store/          # Storefront pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main app component
```

## Key Features

### WhatsApp Checkout
- Orders are formatted and sent via WhatsApp
- Dynamic WhatsApp number from admin settings
- Automatic order number generation
- Order persistence in database

### Admin Protection
- Protected routes for admin pages
- Supabase Authentication integration
- Automatic redirect to login for unauthorized access

### Cart Persistence
- localStorage-based cart persistence
- Survives page refreshes
- Quantity management
- Real-time updates

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Touch-friendly interfaces
- Optimized for all screen sizes

## Security

- Row Level Security (RLS) policies on all tables
- Public users can only read active products/categories
- Only authenticated admins can modify data
- Environment variables for sensitive data
- No service-role keys exposed in frontend

## Admin Access

1. Create a Supabase user with admin privileges
2. Access `/admin/login` to sign in
3. All admin routes are protected

## Important Notes

- The WhatsApp number must be configured in Admin Settings for checkout to work
- Product images are stored in Supabase Storage
- Orders start as "pending" status
- Stock is not automatically reduced on order creation (admin confirms payment first)
- All data is stored in Supabase PostgreSQL

## Customization

- Update `tailwind.config.js` for design customization
- Modify `src/utils/whatsapp.ts` for WhatsApp message formatting
- Add new pages in `src/pages/` and update routing in `src/App.tsx`
- Extend database schema with new migrations

## License

This project is provided as-is for educational and commercial use.
