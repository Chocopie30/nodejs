const crypto = require("crypto");
// crypto.createHash("sha512").update("pw1234").digest("base64");

// crypto.createHash("sha512").update("pw1234").digest("hex");

// const createSalt = () => {
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(64, (err, buf) => {
//       if (err) reject(err);
//       resolve(buf.toString("base64"));
//     });
//   });
// };

let cryptPasswd = crypto
  .createHash("sha256")
  .update("sample123")
  .digest("base64");
// console.log(cryptPasswd);

// 1. DB의 값을 암호화값 vs 사용자가 입력한 값 암호화값 비교후 판별
let fixedSalt =
  "6NL0kCFuOZwl3F2x0tZb9aBJ0hbSyOLhiqQd+B96Q82v+oEaIbnTKS5GZ0b1xYIXCCXfjDw6a1iCC3Hn0Ic+cw==";
async function getCryptoPassWord(password) {
  // 1. salting 임의의 구문 -> 하나의 비밀번호 암호문을 다른 암호로 계속 변경
  // let salt = crypto.randomBytes(64).toString("base64");
  let dbPass =
    "N7RHnJPW614yeluOI+XqYHL5FhlPdUUM0YGR5+0Kbb0Jxc8dD0ET8gVkiaCHE+XIwrI3Z0eO80xSU/feEi1vTA==";
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, fixedSalt, 100000, 64, "sha512", (err, key) => {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(dbPass == key.toString("base64") ? "same" : "different");
      resolve(dbPass == key.toString("base64") ? "same" : "different");
    });
  });
}

getCryptoPassWord("sample123")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
