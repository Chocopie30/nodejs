const express = require("express");
const router = express.Router();

//라우트로 한번에
router
  .route("/")
  .get((req, res) => {
    res.send("Borad Get");
  })
  .post((req, res) => {
    res.send("Borad Post");
  })
  .put((req, res) => {
    res.send("Borad Put");
  })
  .delete((req, res) => {
    res.send("Borad Delete");
  });

module.exports = router;
