"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNavbar from "@/app/components/AdminNavbar";

export default function Produk() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          console.error("Gagal fetch produk:", res.statusText);
          return;
        }
        const data = await res.json();
        // Pastikan setiap produk punya image_url
        const productsWithImage = (data.products || []).map((p: any) => ({
          ...p,
          image_url: p.image_url || "https://via.placeholder.com/400x400?text=Produk+Tanpa+Gambar"
        }));
        setProducts(productsWithImage);
      } catch (err) {
        console.error("Error fetch produk:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // DELETE produk
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah yakin ingin menghapus produk ini?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus produk");

      setProducts(products.filter(p => p.id !== id));
      alert("Produk berhasil dihapus");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus produk");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="px-4 w-full flex items-center justify-center mt-3">
        <div className="container mx-auto text-center">
          <Link
            href="/admin/produk/tambahproduk"
            className="border block w-full font-poppins text-xl text-white bg-green-500 border-green-500 hover:bg-green-700 hover:border-green-700 duration-200 hover:shadow-xl rounded-full py-2"
          >
            Tambah Produk
          </Link>
        </div>
      </div>

      <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
        <div className="container mx-auto py-2">
          <div className="grid grid-cols-4 gap-5">
            {products.length === 0 ? (
              <p className="text-center col-span-4 font-poppins text-neutral-700">
                Belum ada produk.
              </p>
            ) : (
              products.map((product: any) => (
                <div
                  key={product.id}
                  className="border p-3 space-y-2 flex flex-col rounded-xl shadow-lg"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full rounded-xl object-cover"
                  />

                  <h1 className="font-poppins text-neutral-900 font-semibold">
                    ID Barang: {product.id}
                  </h1>
                  <h1 className="font-poppins text-neutral-900 font-semibold">
                    Nama Barang: {product.name}
                  </h1>
                  <h1 className="font-poppins text-neutral-900 font-semibold">
                    Kategori: {product.category}
                  </h1>
                  <h1 className="font-poppins text-neutral-900 font-semibold">
                    Ukuran: {product.size || "-"}
                  </h1>
                  <h1 className="font-poppins text-neutral-900 font-semibold">
                    Stok: {product.stock}
                  </h1>
                  <h1 className="font-poppins text-neutral-900 font-semibold">
                    Harga Sewa: Rp. {product.price.toLocaleString()} / Hari
                  </h1>

                  <Link
                    href={`/admin/produk/editproduk/${product.id}`}
                    className="border rounded-md text-white font-poppins bg-green-500 border-green-500 cursor-pointer font-semibold hover:bg-green-700 hover:border-green-700 hover:shadow-xl duration-200 text-center py-1"
                  >
                    EDIT
                  </Link>

                  <button
                    className="border rounded-md text-white font-poppins bg-red-500 border-red-500 cursor-pointer font-semibold hover:bg-red-700 hover:border-red-700 hover:shadow-xl duration-200"
                    onClick={() => handleDelete(product.id)}
                  >
                    DELETE
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
