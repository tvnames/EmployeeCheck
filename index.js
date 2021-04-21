const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./mysql/connection');


const queryAllEmployees = () => {
    console.log('hello');
  connection.query('SELECT * FROM EmployeeTrackerDB.employee', (err, res) => {
    if (err) throw err;
    res.forEach(({ id, title, salary, department_id }) => {
      console.log(`${id} | ${title} | ${salary} | ${department_id}`);
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
  connection.query('SELECT * FROM EmployeeTrackerDB.roles', (selectError, roles) => {
    if (selectError) throw selectError;
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'roles',
          message: 'Select an employee to update',
          choices: roles.map((roles) => ({
            value: roles,
            name: `${role.title} | ${role.salary} | ${role.department_id}`,
          })),
        },
        {
          name: 'title',
          type: 'input',
          message: 'What is the new title?',
          default: (answers) => answers.roles.title,
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
        console.log(`Updating employee id ${answers.department_id.id}\n`);

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

// Function to run query which adds a new row for "Peace of Mind".
const createEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter new employees name:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the new employees salary',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the new employees department',
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
            value: 'Add an employee',
            name: 'Add an employee',
          },
          {
            value: 'View',
            name: 'View all employees',
          },
          {
            value: 'UPDATE',
            name: 'Update employees information',
          },
          {
            value: 'DELETE',
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
      switch (answers.action) {
        case 'READ':
            createEmployee();
          break;

        case 'CREATE':
            queryAllEmployees();
          break;

        case 'updateRoles':
          updateRoles();
          break;

        case 'DELETE':
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