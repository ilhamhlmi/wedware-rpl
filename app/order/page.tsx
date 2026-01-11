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
    <section className="min-h-screen w-full flex items-center px-6 pt-32 pb-16">
      <NavbarClient />

      <div className="container mx-auto bg-olivegreen rounded-xl p-6">
        <h1 className="font-edu text-ivory text-5xl text-center mb-10">
          Your Order
        </h1>

        {cart.length === 0 && (
          <p className="text-white text-center">Your cart is empty</p>
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
              className="bg-red-500 text-white px-2 rounded-full"
            >
              X
            </button>

            <span className="text-white">{item.name}</span>
            <span className="text-white">x{item.qty}</span>
          </div>
        ))}

        {/* ADDRESS */}
        <div className="border p-3 rounded-xl bg-lightolive mt-4">
          <textarea
            className="w-full bg-transparent text-white focus:outline-none"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* DATES */}
        <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="date" value={fittingDate} onChange={(e) => setFittingDate(e.target.value)} />
        </div>

        <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="time" value={fittingTime} onChange={(e) => setFittingTime(e.target.value)} />
        </div>

        <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} />
        </div>

        <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="time" value={weddingTime} onChange={(e) => setWeddingTime(e.target.value)} />
        </div>

        <div className="border p-3 rounded-xl bg-lightolive mt-2">
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-green-500 text-white rounded-xl py-3 hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </section>
  );
}

