const inquirer = require('inquirer');
const { Pool } = require('pg');


const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: 'postgres',
      // Enter PostgreSQL password
      password: 'Christopher123',
      host: '127.0.0.1',
      database: 'employee_db'
  },
  console.log('Connected to the employee_db database!')
  )
  
  pool.connect();

function init(){
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What do you want to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit'],
            name: 'options',
          }
        ])
        .then((answers) => {

            console.log(answers.options)
            
            switch (answers.options) {
                case 'view all departments':
                   viewDepartment()
                    break;
                case 'view all roles':
                    viewRole()
                break;
                case 'view all employees':
                    viewEmployees()
                break;
                case 'add a department':
                    console.log('goodbye');
                break;
                case 'add a role':
                    console.log('goodbye');
                break;
                case 'add an employee':
                    console.log('goodbye');
                break;
                case 'update an employee role':
                    console.log('goodbye');
                break;

                default: 
                   process.exit();
            }
        })
    };

    function viewDepartment(){
        // WHEN I choose to view all departments
        // THEN I am presented with a formatted table showing department names and department ids
        pool.query(`SELECT * FROM department`, (err, { rows }) => {
            if (err) {
              console.log(err);
            }
            console.table(rows);
            init();
          });
    }

    
    function viewRole(){
        // WHEN I choose to view all roles
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        pool.query(`SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id`, (err, { rows }) => {
            if (err) {
              console.log(err);
            }
            console.table(rows);
            init();
          });
    }

    function viewEmployees(){
        // WHEN I choose to view all employees
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        pool.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_title = employee.title FROM employee JOIN department ON employee.department_name = employee.department FROM employee JOIN role ON employee.role_salary = employee.salary employee.manager_id`, (err, { rows }) => {
            if (err) {
              console.log(err);
            }
            console.table(rows);
            init();
          });
    }

    

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// variables, functions, loops, conditions, objects, and arrays

init();
