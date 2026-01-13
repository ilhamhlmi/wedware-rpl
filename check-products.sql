-- SQL Query untuk cek data products
-- Copy-paste query ini ke database client atau phpMyAdmin

-- 1. Lihat struktur tabel products
DESCRIBE products;

-- 2. Lihat semua produk dengan image_url
SELECT 
    id,
    name,
    category,
    size,
    stock,
    price,
    image_url,
    CHAR_LENGTH(image_url) as url_length,
    created_at
FROM products
ORDER BY created_at DESC;

-- 3. Cek produk yang BELUM ada gambar
SELECT 
    id,
    name,
    category,
    image_url
FROM products
WHERE image_url IS NULL OR image_url = '';

-- 4. Cek produk yang SUDAH ada gambar
SELECT 
    id,
    name,
    category,
    image_url,
    CHAR_LENGTH(image_url) as url_length
FROM products
WHERE image_url IS NOT NULL AND image_url != ''
ORDER BY created_at DESC;

-- 5. Cek produk dengan gambar dari Supabase Storage
SELECT 
    id,
    name,
    category,
    image_url
FROM products
WHERE image_url LIKE '%supabase.co/storage%'
ORDER BY created_at DESC;
