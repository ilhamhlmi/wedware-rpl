import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "centerbeam.proxy.rlwy.net",
  user: "root",
  password: "iJsBtnAnroQzPlkeRUmUvdrGwpLAIEJd",
  database: "railway",
  port: 30911,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});









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