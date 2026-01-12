"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/app/components/AdminNavbar"

interface Order {
  id: number
  user_id: number
  nama: string
  address: string
  fitting_date: string
  fitting_time: string
  wedding_date: string
  wedding_time: string
  return_date: string
  status: "pending" | "in_progress" | "done"
}

export default function Dashboard() {

  const formatDate = (dateString: string) => {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

  const [orders, setOrders] = useState<Order[]>([])

  const updateStatus = async (order: Order) => {
    
    let newStatus: Order["status"]

    if (order.status === "pending") newStatus = "in_progress"
    else if (order.status === "in_progress") newStatus = "done"
    else return

    // PATCH ke API
    await fetch(`/api/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })

    // Update state lokal
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
    )
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders")
      const data = await res.json()
      setOrders(data)
    }

    fetchOrders()
  }, [])

  const getButtonLabel = (status: Order["status"]) => {
    if (status === "pending") return "Progress"
    if (status === "in_progress") return "Selesai"
    if (status === "done") return "Selesai ✔"
    return ""
  }

  const getButtonColor = (status: Order["status"]) => {
    if (status === "pending") return "bg-yellow-500"
    if (status === "in_progress") return "bg-blue-500"
    if (status === "done") return "bg-green-500"
    return "bg-gray-500"
  }

  return (
    <div>
      <AdminNavbar />

      <section className="w-full flex items-center justify-center px-4 mt-3 mb-5">
        <div className="container mx-auto py-2">
          <div className="grid grid-cols-4 gap-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`border p-3 space-y-2 flex flex-col rounded-xl border-black shadow-lg ${
                  order.status === "done" ? "opacity-70" : ""
                }`}
              >
                <h1>ID User: {order.user_id}</h1>
                <h1>Nama: {order.nama}</h1>
                <h1>Alamat: {order.address}</h1>
                <h1>Tgl Fitting: {formatDate(order.fitting_date)}</h1>
                <h1>Waktu Fitting: {order.fitting_time}</h1>
                <h1>Tgl Acara: {formatDate(order.wedding_date)}</h1>
                <h1>Waktu Acara: {order.wedding_time}</h1>
                <h1>Tgl Pengembalian: {formatDate(order.return_date)}</h1>
                <button
                  onClick={() => updateStatus(order)}
                  disabled={order.status === "done"}
                  className={`border rounded-md text-white font-semibold ${getButtonColor(
                    order.status
                  )}`}
                >
                  {getButtonLabel(order.status)}
                </button>
              </div>
            ))}

            {orders.length === 0 && (
              <p className="col-span-4 text-center">Tidak ada order aktif</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
