const express = require("express");
const mysql = require("./sql");
const cors = require("cors");

//express app 설정
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("연결됨");
});

// boards (get)
app.get("/boards", async (req, res) => {
  try {
    const rows = await mysql.queryExecute(
      "SELECT * FROM tbl_board ORDER BY id DESC",
      []
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "목록 조회 실패" });
  }
});

// board (get) 조회
app.get("/board/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await mysql.queryExecute(
      "SELECT * FROM tbl_board WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: "없음" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "조회 실패" });
  }
});

// board (post) 등록
app.post("/board", async (req, res) => {
  try {
    const { title, content, writer } = req.body || {};
    if (!title || !content || !writer) {
      return res;
    }

    // 명시적 컬럼 INSERT 권장
    const result = await mysql.queryExecute(
      "INSERT INTO tbl_board (title, content, writer) VALUES (?, ?, ?)",
      [title, content, writer]
    );

    const newItem = { id: result.insertId, title, content, writer };
    res.status(201).json(newItem);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "등록 실패" });
  }
});

// board (put) 수정
// server.js
app.put("/board/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body || {};
    await mysql.queryExecute(
      "UPDATE tbl_board SET title = ?, content = ? WHERE id = ?",
      [title, content, id]
    );
    // 수정된 데이터 돌려주면 프론트가 그대로 반영 가능
    res.json({ id: Number(id), title, content });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "수정 실패" });
  }
});

// board (delete) 삭제
app.delete("/board/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await mysql.queryExecute(
      "DELETE FROM tbl_board WHERE id = ?",
      [id]
    );
    res.json({ affectedRows: result.affectedRows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "삭제 실패" });
  }
});

// 댓글
app.get("/replies/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    if (!postId)
      return res.status(400).json({ message: "유효한 postId가 필요합니다." });

    const rows = await mysql.queryExecute(
      "SELECT re_id, re_content, re_writer, re_write_date, post_id FROM tbl_reply WHERE post_id = ? ORDER BY re_id DESC",
      [postId]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "댓글 목록 조회 실패" });
  }
});

// 댓글 등록
// body: { re_content, re_writer, post_id }
app.post("/replies", async (req, res) => {
  try {
    const { re_content, re_writer, post_id } = req.body || {};
    const content = String(re_content || "").trim();
    const writer = String(re_writer || "").trim();
    const postId = Number(post_id);

    if (!content || !writer || !postId) {
      return res
        .status(400)
        .json({ message: "re_content, re_writer, post_id는 필수입니다." });
    }

    const result = await mysql.queryExecute(
      "INSERT INTO tbl_reply (re_content, re_writer, post_id) VALUES (?, ?, ?)",
      [content, writer, postId]
    );

    // 방금 생성된 댓글 반환
    const rows = await mysql.queryExecute(
      "SELECT re_id, re_content, re_writer, re_write_date, post_id FROM tbl_reply WHERE re_id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e); // FK 위반 시에도 여기로 들어올 수 있음
    res.status(500).json({ message: "댓글 등록 실패" });
  }
});

// 댓글 수정
// body: { re_content }
app.put("/replies/:reId", async (req, res) => {
  try {
    const reId = Number(req.params.reId);
    const content = String((req.body || {}).re_content || "").trim();
    if (!reId || !content) {
      return res
        .status(400)
        .json({ message: "유효한 reId와 re_content가 필요합니다." });
    }

    const result = await mysql.queryExecute(
      "UPDATE tbl_reply SET re_content = ? WHERE re_id = ?",
      [content, reId]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ message: "대상 댓글이 없습니다." });
    }

    const rows = await mysql.queryExecute(
      "SELECT re_id, re_content, re_writer, re_write_date, post_id FROM tbl_reply WHERE re_id = ?",
      [reId]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "댓글 수정 실패" });
  }
});

// 댓글 삭제
app.delete("/replies/:reId", async (req, res) => {
  try {
    const reId = Number(req.params.reId);
    if (!reId)
      return res.status(400).json({ message: "유효한 reId가 필요합니다." });

    const result = await mysql.queryExecute(
      "DELETE FROM tbl_reply WHERE re_id = ?",
      [reId]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ message: "대상 댓글이 없습니다." });
    }

    res.json({ message: "삭제 완료", re_id: reId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "댓글 삭제 실패" });
  }
});

// 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
