CREATE TABLE Role (
    RoleId int NOT NULL AUTO_INCREMENT,
    Description varchar (255) NOT NULL,
    PRIMARY KEY (RoleId)
);

CREATE TABLE Admin (
    AdminId int NOT NULL AUTO_INCREMENT,
    RoleId int,
    Name varchar(255) NOT NULL,
    PhoneNumber int,
    Email varchar(255),
    Password varchar(255) NOT NULL,
    PRIMARY KEY (AdminId),
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId)
);

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

CREATE TABLE Batch (
    BatchId int NOT NULL AUTO_INCREMENT,
    CreatedBy int NOT NULL,
    RoleId int NOT NULL,
    Description varchar(255),
    Yeah int,
    StartDate DATE,
    EndDate DATE,
    CompanyCount int NOT NULL,
    PRIMARY KEY (BatchId),
    FOREIGN KEY (CreatedBy) REFERENCES Admin(AdminId)
);

CREATE TABLE Vacancy (
    VacancyId int NOT NULL AUTO_INCREMENT,
    CompanyId int NOT NULL,
    InternBatchId int NOT NULL,
    Vacancies int,
    Filled int,
    PRIMARY KEY (VacancyId),
    FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId),
    FOREIGN KEY (InternBatchId) REFERENCES Batch(BatchId)
);

CREATE TABLE Student (
    StudentId int NOT NULL AUTO_INCREMENT,
    BatchId int NOT NULL,
    CreatedBy int NOT NULL,
    RoleId int NOT NULL,
    FullName varchar(255),
    PhoneNumber int,
    Sem1GPA number,
    Sem2GPA number,
    Sem3GPA number,
    Sem4GPA number,
    SGPA number,
    Email varchar(50),
    CV varchar(50),
    PreferedArea1 varchar(100),
    PreferedArea2 varchar(100),
    PreferedArea3 varchar(100),
    PreferedArea4 varchar(100),
    PreferedArea5 varchar(100),
    DateOfStart DATE,
    Degree varchar(100),
    Password varchar(100),
    PRIMARY KEY (StudentId),
    FOREIGN KEY (BatchId) REFERENCES Batch(BatchId),
    FOREIGN KEY (CreatedBy) REFERENCES Admin(AdminId),
    FOREIGN KEY (RoleId) REFERENCES Role(RoleId)
);

CREATE TABLE Student_Select_Company (
    StudentId int NOT NULL,
    CompanyId int NOT NULL,
    IsSelected boolean DEFAULT 0,
    PRIMARY KEY (StudentId, CompanyId),
    FOREIGN KEY (StudentId) REFERENCES Student(StudentId),
    FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId)
)