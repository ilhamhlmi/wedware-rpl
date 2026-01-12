"use client"
import Image from "next/image";
import NavbarClient from "./components/NavbarClient";
import hero2 from "@/public/hero/hero2.jpeg";
import hero2m from "@/public/hero/hero2m.jpeg";
import Link from "next/link";
import dress1 from "@/public/catalog/weddingdress/dress1.jpg"
import men1 from "@/public/catalog/menswear/man1.jpg"
import women1 from "@/public/catalog/womenswear/women1.jpg"
import acc1 from "@/public/catalog/accessories/acc1.jpg"
import price from "@/public/hero/price-tag-rotate-svgrepo-com.svg"
import quality from "@/public/hero/quality-5-svgrepo-com (1).svg"
import process from "@/public/hero/process-svgrepo-com (1).svg"
import service from "@/public/hero/service-svgrepo-com.svg"
import FooterClient from "./components/FooterClient";

export default function Home() {

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };


  return (
    <div>
      <NavbarClient />
      <section className="h-screen w-full flex items-center pt-16">
        <Image src={hero2} alt="hero2" fill className="hidden lg:flex object-cover -z-10 inset-0" />
        <Image src={hero2m} alt="hero2m" fill className="lg:hidden object-cover -z-10 inset-0" />
        <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/10 via-black/35 to-black/80" />
        <div className="container mx-auto px-4">
          <div className="flex items-center text-center justify-center mb-8">
            <h1 className="font-edu font-bold text-white text-3xl xl:text-5xl tracking-[0.3em]">Karena Setiap Janji Layak Tampil Sempurna</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-3 mb-5 text-center">
            <Link href="/catalog" className="border font-poppins w-64 px-10 py-2 rounded-full text-white bg-olivegreen border-olivegreen hover:bg-olivegreen-hover hover:border-olivegreen-hover duration-200 cursor-pointer">
              Lihat Koleksi
            </Link>
            <Link href="/" className="border font-poppins w-64 px-8 py-2 rounded-full text-white bg-primary border-white cursor-pointer hover:bg-ivory hover:text-olivegreen duration-200">
              Jadwalkan Fitting
            </Link>
            <button
              onClick={handleLogout}
              className="border rounded-full px-6 py-2 border-red-600 bg-red-600 hover:bg-red-800 duration-300 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="w-full flex items-center justify-center pt-16 pb-16 bg-ivory">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="mb-8">
            <h1 className="font-poppins text-2xl font-semibold text-olivegreen tracking-wider">Kategori Unggulan Kami</h1>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-y-5 xl:gap-y-0 xl:gap-x-8 px-6 justify-items-center">
            <Link href="/catalog" className="border border-white bg-white flex flex-col justify-center items-center rounded-xl w-65 hover:scale-[1.08] duration-200 shadow-md hover:shadow-2xl">
              <Image src={dress1} alt="dummy" className="w-65 rounded-xl" />
              <div className="flex w-full items-center justify-center px-4 mt-3 mb-3">
                <h1 className="font-poppins text-olivegreen font-semibold">Gaun Pengantin</h1>
              </div>
            </Link>
            <Link href="/catalog/menswear" className="border border-white bg-white flex flex-col justify-center items-center rounded-xl w-65 hover:scale-[1.08] duration-200 shadow-md hover:shadow-2xl">
              <Image src={men1} alt="dummy" className="w-65 rounded-xl" />
              <div className="flex w-full items-center justify-center px-4 mt-3 mb-3">
                <h1 className="font-poppins text-olivegreen font-semibold">Busana Pria</h1>
              </div>
            </Link>
            <Link href="/catalog/womenswear" className="border border-white bg-white flex flex-col justify-center items-center rounded-xl w-65 hover:scale-[1.08] duration-200 shadow-md hover:shadow-2xl">
              <Image src={women1} alt="dummy" className="w-65 rounded-xl" />
              <div className="flex w-full items-center justify-center px-4 mt-3 mb-3">
                <h1 className="font-poppins text-olivegreen font-semibold">Busana Wanita</h1>
              </div>
            </Link>
            <Link href="/catalog/accessories" className="border border-white bg-white flex flex-col justify-center items-center rounded-xl w-65 hover:scale-[1.08] duration-200 shadow-md hover:shadow-2xl">
              <Image src={acc1} alt="dummy" className="w-65 rounded-xl" />
              <div className="flex w-full items-center justify-center px-4 mt-3 mb-3">
                <h1 className="font-poppins text-olivegreen font-semibold">Aksesori</h1>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="w-full flex items-center justify-center pt-32 pb-32 bg-lightolive">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center px-6 space-y-5">
            <div className="text-2xl xl:text-4xl font-semibold text-ivory tracking-wider">
              <h1 className="font-poppins">Tentang <span className="font-edu">WedWare</span></h1>
            </div>
            <div className="font-poppins text-ivory text-center xl:max-w-3/4 xl:text-xl">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem explicabo, debitis obcaecati voluptate deserunt et similique perspiciatis suscipit nulla? Laboriosam molestiae temporibus dolores, soluta enim non labore repudiandae? Provident consectetur voluptatem expedita voluptatum. Voluptatibus suscipit rerum quae necessitatibus, ex repellendus doloribus deleniti assumenda tempora, quod ipsam minima optio, consectetur explicabo eligendi fuga. Ex ut tempore architecto, incidunt, cupiditate quod deleniti tempora exercitationem, quas temporibus vitae iure quam officiis sapiente sit illum atque harum! Eaque, molestiae? Nam veritatis vel impedit odio?</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-ivory pt-16 pb-16">
        <div className="flex justify-center items-center text-2xl xl:text-4xl text-cente tracking-wider px-6 text-center">
          <h1 className="font-poppins text-olivegreen font-semibold">Mengapa Memilih <span className="font-edu font-semibold">WedWare</span></h1>
        </div>
        <div className="flex justify-center items-center mt-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5 xl:gap-7 2xl:10">
            <div className="flex border px-8 py-5 border-olivegreen rounded-xl bg-white/5 backdrop-blur-md shadow-lg">
              <div className="border bg-dustypink border-dustypink mr-5 rounded-xl p-3">
                <Image src={quality} alt="integrity" className="w-8.75" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-poppins font-semibold text-olivegreen">Kualitas Selalu Terjaga</h1>
              </div>
            </div>
            <div className="flex border px-8 py-5 border-olivegreen rounded-xl bg-white/5 backdrop-blur-md shadow-lg">
              <div className="border bg-dustypink border-dustypink mr-5 rounded-xl p-3">
                <Image src={price} alt="integrity" className="w-8.75" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-poppins font-semibold text-olivegreen">Harga Yang Terjangkau</h1>
              </div>
            </div>
            <div className="flex border px-8 py-5 border-olivegreen rounded-xl bg-white/5 backdrop-blur-md shadow-lg">
              <div className="border bg-dustypink border-dustypink mr-5 rounded-xl p-3">
                <Image src={process} alt="integrity" className="w-8.75" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-poppins font-semibold text-olivegreen">Proses Mudah</h1>
              </div>
            </div>
            <div className="flex border px-8 py-5 border-olivegreen rounded-xl bg-white/5 backdrop-blur-md shadow-lg">
              <div className="border bg-dustypink border-dustypink mr-5 rounded-xl p-3">
                <Image src={service} alt="integrity" className="w-8.75" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-poppins font-semibold text-olivegreen">Pelayanan Profesional</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-pinkpale pt-16 pb-16">
        <div className="w-full mx-auto">

          <div className="flex flex-col justify-center items-center px-6 mb-5">
            <h1 className="font-poppins text-olivegreen text-2xl xl:text-4xl mb-3 font-semibold tracking-wider">Testimonial</h1>
            <p className="text-olivegreen/80 font-poppins text-center xl:max-w-2/3">Kami percaya bahwa pengalaman terbaik datang dari pelanggan yang telah menggunakan layanan & produk di <span className="font-edu">Wed Ware</span></p>
          </div>

          <div className="w-full overflow-hidden">
            {/* Arah Kanan, Card atas yak */}
            <div className="marquee-track py-2">
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-150 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
            </div>

            {/* Card Bawah, Arah kiri bray */}
            <div className="marquee-track-left py-2">
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-150 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolor sequi distinctio iusto temporibus quae ipsum fugit? Magni voluptate nostrum architecto. Adipisci dignissimos aperiam iste quia vel atque. Nam, aliquam?</p>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>

      <section className="w-full bg-ivory pt-16 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col xl:flex-row gap-12 items-center">

            <div className="w-full xl:w-1/2 text-center xl:text-start">
              <h1 className="font-poppins text-2xl xl:text-4xl mb-3 border-b-2 border-olivegreen pb-3 text-neutral-700">Bagikan Pengalaman Anda</h1>
              <p className="font-poppins text-md xl:text-lg text-neutral-700">Ceritakan pengalaman Anda menggunakan layanan kami. Ulasan Anda sangat berarti bagi kami & calon pelanggan lainnya.</p>
            </div>

            <div className="w-full xl:w-1/2 text-center xl:text-start border flex flex-col p-4 space-y-5 rounded-xl bg-lightolive border-olivegreen shadow-xl">
              <input type="text" placeholder="Nama" className="border px-4 py-3 rounded-xl font-poppins bg-ivory border-ivory focus:outline-none"/>
              <textarea placeholder="Ulasan Anda" className="border px-4 py-3 rounded-xl font-poppins bg-ivory border-ivory focus:outline-none"/>
              <button className="border rounded-xl font-poppins py-2 text-white bg-olivegreen border-olivegreen font-semibold hover:bg-olivegreen-hover hover:border-olivegreen-hover duration-200 hover:shadow-2xl shadow-md cursor-pointer">Kirim</button>
            </div>
          </div>
        </div>
      </section>

      <FooterClient />
    </div>
  );
}
