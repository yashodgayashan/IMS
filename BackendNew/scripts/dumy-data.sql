/*
    This is to add the dummy data to the database for the testing purposes
*/

/*
    Add several roles to the system including super role, admin role, student role and company role
*/
-- Super Role
INSERT INTO Role ( Name, Description) VALUES ( 'Super', 'The person who can added any student, company, admin');
-- Admin Role
INSERT INTO Role ( Name, Description) VALUES ( 'Admin', 'The person who can added any student, company');
-- Student Role
INSERT INTO Role ( Name, Description) VALUES ( 'Student', 'The person who is a student');
-- Company Role
INSERT INTO Role ( Name, Description) VALUES ( 'Company', 'The person who is a company');

/*
    Add two admins who are assigned to super role and the admin role
*/
-- Super role admin
INSERT INTO Admin (AdminId, RoleName, Name, PhoneNumber, Email, Password) 
VALUES ('amila', 'Super', "Amila Perera", 0773456746, "amilaperera@gmail.com", "amila");
-- Admin role admin
INSERT INTO Admin (AdminId, RoleName, Name, PhoneNumber, Email, Password) 
VALUES ('kasun', 'Admin', "Kasun Fonseka", 0715383948, "kasunfonseka@gmail.com", "kasun");

/*
    Create three companies naming virtusa, wso2, creative software
*/
-- Virtusa Company
INSERT INTO Company (CompanyId, CreatedBy, RoleName, Name, Location, Description, ContactPerson, PhoneNumber, Website, Email, InterviewProgress, Password) 
VALUES ('virtusa', 'amila', 'Company', "Virtusa", "Dematagoda", "Software company", "Nimesh", 0773589724, "www.virtusa.com", "info@virtusa.com", "Completed", "virtusa");
-- Wso2 Company
INSERT INTO Company (CompanyId, CreatedBy, RoleName, Name, Location, Description, ContactPerson, PhoneNumber, Website, Email, InterviewProgress, Password) 
VALUES ('wso2', 'amila', 'Company', "Wso2", "Kollupitiya", "Software company", "Akila", 0729836273, "www.wso2.com", "info@wso2.com", "In progress", "wso2");
-- CreativeSoftware Company
INSERT INTO Company (CompanyId, CreatedBy, RoleName, Name, Location, Description, ContactPerson, PhoneNumber, Website, Email, InterviewProgress, Password) 
VALUES ('creativesoftware', 'kasun', 'Company', "CreativeSoftware", "Maradana", "Software company", "Rangika", 0717824673, "www.CreativeSoftware.com", "info@CreativeSoftware.com", "In progress", "creativesoftware");

/*
    Create two batches naming barch16 and batch17
*/
-- Batch 16
INSERT INTO Batch (BatchId, CreatedBy, Year, StartDate, EndDate, CompanyCount) 
VALUES ("batch16", 'amila',  2019, DATE '2019-8-17',DATE '2020-3-01', 263);
-- Batch 17
INSERT INTO Batch (BatchId, CreatedBy, Year, StartDate, EndDate, CompanyCount) 
VALUES ("batch17",'kasun',  2020, DATE '2020-8-17',DATE '2021-3-01', 242);

/*
    Add four vacancies for dummy data
*/
INSERT INTO Vacancy (CompanyId, InternBatchId, Vacancies, Filled) 
VALUES ('virtusa', "batch16", 20, 16);
INSERT INTO Vacancy (CompanyId, InternBatchId, Vacancies, Filled) 
VALUES ('virtusa', "batch17", 16, 13);
INSERT INTO Vacancy (CompanyId, InternBatchId, Vacancies, Filled) 
VALUES ('wso2', "batch16", 12, 11);
INSERT INTO Vacancy (CompanyId, InternBatchId, Vacancies, Filled) 
VALUES ('creativesoftware', "batch17", 10, 10);

/*
    Add 4 students as dummy data
*/
INSERT INTO Student (IndexNumber, BatchId, CreatedBy, RoleName, FullName, NameWithInitials,  PhoneNumber, Sem1GPA, Sem2GPA, Sem3GPA, Sem4GPA, SGPA, 
                    Email, CV, PreferedArea1, PreferedArea2, PreferedArea3, DateOfStart, Degree, Password) 
VALUES ("164124H", "batch16", 'kasun', 'Student', "Hasini Senanayaka", "H C Senanayaka", 0713847631, 4.02, 3.98, 4.01, 3.87, 3.99, "hasinisenanayaka@gmail.com", "cv",
                    "Software Engineering", "Networking", "UI/UX", DATE '2019-08-19', "IT", "hasini");
INSERT INTO Student (IndexNumber, BatchId, CreatedBy, RoleName, FullName, NameWithInitials,  PhoneNumber, Sem1GPA, Sem2GPA, Sem3GPA, Sem4GPA, SGPA, 
                    Email, CV, PreferedArea1, PreferedArea2, PreferedArea3, DateOfStart, Degree, Password) 
VALUES ("164081J", "batch16", 'kasun', 'Student', "Piyumi Dasnayaka", "D A P Dasanayaka", 0717382928, 4.01, 3.48, 4.11, 3.87, 3.87, "piyumimadhubashini@gmail.com", "cv",
                    "QA Engineering", "Networking", "UI/UX", DATE '2019-08-19', "ITM", "piyumi");
