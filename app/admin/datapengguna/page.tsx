"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/app/components/AdminNavbar";

interface User {
    id: number
    username: string
    phone: string
    created_at: string
}

export default function DataPengguna() {
    const [users, setUsers] = useState<User[]>([])
    const formatTanggal = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users")
                const data: User[] = await res.json()
                setUsers(data)
            } catch (error) {
                console.error("Gagal mengambil data user", error)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <AdminNavbar />

            <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
                <div className="container mx-auto py-2">
                    <div className="grid grid-cols-4 gap-5">

                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg"
                            >
                                <h1>ID User: {user.id}</h1>
                                <h1>Username: {user.username}</h1>
                                <h1>Nomor Telepon: {user.phone}</h1>
                                <h1>Password: ******</h1>
                                <h1>Tanggal Dibuat: {formatTanggal(user.created_at)}</h1>
                            </div>
                        ))}

                        {users.length === 0 && (
                            <p className="col-span-4 text-center">
                                Tidak ada data user
                            </p>
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
}
