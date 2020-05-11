/*
    This is to add the dummy data to the database for the testing purposes
*/

/*
    Add several roles to the system including super role, admin role, student role and company role
*/
-- Super Role
INSERT INTO Roles (RoleId, Name, Description) VALUES (1, 'Super', 'The person who can added any student, company, admin');
-- Admin Role
INSERT INTO Roles (RoleId, Name, Description) VALUES (2, 'Admin', 'The person who can added any student, company');
-- Student Role
INSERT INTO Roles (RoleId, Name, Description) VALUES (3, 'Student', 'The person who is a student');
-- Company Role
INSERT INTO Roles (RoleId, Name, Description) VALUES (4, 'Company', 'The person who is a company');

/*
    Add two admins who are assigned to super role and the admin role
*/
-- Super role admin
INSERT INTO Admin (AdminId, RoleId, Name, PhoneNumber, Email, Password) 
VALUES (1, 1, "Amila Perera", 0773456746, "amilaperera@gmail.com", "amila");
-- Admin role admin
INSERT INTO Admin (AdminId, RoleId, Name, PhoneNumber, Email, Password) 
VALUES (2, 1, "Kasun Fonseka", 0715383948, "kasunfonseka@gmail.com", "kasun");

/*
    Create three companies naming virtusa, wso2, creative software
*/
-- Virtusa Company
INSERT INTO Company (CompanyId, CreatedBy, RoleId, Name, Location, Description, ContactPerson, PhoneNumber, Website, Email, InterviewProgress, Password) 
VALUES (1, 1, 4, "Virtusa", "Dematagoda", "Software company", "Nimesh", 0773589724, "www.virtusa.com", "info@virtusa.com", "Completed", "virtusa");
-- Wso2 Company
INSERT INTO Company (CompanyId, CreatedBy, RoleId, Name, Location, Description, ContactPerson, PhoneNumber, Website, Email, InterviewProgress, Password) 
VALUES (2, 1, 4, "Wso2", "Kollupitiya", "Software company", "Akila", 0729836273, "www.wso2.com", "info@wso2.com", "In progress", "wso2");
-- CreativeSoftware Company
INSERT INTO Company (CompanyId, CreatedBy, RoleId, Name, Location, Description, ContactPerson, PhoneNumber, Website, Email, InterviewProgress, Password) 
VALUES (3, 2, 4, "CreativeSoftware", "Maradana", "Software company", "Rangika", 0717824673, "www.CreativeSoftware.com", "info@CreativeSoftware.com", "In progress", "creativesoftware");

/*
    Create two batches naming barch16 and batch17
*/
-- Batch 16
INSERT INTO Batch (BatchId, CreatedBy, Name, Year, StartDate, EndDate, CompanyCount) 
VALUES (1, 1, "Batch16", 2019, DATE '2019-8-17',DATE '2020-3-01', 263);
-- Batch 17
INSERT INTO Batch (BatchId, CreatedBy, Name, Year, StartDate, EndDate, CompanyCount) 
VALUES (2, 2, "Batch17", 2020, DATE '2020-8-17',DATE '2021-3-01', 242);
