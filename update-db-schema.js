// Script untuk update schema database (optional - jika URL terpotong)
// Jalankan dengan: node update-db-schema.js

const mysql = require('mysql2/promise');

async function updateSchema() {
  console.log('🔧 Updating Database Schema...\n');

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
    console.log('📝 Mengubah kolom image_url dari VARCHAR(255) ke TEXT...');
    
    await pool.execute(
      `ALTER TABLE products MODIFY COLUMN image_url TEXT`
    );

    console.log('✅ Kolom image_url berhasil diubah ke TEXT!');
    console.log('   Sekarang bisa menampung URL yang sangat panjang.\n');

    // Verify change
    const [columns] = await pool.execute(`DESCRIBE products`);
    const imageUrlColumn = columns.find(col => col.Field === 'image_url');
    
    console.log('✅ Verifikasi:');
    console.log(`   - Field: ${imageUrlColumn.Field}`);
    console.log(`   - Type: ${imageUrlColumn.Type}`);
    console.log(`   - Null: ${imageUrlColumn.Null}`);

    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
  }
}

updateSchema().catch(console.error);
