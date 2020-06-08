// Import database connection
const sql = require("./database.js");

exports.getStudentsByBatch = (batch, sendStudentsByBatch) => {
  var sqlString =
    "( SELECT S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, NULL as IsSelected, NULL as CompanyId, NULL as CompanyName from student S, student_has_batch H, Batch B where s.IndexNumber = H.IndexNumber  AND H.BatchId = B.BatchId AND B.BatchId = ? AND s.IndexNumber NOT IN ( SELECT S.IndexNumber from student S, student_has_batch H, Batch B, student_select_company SC where s.IndexNumber = H.IndexNumber AND H.BatchId = B.BatchId AND SC.IndexNumber = S.IndexNumber AND SC.BatchId = B.BatchId AND B.BatchId = ? AND SC.IsSelected = 1 ) GROUP BY S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId ) UNION ( SELECT S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, Sc.IsSelected, C.CompanyId, C.Name as CompanyName from student S, student_has_batch H, Batch B, student_select_company SC, Company C where s.IndexNumber = H.IndexNumber AND H.BatchId = B.BatchId AND SC.IndexNumber = S.IndexNumber AND SC.BatchId = B.BatchId AND SC.IsSelected = 1 AND C.CompanyId = SC.CompanyId AND B.BatchId = ? GROUP BY S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, SC.IsSelected, C.CompanyId, C.Name)";
  sql.query(sqlString, [batch, batch, batch], (err, result) => {
    if (err) {
      sendStudentsByBatch(err, null);
    } else {
      sendStudentsByBatch(null, { data: result });
    }
  });
};

exports.getSelectedStudentsByBatch = (
  isSelected,
  batch,
  sendSelectedStudentsByBatch
) => {
  if (isSelected == "true") {
    var sqlString = `
    SELECT
        S.IndexNumber,
        S.FullName,
        S.NameWithInitials,
        S.PhoneNumber,
        S.Email,
        S.Sem1GPA,
        S.Sem2GPA,
        S.Sem3GPA,
        S.Sem4GPA,
        S.SGPA,
        B.BatchId,
        Sc.IsSelected,
        C.CompanyId,
        C.Name as CompanyName
    FROM
        student S,
        student_has_batch H,
        Batch B,
        student_select_company SC,
        Company C
    WHERE
        s.IndexNumber = H.IndexNumber
        AND H.BatchId = B.BatchId
        AND SC.IndexNumber = S.IndexNumber
        AND SC.BatchId = B.BatchId
        AND SC.IsSelected = 1
        AND C.CompanyId = SC.CompanyId
        AND B.BatchId = ?
    GROUP BY
        S.IndexNumber,
        S.FullName,
        S.NameWithInitials,
        S.PhoneNumber,
        S.Email,
        S.Sem1GPA,
        S.Sem2GPA,
        S.Sem3GPA,
        S.Sem4GPA,
        S.SGPA,
        B.BatchId,
        SC.IsSelected,
        C.CompanyId,
        C.Name`;
    sql.query(sqlString, [batch], (err, result) => {
      if (err) {
        sendSelectedStudentsByBatch(err, null);
      } else {
        sendSelectedStudentsByBatch(null, { data: result });
      }
    });
  } else if (isSelected == "false") {
    var sqlString = `
    SELECT
            S.IndexNumber,
            S.FullName,
            S.NameWithInitials,
            S.PhoneNumber,
            S.Email,
            S.Sem1GPA,
            S.Sem2GPA,
            S.Sem3GPA,
            S.Sem4GPA,
            S.SGPA,
            B.BatchId,
            NULL as IsSelected,
            NULL as CompanyId,
            NULL as CompanyName
        from
            student S,
            student_has_batch H,
            Batch B
        where
            s.IndexNumber = H.IndexNumber
            AND H.BatchId = B.BatchId
            AND B.BatchId = ?
            AND s.IndexNumber NOT IN (
                SELECT
                    S.IndexNumber
                from
                    student S,
                    student_has_batch H,
                    Batch B,
                    student_select_company SC
                where
                    s.IndexNumber = H.IndexNumber
                    AND H.BatchId = B.BatchId
                    AND SC.IndexNumber = S.IndexNumber
                    AND SC.BatchId = B.BatchId
                    AND B.BatchId = ?
                    AND SC.IsSelected = 1
            )
        GROUP BY
            S.IndexNumber,
            S.FullName,
            S.NameWithInitials,
            S.PhoneNumber,
            S.Email,
            S.Sem1GPA,
            S.Sem2GPA,
            S.Sem3GPA,
            S.Sem4GPA,
            S.SGPA,
            B.BatchId
    `;
    sql.query(sqlString, [batch, batch], (err, result) => {
      if (err) {
        sendSelectedStudentsByBatch(err, null);
      } else {
        sendSelectedStudentsByBatch(null, { data: result });
      }
    });
  } else {
    err = Error("Invalid query param");
    sendSelectedStudentsByBatch(err, null);
  }
};