INSERT INTO Student (IndexNumber, BatchId, CreatedBy, RoleName, FullName, NameWithInitials,  PhoneNumber, Sem1GPA, Sem2GPA, Sem3GPA, Sem4GPA, SGPA, 
                    Email, CV, PreferedArea1, PreferedArea2, PreferedArea3, DateOfStart, Degree, Password) 
VALUES ("164188T", "batch17", 'amila', 'Student', "Lakshika Swarnamali", "A L Swaranamali", 071298765, 4.01, 3.78, 4.13, 3.77, 3.79, "lakshikaswarnamali@gmail.com", "cv",
                    "Software Engineering", "QA Engineering", "UI/UX", DATE '2019-08-19', "ITM", "lakshika");
INSERT INTO Student (IndexNumber, BatchId, CreatedBy, RoleName, FullName, NameWithInitials,  PhoneNumber, Sem1GPA, Sem2GPA, Sem3GPA, Sem4GPA, SGPA, 
                    Email, CV, PreferedArea1, PreferedArea2, PreferedArea3, DateOfStart, Degree, Password) 
VALUES ("164106T", "batch17", 'kasun', 'Student', "Yashod Perera", "U L Y G Perera", 0716931384, 3.89, 3.78, 4.03, 3.57, 3.72, "hasinisenanayaka@gmail.com", "cv",
                    "UI/UX", "Networking", "QA Engineering", DATE '2019-08-19', "IT", "yashod");

/*
    Add 8 student select company as dummy data
*/
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId, IsSelected) 
VALUES ("batch16", "164124H", 'virtusa' 1);
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId) 
VALUES ("batch16", "164124H", 'creativesoftware');
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId) 
VALUES ("batch16", "164081J", 'virtusa');
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId) 
VALUES ("batch16", "164081J", 'wso2');
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId) 
VALUES ("batch16", "164081J", 'creativesoftware');
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId) 
VALUES ("batch17", "164188T", 'wso2');
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId) 
VALUES ("batch17", "164188T", 'creativesoftware');
INSERT INTO Student_Select_Company (BatchId, IndexNumber, CompanyId, IsSelected) 
VALUES ("batch17", "164106T", 'wso2', 1);

/*
    Add monthly report dummy data
*/
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164124H", 1, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164124H", 2, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164124H", 3, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164124H", 4, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164124H", 5, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164124H", 6, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164081J", 1, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164081J", 2, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164081J", 4, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch16", "164081J", 6, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch17", "164188T", 1, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch17", "164188T", 2, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch17", "164188T", 3, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch17", "164188T", 4, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch17", "164106T", 1, "report url");
INSERT INTO Monthly_Report (BatchId, IndexNumber, ReportNumber, Report) 
VALUES ("batch17", "164106T", 4, "report url");

/*
    Add feedback dummy data
*/
INSERT INTO Feedback (FeedbackId, BatchId, IndexNumber, SubmittedDate, CompanyId, StartDate, ProjectBrief, Mentor, IsGivenAdequateWork, WorkEnvironment, EmployeeSupportiveness,
                       ManagementSupportiveness, SeniorEngineerCount, isPayed, Payment, Problems, Suggesions, OverallComment, Satisfaction, IsRecommended, 
                       ContactPerson, ContactPersonPhoneNumber, ContactPersonEmail, ContactPersonDesignation, MentorName, MentorPhoneNumber, MentorEmail,
                       MentorDesgnation ) 
VALUES (1, "batch16", "164124H", DATE '2020-02-01', 'virtusa', DATE '2020-02-01', "It is a group project", "Good mentor", 1, "Good Environment", "Supportive",
        "Not much supportive", 12, 1, 15000, "Lot of time for transport", "Give a shuttle", "Good", "Yes satisfied", 1,
        "Nimal", 0773862763, "nimalamarasekara@gmail.com", "HR", "Amila", 0712456783, "amilamadush@gmail.com", "techlead");
INSERT INTO Feedback (FeedbackId, BatchId, IndexNumber, SubmittedDate, CompanyId, StartDate, ProjectBrief, Mentor, IsGivenAdequateWork, WorkEnvironment, EmployeeSupportiveness,
                       ManagementSupportiveness, SeniorEngineerCount, isPayed, Payment, Problems, Suggesions, OverallComment, Satisfaction, IsRecommended, 
                       ContactPerson, ContactPersonPhoneNumber, ContactPersonEmail, ContactPersonDesignation, MentorName, MentorPhoneNumber, MentorEmail,
                       MentorDesgnation ) 
VALUES (2, "batch17", "164106T", DATE '2020-03-01', 'wso2', DATE '2020-01-01', "It is an individual Project", "fair mentoring", 1, "moderate Environment", "Not much Supportive",
        "Less supportive", 10, 1, 12000, "Didt't give foods", "Give foods", "normal", "Yes satisfied", 1,
        "Amangi", 0712345763, "amanginimali@gmail.com", "HR", "Malith", 0717435621, "malithperera@gmail.com", "manager");