"use client"
import Image from "next/image";
import Link from "next/link";
import NavbarClient from "../components/NavbarClient";
import { usePathname } from "next/navigation";
import dummy from "@/public/catalog/dummyproduct.jpg"
import CatalogNav from "../components/Catalog";
import dress1 from "@/public/catalog/weddingdress/dress1.jpg"
import dress2 from "@/public/catalog/weddingdress/dress2.jpg"
import dress3 from "@/public/catalog/weddingdress/dress3.jpg"
import dress4 from "@/public/catalog/weddingdress/dress4.jpg"

export default function Catalog() {
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
                            <Image src={dress1} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Wedding Dress 1</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={dress2} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Wedding Dress 2</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={dress3} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Wedding Dress 3</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={dress4} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Wedding Dress 4</h1>
                                <button className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}