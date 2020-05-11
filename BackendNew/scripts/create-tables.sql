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