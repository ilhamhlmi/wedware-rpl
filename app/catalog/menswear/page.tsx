"use client"
import Image from "next/image";
import Link from "next/link";
import NavbarClient from "@/app/components/NavbarClient";
import { usePathname } from "next/navigation";
import CatalogNav from "@/app/components/Catalog";
import men1 from "@/public/catalog/menswear/man1.jpg"
import men2 from "@/public/catalog/menswear/man2.jpg"
import men3 from "@/public/catalog/menswear/man3.jpg"
import men4 from "@/public/catalog/menswear/man4.jpg"
import { addToCart } from "@/utils/cart";
import FooterClient from "@/app/components/FooterClient";


export default function MensWear() {
    const pathname = usePathname()
    return (
        <div>
            <NavbarClient />
            <section className="pt-32 pb-16">
                <div className="container mx-auto">
                    <h1 className="font-edu text-4xl text-center mb-16 font-semibold tracking-[0.3em] text-olivegreen">Katalog Produk Kami</h1>
                    <CatalogNav />
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-y-5 xl:gap-y-0 px-6 justify-items-center">
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={men1} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4 mt-3">
                                <h1 className="font-poppins">Busana Pria 1</h1>
                                <button
                                    onClick={() => {
                                        addToCart({
                                            id: "men-1",
                                            name: "Busana Pria 1",
                                            image: men1.src,
                                        })
                                        alert("Produk berhasil ditambahkan ke keranjang")
                                    }
                                    }
                                    className="font-poppins  border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins text-gray-500">S - XXL</h1>
                            </div>
                            <div className="flex w-full items-center justify-between px-4 mb-3">
                                <h1 className="font-poppins text-gray-500">Mulai dari Rp. 1.500.000 -</h1>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={men2} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4 mt-3">
                                <h1 className="font-poppins">Busana Pria 2</h1>
                                <button
                                    onClick={() => {
                                        addToCart({
                                            id: "men-2",
                                            name: "Busana Pria 2",
                                            image: men2.src,
                                        })
                                        alert("Produk berhasil ditambahkan ke keranjang")
                                    }
                                    }
                                    className="font-poppins  border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins text-gray-500">S - XXL</h1>
                            </div>
                            <div className="flex w-full items-center justify-between px-4 mb-3">
                                <h1 className="font-poppins text-gray-500">Mulai dari Rp. 1.500.000 -</h1>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={men3} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4 mt-3">
                                <h1 className="font-poppins">Busana Pria 3</h1>
                                <button
                                    onClick={() => {
                                        addToCart({
                                            id: "men-3",
                                            name: "Busana Pria 3",
                                            image: men3.src,
                                        })
                                        alert("Produk berhasil ditambahkan ke keranjang")
                                    }
                                    }
                                    className="font-poppins  border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins text-gray-500">S - XXL</h1>
                            </div>
                            <div className="flex w-full items-center justify-between px-4 mb-3">
                                <h1 className="font-poppins text-gray-500">Mulai dari Rp. 1.500.000 -</h1>
                            </div>
                        </div>
                        <div className="border border-olivegreen flex flex-col justify-center items-center rounded-xl w-65">
                            <Image src={men4} alt="dummy" className="w-65 rounded-xl" />
                            <div className="flex w-full items-center justify-between px-4 mt-3">
                                <h1 className="font-poppins">Busana Pria 4</h1>
                                <button
                                    onClick={() => {
                                        addToCart({
                                            id: "men-4",
                                            name: "Busana Pria 4",
                                            image: men4.src,
                                        })
                                        alert("Produk berhasil ditambahkan ke keranjang")
                                    }
                                    }
                                    className="font-poppins  border rounded-full px-2 text-white border-olivegreen bg-olivegreen font-semibold text-lg cursor-pointer">+</button>
                            </div>
                            <div className="flex w-full items-center justify-between px-4">
                                <h1 className="font-poppins text-gray-500">S - XXL</h1>
                            </div>
                            <div className="flex w-full items-center justify-between px-4 mb-3">
                                <h1 className="font-poppins text-gray-500">Mulai dari Rp. 1.500.000 -</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterClient />
        </div>
    );
}