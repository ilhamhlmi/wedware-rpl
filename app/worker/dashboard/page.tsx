"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import hero from "@/public/hero/hero.jpg";

interface Peminjaman {
  peminjaman_id: number;
  nama_customer: string;
  detail_peminjaman: string;
  ongkos_pp: number;
  biaya_peminjaman: number;
}

export default function WorkerDashboard() {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [selected, setSelected] = useState<Peminjaman | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [workerId, setWorkerId] = useState<string | null>(null);
  const [workerRole, setWorkerRole] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [authChecked, setAuthChecked] = useState(false); //  KUNCI UTAMA

  /* === READ COOKIE (HANYA SEKALI) === */
useEffect(() => {
  const readCookie = (name: string) => {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  console.log("COOKIE:", document.cookie);

  setWorkerId(readCookie("user_id") || null);
  setWorkerRole(readCookie("user_role") || null);
  setWorkerName(readCookie("username") || "");

  setAuthChecked(true);
}, []);


  /*  GUARD (SETELAH COOKIE DIBACA)  */
  useEffect(() => {
    if (!authChecked) return;

    if (!workerId || workerRole !== "worker") {
      window.location.href = "/login";
    }
  }, [authChecked, workerId, workerRole]);

  /* === FETCH DATA === */
useEffect(() => {
  fetch("/api/worker/peminjaman", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(res => {
      setPeminjaman(res.data || []);
      setWorkerName(res.worker?.username || "");
    });
}, []);


  const submitLaporan = async () => {
    if (!selected || !file) {
      alert("Lengkapi data laporan");
      return;
    }

    const formData = new FormData();
    formData.append("peminjaman_id", String(selected.peminjaman_id));
    formData.append("bukti_pembayaran", file);

    const res = await fetch("/api/worker/laporan", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Laporan berhasil dikirim");
      location.reload();
    } else {
      alert("Gagal mengirim laporan");
    }
  };

  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  /* === TUNGGU AUTH CHECK === */
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Memeriksa autentikasi...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen text-ivory">
      <Image src={hero} alt="bg" fill className="object-cover z-0" />
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="relative z-20 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Dashboard Worker
        </h1>

        <div className="bg-ivory/10 backdrop-blur-2xl rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-lg text-center font-semibold mb-4">
            Form Laporan Peminjaman
          </h2>

          <select
            className="w-full mb-4 p-3 rounded-lg bg-white/90 text-gray-900 border border-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => {
              const data = peminjaman.find(
                p => p.peminjaman_id === Number(e.target.value)
              );
              setSelected(data || null);
            }}
          >
            <option value="">Pilih ID Peminjaman</option>
            {peminjaman.map(p => (
              <option key={p.peminjaman_id} value={p.peminjaman_id}>
                #{p.peminjaman_id}
              </option>
            ))}
          </select>

          {!selected && (
            <p className="text-sm text-white/70 text-center mt-4">
              Silakan pilih ID peminjaman untuk melihat detail
            </p>
          )}

          {selected && (
            <div className="space-y-3 mt-4">
              <ReadOnlyInput label="Nama Customer" value={selected.nama_customer} />
              <ReadOnlyInput label="Worker" value={workerName} />
              <ReadOnlyTextarea label="Detail Peminjaman" value={selected.detail_peminjaman} />
              <ReadOnlyInput label="Ongkos PP" value={selected.ongkos_pp} />
              <ReadOnlyInput label="Biaya Peminjaman" value={selected.biaya_peminjaman} />

        <div>
            <label className="text-sm text-center block mb-1">Bukti Pembayaran</label>

            <label className="flex items-center justify-between w-full px-4 py-3 rounded-lg
                              bg-white/90 text-gray-800 cursor-pointer
                              border border-white/40 hover:bg-white transition">
              <span className="text-sm truncate">
                {file ? file.name : "Pilih file bukti pembayaran"}
              </span>

              <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
                Browse
              </span>

              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>


              <div className="pt-4 space-y-3">
                <button
                  onClick={submitLaporan}
                  className="w-full border border-white/40 bg-primary py-3 rounded-full font-medium"
                >
                  Kirim Laporan
                </button>

                <button
                  onClick={logout}
                  className="w-full border border-white/40 py-3 rounded-full"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* COMPONENTS */
const ReadOnlyInput = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <label className="text-sm block mb-1">{label}</label>
    <input
      readOnly
      value={value}
      className="w-full p-3 rounded-lg bg-transparent border border-white/30"
    />
  </div>
);

const ReadOnlyTextarea = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="text-sm block mb-1">{label}</label>
    <textarea
      readOnly
      value={value}
      className="w-full p-3 rounded-lg bg-transparent border border-white/30"
    />
  </div>
);
