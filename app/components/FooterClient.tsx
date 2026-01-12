"use client";

import Image from "next/image";
import Link from "next/link";
import location from "@/public/footer/location.svg";
import phone from "@/public/footer/phone.svg";
import mail from "@/public/footer/mail.svg";

export default function FooterClient() {
    return (
        <footer className="w-full bg-olivegreen text-white">
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">

                {/* TOP SECTION */}
                <div className="flex flex-col lg:flex-row gap-12 border-b border-white/20 pb-8">

                    {/* LEFT — BRAND */}
                    <div className="lg:w-1/2">
                        <h1 className="font-poppins font-semibold text-xl mb-4">
                            WedWare Indonesia
                        </h1>
                        <p className="font-poppins text-sm text-white/80 mb-6 max-w-md">
                            WedWare adalah platform penyediaan busana hingga aksesori wanita & pria untuk acara pernikahan.
                        </p>

                        <div className="space-y-3 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <Image src={location} alt="" className="w-5" />
                                <span>Jakarta, Indonesia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src={phone} alt="" className="w-5" />
                                <span>+62 XXX XXXX XXXX</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Image src={mail} alt="" className="w-5" />
                                <span>info@wedware.id</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — NAVIGATION */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-10">
                        <div>
                            <h2 className="font-semibold mb-4 text-sm">Product</h2>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li><Link href="/catalog" className="hover:text-white">Gaun Pengantin</Link></li>
                                <li><Link href="/catalog/menswear" className="hover:text-white">Busana Pria</Link></li>
                                <li><Link href="/catalog/womenswear" className="hover:text-white">Busana Wanita</Link></li>
                                <li><Link href="/catalog/accessories" className="hover:text-white">Aksesori</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-semibold mb-4 text-sm">Company</h2>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li><Link href="#about" className="hover:text-white">Tentang Kami</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Kontak</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* BOTTOM SECTION */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 text-sm text-white/60">
                    <p>© 2025 WedWare. All rights reserved.</p>
                    <p>Made with ❤️ by Kelompok 1</p>
                </div>

            </div>
        </footer>
    );
}
