import Image from "next/image";
import NavbarClient from "./components/NavbarClient";
import hero2 from "@/public/hero/hero2.jpeg";
import hero2m from "@/public/hero/hero2m.jpeg";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavbarClient />
      <section className="h-screen w-full flex items-center pt-16">
        <Image src={hero2} alt="hero2" fill className="hidden lg:flex object-cover -z-10 inset-0" />
        <Image src={hero2m} alt="hero2m" fill className="lg:hidden object-cover -z-10 inset-0" />
        <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/60" />
        <div className="container mx-auto px-4">
          <div className="flex items-center text-center justify-center mb-8">
            <h1 className="font-edu font-bold text-white text-3xl xl:text-5xl tracking-[0.3em]">Karena Setiap Janji Layak Tampil Sempurna</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-3 mb-5 text-center">
            <Link href="/" className="border font-poppins w-64 px-10 py-2 rounded-full text-white bg-olivegreen border-olivegreen hover:bg-olivegreen-hover hover:border-olivegreen-hover duration-200 cursor-pointer">
              Lihat Koleksi
            </Link>
            <Link href="/" className="border font-poppins w-64 px-8 py-2 rounded-full text-white bg-primary border-white cursor-pointer hover:bg-ivory hover:text-olivegreen duration-200">
              Jadwalkan Fitting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
