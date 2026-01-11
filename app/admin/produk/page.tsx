"use client"

import Link from "next/link"
import Image from "next/image"
import AdminNavbar from "@/app/components/AdminNavbar";
import dress1 from "@/public/catalog/weddingdress/dress1.jpg"
import dress2 from "@/public/catalog/weddingdress/dress2.jpg"
import dress3 from "@/public/catalog/weddingdress/dress3.jpg"
import dress4 from "@/public/catalog/weddingdress/dress4.jpg"

export default function Produk() {
    return (
        <div>
            <AdminNavbar />
            <div className="px-4 w-full flex items-center justify-center mt-3">
                <div className="container mx-auto text-center">
                    <Link href="/admin/produk/tambahproduk" className="border block w-full font-poppins text-xl text-white bg-green-500 border-green-500 hover:bg-green-700 hover:border-green-700 duration-200 hover:shadow-xl rounded-full py-2">Tambah Produk</Link>
                </div>
            </div>
            <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
                <div className="container mx-auto py-2">
                    <div className="grid grid-cols-4 gap-5">
                        <div className="border p-3 space-y-2 flex flex-col rounded-xl shadow-lg">
                            <Image src={dress1} alt="dummy" className="w-full rounded-xl" />
                            <h1 className="font-poppins text-neutral-900 font-semibold">ID Barang: 1</h1>
                            <h1 className="font-poppins text-neutral-900 font-semibold">Nama Barang: Gaun Pengantin 1</h1>
                            <h1 className="font-poppins text-neutral-900 font-semibold">Kategori: Gaun Pengantin</h1>
                            <h1 className="font-poppins text-neutral-900 font-semibold">Ukuran: S - XXL</h1>
                            <h1 className="font-poppins text-neutral-900 font-semibold">Stok: 3</h1>
                            <h1 className="font-poppins text-neutral-900 font-semibold">Harga Sewa: Rp. 1.500.000 / Hari </h1>
                            <button className="border rounded-md text-white font-poppins bg-green-500 border-green-500 cursor-pointer font-semibold hover:bg-green-700 hover:border-green-700 hover:shadow-xl duration-200">EDIT</button>
                            <button className="border rounded-md text-white font-poppins bg-red-500 border-red-500 cursor-pointer font-semibold hover:bg-red-700 hover:border-red-700 hover:shadow-xl duration-200">DELETE</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}