"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import hero from "@/public/hero/hero.jpg";
import hero3 from "@/public/hero/hero3.jpg";

export default function UserLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    router.replace("/");
  };

  return (
    <section>
      <Image src={hero} alt="hero" fill className="hidden lg:flex object-cover -z-10 inset-0" />
      <Image src={hero3} alt="hero3" fill className="lg:hidden object-cover -z-10 inset-0" />
      <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/60" />

      <div className="container mx-auto">
        <div className="flex items-center justify-center min-h-screen px-4 xl:px-0">
          <div className="w-full flex flex-col items-center max-w-md bg-ivory/5 backdrop-blur-2xl rounded-2xl shadow-md py-5">
            <h1 className="font-edu text-3xl font-semibold text-ivory mb-6">Login</h1>

            <input
              className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory font-poppins focus:outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />

            <input
              type="password"
              autoComplete="off"
              className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory font-poppins focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="border rounded-full mt-2 px-6 py-2 font-poppins border-primary bg-primary hover:bg-olivegreen hover:border-olivegreen shadow-md hover:shadow-2xl duration-300 text-ivory cursor-pointer w-2/3"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-sm text-ivory mt-3 font-poppins">
              Not registered yet? <Link href="/signup" className="font-semibold font-poppins">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}




























// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import hero from "@/public/hero/hero.jpg";
// import hero3 from "@/public/hero/hero3.jpg";

// export default function Login() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);

//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) {
//       alert(data.message);
//       return;
//     }

//     // REDIRECT BERDASARKAN ROLE
//     const role = data.user.role;

//     if (role === "admin") {
//       router.replace("/admin");
//     } else if (role === "worker") {
//       router.replace("/worker/dashboard");
//     } else {
//       router.replace("/");
//     }
//   };

//   return (
//     <section>
//       <Image src={hero} alt="hero" fill className="hidden lg:flex object-cover -z-10 inset-0" />
//       <Image src={hero3} alt="hero3" fill className="lg:hidden object-cover -z-10 inset-0" />
//       <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/60" />

//       <div className="container mx-auto">
//         <div className="flex items-center justify-center min-h-screen px-4 xl:px-0">
//           <div className="w-full flex flex-col items-center max-w-md bg-ivory/5 backdrop-blur-2xl rounded-2xl shadow-md py-5">
//             <h1 className="font-edu text-3xl font-semibold text-ivory mb-6">Login</h1>

//             <input
//               className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory font-poppins focus:outline-none"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               autoComplete="off"
//             />

//             <input
//               type="password"
//               autoComplete="off"
//               className="border-b w-2/3 mb-3 px-4 py-2 bg-transparent text-ivory font-poppins focus:outline-none"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="border rounded-full mt-2 px-6 py-2 w-2/3 bg-primary text-ivory font-poppins"
//             >
//               {loading ? "Loading..." : "Login"}
//             </button>

//             <p className="text-sm text-ivory mt-3 font-poppins">
//               Not registered yet? <Link href="/signup" className="font-semibold">Sign Up</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
