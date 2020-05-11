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
INSERT INTO Company (CompanyId, CreatedBy, RoleId, Name, Location, Description,
    ContactPerson ,
    PhoneNumber ,
    Website ,
    Email ,
    InterviewProgress ,
    Password  ,) 
VALUES (2, 1, "Kasun Fonseka", 0715383948, "kasunfonseka@gmail.com", "kasun");


CREATE TABLE Company (
    CompanyId int NOT NULL AUTO_INCREMENT,
    CreatedBy int NOT NULL,
    RoleId int NOT NULL,
    Name varchar(255) NOT NULL,
    Location varchar(255),
    Description varchar(255),
    ContactPerson varchar(255),
    PhoneNumber int,
    Website varchar(255),
    Email varchar(255),
    InterviewProgress varchar(255),
    Password varchar(255) NOT NULL,
    PRIMARY KEY (CompanyId),
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId),
    FOREIGN KEY (CreatedBy) REFERENCES Admin(AdminId)
);