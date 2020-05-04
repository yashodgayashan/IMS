-- Craete testDB database
CREATE DATABASE testDB;

-- Select the testDB 
USE testDB;

-- Create students table
CREATE TABLE students
(
    id int,
    name varchar(255),
    email varchar(255),
    active boolean
);