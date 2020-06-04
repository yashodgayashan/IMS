/* Get a student by username and password*/
SELECT
    IndexNumber as Id,
    RoleName as Role,
    FullName as Name
FROM
    Student
WHERE
    indexNumber = ?
    AND password = ?
    /*Get a company by company id and password*/
SELECT
    companyId as Id,
    RoleName as Role,
    Name
FROM
    Company
WHERE
    companyId = ?
    AND password = ?
    /*Get an admin by admin id and password*/
SELECT
    AdminId as Id,
    RoleName as Role,
    Name
FROM
    Admin
WHERE
    AdminId = ?
    AND password = ?
    /*Get student by batch*/
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
)
/*
 Get selected students by batch
 */
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