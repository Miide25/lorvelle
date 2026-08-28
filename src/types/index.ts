// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: CategoryInsert
        Update: CategoryUpdate
      }
      products: {
        Row: Product
        Insert: ProductInsert
        Update: ProductUpdate
      }
      product_images: {
        Row: ProductImage
        Insert: ProductImageInsert
        Update: ProductImageUpdate
      }
      product_variants: {
        Row: ProductVariant
        Insert: ProductVariantInsert
        Update: ProductVariantUpdate
      }
      orders: {
        Row: Order
        Insert: OrderInsert
        Update: OrderUpdate
      }
      order_items: {
        Row: OrderItem
        Insert: OrderItemInsert
        Update: OrderItemUpdate
      }
      discounts: {
        Row: Discount
        Insert: DiscountInsert
        Update: DiscountUpdate
      }
      settings: {
        Row: Settings
        Insert: SettingsInsert
        Update: SettingsUpdate
      }
    }
  }
}

// Category types
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryInsert {
  name: string
  slug: string
  description?: string | null
  image_url?: string | null
  active?: boolean
}

export interface CategoryUpdate {
  name?: string
  slug?: string
  description?: string | null
  image_url?: string | null
  active?: boolean
}

// Product types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string | null
  price: number
  compare_at_price: number | null
  category_id: string | null
  stock_quantity: number
  sku: string | null
  featured: boolean
  best_seller: boolean
  new_arrival: boolean
  status: 'active' | 'draft' | 'archived'
  created_at: string
  updated_at: string
}

export interface ProductInsert {
  name: string
  slug: string
  description: string
  short_description?: string | null
  price: number
  compare_at_price?: number | null
  category_id?: string | null
  stock_quantity: number
  sku?: string | null
  featured?: boolean
  best_seller?: boolean
  new_arrival?: boolean
  status?: 'active' | 'draft' | 'archived'
}

export interface ProductUpdate {
  name?: string
  slug?: string
  description?: string
  short_description?: string | null
  price?: number
  compare_at_price?: number | null
  category_id?: string | null
  stock_quantity?: number
  sku?: string | null
  featured?: boolean
  best_seller?: boolean
  new_arrival?: boolean
  status?: 'active' | 'draft' | 'archived'
}

// Product Image types
export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  storage_path: string
  display_order: number
  created_at: string
}

export interface ProductImageInsert {
  product_id: string
  image_url: string
  storage_path: string
  display_order?: number
}

export interface ProductImageUpdate {
  image_url?: string
  storage_path?: string
  display_order?: number
}

// Product Variant types
export interface ProductVariant {
  id: string
  product_id: string
  name: string
  value: string
  price_adjustment: number
  stock_quantity: number
  created_at: string
}

export interface ProductVariantInsert {
  product_id: string
  name: string
  value: string
  price_adjustment: number
  stock_quantity: number
}

export interface ProductVariantUpdate {
  name?: string
  value?: string
  price_adjustment?: number
  stock_quantity?: number
}

// Order types
export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_phone: string
  delivery_address: string
  city: string
  state: string
  delivery_instructions: string | null
  subtotal: number
  discount: number
  delivery_fee: number
  total: number
  status: 'pending' | 'contacted' | 'payment_pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  whatsapp_message: string
  created_at: string
  updated_at: string
}

export interface OrderInsert {
  order_number: string
  customer_name: string
  customer_phone: string
  delivery_address: string
  city: string
  state: string
  delivery_instructions?: string | null
  subtotal: number
  discount: number
  delivery_fee: number
  total: number
  status?: 'pending' | 'contacted' | 'payment_pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  whatsapp_message: string
}

export interface OrderUpdate {
  customer_name?: string
  customer_phone?: string
  delivery_address?: string
  city?: string
  state?: string
  delivery_instructions?: string | null
  subtotal?: number
  discount?: number
  delivery_fee?: number
  total?: number
  status?: 'pending' | 'contacted' | 'payment_pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  whatsapp_message?: string
}

// Order Item types
export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  selected_variant: string | null
  total: number
}

export interface OrderItemInsert {
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  selected_variant?: string | null
  total: number
}

export interface OrderItemUpdate {
  product_name?: string
  quantity?: number
  unit_price?: number
  selected_variant?: string | null
  total?: number
}

// Discount types
export interface Discount {
  id: string
  name: string
  percentage: number
  start_date: string
  end_date: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface DiscountInsert {
  name: string
  percentage: number
  start_date: string
  end_date: string
  active?: boolean
}

export interface DiscountUpdate {
  name?: string
  percentage?: number
  start_date?: string
  end_date?: string
  active?: boolean
}

// Settings types
export interface Settings {
  id: string
  store_name: string
  store_logo: string | null
  store_description: string
  whatsapp_number: string
  currency: string
  delivery_fee: number
  contact_email: string
  phone_number: string
  address: string
  instagram_url: string | null
  facebook_url: string | null
  tiktok_url: string | null
  created_at: string
  updated_at: string
}

export interface SettingsInsert {
  store_name: string
  store_logo?: string | null
  store_description: string
  whatsapp_number: string
  currency: string
  delivery_fee: number
  contact_email: string
  phone_number: string
  address: string
  instagram_url?: string | null
  facebook_url?: string | null
  tiktok_url?: string | null
}

export interface SettingsUpdate {
  store_name?: string
  store_logo?: string | null
  store_description?: string
  whatsapp_number?: string
  currency?: string
  delivery_fee?: number
  contact_email?: string
  phone_number?: string
  address?: string
  instagram_url?: string | null
  facebook_url?: string | null
  tiktok_url?: string | null
}

// Cart types
export interface CartItem {
  productId: string
  productName: string
  price: number
  image: string
  quantity: number
  variant: string | null
  sku: string | null
}

// UI component types
export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}
