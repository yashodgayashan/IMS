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
    Vacancies int NOT NULL,
    PRIMARY KEY (VacancyId),
    FOREIGN KEY (CompanyId) REFERENCES Company(CompanyId),
    FOREIGN KEY (InternBatchId) REFERENCES Batch(BatchId)
);