"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface RiwayatOrder {
    tanggal: string;
    order_id: string;
    status: string;
}

export default function RiwayatUser() {
    const [riwayat, setRiwayat] = useState<RiwayatOrder[]>([]);

    useEffect(() => {
        const fetchRiwayat = async () => {
            try {
                const res = await fetch("/api/riwayat");
                const data = await res.json();
                setRiwayat(data);
            } catch (error) {
                console.error("Gagal mengambil riwayat", error);
            }
        };

        fetchRiwayat();
    }, []);

    return (
        <section className="flex justify-center items-center w-full min-h-screen bg-ivory px-6">
            <div className="container mx-auto bg-lightolive xl:w-1/2 rounded-xl py-5">
                <div className="flex items-center justify-center text-center mb-10">
                    <h1 className="text-neutral-900 font-edu text-4xl font-semibold">
                        Riwayat
                    </h1>
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
                            {riwayat.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-3">
                                        <h1 className="font-poppins text-neutral-900">
                                            {new Date(item.tanggal).toLocaleDateString("id-ID")}
                                        </h1>
                                    </td>
                                    <td className="py-3">
                                        <h1 className="font-poppins text-neutral-900">
                                            {item.order_id}
                                        </h1>
                                    </td>
                                    <td className="py-3">
                                        <h1 className="font-poppins text-neutral-900">
                                            {item.status}
                                        </h1>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 mt-5 relative space-y-3 text-center">
                    <Link
                        href="/userProfile"
                        className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200"
                    >
                        Kembali
                    </Link>
                </div>
            </div>
        </section>
    );
}
