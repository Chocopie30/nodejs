// setTimeout, setInterval

const fs = require("fs");
const process = require("process");
const os = require("os");

// console.log(process.env.USERNAME);
// process.exit();

console.log(os.arch());
console.log(os.cpus());
console.log(os.networkInterfaces());

// setTimeout(() => {
//   console.log("one time");
// }, 1000);

fs.readFile("sample.txt11", "utf-8", (err, data) => {
  if (err) {
    return;
  }
  let cnt = 0;
  let max = data.length;

  let job = setInterval(() => {
    console.clear();
    console.log(data.substring(0, cnt++));
    if (cnt == max) {
      clearInterval(job);
    }
  }, 200);
});
