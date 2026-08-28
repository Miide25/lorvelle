-- Insert initial categories
INSERT INTO categories (name, slug, description, active) VALUES
('Makeup', 'makeup', 'Enhance your natural beauty with our premium makeup collection', true),
('Skincare', 'skincare', 'Nourish and protect your skin with our skincare essentials', true),
('Hair Care', 'hair-care', 'Transform your hair with our professional hair care products', true),
('Body Care', 'body-care', 'Pamper your body with luxurious body care products', true),
('Fragrance', 'fragrance', 'Discover captivating scents for every occasion', true),
('Beauty Accessories', 'beauty-accessories', 'Professional tools and accessories for your beauty routine', true),
('Beauty Bundles', 'beauty-bundles', 'Curated sets for the complete beauty experience', true);

-- Insert initial products
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category_id, stock_quantity, sku, featured, best_seller, new_arrival, status) VALUES
('Luxury Lip Gloss', 'luxury-lip-gloss', 'A high-shine lip gloss that provides intense color and long-lasting hydration. Enriched with vitamin E and natural oils for smooth, comfortable wear.', 'High-shine lip gloss with intense color', 6999, 8500, (SELECT id FROM categories WHERE slug = 'makeup'), 50, 'LIP-001', true, true, true, 'active'),
('Velvet Matte Lipstick', 'velvet-matte-lipstick', 'A luxurious matte lipstick that delivers rich, full-coverage color with a soft, velvety finish. Long-wearing formula that keeps lips comfortable all day.', 'Luxurious matte lipstick with rich color', 8500, 10000, (SELECT id FROM categories WHERE slug = 'makeup'), 45, 'LIP-002', true, true, false, 'active'),
('Hydrating Face Serum', 'hydrating-face-serum', 'A lightweight, fast-absorbing serum that deeply hydrates and plumps the skin. Contains hyaluronic acid and vitamin C for a radiant, youthful complexion.', 'Deeply hydrating face serum', 12500, 15000, (SELECT id FROM categories WHERE slug = 'skincare'), 30, 'SER-001', true, true, true, 'active'),
('Vitamin C Brightening Serum', 'vitamin-c-brightening-serum', 'A powerful brightening serum that reduces dark spots and evens skin tone. Formulated with stabilized vitamin C and niacinamide for maximum effectiveness.', 'Brightening serum for even skin tone', 14999, 18000, (SELECT id FROM categories WHERE slug = 'skincare'), 25, 'SER-002', true, false, true, 'active'),
('Daily Glow Moisturizer', 'daily-glow-moisturizer', 'A lightweight daily moisturizer that provides lasting hydration and a natural glow. Perfect for all skin types, including sensitive skin.', 'Daily moisturizer for natural glow', 9999, 12000, (SELECT id FROM categories WHERE slug = 'skincare'), 40, 'MOI-001', true, true, false, 'active'),
('Rose Body Mist', 'rose-body-mist', 'A refreshing body mist with the delicate scent of fresh roses. Lightweight formula that provides long-lasting fragrance without feeling heavy.', 'Refreshing rose-scented body mist', 4500, 5500, (SELECT id FROM categories WHERE slug = 'body-care'), 60, 'MIS-001', false, false, true, 'active'),
('Vanilla Body Butter', 'vanilla-body-butter', 'A rich, creamy body butter that deeply moisturizes and nourishes dry skin. Infused with natural vanilla extract and shea butter for ultimate softness.', 'Rich vanilla body butter for dry skin', 7500, 9000, (SELECT id FROM categories WHERE slug = 'body-care'), 35, 'BOD-001', true, true, false, 'active'),
('Curl Defining Hair Cream', 'curl-defining-hair-cream', 'A lightweight hair cream that defines and enhances natural curls while reducing frizz. Contains argan oil and aloe vera for healthy, bouncy curls.', 'Defining cream for natural curls', 8999, 11000, (SELECT id FROM categories WHERE slug = 'hair-care'), 30, 'HAIR-001', true, false, true, 'active'),
('Silk Hair Oil', 'silk-hair-oil', 'A luxurious hair oil that adds shine and smoothness to all hair types. Lightweight formula that absorbs quickly without leaving residue.', 'Luxurious hair oil for shine', 6500, 8000, (SELECT id FROM categories WHERE slug = 'hair-care'), 45, 'HAIR-002', true, true, false, 'active'),
('Beauty Blender Set', 'beauty-blender-set', 'Professional-grade beauty blenders for flawless makeup application. Set includes 3 different sizes for all your contouring and blending needs.', 'Professional beauty blender set', 5500, 7000, (SELECT id FROM categories WHERE slug = 'beauty-accessories'), 50, 'ACC-001', false, true, false, 'active'),
('Makeup Brush Collection', 'makeup-brush-collection', 'A complete set of professional makeup brushes for flawless application. Includes brushes for face, eyes, and lips in a stylish carrying case.', 'Complete professional brush set', 12000, 15000, (SELECT id FROM categories WHERE slug = 'beauty-accessories'), 25, 'ACC-002', true, true, true, 'active'),
('Hydrating Sheet Mask', 'hydrating-sheet-mask', 'An intense hydration sheet mask that revitalizes tired skin in just 15 minutes. Infused with hyaluronic acid and botanical extracts for instant radiance.', 'Intense hydration sheet mask', 2500, 3500, (SELECT id FROM categories WHERE slug = 'skincare'), 100, 'MAS-001', false, false, true, 'active'),
('Lip Care Duo', 'lip-care-duo', 'A lip care set featuring a hydrating lip balm and exfoliating lip scrub. Keeps lips soft, smooth, and perfectly prepped for any lip color.', 'Lip balm and scrub duo', 3999, 5000, (SELECT id FROM categories WHERE slug = 'makeup'), 55, 'LIP-003', false, false, false, 'active'),
('Beauty Essentials Bundle', 'beauty-essentials-bundle', 'A curated bundle of everyday beauty essentials. Includes makeup remover, face cleanser, moisturizer, and lip balm - everything you need for a complete routine.', 'Complete everyday beauty bundle', 19999, 25000, (SELECT id FROM categories WHERE slug = 'beauty-bundles'), 20, 'BUN-001', true, true, true, 'active'),
('Radiance Skincare Set', 'radiance-skincare-set', 'A premium skincare set for glowing, radiant skin. Includes vitamin C serum, hydrating moisturizer, and sheet masks for a complete skincare routine.', 'Premium skincare set for radiance', 29999, 35000, (SELECT id FROM categories WHERE slug = 'beauty-bundles'), 15, 'BUN-002', true, false, true, 'active');

-- Insert default settings
INSERT INTO settings (store_name, store_description, whatsapp_number, currency, delivery_fee, contact_email, phone_number, address) VALUES
('Lorvelle', 'Beauty. Elegance. You. Your destination for premium beauty products. Discover curated cosmetics, skincare, and beauty essentials that make every day feel a little more beautiful.', '2349163047095', 'NGN', 2000, 'estherglory149@gmail.com', '2349163047095', 'Number 3 Mercy Street, Banku Warewa');

-- Insert sample discount
INSERT INTO discounts (name, percentage, start_date, end_date, active) VALUES
('Summer Glow Sale', 15, NOW(), NOW() + INTERVAL '30 days', true);
