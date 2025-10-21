const express = require("express");
const mysql = require("./sql");
const xlsx = require("xlsx");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const app = express();
const PORT = 3000;

// 정적디렉토리 설정
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "50mb",
  })
);

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

// 라우팅 정보
app.get("/", (req, res) => {
  res.send("Root Page");
});

let task = null;

function createTask() {
  return cron.schedule(
    "*/10 * * * * *",
    async () => {
      let result = await mysql.queryExecute("select * from customers", []);
      console.log(result);

      const htmlTable = `
        <h2>고객 목록</h2>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            ${result
              .map(
                (row) => `
              <tr>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.phone}</td>
                <td>${row.address}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;

      const data = {
        from: "jaeun-99@daum.net",
        to: "tjdcksgur.1@daum.net",
        subject: "이게 제목이겠죠?",
        html: htmlTable,
      };
      transporter.sendMail(data, (err, info) => {
        if (err) {
          console.log(err);
          // res.status(500).send({ error: err.message });
        } else {
          console.log(info);
        }
      });
    },
    {
      scheduled: false,
    }
  );
}

app.get("/cron/start", (req, res) => {
  if (!task) task = createTask();
  task.start();
  res.send("start");
});

app.get("/cron/stop", (req, res) => {
  if (task) task.stop();
  res.send("stop");
});

// customers 테이블 조회 -> 엑셀 파일 -> 이메일 전송
app.get("/customerInfo", async (req, res) => {
  //엑셀파일로 만들기
  mysql
    .queryExecute("select id,name,email,phone,address from customers", [])
    .then((result) => {
      console.log(result); // 엑셀파일 데이터
      // 워크북 생성 -> sheet추가 -> 파일 저장
      const workbook = xlsx.utils.book_new();
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ["id", "name", "email", "phone", "address"],
      });
      // workbook에 sheet 추가
      xlsx.utils.book_append_sheet(workbook, firstSheet, "customers");
      // 파일 저장
      xlsx.writeFile(workbook, "./files/customers.xlsx");
    })
    .catch((err) => {
      console.log(err);
    });
  // 메일 보내기
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
  await transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      // res.status(500).send({ error: err.message });
    } else {
      console.log(info);
    }
  });
  res.send("ok");
});

// 이미지 받아 저장하기
app.post("/upload/:productId/:type/:fileName", (req, res) => {
  const dir = `files/${req.params.productId}/${req.params.type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = `${dir}/${req.params.fileName}`;
  // console.log(req.params);

  const base64Data = req.body.imageBase64.slice(
    req.body.imageBase64.indexOf(";base64") + 8
  );
  fs.writeFile(`${filePath}`, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 저장 중 오류");
    }
    console.log("파일 저장 완료");
  });
  res.send("ok");
});

// 업로드된 파일 받아다가 db저장
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "files/"),
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload/excels", upload.single("excelFile"), async (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  const excelData = xlsx.utils.sheet_to_json(firstSheet);

  excelData.forEach(async (item) => {
    let result = await mysql.queryExecute("insert into customers set ?", [
      item,
    ]);
    console.log(result);
  });
  res.send("업로드 완료");
});

app.listen(PORT, () => {
  console.log(`Server Run on http://localhost:${PORT}`);
});
