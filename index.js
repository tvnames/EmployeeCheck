const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./mysql/connection');


const queryAllEmployees = () => {
  connection.query('SELECT * FROM EmployeeTrackerDB.employee', (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name, last_name, role_id, manager_id }) => {
      console.log(`${first_name} | ${last_name} | ${role_id} | ${manager_id}`);
    });
    start();
  });
};
const queryAllRoles = () => {
  connection.query('SELECT * FROM EmployeeTrackerDB.roles', (err, res) => {
    if (err) throw err;
    res.forEach(({ title, salary, department_id }) => {
      console.log(`${title} | ${salary}} | ${department_id}`);
    });
    start();
  });
};
const queryAllDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    res.forEach((id, name) => {
      console.log(`${id} | ${name}`);
    });
    start();
  });
};



// queryAllEmployees();
const deleteEmployee = () => {
  connection.query('SELECT * EmployeeTrackerDB.employee', (selectError, employee) => {
    if (selectError) throw selectError;
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Select an employee to remove',
          choices: employee.map((employee) => ({
            value: employee.id,
            name: `${first_name} | ${last_name} | ${role_id}`,
          })),
        },
      ])
      .then((answers) => {
        console.log(`Deleting ${answers.first_name}\n`);

        connection.query(
          'DELETE FROM employee WHERE ?',
          [
            {
              id: answers.id,
            },
          ],
          (deleteError, deleteRes) => {
            if (deleteError) throw updateError;
            console.log(`${deleteRes.affectedRows} employee removed!\n`);
            start();
          }
        );
      });
  });
};

const updateRoles = () => {
  connection.query('SELECT * FROM EmployeeTrackerDB.employee', (selectError, roles) => {
    if (selectError) throw selectError;
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'roles',
          message: 'Select an employee to update',
          choices: roles.map((roles) => ({
            value: roles,
             name: ` ${title} | ${salary} | ${role_id} | ${manager_id}`,
          })),
        },
        {
          name: 'title',
          type: 'input',
          message: 'What is the new title?',
          default: (answers) => answers.roles.role_id,
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the new salary?',
          default: (answers) => answers.roles.salary,
        },
        {
          name: 'department_id',
          type: 'lsit',
          message: 'What is their new department?',
          choices: [
              'Manager',
              'Secretary',
              'Mailroom Clerk',
              'Researcher'
          ],
        },
      ])
      .then((answers) => {
        console.log(`Updating employee id ${answers.roles.department_id}\n`);

        connection.query(
          'UPDATE employee SET ? roles ?',
          [
            {
              title: answers.title,
              salary: answers.salary,
              department: answers.department_id,
            },
            {
              id: answers.roles.id,
            },
          ],
          (updateError, updateRes) => {
            if (updateError) throw updateError;
            console.log(`${updateRes.affectedRows} Employee updated!\n`);
            start();
          }
        );
      });
  });
};

// Function to run query which adds a new row .
const createEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter new employees first name:',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter new employees last name:',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the new employees role',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the new employees manager',
      },
    ])
    
    .then((answers) => {
      console.log('Inserting a new employee...\n');
      connection.query('INSERT INTO employee SET ?', answers, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} Employee inserted!\n`);
        start();
      });
    });
};

const createRole = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter new role:',
      },
      {
        name: 'Salary',
        type: 'input',
        message: 'Enter new salary:',
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Enter the new department id',
        choices: [ 1, 2, 3, 4],
        
      },

    ])
    
    .then((answers) => {
      console.log('Inserting a new role...\n');
      connection.query('INSERT INTO roles SET ?', answers, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} Role created!\n`);
        start();
      });
    });
};

const quit = () => {
  connection.end();
  console.log('Good bye!');
  process.exit();
};

const start = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do>',
        choices: [
          {
            value: 'View Employees',
            name: 'View all employees',
          },
          {
            value: 'View Department',
            name: 'View all departments',
          },
          {
            value: 'View Roles',
            name: 'View all roles',
          },
          {
            value: 'Add Employee',
            name: 'Add an employee',
          },
          {
            value: 'Add Roles',
            name: 'Add a new role',
          },
          {
            value: 'Add Department',
            name: 'Add a new department',
          },
          {
            value: 'Update Roles',
            name: 'Update employees roles',
          },
          {
            value: 'Remove Employee',
            name: 'Remove an employee',
          },
          {
            value: 'QUIT',
            name: 'Exit',
          },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      switch (answers.action) {
        
        case 'View Employees':
          queryAllEmployees();
          break;
          case 'View Department':
            queryAllDepartments();
            break;
            case 'View Roles':
              queryAllRoles();
              break;   
              case 'Add Employee':
                createEmployee();
                break;   
                case 'Add Roles':
                  createRole();
                  break;
            case 'Add Department':
            createDepartment();
            break;
          
        case 'Update Roles':
          updateRoles();
          break;

        case 'Remove Employee':
            deleteEmployee();
          break;

        default:
          quit();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

// connection.connect((err) => {
//   if (err) throw err;
//   start();
// });
start();



// Functional application.


// GitHub repository with a unique name and a README describing the project.


// The command-line application should allow users to:


// Add departments, roles*, employees *


// View departments, roles,* employees*


// Update employee roles