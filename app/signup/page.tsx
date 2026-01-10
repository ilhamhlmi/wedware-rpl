"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import hero from "@/public/hero/hero.jpg";
import hero3 from "@/public/hero/hero3.jpg";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registrasi berhasil, silakan login");
    router.push("/login");
  };

  return (
    <section>
      <Image src={hero} alt="hero" fill className="hidden lg:flex object-cover -z-10 inset-0" />
      <Image src={hero3} alt="hero3" fill className="lg:hidden object-cover -z-10 inset-0" />
      <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/60" />

      <div className="container mx-auto">
        <div className="flex items-center justify-center min-h-screen px-4 xl:px-0">
          <div className="w-full flex flex-col items-center max-w-md bg-ivory/5 backdrop-blur-2xl rounded-2xl shadow-md py-5">
            <h1 className="font-edu text-3xl font-semibold text-ivory mb-6">Sign Up</h1>

            <input name="email" placeholder="Email" onChange={handleChange}
              className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory" />

            <input name="phone" placeholder="Phone Number" onChange={handleChange}
              className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory" />

            <input name="username" placeholder="Username" onChange={handleChange}
              className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory" />

            <input type="password" name="password" placeholder="Password" onChange={handleChange}
              className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory" />

            <button
              onClick={handleSignup}
              className="border rounded-full mt-2 px-6 py-2 w-2/3 bg-primary text-ivory"
            >
              Create Account
            </button>

            <p className="text-sm text-ivory mt-3">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
