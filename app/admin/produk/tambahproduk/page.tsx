"use client"
import Link from "next/link";
import Image from "next/image";

export default function Order() {
    return (
        <section className="min-h-screen w-full flex items-center px-6 pt-16 pb-16">
            <div className="container mx-auto bg-olivegreen flex items-center justify-center rounded-xl p-6">
                <div className="flex flex-col w-full">
                    <div className="flex items-center text-center justify-center mb-10">
                        <h1 className="font-poppins text-ivory text-5xl font-semibold">Tambah Produk</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col w-full xl:w-1/2 space-y-2">
                            <div className="w-full flex items-center justify-center mb-3">
                                <label
                                    htmlFor="uploadFoto"
                                    className="flex items-center justify-center border border-dashed border-ivory rounded-xl w-full px-4 py-3 font-poppins text-ivory cursor-pointer hover:border-sky-hover:text-sky-600 hover:shadow transition"
                                >
                                    <span className="flex flex-col items-center space-y-2">
                                        <span>📤</span>
                                        <h1>Upload Foto Produk</h1>
                                        
                                            <p className="text-ivory font-poppins text-sm -mt-2.5 mb-3 text-center">
                                                File dipilih: 
                                            </p>
                                        
                                    </span>
                                </label>

                                <input
                                    id="uploadFoto"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <input className="w-full focus:outline-none font-poppins text-white" placeholder="ID Barang" />
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <input className="w-full focus:outline-none font-poppins text-white" placeholder="Nama Barang" />
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <input className="w-full focus:outline-none font-poppins text-white" placeholder="Kategori" />
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <input className="w-full focus:outline-none font-poppins text-white" placeholder="Ukuran ( S - XXL) (opsional)" />
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <input className="w-full focus:outline-none font-poppins text-white" placeholder="Stok" />
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <input className="w-full focus:outline-none font-poppins text-white" placeholder="Harga Sewa Mulai Dari / Hari" />
                            </div>
                            <button className="w-full border mt-2 text-center font-poppins text-white text-lg rounded-xl bg-green-500 border-green-500 cursor-pointer hover:border-green-700 hover:bg-green-700 duration-200 hover:shadow-xl py-1 font-semibold">
                                Tambah
                            </button>
                            <Link href="/admin/produk" className="w-full border text-center font-poppins text-white text-lg rounded-xl bg-dustypink border-dustypink cursor-pointer hover:border-lightolive hover:bg-lightolive duration-200 hover:shadow-xl py-1">
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}