"use client"
import Image from "next/image";
import Link from "next/link";
import NavbarClient from "@/app/components/NavbarClient";
import { usePathname } from "next/navigation";
import dummy from "@/public/catalog/dummyproduct.jpg"
import CatalogNav from "@/app/components/Catalog";
import women1 from "@/public/catalog/womenswear/women1.jpg"
import women2 from "@/public/catalog/womenswear/women2.jpg"
import women3 from "@/public/catalog/womenswear/women3.jpg"
import women4 from "@/public/catalog/womenswear/women4.jpg"

export default function WomensWear() {
    const pathname = usePathname()
    return (
        <div>
            <NavbarClient />
            <section className="pt-32 pb-16">
                <div className="container mx-auto">
                    <h1 className="font-edu text-4xl text-center mb-16 font-semibold tracking-[0.3em] text-olivegreen">Our Product Catalog</h1>
                    <CatalogNav />
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-y-5 xl:gap-y-0 px-6 justify-items-center">
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={women1} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Busana Wanita 1</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={women2} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Busana Wanita 2</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={women3} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Busana Wanita 3</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={women4} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Busana Wanita 4</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}