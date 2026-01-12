"use client"

import Link from "next/link"
import Image from "next/image"
import AdminNavbar from "@/app/components/AdminNavbar";
import bukpem from "@/public/bukti pembayaran.jpeg"


export default function LaporanWorker() {
    return (
        <div>
            <AdminNavbar />
            <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
                <div className="container mx-auto py-2">
                    <div className="grid grid-cols-4 gap-5">
                        <div className="border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg">
                            {/* Bukti pembayaran taro di image ini dibawah */}
                            <Image src={bukpem} alt="bukpem"></Image> 
                            <h1 className="font-poppins text-neutral-900">Tgl Laporan: </h1>
                            <h1 className="font-poppins text-neutral-900">Nama Pengguna: </h1>
                            <h1 className="font-poppins text-neutral-900">Worker: </h1>
                            <h1 className="font-poppins text-neutral-900">Fitting: </h1>
                            <h1 className="font-poppins text-neutral-900">Wedding: </h1>
                            <h1 className="font-poppins text-neutral-900">Pengembalian: </h1>
                            <h1 className="font-poppins text-neutral-900">Keterangan Uk: </h1>
                            <button className="border rounded-md text-white font-poppins bg-red-500 border-red-500 cursor-pointer font-semibold">HAPUS</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}