"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import keranjang from "@/public/catalog/conversation-svgrepo-com.svg"

export default function Catalog() {
    const pathname = usePathname()
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 lg:space-x-6 text-center px-4 mb-5">
            <Link href="/catalog" className={pathname === '/catalog' ? 'font-poppins border px-4 py-2 rounded-xl bg-olivegreen text-white border-olivegreen' : "font-poppins border px-4 py-2 rounded-xl bg-transparent text-olivegreen border-olivegreen hover:bg-olivegreen hover:text-white duration-200"}>Gaun Pengantin</Link>
            <Link href="/catalog/menswear" className={pathname === '/catalog/menswear' ? 'font-poppins border px-4 py-2 rounded-xl bg-olivegreen text-white border-olivegreen' : "font-poppins border px-4 py-2 rounded-xl bg-transparent text-olivegreen border-olivegreen hover:bg-olivegreen hover:text-white duration-200"}>Busana Pria</Link>
            <Link href="/catalog/womenswear" className={pathname === '/catalog/womenswear' ? 'font-poppins border px-4 py-2 rounded-xl bg-olivegreen text-white border-olivegreen' : "font-poppins border px-4 py-2 rounded-xl bg-transparent text-olivegreen border-olivegreen hover:bg-olivegreen hover:text-white duration-200"}>Busana Wanita</Link>
            <Link href="/catalog/accessories" className={pathname === '/catalog/accessories' ? 'font-poppins border px-4 py-2 rounded-xl bg-olivegreen text-white border-olivegreen' : "font-poppins border px-4 py-2 rounded-xl bg-transparent text-olivegreen border-olivegreen hover:bg-olivegreen hover:text-white duration-200"}>Aksesori</Link>
            <Link href="/order" className="border border-olivegreen p-2 rounded-full">
                <Image src={keranjang} alt="keranjang" className="w-7 h-7 cursor-pointer" />
            </Link>
        </div>
    )
}