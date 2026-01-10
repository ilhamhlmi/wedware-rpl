"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import userIcon from "@/public/navbar/user-icon-svgrepo-com.svg"
import Link from "next/link";
import Image from "next/image";

export default function NavbarClient() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        // Mobile mode start
        <header className="z-50 w-full fixed top-0 left-0 flex items-center bg-ivory shadow-md">
            <div className="container mx-auto">
                <div className="lg:hidden">
                    <nav className="w-full">
                        <div className="flex items-center justify-between mx-5 my-4">
                            <button onClick={toggleMenu} className="cursor-pointer px-4 py-2">
                                <span className="hamburger-line"></span>
                                <span className="hamburger-line"></span>
                                <span className="hamburger-line"></span>
                            </button>
                            <Link href="/" className="font-edu text-2xl text-black font-semibold">WedWare</Link>
                            <Link href="/login" className="font-poppins border p-2 rounded-md bg-olivegreen text-white">Sign in</Link>
                            {/* <Link href="/userProfile">
                                <div className="border p-2 rounded-full border-white bg-white hover:bg-slate-300 hover:border-slate-300 duration-200">
                                    <Image src={userIcon} alt="userIcon" className="w-5" />
                                </div>
                            </Link> */}
                        </div>
                    </nav>
                </div>
                {isOpen && (
                    <nav className="absolute left-5 right-5 top-[105%] px-8 py-5 border rounded-xl border-olivegreen bg-olivegreen/35 backdrop-blur-xl shadow-xl">
                        <div className="flex flex-col text-center text-s100 space-y-5">
                            <Link href="/" className="text-lg font-semibold font-poppins text-white uppercase">Beranda</Link>
                            <Link href="/about" className="text-lg font-semibold font-poppins text-white uppercase">Tentang Kami</Link>
                            <Link href="/catalog" className="text-lg font-semibold font-poppins text-white uppercase">Katalog</Link>
                            <Link href="/contact" className="text-lg font-semibold font-poppins text-white uppercase">Kontak</Link>
                        </div>
                    </nav>
                )}
                {/* Mobile mode end */}
                {/* Desktop mode start */}
                <div className="hidden lg:flex justify-center items-center">
                    <div className="container">
                        <nav className="py-5 px-6 flex items-center justify-between">
                            <div>
                                <Link href="/" className="font-edu text-2xl text-black font-semibold">WedWare</Link>
                            </div>
                            <div className="space-x-8">
                                <Link href="/" className={pathname === '/' ? 'font-poppins font-semibold text-olivegreen uppercase' : 'font-poppins text-black hover:text-olivegreen uppercase'}>Beranda</Link>
                                <Link href="/about" className={pathname === '/' ? 'font-poppins font-semibold text-olivegreen uppercase' : 'font-poppins text-black hover:text-olivegreen uppercase'}>Tentang kami</Link>
                                <Link href="/catalog" className={pathname === '/catalog' || '/catalog/menswear' || '/catalog/womenswear' || '/catalog/accesories' ? 'font-poppins font-semibold text-olivegreen uppercase' : 'font-poppins text-black hover:text-olivegreen uppercase'}>Katalog</Link>
                                <Link href="/contact" className={pathname === '/' ? 'font-poppins font-semibold text-olivegreen uppercase' : 'font-poppins text-black hover:text-olivegreen uppercase'}>Kontak</Link>
                                <Link href="/login" className={pathname === '/' ? 'font-poppins font-semibold text-olivegreen uppercase' : 'font-poppins uppercase border px-2 py-1 rounded-xl border-olivegreen text-olivegreen hover:bg-olivegreen hover:text-white duration-200'}>Sign In</Link>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* Desktop mode end */}
            </div>
        </header>
    );
}