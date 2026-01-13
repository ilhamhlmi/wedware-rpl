import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { createClient } from "@supabase/supabase-js";

const supabase =
  process.env.NODE_ENV === "production"
    ? createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
    : null;

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const workerId = cookieStore.get("worker_id")?.value;

    if (!workerId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const orderId = formData.get("order_id") as string;
    const ketUkuran = formData.get("ket_ukuran") as string;
    const file = formData.get("bukti_pembayaran") as File;

    if (!orderId || !file) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    //  VALIDASI FILE 
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Format file tidak diizinkan" },
        { status: 400 }
      );
    }

    let fileUrl = "";

    
    //  MODE PRODUCTION 
    
    if (process.env.NODE_ENV === "production") {
      const ext = file.name.split(".").pop();
      const filePath = `order-${orderId}/${Date.now()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error } = await supabase!.storage
        .from("laporan-worker")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) throw error;

      const { data } = supabase!.storage
        .from("laporan-worker")
        .getPublicUrl(filePath);

      fileUrl = data.publicUrl;
    }

    
    //  MODE DEVELOPMENT 
    else {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), buffer);

      fileUrl = `/uploads/${fileName}`;
    }

    //  SIMPAN KE DB 
    await db.query(
      `
      INSERT INTO laporan_worker
      (order_id, worker_id, ket_ukuran, bukti_pembayaran, created_at)
      VALUES (?, ?, ?, ?, NOW())
      `,
      [orderId, workerId, ketUkuran, fileUrl]
    );

    return NextResponse.json(
      { message: "Laporan berhasil dikirim" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR UPLOAD LAPORAN:", error);
    return NextResponse.json(
      { message: "Gagal mengirim laporan" },
      { status: 500 }
    );
  }
}










































// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { cookies } from "next/headers";

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const workerId = cookieStore.get("worker_id")?.value;
//     const role = cookieStore.get("worker_role")?.value;

//     if (!workerId || role !== "worker") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Validasi worker
//     const [workerRows] = await db.query(
//       "SELECT id, username FROM users WHERE id = ? AND role = 'worker'",
//       [workerId]
//     );

//     const worker = (workerRows as any[])[0];
//     if (!worker) {
//       return NextResponse.json(
//         { message: "Worker tidak ditemukan" },
//         { status: 404 }
//       );
//     }

//     // Ambil orders beserta products
//     const [orders] = await db.query(
//       `
//       SELECT 
//         o.id AS order_id,
//         u.username AS nama_customer,
//         o.address,
//         o.fitting_date,
//         o.fitting_time,
//         o.wedding_date,
//         o.wedding_time,
//         o.return_date,
//         COALESCE(GROUP_CONCAT(CONCAT(oi.product_name, ' (', oi.qty, ')') SEPARATOR ', '), '-') AS products
//       FROM orders o
//       JOIN users u ON o.user_id = u.id
//       LEFT JOIN order_items oi ON o.id = oi.order_id
//       LEFT JOIN laporan_worker l ON o.id = l.order_id
//       WHERE o.worker_id = ?
//         AND l.id IS NULL
//       GROUP BY o.id
//       ORDER BY o.created_at DESC
//       `,
//       [workerId]
//     );

//     return NextResponse.json(
//       {
//         worker: {
//           id: worker.id,
//           username: worker.username,
//         },
//         data: orders,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("ERROR GET WORKER ORDERS:", error);
//     return NextResponse.json(
//       { message: "Server error" },
//       { status: 500 }
//     );
//   }
// }