exports.getSelectedStudentsByCompanyBatch = (
  batchId,
  companyId,
  sendSelectedStudentsByCompanyBatch
) => {
  var sqlString = `
      SELECT
      S.IndexNumber,
      S.FullName,
      S.NameWithInitials,
      S.PhoneNumber,
      S.Email,
      S.Sem1GPA,
      S.Sem2GPA,
      S.Sem3GPA,
      S.Sem4GPA,
      S.SGPA,
      B.BatchId,
      Sc.IsSelected,
      C.CompanyId,
      C.Name as CompanyName
    from
      student S,
      student_has_batch H,
      Batch B,
      student_select_company SC,
      Company C
    where
      s.IndexNumber = H.IndexNumber
      AND H.BatchId = B.BatchId
      AND SC.IndexNumber = S.IndexNumber
      AND SC.BatchId = B.BatchId
      AND SC.IsSelected = 1
      AND C.CompanyId = SC.CompanyId
      AND B.BatchId = ?
      AND C.CompanyId = ?
    GROUP BY
      S.IndexNumber,
      S.FullName,
      S.NameWithInitials,
      S.PhoneNumber,
      S.Email,
      S.Sem1GPA,
      S.Sem2GPA,
      S.Sem3GPA,
      S.Sem4GPA,
      S.SGPA,
      B.BatchId,
      SC.IsSelected,
      C.CompanyId,
      C.Name`;
  sql.query(sqlString, [batchId, companyId], (err, result) => {
    if (err) {
      sendSelectedStudentsByCompanyBatch(err, null);
    } else {
      sendSelectedStudentsByCompanyBatch(null, { data: result });
    }
  });
};

exports.getSelectedStudents = (isSelected, sendSelectedStudents) => {
  if (isSelected == "true") {
    var sqlString = `
    SELECT
        S.IndexNumber,
        S.FullName,
        S.NameWithInitials,
        S.PhoneNumber,
        S.Email,
        S.Sem1GPA,
        S.Sem2GPA,
        S.Sem3GPA,
        S.Sem4GPA,
        S.SGPA,
        B.BatchId,
        Sc.IsSelected,
        C.CompanyId,
        C.Name as CompanyName
    FROM
        student S,
        student_has_batch H,
        Batch B,
        student_select_company SC,
        Company C
    WHERE
        s.IndexNumber = H.IndexNumber
        AND H.BatchId = B.BatchId
        AND SC.IndexNumber = S.IndexNumber
        AND SC.BatchId = B.BatchId
        AND SC.IsSelected = 1
        AND C.CompanyId = SC.CompanyId
    GROUP BY
        S.IndexNumber,
        S.FullName,
        S.NameWithInitials,
        S.PhoneNumber,
        S.Email,
        S.Sem1GPA,
        S.Sem2GPA,
        S.Sem3GPA,
        S.Sem4GPA,
        S.SGPA,
        B.BatchId,
        SC.IsSelected,
        C.CompanyId,
        C.Name`;
    sql.query(sqlString, (err, result) => {
      if (err) {
        sendSelectedStudents(err, null);
      } else {
        sendSelectedStudents(null, { data: result });
      }
    });
  } else if (isSelected == "false") {
    var sqlString = `
    SELECT
            S.IndexNumber,
            S.FullName,
            S.NameWithInitials,
            S.PhoneNumber,
            S.Email,
            S.Sem1GPA,
            S.Sem2GPA,
            S.Sem3GPA,
            S.Sem4GPA,
            S.SGPA,
            B.BatchId,
            NULL as IsSelected,
            NULL as CompanyId,
            NULL as CompanyName
        from
            student S,
            student_has_batch H,
            Batch B
        where
            s.IndexNumber = H.IndexNumber
            AND H.BatchId = B.BatchId
            AND s.IndexNumber NOT IN (
                SELECT
                    S.IndexNumber
                from
                    student S,
                    student_has_batch H,
                    Batch B,
                    student_select_company SC
                where
                    s.IndexNumber = H.IndexNumber
                    AND H.BatchId = B.BatchId
                    AND SC.IndexNumber = S.IndexNumber
                    AND SC.BatchId = B.BatchId
                    AND SC.IsSelected = 1
            )
        GROUP BY
            S.IndexNumber,
            S.FullName,
            S.NameWithInitials,
            S.PhoneNumber,
            S.Email,
            S.Sem1GPA,
            S.Sem2GPA,
            S.Sem3GPA,
            S.Sem4GPA,
            S.SGPA,
            B.BatchId
    `;
    sql.query(sqlString, (err, result) => {
      if (err) {
        sendSelectedStudents(err, null);
      } else {
        sendSelectedStudents(null, { data: result });
      }
    });
  } else {
    err = Error("Invalid query param");
    sendSelectedStudents(err, null);
  }
};

