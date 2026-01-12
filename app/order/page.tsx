"use client"
import Link from "next/link";
import Image from "next/image";
import NavbarClient from "../components/NavbarClient";
import { useEffect, useState } from "react";
import { getCart, removeFromCart, CartItem } from "@/utils/cart";

export default function Order() {
  const [cart, setCart] = useState<CartItem[]>([]);

  //  FORM STATE 
  const [address, setAddress] = useState("");
  const [fittingDate, setFittingDate] = useState("");
  const [fittingTime, setFittingTime] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [weddingTime, setWeddingTime] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    setCart(getCart());
  }, []);

  //  SUBMIT HANDLER

  const handleSubmit = async () => {
    if (!cart.length) {
      alert("Cart kosong");
      return;
    }
    const formData = new FormData();

    formData.append("address", address);
    formData.append("fittingDate", fittingDate);
    formData.append("fittingTime", fittingTime);
    formData.append("weddingDate", weddingDate);
    formData.append("weddingTime", weddingTime);
    formData.append("returnDate", returnDate);
    formData.append("items", JSON.stringify(cart));

    // if (file) {
    //   formData.append("file", file);
    // }

    const res = await fetch("/api/orders", {
      method: "POST",
      body: formData, // JANGAN set Content-Type manual
    });

    if (!res.ok) {
      alert("Gagal submit order");
      return;
    }

    alert("Order berhasil dikirim");
  };


  return (
    <section className="min-h-screen w-full flex flex-col items-center px-6 pt-32 pb-16">
      <NavbarClient />

      <div className="container mx-auto bg-lightolive rounded-xl p-6 xl:max-w-2/3 mb-5">
        <h1 className="font-poppins text-ivory text-center text-lg mb-3 font-semibold">Ketentuan Pembayaran Sewa & Pengantaran</h1>
        <div className="text-justify space-y-2">
          <h1 className="font-poppins text-ivory text-">- Pembayaran biaya sewa dan ongkos pengantaran dilakukan setelah proses fitting selesai</h1>
          <h1 className="font-poppins text-ivory text-">- Apabila pelanggan memutuskan untuk <span className="font-semibold">membatalkan</span> maka biaya ongkos fitting dan pengantaran tetap <span className="font-semibold">wajib dibayarkan</span>.</h1>
          <h1 className="font-poppins text-ivory text-">- Biaya ongkos mencakup proses kunjungan fitting, pengantaran, dan operasional layanan.</h1>
        </div>
      </div>

      <div className="container mx-auto bg-olivegreen rounded-xl p-6 xl:max-w-2/3">
        <h1 className="font-edu text-ivory text-5xl text-center mb-10">
          Pesanan Kamu
        </h1>

        <div className="space-y-2">
          {cart.length === 0 && (
            <p className="text-center font-poppins text-ivory">Keranjang masih kosong</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="border flex justify-between items-center p-3 rounded-xl bg-lightolive mb-2"
            >
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  setCart(getCart());
                }}
                className="bg-red-500 text-white px-2 rounded-full cursor-pointer hover:bg-red-700 duration-200"
              >
                X
              </button>

              <span className="text-white">{item.name}</span>
              <span className="text-white">x{item.qty}</span>
            </div>
          ))}

          {/* ADDRESS
        <div className="border p-3 rounded-xl bg-lightolive mt-4">
          <textarea
            className="w-full bg-transparent text-white focus:outline-none"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div> */}

          <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address" />
          </div>

          {/* DATES
        <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="date" value={fittingDate} onChange={(e) => setFittingDate(e.target.value)} />
        </div> */}

          <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
            <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Fitting Date</label>
            <input value={fittingDate} onChange={(e) => setFittingDate(e.target.value)} type="date" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address" />
          </div>

          {/* <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="time" value={fittingTime} onChange={(e) => setFittingTime(e.target.value)} />
        </div> */}

          <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
            <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Fitting Time</label>
            <input value={fittingTime} onChange={(e) => setFittingTime(e.target.value)} type="time" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address" />
          </div>

          {/* <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} />
        </div> */}

          <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
            <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Wedding Date</label>
            <input value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} type="date" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address" />
          </div>

          {/* <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="time" value={weddingTime} onChange={(e) => setWeddingTime(e.target.value)} />
        </div> */}

          <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
            <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Wedding Time</label>
            <input value={weddingTime} onChange={(e) => setWeddingTime(e.target.value)} type="time" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address" />
          </div>

          {/* <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div> */}

          <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
            <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Return Date</label>
            <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address" />
          </div>

          {/* SUBMIT */}
          <button className="w-full border  text-center font-poppins text-white text-lg rounded-xl bg-green-500 border-green-500 cursor-pointer hover:border-green-700 hover:bg-green-700 duration-200 hover:shadow-xl py-1" onClick={handleSubmit}>Sewa Sekarang</button>
        </div>

      </div>

      <div className="container mx-auto bg-lightolive rounded-xl p-6 xl:max-w-2/3 mt-5">
        <h1 className="font-poppins text-ivory text-center text-lg mb-3 font-semibold">Informasi Biaya Pengantaran</h1>
        <div className="text-center space-y-2">
          <h1 className="font-poppins text-ivory text-">0 - 5 km : Rp. 50.000 -</h1>
          <h1 className="font-poppins text-ivory text-">6 - 10 km : Rp. 75.000 -</h1>
          <h1 className="font-poppins text-ivory text-">11 - 15 km : Rp. 100.000 -</h1>
          <h1 className="font-poppins text-ivory text-">16 - 20 km : Rp. 150.000 -</h1>
          <h1 className="font-poppins text-ivory text-">Lebih dari 20 km : Menyesuaikan</h1>
        </div>
      </div>
    </section>


  );
}

