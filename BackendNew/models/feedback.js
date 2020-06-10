// Import database connection
const sql = require("./database.js");

exports.getMultipleFeedback = (studentId, sendFeedback) => {
  var sqlString =
    "SELECT FeedbackId, BatchId, IndexNumber FROM feedback WHERE IndexNumber = ?";
  sql.query(sqlString, [studentId], (err, result) => {
    if (err) {
      sendFeedback(err, null);
    } else {
      sendFeedback(null, { data: result });
    }
  });
};

exports.getMultipleFeedbackByBatch = (studentId, batchId, sendFeedback) => {
  var sqlString =
    "SELECT FeedbackId, BatchId, IndexNumber FROM feedback WHERE IndexNumber = ? AND BatchId = ?";
  sql.query(sqlString, [studentId, batchId], (err, result) => {
    if (err) {
      sendFeedback(err, null);
    } else {
      sendFeedback(null, { data: result });
    }
  });
};

exports.Feedback = function(feedback) {
  this.FeedbackId = feedback.FeedbackId;
  this.BatchId = feedback.BatchId;
  this.IndexNumber = feedback.IndexNumber;
  this.SubmittedDate = feedback.SubmittedDate;
  this.CompanyId = feedback.CompanyId;
  this.StartDate = feedback.StartDate;
  this.ProjectBrief = feedback.ProjectBrief;
  this.Mentor = feedback.Mentor;
  this.IsGivenAdequateWork = feedback.IsGivenAdequateWork;
  this.WorkEnvironment = feedback.WorkEnvironment;
  this.EmployeeSupportiveness = feedback.EmployeeSupportiveness;
  this.ManagementSupportiveness = feedback.ManagementSupportiveness;
  this.SeniorEngineerCount = feedback.SeniorEngineerCount;
  this.IsPayed = feedback.IsPayed;
  this.Payment = feedback.Payment;
  this.Problems = feedback.Problems;
  this.Suggesions = feedback.Suggesions;
  this.OverallComment = feedback.OverallComment;
  this.Satisfaction = feedback.Satisfaction;
  this.IsRecommended = feedback.IsRecommended;
  this.ContactPerson = feedback.ContactPerson;
  this.ContactPersonPhoneNumber = feedback.ContactPersonPhoneNumber;
  this.ContactPersonEmail = feedback.ContactPersonEmail;
  this.ContactPersonDesignation = feedback.ContactPersonDesignation;
  this.MentorName = feedback.MentorName;
  this.MentorPhoneNumber = feedback.MentorPhoneNumber;
  this.MentorEmail = feedback.MentorEmail;
  this.MentorDesgnation = feedback.MentorDesgnation;
};

exports.createFeedback = (feedback, isCreated) => {
  var feedbackSql = "INSERT INTO feedback SET ?";
  sql.query(feedbackSql, feedback, (err, result) => {
    if (err) {
      console.log("error: ", err);
      isCreated(err, null);
    } else {
      console.log("created feddback: ", { id: result.insertId, ...feedback });
      isCreated(null, result);
    }
  });
};

exports.getFeedback = (studentId, batchId, feedbackId, sendFeedback) => {
  var sqlString =
    "SELECT * FROM feedback WHERE IndexNumber = ? AND BatchId = ? AND FeedbackId = ?";
  sql.query(sqlString, [studentId, batchId, feedbackId], (err, result) => {
    if (err) {
      sendFeedback(err, null);
    } else {
      sendFeedback(null, { data: result[0] });
    }
  });
};