exports.getSelectedStudentsByCompany = (
  companyId,
  sendSelectedStudentsByCompany
) => {
  var sqlString = `
      SELECT
      S.IndexNumber,
      S.FullName,
      S.NameWithInitials,
      S.PhoneNumber,
      S.Email,
      S.Sem1GPA,
      S.Sem2GPA,
      S.Sem3GPA,
      S.Sem4GPA,
      S.SGPA,
      B.BatchId,
      Sc.IsSelected,
      C.CompanyId,
      C.Name as CompanyName
    from
      student S,
      student_has_batch H,
      Batch B,
      student_select_company SC,
      Company C
    where
      s.IndexNumber = H.IndexNumber
      AND H.BatchId = B.BatchId
      AND SC.IndexNumber = S.IndexNumber
      AND SC.BatchId = B.BatchId
      AND SC.IsSelected = 1
      AND C.CompanyId = SC.CompanyId
      AND C.CompanyId = ?
    GROUP BY
      S.IndexNumber,
      S.FullName,
      S.NameWithInitials,
      S.PhoneNumber,
      S.Email,
      S.Sem1GPA,
      S.Sem2GPA,
      S.Sem3GPA,
      S.Sem4GPA,
      S.SGPA,
      B.BatchId,
      SC.IsSelected,
      C.CompanyId,
      C.Name`;
  sql.query(sqlString, [companyId], (err, result) => {
    if (err) {
      sendSelectedStudentsByCompany(err, null);
    } else {
      sendSelectedStudentsByCompany(null, { data: result });
    }
  });
};

exports.getStudents = sendStudents => {
  var sqlString = `(
      SELECT 
        S.IndexNumber, 
        S.FullName, 
        S.NameWithInitials, 
        S.PhoneNumber, 
        S.Email, 
        S.Sem1GPA, 
        S.Sem2GPA, 
        S.Sem3GPA, 
        S.Sem4GPA, 
        S.SGPA, 
        B.BatchId, 
        NULL as IsSelected, 
        NULL as CompanyId, 
        NULL as CompanyName 
      FROM 
        student S, 
        student_has_batch H, 
        Batch B 
      WHERE 
        s.IndexNumber = H.IndexNumber  
        AND H.BatchId = B.BatchId 
        AND s.IndexNumber NOT IN ( 
          SELECT 
            S.IndexNumber 
          FROM 
            student S, 
            student_has_batch H, 
            Batch B, 
            student_select_company SC 
          WHERE 
            s.IndexNumber = H.IndexNumber 
            AND H.BatchId = B.BatchId 
            AND SC.IndexNumber = S.IndexNumber 
            AND SC.BatchId = B.BatchId 
            AND SC.IsSelected = 1 
          ) 
      GROUP BY 
        S.IndexNumber, 
        S.FullName, 
        S.NameWithInitials, 
        S.PhoneNumber, 
        S.Email, 
        S.Sem1GPA, 
        S.Sem2GPA, 
        S.Sem3GPA, 
        S.Sem4GPA, 
        S.SGPA, 
        B.BatchId 
    ) 
    UNION 
    ( 
      SELECT 
        S.IndexNumber, 
        S.FullName, 
        S.NameWithInitials, 
        S.PhoneNumber, 
        S.Email, 
        S.Sem1GPA, 
        S.Sem2GPA, 
        S.Sem3GPA, 
        S.Sem4GPA, 
        S.SGPA, 
        B.BatchId, 
        Sc.IsSelected, 
        C.CompanyId, 
        C.Name as CompanyName 
      FROM 
        student S, 
        student_has_batch H, 
        Batch B, 
        student_select_company SC, 
        Company C 
      WHERE 
        s.IndexNumber = H.IndexNumber 
        AND H.BatchId = B.BatchId 
        AND SC.IndexNumber = S.IndexNumber 
        AND SC.BatchId = B.BatchId 
        AND SC.IsSelected = 1 
        AND C.CompanyId = SC.CompanyId 
      GROUP BY 
        S.IndexNumber, 
        S.FullName, 
        S.NameWithInitials, 
        S.PhoneNumber, 
        S.Email, 
        S.Sem1GPA, 
        S.Sem2GPA, 
        S.Sem3GPA, 
        S.Sem4GPA, 
        S.SGPA, 
        B.BatchId, 
        SC.IsSelected, 
        C.CompanyId, 
        C.Name
      )`;
  sql.query(sqlString, (err, result) => {
    if (err) {
      sendStudents(err, null);
    } else {
      sendStudents(null, { data: result });
    }
  });
};

exports.getStudentById = (studentId, sendStudent) => {
  var basicStudentSQL = `
  SELECT
    S.IndexNumber,
    S.FullName,
    S.NameWithInitials,
    S.PhoneNumber,
    S.Email,
    S.Sem1GPA,
    S.Sem2GPA,
    S.Sem3GPA,
    S.Sem4GPA,
    S.SGPA,
    S.PreferedArea1,
    S.PreferedArea2,
    S.PreferedArea3
  from
    student S
  WHERE
    s.IndexNumber = ?`;
  var studentCvAndStartDateSQL = `
  SELECT
    H.cv,
    H.DateOfStart,
    H.BatchId
  from
      student S,
      Student_has_batch H
  where
      s.IndexNumber = H.IndexNumber
      AND s.IndexNumber = ?`;
  var preferedCompaniesSQL = `
  SELECT
    C.Name,
    SC.batchId
  FROM
    student S,
    Student_select_company SC,
    Company C
  WHERE
    S.IndexNumber = SC.IndexNumber
    AND SC.CompanyId = C.CompanyId
    AND S.IndexNumber=?`;
  var selectedCompanySQL = `
  SELECT
    C.Name,
    SC.batchId,
    SC.IsSelected
  FROM
    student S,
    Student_select_company SC,
    Company C
  WHERE
    S.IndexNumber = SC.IndexNumber
    AND SC.CompanyId = C.CompanyId
    AND SC.IsSelected = 1
    AND S.IndexNumber = ?
  `;
  var internBatchesSQL = `
  SELECT
    H.cv,
    H.BatchId
  from
      student S,
      Student_has_batch H
  where
      s.IndexNumber = H.IndexNumber
      AND s.IndexNumber = ?
  `;
  var batchesMap = new Map();
  var companiesMap = new Map();
  sql.query(basicStudentSQL, [studentId], (err, sendBasicStudent) => {
    if (err) {
      sendStudent(err, null);
    } else {
      // To get intern batches.
      sql.query(internBatchesSQL, [studentId], (err, batches) => {
        if (err) {
          sendStudent(err, null);
        } else {
          batches.forEach(value => {
            batchesMap.set(value.BatchId, []);
            companiesMap.set(value.BatchId, []);
          });
          // To get CV and startDate
          sql.query(
            studentCvAndStartDateSQL,
            [studentId],
            (err, cvAndStartdate) => {
              if (err) {
                sendStudent(err, null);
              } else {
                cvAndStartdate.forEach(value => {
                  batchesMap.get(value.BatchId).push({ cv: value.cv });
                  batchesMap
                    .get(value.BatchId)
                    .push({ dateOfStart: value.DateOfStart });
                });
                sql.query(
                  selectedCompanySQL,
                  [studentId],
                  (err, selectedCompanies) => {
                    if (err) {
                      sendStudent(err, null);
                    } else {
                      selectedCompanies.forEach(value => {
                        batchesMap
                          .get(value.batchId)
                          .push({ selectedCompany: value.Name });
                      });
                      sql.query(
                        preferedCompaniesSQL,
                        [studentId],
                        (err, preferedCompanies) => {
                          if (err) {
                            sendStudent(err, null);
                          } else {
                            preferedCompanies.forEach(value => {
                              companiesMap.get(value.batchId).push(value.Name);
                            });
                            for (let batch of batchesMap.keys()) {
                              var val = batchesMap.get(batch);
                              var cv;
                              var stratDate;
                              var selectedCompany;
                              val.forEach(value => {
                                if (value.cv) {
                                  cv = value.cv;
                                } else if (value.dateOfStart) {
                                  stratDate = value.dateOfStart;
                                } else if (value.selectedCompany) {
                                  selectedCompany = value.selectedCompany;
                                }
                              });
                              var modifiedSet = {
                                cv: cv,
                                stratDate: stratDate,
                                selectedCompany: selectedCompany,
                                companies: companiesMap.get(batch)
                              };
                              batchesMap.set(batch, modifiedSet);
                            }
                            const obj = Object.fromEntries(batchesMap);
                            sendStudent(null, {
                              studentdata: sendBasicStudent[0],
                              batchInfo: obj
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
};

exports.getStudentByIdAndBatch = (studentId, batchId, sendStudent) => {
  var basicStudentSQL = `
  SELECT
    S.IndexNumber,
    S.FullName,
    S.NameWithInitials,
    S.PhoneNumber,
    S.Email,
    S.Sem1GPA,
    S.Sem2GPA,
    S.Sem3GPA,
    S.Sem4GPA,
    S.SGPA,
    S.PreferedArea1,
    S.PreferedArea2,
    S.PreferedArea3
  from
    student S,
    Student_has_batch H
  WHERE
    s.IndexNumber = H.IndexNumber
    AND s.IndexNumber = ?
    AND H.BatchId = ?`;
  var studentCvAndStartDateSQL = `
  SELECT
    H.cv,
    H.DateOfStart,
    H.BatchId
  from
      student S,
      Student_has_batch H
  where
      s.IndexNumber = H.IndexNumber
      AND s.IndexNumber = ?
      AND H.BatchId = ?`;
  var preferedCompaniesSQL = `
  SELECT
    C.Name,
    SC.batchId
  FROM
    student S,
    Student_select_company SC,
    Company C
  WHERE
    S.IndexNumber = SC.IndexNumber
    AND SC.CompanyId = C.CompanyId
    AND S.IndexNumber = ?
    AND SC.BatchId = ? `;
  var selectedCompanySQL = `
  SELECT
    C.Name,
    SC.batchId,
    SC.IsSelected
  FROM
    student S,
    Student_select_company SC,
    Company C
  WHERE
    S.IndexNumber = SC.IndexNumber
    AND SC.CompanyId = C.CompanyId
    AND SC.IsSelected = 1
    AND S.IndexNumber = ?
    AND SC.BatchId = ? 
  `;
  var cv;
  var startDate;
  var selectedCompany;
  var companies = [];
  sql.query(basicStudentSQL, [studentId, batchId], (err, sendBasicStudent) => {
    if (err) {
      sendStudent(err, null);
    } else {
      sql.query(
        studentCvAndStartDateSQL,
        [studentId, batchId],
        (err, cvAndStartdate) => {
          if (err) {
            sendStudent(err, null);
          } else {
            if (cvAndStartdate.length == 0) {
              err = new Error("User not found");
              sendStudent(err, null);
            } else {
              cv = cvAndStartdate[0].cv;
              startDate = cvAndStartdate[0].DateOfStart;
              sql.query(
                selectedCompanySQL,
                [studentId, batchId],
                (err, selectedCompanies) => {
                  if (err) {
                    sendStudent(err, null);
                  } else {
                    if (selectedCompanies.length != 0) {
                      selectedCompany = selectedCompanies[0].Name;
                    }
                    sql.query(
                      preferedCompaniesSQL,
                      [studentId, batchId],
                      (err, preferedCompanies) => {
                        if (err) {
                          sendStudent(err, null);
                        } else {
                          preferedCompanies.forEach(value => {
                            companies.push(value.Name);
                          });
                          var batchInfo = {
                            cv: cv,
                            startDate: startDate,
                            selectedCompany: selectedCompany,
                            companies: companies
                          };
                          sendStudent(null, {
                            studentData: sendBasicStudent,
                            batchInfo: batchInfo
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        }
      );
    }
  });
};

exports.createBasicStudent = (student, studentHasBatch, callback) => {
  var studentSql = "INSERT INTO student SET ?";
  var studentHasBatchSql = "INSERT INTO Student_has_batch SET ?";
  sql.query(studentSql, student, (err, result) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      console.log("created student: ", { id: result.insertId, ...student });
      sql.query(studentHasBatchSql, studentHasBatch, (err, result) => {
        if (err) {
          console.log("error: ", err);
          callback(err, null);
        } else {
          callback(null, { data: "Inserted" });
        }
      });
    }
  });
};

exports.getStudntByUserNamePassword = (studentId, password, callback) => {
  var sqlString =
    "SELECT IndexNumber as Id, RoleName as Role, FullName as Name FROM Student WHERE indexNumber = ? AND password = ?";
  sql.query(sqlString, [studentId, password], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};
