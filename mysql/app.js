const express = require("express");
const mysql = require("./sql/index");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { rejects } = require("assert");

//express app setup
const app = express();
const port = 3000;

// 정적디렉토리 설정
app.use(express.static("public"));

// nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "jaeun-99@daum.net",
    pass: "hcvsmzfumwbvsgom",
  },
});

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 바로 메일 보내기
app.get("/sendmail", (req, res) => {
  const data = {
    from: "jaeun-99@daum.net",
    to: "tjdcksgur.1@daum.net",
    subject: "Test Email",
    html: "TTTTEEEEESSSSSSTTTT",
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      res.send("email");
    }
  });
});

// 이름 전화번호로 그 사람한테 메일 보내기
app.get("/checkMail", async (req, res) => {
  const userName = req.query.userName;
  const userTel = req.query.phone;

  const result = await mysql.queryExecute(
    "select email from customers where name=? and phone=?",
    [userName, userTel]
  );

  if (result.lenght === 0) {
    return res.send("no matching user found");
  }

  const data = {
    from: "jaeun-99@daum.net",
    to: result[0].email,
    subject: "password reset",
    html: "1234",
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      res.send("ㅇㅇ");
    }
  });
});

// 회원등록
app.post("/signup", async (req, res) => {
  const { userid, password, email, phone } = req.body;

  try {
    // 비밀번호 해시 생성 (Promise + await)
    const { salt, hash } = await new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(64).toString("base64");
      crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
        if (err) {
          reject(err); // 오타 수정
          return;
        }
        resolve({ salt, hash: key.toString("base64") });
      });
    });

    // DB 저장
    const result = await mysql.queryExecute(
      `INSERT INTO customers(name, email, phone, password_salt, password_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [userid, email, phone, salt, hash]
    );

    res.send("회원가입 성공!");
  } catch (err) {
    console.error(err);
    res.status(500).send("signup failed");
  }
});

// 로그인
app.post("/sigin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 이메일로 사용자 정보 조회
    const rows = await mysql.queryExecute(
      `SELECT name, email, password_salt, password_hash 
       FROM customers 
       WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).send("등록되지 않은 이메일입니다.");
    }

    const user = rows[0];

    // 입력한 비밀번호를 DB에 저장된 salt로 해싱
    const hashedInput = await new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        user.password_salt,
        100000,
        64,
        "sha512",
        (err, key) => {
          if (err) return reject(err);
          resolve(key.toString("base64"));
        }
      );
    });

    // 해싱 결과를 DB의 hash와 비교
    if (hashedInput === user.password_hash) {
      res.send(`로그인 성공! ${user.name}님 환영합니다.`);
    } else {
      res.status(401).send("비밀번호가 일치하지 않습니다.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("로그인 실패 (서버 오류)");
  }
});

//customers table - select all
app.get("/customers", async (req, res) => {
  let result = await mysql.queryExecute("select * from customers", []);
  res.send(result);
});

app.get("/customer/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(
    "select * from customers where id = ?",
    [id]
  );
  res.send(result);
});

app.post("/customer", async (req, res) => {
  const param = req.body.param;
  let result = await mysql.queryExecute(`insert into customers set ?`, param);
  res.send(result);
});

app.delete("/customer/:id", async (req, res) => {
  const id = req.params.id;
  let result = await mysql.queryExecute(`delete from customers where id =?`, [
    id,
  ]);
  res.send(result);
});

app.put("/customer", async (req, res) => {
  const param = req.body.param;
  let result = await mysql.queryExecute(
    `update customers set ? where id = ?`,
    param
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
