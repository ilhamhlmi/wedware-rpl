"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import hero from "@/public/hero/hero.jpg";

interface Order {
  order_id: number;
  nama_customer: string | null;
  address: string | null;
  fitting_date: string | null;
  fitting_time: string | null;
  wedding_date: string | null;
  wedding_time: string | null;
  return_date: string | null;
  products: string | null;

}

const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleDateString("id-ID") : "-";

const formatTime = (time?: string | null) =>
  time ? time.slice(0, 5) : "-";

export default function WorkerDashboard() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [workerName, setWorkerName] = useState("");
  const [ketUkuran, setKetUkuran] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/worker/orders", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.replace("/worker/login");
          return;
        }

        const data = await res.json();
        setOrders(data.data || []);
        setWorkerName(data.worker?.username || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const submitLaporan = async () => {
    if (!selected || !file) {
      alert("Lengkapi data laporan");
      return;
    }

    const formData = new FormData();
    formData.append("order_id", String(selected.order_id));
    formData.append("bukti_pembayaran", file);

    const res = await fetch("/api/worker/laporan", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (res.ok) {
      alert("Laporan berhasil dikirim");
      location.reload();
    } else {
      alert("Gagal mengirim laporan");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Memuat dashboard...
      </div>
    );
  }

    const handleLogout = async () => {
    await fetch("/api/worker/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/worker/login";
  };


  return (
    <section className="relative min-h-screen text-ivory">
      <Image src={hero} alt="bg" fill className="object-cover z-0" />
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="relative z-20 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Dashboard Worker
        </h1>

        <div className="bg-ivory/10 backdrop-blur-2xl rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-lg text-center font-semibold mb-6">
            Form Laporan Order
          </h2>

          <select
            className="w-full mb-6 p-3 rounded-lg bg-white/90 text-gray-900
                       border border-white/40"
            onChange={(e) =>
              setSelected(
                orders.find(o => o.order_id === Number(e.target.value)) || null
              )
            }
          >
            <option value="">Pilih Order</option>
            {orders.map(o => (
              <option key={o.order_id} value={o.order_id}>
                Order #{o.order_id} - {o.nama_customer}
              </option>
            ))}
          </select>

          {selected && (
            <div className="space-y-4">
              <ReadOnlyInput label="Nama Customer" value={selected.nama_customer} />
              <ReadOnlyInput label="Worker" value={workerName} />
              <ReadOnlyInput label="Alamat" value={selected.address} />
              <ReadOnlyInput
                label="Fitting"
                value={`${formatDate(selected.fitting_date)} • ${formatTime(selected.fitting_time)}`}
              />
              <ReadOnlyInput
                label="Wedding"
                value={`${formatDate(selected.wedding_date)} • ${formatTime(selected.wedding_time)}`}
              />
              <ReadOnlyInput
                label="Return Date"
                value={formatDate(selected.return_date)}
              />
              <ReadOnlyInput label="Produk" value={selected.products} />

              <div>
                <label className="text-sm block mb-1">Keterangan Ukuran (Manual)</label>
                <textarea
                  value={ketUkuran}
                  onChange={(e) => setKetUkuran(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/90 text-gray-900"
                  placeholder="Contoh: Lingkar dada 90cm, panjang lengan 55cm"
                />
              </div>



              <div>
                <label className="text-sm block mb-1">Bukti Pembayaran</label>
                <input
                  type="file"
                  className="w-full p-3 rounded-lg bg-white/90 text-gray-900"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <button
                onClick={submitLaporan}
                className="w-full py-3 rounded-full bg-primary text-white"
              >
                Kirim Laporan
              </button>
                          <button
              onClick={handleLogout}
              className="w-full bg-primary border rounded-full px-6 py-2 border-red-600 bg-red-600 hover:bg-red-800 duration-300 text-white "
            >
              Logout
            </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const ReadOnlyInput = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => (
  <div>
    <label className="text-sm block mb-1">{label}</label>
    <input
      readOnly
      value={value ?? ""}
      className="w-full p-3 rounded-lg bg-transparent border border-white/40 text-white"
    />
  </div>
);
