"use client";

import Link from "next/link";

export default function UserProfile() {
    return (
        <section className="flex justify-center items-center w-full min-h-screen bg-ivory px-6">
            <div className="container mx-auto bg-lightolive xl:w-1/2 rounded-xl py-5">
                <div className="flex items-center justify-center text-center mb-10">
                    <h1 className="text-neutral-900 font-edu text-4xl font-semibold">User Profile</h1>
                </div>
                <div className="px-6 space-y-3.5">
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Email</h1>
                        <h1 className="font-poppins text-neutral-900">empruy@gmail.com</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Phone Number</h1>
                        <h1 className="font-poppins text-neutral-900">00000000000</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Username</h1>
                        <h1 className="font-poppins text-neutral-900">empruyganteng</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Password</h1>
                        <h1 className="font-poppins text-neutral-900">********</h1>
                    </div>
                </div>
                <div className="px-6 mt-5 relative space-y-3 text-center">
                    <Link href="/userProfile/editProfile" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Edit Profile</Link>
                    <Link href="/userProfile/riwayatuser" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Lihat Riwayat Peminjaman</Link>
                    <Link href="/" className="border w-full block rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Kembali</Link>
                    <button className="border w-full rounded-full border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700 duration-200 cursor-pointer hover:shadow-xl text-ivory font-poppins py-1">Logout</button>
                </div>
            </div>
        </section>
    )
}