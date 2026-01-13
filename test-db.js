// Script untuk cek database schema
// Jalankan dengan: node test-db.js

const mysql = require('mysql2/promise');

async function testDatabase() {
  console.log('🔍 Testing Database Connection...\n');

  const pool = mysql.createPool({
    host: "centerbeam.proxy.rlwy.net",
    user: "root",
    password: "iJsBtnAnroQzPlkeRUmUvdrGwpLAIEJd",
    database: "railway",
    port: 30911,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    // 1. Test connection
    console.log('1️⃣ Testing connection...');
    const [rows] = await pool.execute('SELECT 1 as test');
    console.log('✅ Database connected!\n');

    // 2. Check if products table exists
    console.log('2️⃣ Checking products table...');
    const [tables] = await pool.execute(
      `SHOW TABLES LIKE 'products'`
    );

    if (tables.length === 0) {
      console.log('❌ Table "products" tidak ditemukan!');
      console.log('📝 Silakan buat tabel terlebih dahulu.');
      await pool.end();
      return;
    }

    console.log('✅ Table "products" ditemukan!\n');

    // 3. Check table structure
    console.log('3️⃣ Table structure:');
    const [columns] = await pool.execute(
      `DESCRIBE products`
    );

    console.log('   Columns:');
    columns.forEach(col => {
      console.log(`   - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'} ${col.Key === 'PRI' ? '🔑' : ''}`);
    });
    console.log('');

    // Check if image_url column exists
    const imageUrlColumn = columns.find(col => col.Field === 'image_url');
    if (!imageUrlColumn) {
      console.log('⚠️  KOLOM "image_url" TIDAK ADA!');
      console.log('📝 Silakan tambahkan dengan query:');
      console.log('   ALTER TABLE products ADD COLUMN image_url TEXT AFTER price;');
    } else {
      console.log(`✅ Kolom "image_url" sudah ada! (${imageUrlColumn.Type})`);
    }
    console.log('');

    // 4. Count products
    console.log('4️⃣ Product count:');
    const [count] = await pool.execute(
      `SELECT COUNT(*) as total FROM products`
    );
    console.log(`   Total produk: ${count[0].total}`);
    console.log('');

    // 5. Sample data
    if (count[0].total > 0) {
      console.log('5️⃣ Sample products (latest 3):');
      const [products] = await pool.execute(
        `SELECT id, name, category, price, image_url, created_at 
         FROM products 
         ORDER BY created_at DESC 
         LIMIT 3`
      );

      products.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name} (${p.category}) - Rp ${p.price}`);
        console.log(`      Image: ${p.image_url ? '✅ Ada' : '❌ Kosong'}`);
        if (p.image_url) {
          console.log(`      URL: ${p.image_url}`);
        }
      });
    }

    console.log('\n✅ DATABASE SETUP OK!');
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
  }
}

testDatabase().catch(console.error);
