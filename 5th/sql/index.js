const mysql = require("mysql2/promise");

//mysql connection setup
const dbConfig = {
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
  port: 3306,
  connectionLimit: 10,
};

//create the connection pool
const pool = mysql.createPool(dbConfig);

function queryExecute(sql, params) {
  let connection;
  return new Promise(async (resolve, reject) => {
    try {
      let conn = await pool.getConnection();
      connection = conn;
      const [rows, fields] = await connection.query(sql, params);
      resolve(rows);
    } catch {
      reject(err);
    } finally {
      if (connection) connection.release();
    }
  });
}

module.exports = { queryExecute };
