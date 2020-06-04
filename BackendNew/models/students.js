// Import database connection
const sql = require("../models/database.js");

exports.getStudentsByBatch = (batch, callback) => {
  var sqlString =
    "( SELECT S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, NULL as IsSelected, NULL as CompanyId, NULL as CompanyName from student S, student_has_batch H, Batch B where s.IndexNumber = H.IndexNumber  AND H.BatchId = B.BatchId AND B.BatchId = ? AND s.IndexNumber NOT IN ( SELECT S.IndexNumber from student S, student_has_batch H, Batch B, student_select_company SC where s.IndexNumber = H.IndexNumber AND H.BatchId = B.BatchId AND SC.IndexNumber = S.IndexNumber AND SC.BatchId = B.BatchId AND B.BatchId = ? AND SC.IsSelected = 1 ) GROUP BY S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId ) UNION ( SELECT S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, Sc.IsSelected, C.CompanyId, C.Name as CompanyName from student S, student_has_batch H, Batch B, student_select_company SC, Company C where s.IndexNumber = H.IndexNumber AND H.BatchId = B.BatchId AND SC.IndexNumber = S.IndexNumber AND SC.BatchId = B.BatchId AND SC.IsSelected = 1 AND C.CompanyId = SC.CompanyId AND B.BatchId = ? GROUP BY S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, SC.IsSelected, C.CompanyId, C.Name)";
  sql.query(sqlString, [batch, batch, batch], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};

exports.getSelectedStudentsByBatch = (isSelected, batch, callback) => {
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
        callback(err, null);
      } else {
        callback(null, { data: result });
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
        callback(err, null);
      } else {
        callback(null, { data: result });
      }
    });
  } else {
    err = Error("Invalid query param");
    callback(err, null);
  }
};

exports.getSelectedStudentsByCompanyBatch = (batchId, companyId, callback) => {
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
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};

exports.getSelectedStudents = (isSelected, callback) => {
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
        callback(err, null);
      } else {
        callback(null, { data: result });
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
        callback(err, null);
      } else {
        callback(null, { data: result });
      }
    });
  } else {
    err = Error("Invalid query param");
    callback(err, null);
  }
};

exports.getSelectedStudentsByCompany = (companyId, callback) => {
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
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};

exports.getStudents = callback => {
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
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};
exports.createBasicStudent = (student, callback) => {
  var sqlString = "INSERT INTO student SET ?";
  sql.query(sqlString, student, (err, result) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      console.log("created student: ", { id: result.insertId, ...student });
      callback(null, { data: result });
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
