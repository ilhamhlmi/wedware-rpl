"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddProductPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);

    // Buat preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!name || !category || !stock || !price) {
      setError("Isi semua field wajib!");
      return;
    }

    if (!file) {
      setError("Foto produk wajib diupload!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Format file tidak didukung. Gunakan JPG, PNG, atau WebP.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("size", size);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("image", file);

      console.log("📤 Mengirim data produk...");
      console.log("📷 File:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      console.log("📥 Response:", data);

      if (res.ok) {
        alert("✅ " + data.message);
        console.log("🔗 URL Gambar:", data.imageUrl);
        
        // Reset form
        setName("");
        setCategory("");
        setSize("");
        setStock("");
        setPrice("");
        setFile(null);
        setPreview(null);
        setFileKey((prev) => prev + 1);
      } else {
        setError(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setError("Terjadi kesalahan saat menghubungi server");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen w-full flex items-center px-6 pt-16 pb-16">
      <div className="container mx-auto bg-olivegreen flex items-center justify-center rounded-xl p-6">
        <div className="flex flex-col w-full xl:w-1/2">
          <h1 className="text-5xl text-center text-ivory font-poppins font-semibold mb-10">
            Tambah Produk
          </h1>

          {/* Error Message */}
          {error && (
            <div className="w-full bg-red-500 text-white px-4 py-3 rounded-xl mb-3 font-poppins">
              ⚠️ {error}
            </div>
          )}

          {/* Preview Image */}
          {preview && (
            <div className="w-full flex justify-center mb-3">
              <div className="relative w-48 h-48 rounded-xl overflow-hidden border-2 border-ivory">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Upload File */}
          <div className="w-full flex items-center justify-center mb-3">
            <label
              htmlFor="uploadFoto"
              className="flex items-center justify-center border border-dashed border-ivory rounded-xl w-full px-4 py-3 font-poppins text-ivory cursor-pointer hover:border-sky-600 hover:text-sky-600 hover:shadow transition"
            >
              <span className="flex flex-col items-center space-y-2">
                <span>📤</span>
                <h1>Upload Foto Produk</h1>
                <p className="text-ivory font-poppins text-sm -mt-2.5 mb-3 text-center">
                  {file ? `✅ ${file.name} (${(file.size / 1024).toFixed(1)} KB)` : "Belum ada file dipilih"}
                </p>
              </span>
            </label>
            <input
              key={fileKey}
              id="uploadFoto"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Input Fields */}
          <div className="flex flex-col space-y-2">
            <input
              placeholder="Nama Barang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Ukuran ( S - XXL) (opsional)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Stok"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Harga Sewa Mulai Dari / Hari"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            disabled={loading || !file}
            className={`w-full border mt-2 text-center font-poppins text-white text-lg rounded-xl bg-green-500 border-green-500 cursor-pointer hover:border-green-700 hover:bg-green-700 duration-200 hover:shadow-xl py-1 font-semibold ${
              loading || !file ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Menyimpan..." : "Tambah"}
          </button>

          <Link
            href="/admin/produk"
            className="w-full border text-center font-poppins text-white text-lg rounded-xl bg-dustypink border-dustypink cursor-pointer hover:border-lightolive hover:bg-lightolive duration-200 hover:shadow-xl py-1 mt-2"
          >
            Kembali
          </Link>
        </div>
      </div>
    </section>
  );
}
