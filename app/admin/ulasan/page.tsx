"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "@/app/components/AdminNavbar";

type Review = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function Ulasan() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus ulasan ini?");
    if (!confirmDelete) return;

    const res = await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      // update state TANPA reload
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Gagal menghapus ulasan");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
        <div className="container mx-auto py-2">
          <div className="grid grid-cols-4 gap-5">

            {reviews.map((review) => (
              <div
                key={review.id}
                className="border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg"
              >
                <h1 className="font-poppins text-neutral-900">
                  Nama: {review.name}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Ulasan: {review.message}
                </h1>

                <h1 className="font-poppins text-neutral-900">
                  Tanggal Dibuat:{" "}
                  {new Date(review.created_at).toLocaleDateString("id-ID")}
                </h1>

                <button
                  onClick={() => handleDelete(review.id)}
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
