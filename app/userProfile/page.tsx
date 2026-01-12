"use client";
import {useState, useEffect} from "react";
import Link from "next/link";

export default function UserProfile() {

    const [user, setUser] = useState<any>({});
    const [form, setForm] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetch("/api/userProfile")
            .then((res) => res.json())
            .then((data) => {
                setUser(data);


                setForm({
                    username: data.username,
                    phone: data.phone,
                    email: data.email,
                    password: data.password,
                });

            })
            .catch((err) => console.log("Fetch error:", err)); //buat debug console
    }, []);

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });

        window.location.href = "/login";
    };

    return (
        <section className="flex justify-center items-center w-full min-h-screen bg-ivory px-6">
            <div className="container mx-auto bg-lightolive xl:w-1/2 rounded-xl py-5">
                <div className="flex items-center justify-center text-center mb-10">
                    <h1 className="text-neutral-900 font-edu text-4xl font-semibold">User Profile</h1>
                </div>
                <div className="px-6 space-y-3.5">
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Email</h1>
                        <h1 className="font-poppins text-neutral-900">{user.email}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Phone Number</h1>
                        <h1 className="font-poppins text-neutral-900">{user.phone}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Username</h1>
                        <h1 className="font-poppins text-neutral-900">{user.username}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Password</h1>
                        <h1 className="font-poppins text-neutral-900">{user.password}</h1>
                    </div>
                </div>
                <div className="px-6 mt-5 relative space-y-3 text-center">
                    <Link href="/userProfile/editProfile" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Edit Profile</Link>
                    <Link href="/userProfile/riwayat" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Lihat Riwayat Peminjaman</Link>
                    <Link href="/" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Kembali</Link>
                    <button onClick={handleLogout} className="border w-full rounded-full border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 duration-200 cursor-pointer hover:shadow-xl text-ivory font-poppins py-1">Logout</button>
                </div>
            </div>
        </section>
    )
}