// Script untuk test koneksi Supabase Storage
// Jalankan dengan: node test-upload.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hshambrtaifykzihngnr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzaGFtYnJ0YWlmeWt6aWhuZ25yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODI2ODkzNiwiZXhwIjoyMDgzODQ0OTM2fQ.EWXGJZ5p8lEFz4cCYiOxI0M2pPujPY7BVNXZxwRW3N8';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function testStorage() {
  console.log('🔍 Testing Supabase Storage...\n');

  // 1. List all buckets
  console.log('1️⃣ Listing all storage buckets:');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error('❌ Error listing buckets:', bucketsError);
    return;
  }
  
  console.log('✅ Buckets found:', buckets.map(b => b.name).join(', ') || 'No buckets');
  console.log('');

  // 2. Check if 'products' bucket exists
  const productsBucket = buckets.find(b => b.name === 'products');
  
  if (!productsBucket) {
    console.log('⚠️  Bucket "products" TIDAK DITEMUKAN!');
    console.log('📝 Silakan buat bucket "products" di Supabase Dashboard:');
    console.log('   1. Buka https://supabase.com/dashboard/project/hshambrtaifykzihngnr/storage/buckets');
    console.log('   2. Klik "New bucket"');
    console.log('   3. Nama: products');
    console.log('   4. Public: YES (centang)');
    console.log('   5. Klik "Create bucket"');
    return;
  }

  console.log('✅ Bucket "products" ditemukan!');
  console.log('   - Public:', productsBucket.public ? 'YES ✅' : 'NO ❌');
  console.log('   - Created:', new Date(productsBucket.created_at).toLocaleString());
  console.log('');

  // 3. List files in products bucket
  console.log('3️⃣ Listing files in "products" bucket:');
  const { data: files, error: filesError } = await supabase.storage
    .from('products')
    .list();

  if (filesError) {
    console.error('❌ Error listing files:', filesError);
    return;
  }

  if (files.length === 0) {
    console.log('📭 Bucket kosong (belum ada file yang diupload)');
  } else {
    console.log(`✅ Ditemukan ${files.length} file:`);
    files.forEach((file, i) => {
      console.log(`   ${i + 1}. ${file.name} (${(file.metadata.size / 1024).toFixed(2)} KB)`);
    });
  }
  console.log('');

  // 4. Test creating a test file
  console.log('4️⃣ Testing upload file...');
  const testFileName = `test-${Date.now()}.txt`;
  const testContent = 'This is a test file from test-upload.js';
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('products')
    .upload(testFileName, testContent, {
      contentType: 'text/plain',
      upsert: false
    });

  if (uploadError) {
    console.error('❌ Upload test failed:', uploadError);
    console.log('⚠️  Kemungkinan penyebab:');
    console.log('   - Bucket "products" belum dibuat');
    console.log('   - RLS policy belum diset');
    console.log('   - Service role key tidak valid');
    return;
  }

  console.log('✅ Upload test berhasil!');
  console.log('   - Path:', uploadData.path);
  console.log('');

  // 5. Get public URL
  const { data: urlData } = supabase.storage
    .from('products')
    .getPublicUrl(testFileName);

  console.log('5️⃣ Public URL test file:');
  console.log('   ', urlData.publicUrl);
  console.log('');

  // 6. Delete test file
  console.log('6️⃣ Cleaning up test file...');
  const { error: deleteError } = await supabase.storage
    .from('products')
    .remove([testFileName]);

  if (deleteError) {
    console.error('⚠️  Gagal hapus test file:', deleteError);
  } else {
    console.log('✅ Test file berhasil dihapus');
  }

  console.log('\n✅ STORAGE SETUP OK! Upload gambar produk siap digunakan.');
}

testStorage().catch(console.error);
