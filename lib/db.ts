import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "wedware",
  port: 3306,
});

export default pool;








//contoh yang lapcare

// import mysql from "mysql2/promise";

// export const db = mysql.createPool({
//   host: "interchange.proxy.rlwy.net",
//   port: 36631,                  // Port harus terpisah seperti ini
//   user: "root",
//   password: "pgkSuXlsZyfRewrdhtjnvFfcBkymqwAH",
//   database: "railway",          // Ini nama DB default di Railway
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });