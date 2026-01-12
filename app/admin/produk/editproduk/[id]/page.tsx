"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  // Pastikan id adalah string tunggal
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const productId = idParam ? parseInt(idParam) : NaN;

  if (isNaN(productId)) {
    alert("ID produk tidak valid");
    router.push("/admin/produk");
    return null;
  }

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Gagal mengambil produk");

        const data = await res.json();
        const product = data.products.find((p: any) => p.id === productId);
        if (!product) {
          alert("Produk tidak ditemukan");
          router.push("/admin/produk");
          return;
        }

        setName(product.name);
        setCategory(product.category);
        setSize(product.size || "");
        setStock(product.stock.toString());
        setPrice(product.price.toString());
        setImageUrl(product.image_url || null);
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat mengambil data produk");
        router.push("/admin/produk");
      }
    };

    fetchProduct();
  }, [productId, router]);

  const handleSubmit = async () => {
    if (!name || !category || !stock || !price) {
      alert("Isi semua field wajib!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: productId,
          name,
          category,
          size,
          stock: parseInt(stock),
          price: parseFloat(price),
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) router.push("/admin/produk");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat update produk");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen w-full flex items-center px-6 pt-16 pb-16">
      <div className="container mx-auto bg-olivegreen flex items-center justify-center rounded-xl p-6">
        <div className="flex flex-col w-full xl:w-1/2">
          <h1 className="text-5xl text-center text-ivory font-poppins font-semibold mb-10">
            Edit Produk
          </h1>

          {/* Preview / Upload Foto */}
          <div className="w-full flex items-center justify-center mb-3">
            <label
              htmlFor="uploadFoto"
              className="flex items-center justify-center border border-dashed border-ivory rounded-xl w-full px-4 py-3 font-poppins text-ivory cursor-pointer hover:border-sky-600 hover:text-sky-600 hover:shadow transition"
            >
              <span className="flex flex-col items-center space-y-2">
                <span>📤</span>
                <h1>Upload Foto Produk</h1>
                <p className="text-ivory font-poppins text-sm -mt-2.5 mb-3 text-center">
                  {file
                    ? `File dipilih: ${file.name}`
                    : imageUrl
                    ? "Foto saat ini"
                    : "Belum ada file dipilih"}
                </p>
              </span>
            </label>
            <input
              id="uploadFoto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* Input Fields */}
          <div className="flex flex-col space-y-2">
            <input
              placeholder="Nama Barang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Ukuran ( S - XXL) (opsional)"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Stok"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
            <input
              placeholder="Harga Sewa Mulai Dari / Hari"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive w-full text-white font-poppins focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full border mt-2 text-center font-poppins text-white text-lg rounded-xl bg-green-500 border-green-500 cursor-pointer hover:border-green-700 hover:bg-green-700 duration-200 hover:shadow-xl py-1 font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Menyimpan..." : "Update"}
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
