const { Console } = require("console");
const fs = require("fs");

const output = fs.createWriteStream("./stdout.log", { flags: "a" });
const errOutput = fs.createWriteStream("./stderr.log", { flags: "a" });

const logger = new Console({ stdout: output, stderr: errOutput });

//log():로그, error():에러로그
logger.log("Pronts to stdout with newline\n");
logger.error("!! Standard I/O Error !!\n");
