"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminNavbar from "@/app/components/AdminNavbar";

type LaporanWorker = {
  id: number;
  bukti_pembayaran: string;
  created_at: string;
  nama_pengguna: string;
  worker: string;
  fitting: string;
  wedding: string;
  pengembalian: string;
  ket_ukuran: string;
};

export default function LaporanWorker() {

  const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

  const [laporan, setLaporan] = useState<LaporanWorker[]>([]);

  useEffect(() => {
    fetch("/api/laporan-worker")
      .then((res) => res.json())
      .then((data) => setLaporan(data));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus laporan ini?")) return;

    const res = await fetch("/api/laporan-worker", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setLaporan((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Gagal menghapus laporan");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
        <div className="container mx-auto py-2">
          <div className="grid grid-cols-4 gap-5">

            {laporan.map((item) => (
              <div
                key={item.id}
                className="border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg"
              >
                <Image
                  src={item.bukti_pembayaran}
                  alt="bukpem"
                  width={300}
                  height={400}
                />

                <h1 className="font-poppins text-neutral-900">
                  Tgl Laporan:{" "}
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Nama Pengguna: {item.nama_pengguna}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Worker: {item.worker}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Fitting: {formatDate(item.fitting)}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Wedding: {formatDate(item.wedding)}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Pengembalian: {formatDate(item.pengembalian)}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Keterangan Uk: {item.ket_ukuran}
                </h1>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="border rounded-md text-white font-poppins bg-red-500 border-red-500 cursor-pointer font-semibold"
                >
                  HAPUS
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}
