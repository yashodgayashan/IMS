-- Create student table
CREATE TABLE student
(
    id varchar(255),
    name varchar(255),
    email varchar(255),
    password varchar(255),
    role varchar(255)
);

-- Create admin table
CREATE TABLE admin
(
    id varchar(255),
    name varchar(255),
    email varchar(255),
    password varchar(255),
    role varchar(255)
);

-- Create organization table
CREATE TABLE organization
(
    id varchar(255),
    name varchar(255),
    email varchar(255),
    password varchar(255),
    role varchar(255)
);

DROP TABLE student;

DROP TABLE admin;

DROP TABLE organization;