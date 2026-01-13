import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/* GET LAPORAN WORKER */
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        lw.id,
        lw.order_id,
        lw.bukti_pembayaran,
        lw.created_at,

        u.username AS nama_pengguna,
        w.username AS worker,

        o.fitting_date AS fitting,
        o.wedding_date AS wedding,
        o.return_date AS pengembalian,

        lw.ket_ukuran,

        GROUP_CONCAT(oi.product_name SEPARATOR ', ') AS product_name

      FROM laporan_worker lw
      JOIN orders o ON lw.order_id = o.id
      JOIN users u ON o.user_id = u.id
      JOIN users w ON lw.worker_id = w.id
      LEFT JOIN order_items oi ON oi.order_id = o.id

      WHERE w.role = 'worker'
      GROUP BY lw.id
      ORDER BY lw.created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET LAPORAN ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}

/* POST LAPORAN WORKER */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const order_id = formData.get("order_id");
    const ket_ukuran = formData.get("ket_ukuran") as string;
    const bukti = formData.get("bukti_pembayaran") as File;

    if (!order_id || !bukti || !ket_ukuran?.trim()) {
      return NextResponse.json(
        { message: "Data laporan tidak lengkap" },
        { status: 400 }
      );
    }

    /**
     * NOTE
     * Nanti ganti dari session / auth
     */
    const worker_id = 1;

    await db.query(
      `
      INSERT INTO laporan_worker
        (order_id, worker_id, bukti_pembayaran, ket_ukuran)
      VALUES (?, ?, ?, ?)
      `,
      [
        order_id,
        worker_id,
        bukti.name, // ganti dengan URL Supabase jika upload aktif
        ket_ukuran,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST LAPORAN ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengirim laporan" },
      { status: 500 }
    );
  }
}

/* DELETE LAPORAN WORKER */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID wajib" }, { status: 400 });
    }

    await db.query(
      "DELETE FROM laporan_worker WHERE id = ?",
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE LAPORAN ERROR:", error);
    return NextResponse.json(
      { message: "Gagal menghapus laporan" },
      { status: 500 }
    );
  }
}


























































// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { createClient } from "@supabase/supabase-js";

// /* SUPABASE SERVER CLIENT */
//             // const supabase = createClient(
//             //   process.env.SUPABASE_URL!,
//             //   process.env.SUPABASE_SERVICE_ROLE_KEY! // SERVER ONLY
//             // );

// /* GET LAPORAN WORKER */
// export async function GET() {
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         lw.id,
//         lw.bukti_pembayaran,
//         lw.created_at,

//         u.username AS nama_pengguna,
//         w.username AS worker,

//         o.fitting_date AS fitting,
//         o.wedding_date AS wedding,
//         o.return_date AS pengembalian,

//         lw.ket_ukuran

//       FROM laporan_worker lw
//       JOIN orders o ON lw.order_id = o.id
//       JOIN users u ON o.user_id = u.id
//       JOIN users w ON lw.worker_id = w.id
//       WHERE w.role = 'worker'
//       ORDER BY lw.created_at DESC
//     `);

//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error("GET LAPORAN ERROR:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }

// /* POST LAPORAN WORKER */
// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const order_id = formData.get("order_id");
//     const ket_ukuran = formData.get("ket_ukuran") as string;
//     const bukti = formData.get("bukti_pembayaran") as File;

//     if (!order_id || !bukti || !ket_ukuran?.trim()) {
//       return NextResponse.json(
//         { message: "Data laporan tidak lengkap" },
//         { status: 400 }
//       );
//     }

//     /**
//      * CATATAN PENTING
//      * Ganti ini dengan worker_id dari session / cookie
//      */
//     const worker_id = 1;

//     //  Upload ke Supabase Storage
//               // const filePath = `bukti/${Date.now()}-${bukti.name}`;

//               // const { error } = await supabase.storage
//               //   .from("laporan-worker")
//               //   .upload(filePath, bukti, {
//               //     contentType: bukti.type,
//               //     upsert: false,
//               //   });

//               // if (error) throw error;

//               // const { data } = supabase.storage
//               //   .from("laporan-worker")
//               //   .getPublicUrl(filePath);

//     //  Simpan ke database
//     await db.query(
//       `
//       INSERT INTO laporan_worker
//         (order_id, worker_id, bukti_pembayaran, ket_ukuran)
//       VALUES (?, ?, ?, ?)
//       `,
//       [
//         order_id,
//         worker_id,
//         // data.publicUrl,
//         ket_ukuran,
//       ]
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("POST LAPORAN ERROR:", error);
//     return NextResponse.json(
//       { message: "Gagal mengirim laporan" },
//       { status: 500 }
//     );
//   }
// }

// /* DELETE LAPORAN WORKER */
// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json();

//     if (!id) {
//       return NextResponse.json({ message: "ID wajib" }, { status: 400 });
//     }

//     await db.query(
//       "DELETE FROM laporan_worker WHERE id = ?",
//       [id]
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("DELETE LAPORAN ERROR:", error);
//     return NextResponse.json(
//       { message: "Gagal menghapus laporan" },
//       { status: 500 }
//     );
//   }
// }
