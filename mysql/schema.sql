DROP DATABASE IF EXISTS EmployeeTrackerDB;
CREATE DATABASE EmployeeTrackerDB;

USE EmployeeTrackerDB;


create table department (
    id  INTEGER PRIMARY KEY auto_increment,
    name VARCHAR(100) not null
);

create table  roles (
    id INTEGER PRIMARY KEY auto_increment,
    title VARCHAR(100) not null,
    salary DECIMAL not null,
    department_id INTEGER NOT NULL,
    foreign key(department_id) references department(id)
);

create table employee (
    id INTEGER PRIMARY KEY auto_increment,
    first_name VARCHAR(50) not null,
    last_name VARCHAR(50) not null,
    role_id INTEGER NOT NULL,
    foreign key(role_id) references roles(id),
    manager_id INTEGER,
    foreign key(manager_id) references employee(id)
);