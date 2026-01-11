"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
    const pathname = usePathname()
    return (
        <div>
            <section className="flex justify-center px-4 mt-5">
                <div className="container bg-olivegreen mx-auto py-2 rounded-xl shadow-md">
                    <nav className="relative flex items-center h-14">
                        {/* LEFT */}
                        <div className="px-4">
                            <Link href="/admin/dashboard" className="font-poppins font-semibold text-white">
                                WedWare | Admin
                            </Link>
                        </div>

                        {/* CENTER (REAL CENTER) */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex space-x-8">
                            <Link href="/admin/dashboard" className={pathname === '/admin/dashboard' ? 'font-poppins font-semibold text-white uppercase' : 'font-poppins text-black hover:text-white uppercase'}>
                                Dashboard
                            </Link>
                            <Link href="/admin/produk" className={pathname === '/admin/produk' ? 'font-poppins font-semibold text-white uppercase' : 'font-poppins text-black hover:text-white uppercase'}>
                                PRODUK
                            </Link>
                            <Link href="/admin/datapengguna" className={pathname === '/admin/datapengguna' ? 'font-poppins font-semibold text-white uppercase' : 'font-poppins text-black hover:text-white uppercase'}>
                                PENGGUNA
                            </Link>
                            <Link href="/admin/ulasan" className={pathname === '/admin/ulasan' ? 'font-poppins font-semibold text-white uppercase' : 'font-poppins text-black hover:text-white uppercase'}>
                                ULASAN
                            </Link>
                            <Link href="/contact" className={pathname === '/' ? 'font-poppins font-semibold text-white uppercase' : 'font-poppins text-black hover:text-white uppercase'}>
                                LAPORAN WORKER
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="ml-auto px-4">
                            <button className="border px-3 py-1 rounded-xl border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 duration-200 text-white font-poppins cursor-pointer hover:shadow-md">
                                Logout
                            </button>
                        </div>
                    </nav>

                    <div className="px-4 mb-5">
                        <div className="">
                            <h1 className="font-poppins text-3xl text-white">Hi, Admin!</h1>
                        </div>
                        <div className="grid grid-cols-4 gap-x-5 mt-3">
                            <div className="border p-5 rounded-xl bg-lightolive shadow-md">
                                <div>
                                    <h1 className="font-poppins text-gray-700">Total Pengguna Terdaftar</h1>
                                </div>
                                <div>
                                    <h1 className="font-poppins text-neutral-900 text-3xl">13</h1>
                                </div>
                            </div>
                            <div className="border p-5 rounded-xl bg-lightolive shadow-md">
                                <div>
                                    <h1 className="font-poppins text-gray-700">Peminjaman Menunggu</h1>
                                </div>
                                <div>
                                    <h1 className="font-poppins text-neutral-900 text-3xl">13</h1>
                                </div>
                            </div>
                            <div className="border p-5 rounded-xl bg-lightolive shadow-md">
                                <div>
                                    <h1 className="font-poppins text-gray-700">Peminjaman Berlangsung</h1>
                                </div>
                                <div>
                                    <h1 className="font-poppins text-neutral-900 text-3xl">13</h1>
                                </div>
                            </div>
                            <div className="border p-5 rounded-xl bg-lightolive shadow-md">
                                <div>
                                    <h1 className="font-poppins text-gray-700">Peminjaman Selesai</h1>
                                </div>
                                <div>
                                    <h1 className="font-poppins text-neutral-900 text-3xl">13</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>

    );
}