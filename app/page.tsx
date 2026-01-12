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
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";



  
export default function Home () {
const nameRef = useRef<HTMLInputElement>(null);
const messageRef = useRef<HTMLTextAreaElement>(null);


  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  const name = nameRef.current?.value;
  const message = messageRef.current?.value;

  if (!name || !message) {
    alert("Nama dan ulasan wajib diisi");
    return;
  }

  setLoading(true);

  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });

  if (res.ok) {
    nameRef.current!.value = "";
    messageRef.current!.value = "";
    alert("Ulasan berhasil dikirim");
  } else {
    alert("Gagal mengirim ulasan");
  }

  setLoading(false);
};



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
            <Link href="/catalog" className="border font-poppins w-64 px-8 py-2 rounded-full text-white bg-primary border-white cursor-pointer hover:bg-ivory hover:text-olivegreen duration-200">
              Lihat Koleksi
            </Link>
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
              <p>Kami adalah platform penyewaan gaun pengantin, busana pria dan wanita, serta aksesori pernikahan yang dirancang untuk memberikan kemudahan dan kenyamanan bagi setiap pelanggan. Kami menerapkan sistem layanan berbayar dengan konsep full delivery, mulai dari proses konsultasi, pengukuran, hingga pengantaran langsung ke rumah pelanggan. Dengan pilihan produk yang beragam dan berkualitas, kami berkomitmen membantu mewujudkan momen pernikahan yang praktis, elegan, dan tanpa ribet. Seluruh layanan kami dirancang agar pelanggan dapat fokus menikmati hari spesial tanpa khawatir soal persiapan busana.</p>
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
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Rizky Pratama</h1>
                  <p className="text-neutral-800">Pelayanannya cepat dan profesional. Proses pengukuran sampai pengantaran sangat rapi. Busananya bersih, elegan, dan sesuai ekspektasi untuk hari pernikahan kami.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Nadia Putri</h1>
                  <p className="text-neutral-800">Sangat terbantu dengan sistem full delivery. Tidak perlu repot keluar rumah, semua diurus dengan detail. Kualitas gaun dan aksesori benar-benar premium.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Fajar Hidayat</h1>
                  <p className="text-neutral-800">Pilihan busana pria dan wanita lengkap. Admin responsif dan informatif. Pengiriman tepat waktu dan kondisi barang sangat terjaga saat diterima.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Alya Safitri</h1>
                  <p className="text-neutral-800">Pengalaman menyewa yang menyenangkan. Konsultasi mudah, fitting akurat, dan hasil akhirnya terlihat mewah. Cocok untuk pasangan yang ingin praktis.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Intan Maharani</h1>
                  <p className="text-neutral-800">Gaunnya cantik dan nyaman dipakai seharian. Sistem delivery ke rumah sangat membantu, terutama untuk jadwal yang padat menjelang hari H.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Bayu Kurniawan</h1>
                  <p className="text-neutral-800">Harga sebanding dengan kualitas. Proses cepat, aman, dan terpercaya. Sangat direkomendasikan untuk pasangan yang ingin solusi praktis.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Salsa Rahmadani</h1>
                  <p className="text-neutral-800">Pelayanan ramah dan profesional. Detail pengukuran diperhatikan dengan baik sehingga busana pas dan terlihat elegan saat acara berlangsung.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Andi Saputra</h1>
                  <p className="text-neutral-800">Website mudah digunakan dan informasinya jelas. Tidak ribet, cocok untuk calon pengantin yang ingin persiapan efisien tanpa stres.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Maya Lestari</h1>
                  <p className="text-neutral-800">Suka dengan konsep full service-nya. Dari awal sampai akhir terasa sangat terbantu. Kualitas busana benar-benar sesuai foto katalog.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Dimas Ardiansyah</h1>
                  <p className="text-neutral-800">Web ini sangat memudahkan persiapan pernikahan. Mulai dari pemesanan sampai pengembalian semuanya jelas dan terorganisir dengan baik.</p>
                </div>
              </div>
            </div>

            {/* Card Bawah, Arah kiri bray */}
            <div className="marquee-track-left py-2">
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-150 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Reno Mahendra</h1>
                  <p className="text-neutral-800">Sangat praktis dan hemat waktu. Semua proses dilakukan dari rumah. Busana pria dan wanita sama-sama berkualitas dan terlihat eksklusif.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Nabila Azzahra</h1>
                  <p className="text-neutral-800">Admin cepat tanggap dan komunikatif. Pengiriman tepat waktu dan busana dalam kondisi sangat baik. Pengalaman menyewa yang memuaskan.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Yoga Prasetyo</h1>
                  <p className="text-neutral-800">Cocok untuk pasangan modern. Proses digitalnya rapi, jelas, dan transparan. Tidak ada kendala dari awal pemesanan sampai acara selesai.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Putri Anindya</h1>
                  <p className="text-neutral-800">Gaun pengantinnya cantik dan nyaman. Saya merasa sangat percaya diri di hari pernikahan. Terima kasih atas pelayanan yang luar biasa.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Muhammad Ilham Hilmi</h1>
                  <p className="text-neutral-800">Sistemnya jelas dan profesional. Cocok untuk yang tidak ingin ribet. Semua kebutuhan busana pernikahan tersedia dalam satu platform.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Nabil Maulana Hafizh</h1>
                  <p className="text-neutral-800">Pelayanan detail dan sabar saat konsultasi. Busana sesuai ukuran dan tampak elegan. Sangat membantu untuk persiapan pernikahan kami.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Arief Setiawan</h1>
                  <p className="text-neutral-800">Pengalaman pertama menyewa busana online dan hasilnya memuaskan. Aman, rapi, dan sesuai janji. Sangat direkomendasikan.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Vina Oktaviani</h1>
                  <p className="text-neutral-800">Sangat terbantu dengan layanan delivery. Tidak perlu bolak-balik. Busana bersih, wangi, dan terlihat mewah saat digunakan.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Raka Firmansyah</h1>
                  <p className="text-neutral-800">Konsep bisnisnya keren dan praktis. Semua proses terasa profesional. Cocok untuk pasangan yang mengutamakan efisiensi dan kualitas.</p>
                </div>
              </div>
              <div className="min-w-82.5 mr-6 border border-lightolive rounded-xl flex items-center px-5 py-3 bg-ivory hover:scale-[1.03] hover:bg-white transition duration-200 hover:shadow-lg cursor-pointer w-[320px]">
                <div className="">
                  <h1 className="text-olivegreen font-poppins font-semibold mb-2">Shinta Ramadhani</h1>
                  <p className="text-neutral-800">Web ini benar-benar solusi pernikahan modern. Praktis, terpercaya, dan kualitas busana sangat memuaskan. Pengalaman yang tidak mengecewakan.</p>
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
              <h1 className="font-poppins text-2xl xl:text-4xl mb-3 border-b-2 border-olivegreen pb-3 text-neutral-700 tracking-wider">Bagikan Pengalaman Anda</h1>
              <p className="font-poppins text-md xl:text-lg text-neutral-700">Ceritakan pengalaman Anda menggunakan layanan kami. Ulasan Anda sangat berarti bagi kami & calon pelanggan lainnya.</p>
            </div>

            <div className="w-full xl:w-1/2 text-center xl:text-start border flex flex-col p-4 space-y-5 rounded-xl bg-lightolive border-olivegreen shadow-xl">
              <input ref={nameRef} type="text" placeholder="Nama" className="border px-4 py-3 rounded-xl font-poppins bg-ivory border-ivory focus:outline-none"/>
              <textarea ref={messageRef} placeholder="Ulasan Anda" className="border px-4 py-3 rounded-xl font-poppins bg-ivory border-ivory focus:outline-none"/>
                <button onClick= {handleSubmit} disabled={loading} className="border rounded-xl font-poppins py-2 text-white bg-olivegreen border-olivegreen font-semibold hover:bg-olivegreen-hover hover:border-olivegreen-hover duration-200 hover:shadow-2xl shadow-md cursor-pointer"> {loading ? "Mengirim..." : "Kirim"}
             </button>
            </div>
          </div>
        </div>
      </section>

      <FooterClient />
    </div>
  );
}
