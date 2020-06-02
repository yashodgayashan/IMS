-- Get not selected students
SELECT
    S.NameWithInitials as Name,
    S.IndexNumber as RegNo,
    B.Name as InternBatch
FROM
    Student S,
    Batch B
WHERE
    S.BatchId = B.BatchId
    AND S.NameWithInitials NOT IN (
        SELECT
            S.NameWithInitials
        FROM
            Student S,
            Batch B,
            Student_Select_Company SC
        WHERE
            S.BatchId = B.BatchId
            AND S.StudentId = SC.StudentId
            AND SC.IsSelected = 1
    )
GROUP BY
    S.NameWithInitials,
    S.IndexNumber,
    B.Name
    /*Get selected Students*/
SELECT
    S.NameWithInitials as Name,
    S.IndexNumber as RegNo,
    B.Name as InternBatch,
    SC.StudentId
FROM
    Student S,
    Batch B,
    Student_Select_Company SC
WHERE
    S.BatchId = B.BatchId
    AND S.StudentId = SC.StudentId
    AND SC.IsSelected = 1
    /*Get All Students*/
SELECT
    S.NameWithInitials as Name,
    S.IndexNumber as RegNo,
    B.Name as InternBatch
FROM
    Student S,
    Batch B
WHERE
    S.BatchId = B.BatchId
    /* Get Selected students by company*/
SELECT
    S.NameWithInitials as Name,
    S.IndexNumber as RegNo,
    B.Name as InternBatch,
    SC.StudentId
FROM
    Student S,
    Batch B,
    Student_Select_Company SC,
    Company C
WHERE
    S.BatchId = B.BatchId
    AND S.StudentId = SC.StudentId
    AND C.CompanyId = SC.CompanyId
    AND SC.IsSelected = 1
    AND C.Name = ?
    /*Check whether company exsists*/
SELECT
    COUNT(Name)
FROM
    Company
WHERE
    Name = "?"
    /*Get a student by Id*/
SELECT
    S.FullName,
    S.NameWithInitials,
    S.IndexNumber,
    S.PhoneNumber,
    S.Sem1GPA,
    S.Sem2GPA,
    S.Sem3GPA,
    S.Sem4GPA,
    S.SGPA,
    S.Email,
    S.CV,
    S.PreferedArea1,
    S.PreferedArea2,
    S.PreferedArea3,
    S.DateOfStart,
    S.Degree,
    B.Name
FROM
    Student S,
    Batch B
WHERE
    S.BatchId = B.BatchId
    AND S.StudentId = ? -- Get a student by username and password
SELECT
    IndexNumber as Id,
    RoleName as Role,
    FullName as Name
FROM
    Student
WHERE
    indexNumber = ?
    AND password = ? -- Get a company by company id and password
SELECT
    companyId as Id,
    RoleName as Role,
    Name
FROM
    Company
WHERE
    companyId = ?
    AND password = ? -- Get an admin by admin id and password
SELECT
    AdminId as Id,
    RoleName as Role,
    Name
FROM
    Admin
WHERE
    AdminId = ?
    AND password = ?