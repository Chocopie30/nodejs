const express = require("express");
const fs = require("fs");

const customerRouter = require("./routes/customers");
const productRouter = require("./routes/products");
const boardsRouter = require("./routes/boards");

// 서버인스턴스
const app = express();
app.use(express.urlencoded({ extended: false })); //user=1234&name=hong
app.use(express.json());

// 라우팅 정보가 파일로 나눠서 작성
// customers.js, products.js
app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/boards", boardsRouter);

// 라우팅 정보 : '/' => 페이지 정보, '/list' => 글 목록 정보
// get/post/put/delete
app.get("/", (req, res) => {
  fs.readFile("./root.html", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("post request to the homepage");
});

// localhost:3000/<params>/<params>...
app.post("/:user/:score", (req, res) => {
  console.log(req.params);
  res.send("post request to the homepage");
});

app.post("/test", (req, res) => {
  const { sno, sname, score } = req.body;

  let result = `<table border='1'>
    <tr><th>학번</th><td>${sno}</td></tr>
    <tr><th>이름</th><td>${sname}</td></tr>
    <tr><th>합격여부</th><td>${
      score >= 60 ? `합격(${score})` : `불합격(${score})`
    }</td></tr>
    </table>`;
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server is runnig on port 3000");
});
