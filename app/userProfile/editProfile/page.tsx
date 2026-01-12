"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function editProfile() {

    const router = useRouter();

    const [form, setForm] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/editProfile", { method: "GET" });
                const data = await res.json();

                if (!res.ok) {
                   alert(data.error || "Failed to load profile");
                    setLoading(false);
                    return;
                }


                setForm({
                    username: data.username,
                    phone: data.phone,
                    email: data.email,
                    password: data.password,
                });

                setLoading(false);
            } catch (error) {
               alert("Failed to connect to server");
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);


    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch("/api/editProfile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Profile updated successfully!");
            router.refresh();
            router.push('/userProfile')
        } else {
           alert(data.error || "Failed to update profile");
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-darkb text-xl font-poppins">Loading...</p>
            </div>
        );
    }

    return (
        <section className="flex justify-center items-center w-full min-h-screen bg-ivory px-6">
            <div className="container mx-auto bg-lightolive border border-lightolive shadow-2xl xl:w-1/2 rounded-xl py-5">
                <div className="flex items-center justify-center text-center mb-10">
                    <h1 className="text-neutral-900 font-edu text-4xl font-semibold">Edit Profile</h1>
                </div>
                <form className="px-6 space-y-3.5" onSubmit={handleUpdate}>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Email</h1>
                        <input
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            type="email" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Phone Number</h1>
                        <input
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            type="tel" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Username</h1>
                        <input
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                            type="text" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Password</h1>
                        <input
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            type="password" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <button className="border w-full rounded-full bg-green-500 border-green-500 text-ivory font-poppins py-1 hover:bg-green-700 hover:border-green-700 hover:shadow-xl cursor-pointer duration-200 text-center">Simpan Perubahan</button>
                    <Link href="/userProfile" className="border block w-full rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200 text-center">Kembali</Link>
                </form>
            </div>
        </section>
    )
}