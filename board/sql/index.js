const mysql = require("mysql2/promise");

//mysql 연결 설정
const dbConfig = {
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
  port: 3306,
  connectionLimit: 10,
};
const pool = mysql.createPool(dbConfig);

async function queryExecute(sql, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { queryExecute };
