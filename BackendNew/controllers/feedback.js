const feedback = require("../models/feedback");

exports.getmultipleFeedback = (req, res) => {
  var batch = req.query.batch;
  var studentIndex = req.params.studentId;
  if (batch) {
    feedback.getMultipleFeedbackByBatch(studentIndex, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server error" });
      } else {
        res.status(200).send({ feedback: result.data });
      }
    });
  } else {
    feedback.getMultipleFeedback(studentIndex, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server error" });
      } else {
        res.status(200).send({ feedback: result.data });
      }
    });
  }
};

const checkFeedback = (req, isCompleted) => {
  var error = true;
  if (!req.body) {
    isCompleted(error, "Body should not be empty", null);
  } else if (!req.body.feedbackId) {
    isCompleted(error, "FeedbackId should not be empty", null);
  } else if (!req.body.batchId) {
    isCompleted(error, "BatchId should not be empty", null);
  } else if (!req.body.submittedDate) {
    isCompleted(error, "SubmittedDate should not be empty", null);
  } else if (!req.body.companyId) {
    isCompleted(error, "CompanyId should not be empty", null);
  } else if (!req.body.startDate) {
    isCompleted(error, "StartDate should not be empty", null);
  } else if (!req.body.projectBrief) {
    isCompleted(error, "ProjectBrief should not be empty", null);
  } else if (!req.body.mentor) {
    isCompleted(error, "Montor should not be empty", null);
  } else if (!req.body.isGivenAdequateWork) {
    isCompleted(error, "IsGivenAdequateWork should not be empty", null);
  } else if (!req.body.workEnvironment) {
    isCompleted(error, "WorkEnvironment should not be empty", null);
  } else if (!req.body.employeeSupportiveness) {
    isCompleted(error, "EmployeeSupportiveness should not be empty", null);
  } else if (!req.body.managementSupportiveness) {
    isCompleted(error, "ManagementSupportiveness should not be empty", null);
  } else if (!req.body.seniorEngineerCount) {
    isCompleted(error, "SeniorEngineerCount should not be empty", null);
  } else if (!req.body.isPayed) {
    isCompleted(error, "IsPayed should not be empty", null);
  } else if (!req.body.payment) {
    isCompleted(error, "Payment should not be empty", null);
  } else if (!req.body.problems) {
    isCompleted(error, "Problems should not be empty", null);
  } else if (!req.body.suggesions) {
    isCompleted(error, "Suggesions should not be empty", null);
  } else if (!req.body.overallComment) {
    isCompleted(error, "OverallComment should not be empty", null);
  } else if (!req.body.satisfaction) {
    isCompleted(error, "Satisfaction should not be empty", null);
  } else if (!req.body.isRecommended) {
    isCompleted(error, "IsRecommended should not be empty", null);
  } else if (!req.body.contactPerson) {
    isCompleted(error, "ContactPerson should not be empty", null);
  } else if (!req.body.contactPersonPhoneNumber) {
    isCompleted(error, "ContactPersonPhoneNumber should not be empty", null);
  } else if (!req.body.contactPersonEmail) {
    isCompleted(error, "ContactPersonEmail should not be empty", null);
  } else if (!req.body.contactPersonDesignation) {
    isCompleted(error, "ContactPersonDesignation should not be empty", null);
  } else if (!req.body.mentorName) {
    isCompleted(error, "MentorName should not be empty", null);
  } else if (!req.body.mentorPhoneNumber) {
    isCompleted(error, "MentorPhoneNumber should not be empty", null);
  } else if (!req.body.mentorEmail) {
    isCompleted(error, "MentorEmail should not be empty", null);
  } else if (!req.body.mentorDesgnation) {
    isCompleted(error, "MentorDesgnation should not be empty", null);
  } else {
    isCompleted(null, null, true);
  }
};
