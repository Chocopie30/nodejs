const cron = require("node-cron");
const mysql = require("./sql");
const winston = require("winston");

const task = cron.schedule(
  "* * * * * *",
  async () => {
    let result = await mysql.queryExecute("select * from customers", []);
    console.log(`customers 테이블 현재: ${result.length}건`);
  },
  {
    scheduled: false,
  }
);
