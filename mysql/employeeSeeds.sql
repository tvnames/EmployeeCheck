use EmployeeTrackerDB;

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

insert into 
employee (first_name, last_name, role_id, manager_id)
values
("James", "Franco", 2, 1),
("Brett", "Favre", 1, 1),
("Tay", "Diggs", 4, 1),
("Tom", "Holland", 3, 2),
("Tyler", "Perry", 3, 2),
("Channing", "Tatum", 3, 2),
("Joe", "Rogan", 2, 2);

