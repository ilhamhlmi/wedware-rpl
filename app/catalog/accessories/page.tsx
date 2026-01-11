"use client"
import Image from "next/image";
import Link from "next/link";
import NavbarClient from "@/app/components/NavbarClient";
import { usePathname } from "next/navigation";
import dummy from "@/public/catalog/dummyproduct.jpg"
import CatalogNav from "@/app/components/Catalog";
import acc1 from "@/public/catalog/accessories/acc1.jpg"
import acc2 from "@/public/catalog/accessories/acc2.jpg"
import acc3 from "@/public/catalog/accessories/acc3.jpg"
import acc4 from "@/public/catalog/accessories/acc4.jpg"
import { addToCart } from "@/utils/cart";
import FooterClient from "@/app/components/FooterClient";


export default function Accessories() {
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
                            <Image src={acc1} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Accessories 1</h1>
                                <button
                                onClick={() =>
                                    addToCart({
                                        id: "dress-1",
                                        name: "Accessories 1",
                                        image: acc1.src,
                                    })
                                } className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">
                                +
                            </button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={acc2} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Accessories 2</h1>
                                <button
                                    onClick={() =>
                                        addToCart({
                                            id: "dress-2",
                                            name: "Accessories 2",
                                            image: acc2.src,
                                        })
                                    }
                                    className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={acc3} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Accessories 3</h1>
                                <button
                                    onClick={() =>
                                        addToCart({
                                            id: "dress-3",
                                            name: "Accessories 3",
                                            image: acc3.src,
                                        })
                                    }
                                    className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={dummy} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins mt-3 mb-3">Accessories 4</h1>
                                                                <button
                                    onClick={() =>
                                        addToCart({
                                            id: "dress-4",
                                            name: "Accessories 4",
                                            image: dummy.src,
                                        })
                                    }
                                    className="font-poppins mt-3 mb-3 border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterClient />
        </div>
    );
}