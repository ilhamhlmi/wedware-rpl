"use client";

import Link from "next/link";

export default function RiwayatUser() {
    return (
        <section className="flex justify-center items-center w-full min-h-screen bg-ivory px-6">
            <div className="container mx-auto bg-lightolive xl:w-1/2 rounded-xl py-5">
                <div className="flex items-center justify-center text-center mb-10">
                    <h1 className="text-neutral-900 font-edu text-4xl font-semibold">Riwayat</h1>
                </div>
                <div className="px-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-neutral-300">
                                <th className="py-2 text-left font-poppins text-neutral-800">Tanggal</th>
                                <th className="py-2 text-left font-poppins text-neutral-800">ID Order</th>
                                <th className="py-2 text-left font-poppins text-neutral-800">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="py-3">
                                    <h1 className="font-poppins text-neutral-900">25-10-2025</h1>
                                </td>
                                <td className="py-3">
                                    <h1 className="font-poppins text-neutral-900">ORD-00123</h1>
                                </td>
                                <td className="py-3">
                                    <h1 className="font-poppins text-neutral-900">Selesai</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="px-6 mt-5 relative space-y-3 text-center">
                    <Link href="/userProfile" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Kembali</Link>
                </div>
            </div>
        </section>
    )
}