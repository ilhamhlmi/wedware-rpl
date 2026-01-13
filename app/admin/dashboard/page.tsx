"use client"

import { useEffect, useState } from "react"
import AdminNavbar from "@/app/components/AdminNavbar"

interface OrderItem {
  product_name: string
}

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
  status: "pending" | "progress" | "done"
  items: OrderItem[]
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

  const updateStatus = async (orderId: number, status: Order["status"]) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    if (!res.ok) return

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status } : o
      )
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
                <h1>Order ID: {order.id}</h1>
                <h1>ID User: {order.user_id}</h1>
                <h1>Nama: {order.nama}</h1>
                <h1>Alamat: {order.address}</h1>
                <h1>Tgl Fitting: {formatDate(order.fitting_date)}</h1>
                <h1>Waktu Fitting: {order.fitting_time}</h1>
                <h1>Tgl Acara: {formatDate(order.wedding_date)}</h1>
                <h1>Waktu Acara: {order.wedding_time}</h1>
                <h1>Tgl Pengembalian: {formatDate(order.return_date)}</h1>

                <div>
                  <h1>Product:</h1>
                  {order.items.map((item, idx) => (
                    <h1 key={idx}>- {item.product_name}</h1>
                  ))}
                </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value as Order["status"])
                    }
                    disabled={order.status === "done"}
                    className={`border rounded-md font-semibold px-2 py-1 text-white
                      ${order.status === "pending" && "bg-yellow-500"}
                      ${order.status === "progress" && "bg-blue-500"}
                      ${order.status === "done" && "bg-green-600"}
                      ${order.status === "done" && "opacity-70 cursor-not-allowed"}
                    `}
                  >
                    <option value="pending">Pending</option>
                    <option value="progress">Progress</option>
                    <option value="done">Done</option>
                  </select>

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
