"use client";

import Link from "next/link";
import Image from "next/image";


export default function editProfile() {
    return (
        <section className="flex justify-center items-center w-full min-h-screen bg-ivory px-6">
            <div className="container mx-auto bg-lightolive border border-lightolive shadow-2xl xl:w-1/2 rounded-xl py-5">
                <div className="flex items-center justify-center text-center mb-10">
                    <h1 className="text-neutral-900 font-edu text-4xl font-semibold">Edit Profile</h1>
                </div>
                <div className="px-6 space-y-3.5">
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Email</h1>
                        <input type="email" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Phone Number</h1>
                        <input type="email" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Username</h1>
                        <input type="email" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins text-neutral-900">Password</h1>
                        <input type="password" className="border border-neutral-900 focus:outline-none rounded-full px-3 py-2 font-poppins text-neutral-900 w-1/2" />
                    </div>
                </div>
                <div className="px-6 space-y-3 mt-5 text-center">
                    <button className="border w-full rounded-full bg-green-500 border-green-500 text-ivory font-poppins py-1 hover:bg-green-700 hover:border-green-700 hover:shadow-xl cursor-pointer duration-200">Simpan Perubahan</button>
                    <Link href="/userProfile" className="border block w-full rounded-full border-olivegreen bg-olivegreen text-ivory font-poppins py-1 hover:bg-olivegreen-hover hover:border-olivegreen-hover hover:shadow-xl cursor-pointer duration-200">Kembali</Link>
                </div>
            </div>
        </section>
    )
}