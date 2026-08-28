-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Categories policies
-- Public can read active categories
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (active = true);

-- Authenticated admins can manage categories
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Products policies
-- Public can read active products
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (status = 'active');

-- Authenticated admins can manage products
CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Product images policies
-- Public can view product images for active products
CREATE POLICY "Public can view product images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.status = 'active'
    )
  );

-- Authenticated admins can manage product images
CREATE POLICY "Admins can manage product images"
  ON product_images FOR ALL
  USING (auth.role() = 'authenticated');

-- Product variants policies
-- Public can view product variants for active products
CREATE POLICY "Public can view product variants"
  ON product_variants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_variants.product_id
      AND products.status = 'active'
    )
  );

-- Authenticated admins can manage product variants
CREATE POLICY "Admins can manage product variants"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated');

-- Orders policies
-- Only authenticated admins can view orders
CREATE POLICY "Admins can view orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated admins can manage orders
CREATE POLICY "Admins can manage orders"
  ON orders FOR ALL
  USING (auth.role() = 'authenticated');

-- Order items policies
-- Only authenticated admins can view order items
CREATE POLICY "Admins can view order items"
  ON order_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated admins can manage order items
CREATE POLICY "Admins can manage order items"
  ON order_items FOR ALL
  USING (auth.role() = 'authenticated');

-- Discounts policies
-- Public can view active discounts
CREATE POLICY "Public can view active discounts"
  ON discounts FOR SELECT
  USING (
    active = true
    AND start_date <= NOW()
    AND end_date >= NOW()
  );

-- Authenticated admins can manage discounts
CREATE POLICY "Admins can manage discounts"
  ON discounts FOR ALL
  USING (auth.role() = 'authenticated');

-- Settings policies
-- Public can view settings
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

-- Authenticated admins can manage settings
CREATE POLICY "Admins can manage settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Storage policies for product-images bucket
-- Note: These need to be created in Supabase dashboard for the storage bucket
-- The bucket should be named "product-images"

-- Public can view product images
-- CREATE POLICY "Public can view product images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');

-- Authenticated admins can upload product images
-- CREATE POLICY "Admins can upload product images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'product-images'
--     AND auth.role() = 'authenticated'
--   );

-- Authenticated admins can delete product images
-- CREATE POLICY "Admins can delete product images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'product-images'
--     AND auth.role() = 'authenticated'
--   );
