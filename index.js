const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool(
  {
    // Enter PostgreSQL username
    user: "postgres",
    // Enter PostgreSQL password
    password: "Christopher123",
    host: "127.0.0.1",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database!")
);

pool.connect();

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "quit",
        ],
        name: "options",
      },
    ])
    .then((answers) => {
      console.log(answers.options);

      switch (answers.options) {
        case "view all departments":
          viewDepartment();
          break;
        case "view all roles":
          viewRole();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
          break;

        default:
          process.exit();
      }
    });
}

function viewDepartment() {
  // WHEN I choose to view all departments
  // THEN I am presented with a formatted table showing department names and department ids
  pool.query(
    `SELECT department.id, department.name AS department FROM department;`,
    (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
      init();
    }
  );
}

function viewRole() {
  // WHEN I choose to view all roles
  // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  pool.query(
    `SELECT role.title, role.id, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;`,
    (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
      init();
    }
  );
}

function viewEmployees() {
  // WHEN I choose to view all employees
  // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles,
  // departments, salaries, and managers that the employees report to

  const query = `SELECT e.id, e.first_name, e.last_name , r.title, d.name AS department, r.salary, CONCAT (m.first_name , ' ' , m.last_name) AS Manager
            FROM employee e 
            JOIN role r ON e.role_id = r.id
            JOIN department d ON d.id = r.department_id
            LEFT JOIN employee m ON e.manager_id = m.id;
            `;
  pool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const { rows } = result;
      console.table(rows);
      init();
    }
  });
}

function addDepartment(departmentName) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department do you want to add?",
        name: "departmentName",
      },
    ])
    .then((answer) => {
      console.log(`${answer.departmentName} was added to department column`);
      // WHEN I choose to add a department
      // THEN I am prompted to enter the name of the department and that department is added to the database
      pool.query(
        `INSERT INTO department (name)
          VALUES ($1) ;`,
        [answer.departmentName],
        (err, { rows }) => {
          if (err) {
            console.log(err);
          } else {
            init();
          }
        }
      );
    });
}

function addRole(role) {
  pool.query(`SELECT * FROM department ;`, (err, { rows }) => {
    if (err) {
      console.log(err);
    }
    const department = rows.map((d) => ({
      name: d.name,
      value: d.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          message: "What role do you want to add?",
          name: "role",
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department does this role belong to?",
          name: "department",
          choices: department,
        },
      ])
      .then((answer) => {
        console.log(
          `${answer.role}, ${answer.salary}, ${answer.department} was added to role column`
        );
        // WHEN I choose to add a role
        // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        pool.query(
          `INSERT INTO role (title, salary, department_id)
          VALUES ($1, $2, $3)
          Returning *;`,
          [answer.role, answer.salary, answer.department],
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
      })
      .then(() => {
        init();
      });
  });
}

function addEmployee() {
  pool.query(`SELECT * FROM role;`, (err, { rows }) => {
    if (err) {
      console.log(err);
    }
    const roles = rows.map((r) => ({
      name: r.title,
      value: r.id,
    }));

    pool.query(`SELECT * FROM employee;`, (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      const managers = rows.map((m) => ({
        name: `${m.first_name} ${m.last_name}`,
        value: m.id,
      }));

      inquirer
        .prompt([
          // WHEN I choose to add an employee
          // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: roles,
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager",
            choices: managers,
          },
        ])
        .then((answer) => {
          console.log(
            `${
              (answer.firstName, answer.lastName, answer.role, answer.manager)
            } was added to the employee column`
          );
          pool.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4) ;`,
            [answer.firstName, answer.lastName, answer.role, answer.manager],
            (err, { rows }) => {
              if (err) {
                console.log(err);
              } else {
                init();
              }
            }
          );
        });
    });
  });
}
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

function updateEmployeeRole() {
  pool.query(`SELECT * FROM employee;`, (err, { rows }) => {
    if (err) {
      console.log(err);
    }
    const employees = rows.map((e) => ({
      name: `${e.first_name} ${e.last_name}`,
      value: e.id,
    }));

    pool.query(`SELECT * FROM role;`, (err, { rows }) => {
      if (err) {
        console.log(err);
      }
      const role = rows.map((r) => ({
        name: r.title,
        value: r.id,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee's role do you want to update",
            name: "employees",
            choices: employees,
          },
          {
            type: "list",
            message:
              "Which role do you want to assign to the selected employee?",
            name: "newRole",
            choices: role,
          },
        ])
        .then((answer) => {
          pool.query(
            `UPDATE employee SET role_id = $1 WHERE id = $2;`,
            [answer.newRole, answer.employees],
            (err, { rows }) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Employee role updated successfully!");
                init();
              }
            }
          );
        });
    });
  });
}
// variables, functions, loops, conditions, objects, and arrays

init();
