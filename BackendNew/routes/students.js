const express = require("express");
const router = express.Router();
const students = require("../controllers/students");

router.get("/", students.getStudents);

router.post("/", students.createBasicStudent);

router.get("/:studentId", students.getStudent);

router.put("/:studentId", students.updateStudent);

router.delete("/:studentId", (req, res) => {
  res.send("delete student Id");
});

router.get("/graph", (req, res) => {
  res.send("Graph");
});

router.get("/:studentId/feedback", (req, res) => {
  res.send("get student feedback");
});

router.post("/:studentId/feedback", (req, res) => {
  res.send("post student feedback");
});

router.get("/:studentId/feedback/:feedbackId", (req, res) => {
  res.send("get student feedback id");
});

router.get("/:studentId/confirmation", (req, res) => {
  res.send("get student confirmation");
});

router.post("/:studentId/confirmation", (req, res) => {
  res.send("post student confirmation");
});

router.get("/:studentId/reports", (req, res) => {
  res.send("get student reports");
});

router.post("/:studentId/reports", (req, res) => {
  res.send("post student reports");
});

router.get("/:studentId/reports/:reportsId", (req, res) => {
  res.send("get student reports id");
});

module.exports = router;
