const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const feedback = require("../controllers/feedback");
const confirmation = require("../controllers/confirmation");

router.get("/", students.getStudents);

router.post("/", students.createBasicStudent);

router.get("/:studentId", students.getStudent);

router.put("/:studentId", students.updateStudent);

router.delete("/:studentId", students.removeStudent);

router.get("/graph", (req, res) => {
  res.send("Graph");
});

router.get("/:studentId/feedback", feedback.getMultipleFeedback);

router.post("/:studentId/feedback", feedback.createFeedback);

router.get("/:studentId/feedback/:feedbackId", feedback.getFeedback);

router.get("/:studentId/confirmation", confirmation.getConfirmation);

router.post("/:studentId/confirmation", confirmation.createConfirmation);

router.delete("/:studentId/confirmation", confirmation.removeConfirmation);

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
