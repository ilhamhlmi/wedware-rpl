"use client"

import Link from "next/link"
import Image from "next/image"
import AdminNavbar from "@/app/components/AdminNavbar";


export default function DataPengguna() {
    return (
        <div>
            <AdminNavbar />
            <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
                <div className="container mx-auto py-2">
                    <div className="grid grid-cols-4 gap-5">
                        <div className="border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg">
                            <h1 className="font-poppins text-neutral-900">ID User: </h1>
                            <h1 className="font-poppins text-neutral-900">Username: </h1>
                            <h1 className="font-poppins text-neutral-900">Nomor Telepon: </h1>
                            <h1 className="font-poppins text-neutral-900">Password: </h1>
                            <h1 className="font-poppins text-neutral-900">Tanggal Dibuat: </h1>
                        </div>
                        <div className="border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg">
                            <h1 className="font-poppins text-neutral-900">ID User: </h1>
                            <h1 className="font-poppins text-neutral-900">Username: </h1>
                            <h1 className="font-poppins text-neutral-900">Nomor Telepon: </h1>
                            <h1 className="font-poppins text-neutral-900">Password: </h1>
                            <h1 className="font-poppins text-neutral-900">Tanggal Dibuat: </h1>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}