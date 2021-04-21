DROP DATABASE IF EXISTS EmployeeCheckDB;
CREATE DATABASE EmployeeCheckDB;

USE EmployeeCheckDB;


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

insert into department (name) 
values 
("Accounting"), 
("Financial"), 
("R&D"), 
("Mailroom"); 


insert into 
roles ( title, salary, department_id ) 
values 
("Manager", "2000", 2),
("Secretary", "5000", 1),
("Mailroom Clerk", "1000", 4),
("Researcher", "50000", 3);

select * from department;
select * from roles;
