/*
 This script is to add all the tables to the database including Role table, Admin table, Company Table, Batch table,
 Vacancy table, Student table, Student_Select_Company table, Monthly report table and Feedback table
 */
CREATE TABLE Role (
    Name varchar(255) NOT NULL,
    Description varchar(255),
    PRIMARY KEY (Name)
);

CREATE TABLE Admin (
    AdminId int NOT NULL AUTO_INCREMENT,
    RoleName int,
    Name varchar(255) NOT NULL,
    PhoneNumber int,
    Email varchar(255),
    Password varchar(255) NOT NULL,
    PRIMARY KEY (AdminId),
    FOREIGN KEY (RoleName) REFERENCES Role(Name)
);

CREATE TABLE Company (
    CompanyId int NOT NULL AUTO_INCREMENT,
    CreatedBy int NOT NULL,
    RoleName int NOT NULL,
    Name varchar(255) NOT NULL,
    Location varchar(255),
    Description varchar(255),
    ContactPerson varchar(255),
    PhoneNumber int,
    Website varchar(255),
    Email varchar(255) NOT NULL,
    InterviewProgress varchar(255),
    Password varchar(255) NOT NULL,
    PRIMARY KEY (CompanyId),
    FOREIGN KEY (RoleName) REFERENCES Role(Name),
    FOREIGN KEY (CreatedBy) REFERENCES Admin(AdminId)
);

CREATE TABLE Batch (
    BatchId int NOT NULL AUTO_INCREMENT,
    CreatedBy int NOT NULL,
    Name varchar(255),
    Year int,
    StartDate DATE,
    EndDate DATE,
    CompanyCount int NOT NULL,
    PRIMARY KEY (BatchId),
    FOREIGN KEY (CreatedBy) REFERENCES Admin(AdminId)
);

CREATE TABLE Vacancy (
    CompanyId int NOT NULL,
    InternBatchId int NOT NULL,
    Vacancies int,
    Filled int,
    PRIMARY KEY (CompanyId, InternBatchId),
    FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId),
    FOREIGN KEY (InternBatchId) REFERENCES Batch(BatchId)
);

CREATE TABLE Student (
    BatchId int NOT NULL,
    CreatedBy int NOT NULL,
    RoleName int NOT NULL,
    FullName varchar(255),
    NameWithInitials varchar(100),
    IndexNumber varchar(7),
    PhoneNumber int,
    Sem1GPA float,
    Sem2GPA float,
    Sem3GPA float,
    Sem4GPA float,
    SGPA float,
    Email varchar(50),
    CV varchar(50),
    PreferedArea1 varchar(100),
    PreferedArea2 varchar(100),
    PreferedArea3 varchar(100),
    DateOfStart DATE,
    Degree varchar(100),
    Password varchar(100),
    PRIMARY KEY (BatchId, IndexNumber),
    FOREIGN KEY (BatchId) REFERENCES Batch(BatchId),
    FOREIGN KEY (CreatedBy) REFERENCES Admin(AdminId),
    FOREIGN KEY (RoleName) REFERENCES Role(Name)
);

CREATE TABLE Student_Select_Company (
    BatchId int NOT NULL,
    IndexNumber varchar(7),
    CompanyId int NOT NULL,
    IsSelected boolean DEFAULT 0,
    PRIMARY KEY (BatchId, IndexNumber, CompanyId),
    FOREIGN KEY (IndexNumber) REFERENCES Student(IndexNumber),
    FOREIGN KEY (BatchId) REFERENCES Batch(BatchId),
    FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId)
);

CREATE TABLE Monthly_Report (
    BatchId int NOT NULL,
    IndexNumber varchar(7),
    ReportNumber int NOT NULL,
    Report varchar(100) NOT NULL,
    PRIMARY KEY (BatchId, IndexNumber, ReportNumber),
    FOREIGN KEY (IndexNumber) REFERENCES Student(IndexNumber),
    FOREIGN KEY (BatchId) REFERENCES Batch(BatchId),
);

CREATE TABLE Feedback (
    FeedbackId int NOT NULL AUTO_INCREMENT,
    BatchId int NOT NULL,
    IndexNumber varchar(7),
    SubmittedDate DATE NOT NULL,
    CompanyId int NOT NULL,
    StartDate DATE NOT NULL,
    ProjectBrief varchar(100),
    Mentor varchar(100),
    IsGivenAdequateWork boolean,
    WorkEnvironment varchar(100),
    EmployeeSupportiveness varchar(100),
    ManagementSupportiveness varchar(100),
    SeniorEngineerCount int,
    isPayed boolean,
    Payment float,
    Problems varchar(255),
    Suggesions varchar(255),
    OverallComment varchar(255),
    Satisfaction varchar(255),
    IsRecommended boolean,
    ContactPerson varchar(100),
    ContactPersonPhoneNumber int,
    ContactPersonEmail varchar(100),
    ContactPersonDesignation varchar(100),
    MentorName varchar(100),
    MentorPhoneNumber int,
    MentorEmail varchar(100),
    MentorDesgnation varchar(100),
    PRIMARY KEY (BatchId, IndexNumber, FeedbackId),
    FOREIGN KEY (IndexNumber) REFERENCES Student(IndexNumber),
    FOREIGN KEY (BatchId) REFERENCES Batch(BatchId),
    FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId)
);