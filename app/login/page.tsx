"use client"

import Image from "next/image"
import Link from "next/link"
import hero from "@/public/hero/hero.jpg";
import hero3 from "@/public/hero/hero3.jpg";

export default function Login() {
    return (
        <section>
            <Image src={hero} alt="hero" fill className="hidden lg:flex object-cover -z-10 inset-0" />
            <Image src={hero3} alt="hero3" fill className="lg:hidden object-cover -z-10 inset-0" />
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/60" />
            <div className="container mx-auto">
                <div className="flex items-center justify-center min-h-screen px-4 xl:px-0">
                    <div className="w-full flex flex-col items-center max-w-md bg-ivory/5 backdrop-blur-2xl rounded-2xl shadow-md py-5">
                        <div className="text-center mb-6">
                            <h1 className="font-edu text-3xl font-semibold text-ivory">Login</h1>
                        </div>
                        <div className="flex flex-col w-2/3 mb-3">
                            {/* <label htmlFor="" className="font-poppins text-sm">Email</label> */}
                            <input name="email" type="email" className="border-b focus:outline-none px-4 py-2 font-poppins border-ivory text-ivory" placeholder="Username" />
                        </div>
                        <div className="flex flex-col w-2/3 mb-3">
                            {/* <label htmlFor="" className="font-poppins text-sm">Email</label> */}
                            <input name="email" type="password" className="border-b focus:outline-none px-4 py-2 font-poppins border-ivory text-ivory" placeholder="Password" />
                        </div>
                        <button className="border rounded-full mt-2 px-6 py-2 font-poppins border-primary bg-primary hover:bg-olivegreen hover:border-olivegreen shadow-md hover:shadow-2xl duration-300 text-ivory cursor-pointer w-2/3">Login</button>
                        <p className="font-poppins text-sm text-ivory mt-3">Not registered yet? <Link href="/signup" className="font-semibold text-ivory">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
}