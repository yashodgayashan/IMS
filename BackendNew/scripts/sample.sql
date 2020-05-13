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