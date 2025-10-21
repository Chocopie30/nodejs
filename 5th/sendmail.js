const nodemailer = require("nodemailer");
const express = require("express");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function mainSendFunc() {
  const data = {
    from: "jaeun-99@daum.net",
    to: "tjdcksgur.1@daum.net",
    subject: "이게 제목이겠죠?",
    html: "이건 내용이에오",
    attachments: [
      {
        filename: "customers.xlsx",
        path: "./files/customers.xlsx",
      },
    ],
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      // res.status(500).send({ error: err.message });
    } else {
      console.log(info);
    }
  });
}
