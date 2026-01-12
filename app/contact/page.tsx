"use client"
import NavbarClient from "../components/NavbarClient"
import FooterClient from "../components/FooterClient"
import Image from "next/image"
import Link from "next/link"
import contact from "@/public/contact/contact.svg"

export default function Contact() {
    return (
        <div>
            <NavbarClient />
            <section className="w-full bg-ivory pt-32 xl:pt-24 pb-16 min-h-screen flex items-center">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col xl:flex-row gap-12 items-center">

                        <div className="w-full xl:w-1/2 text-center xl:text-start">
                            <h1 className="font-poppins text-2xl xl:text-4xl mb-5 text-olivegreen font-semibold tracking-wider">Kontak Kami</h1>
                            <p className="font-poppins text-md xl:text-lg text-lightolive mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit dignissimos adipisci delectus, pariatur, debitis et, suscipit ab provident accusantium tempora eveniet excepturi sed sunt ad praesentium atque aut blanditiis magni.</p>
                            <Link href='/' className="border font-poppins px-4 py-2 rounded-xl border-olivegreen bg-olivegreen text-white font-semibold hover:bg-olivegreen-hover hover:border-olivegreen-hover shadow-md hover:shadow-2xl duration-200">Hubungi Melalui Whatsapp</Link>
                        </div>

                        <div className="w-full xl:w-1/2 flex items-center justify-center">
                            <Image src={contact} alt="contact" />
                        </div>
                    </div>
                </div>
            </section>
            <FooterClient />
        </div>
    )
}