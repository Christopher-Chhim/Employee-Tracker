# Employee-Tracker

## Description

My motivation in developing this project was to create a database so I can organize and plan my business. This is my first time using PostgreSQL so I wanted to implement its functionality to generate a dynamic database. This application uses PostgreSQL for the seeds and the database that connects to the javascript file. The Inquirer package from the Node.js library is responsible for prompting users how they wish to interact with the database. Built using Node.js, Inquirer, and PostgreSQL, this tool allows managers and HR professionals to efficiently keep track of employee roles, departments, and salaries within the organization. This application is a useful tool for businesses to make sure that their employee data is always up-to-date and easily accessible.

## Installation

Download VSCode.
Download Node.js.
Download inquirer (npm install).
Download PostgreSQL (npm install pg package).

## Usage

Login to your postgres and connect to your database before running your javascript file on the terminal. To connect to your database you must first login to your postgres using your account information, type "\i db/schema.sql", and "\i db/seeds.sql". Run 'node index.js' on the terminal. Use the arrow keys to scroll through the dropdown menu and click enter to select an option of your choice. Once this is done, you can reply to the prompt accordingly. Check to make sure that your input is being logged in the terminal. For the options that prompt you to 'add', you can always choose the 'view' options to see if your input has been generated to the database. Once you are done with your prompt you should be taken back to the initial prompt and this process will keep looping until you choose to quit the terminal.  
For further instructions please refer to this link: (https://drive.google.com/file/d/1JOcXVV-yJe6nLiAT4vn6boulb35sA-6l/view)


## License

MIT License

Copyright <2024> <Christopher Chhim>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

![opensource](https://img.shields.io/badge/generator-open_source-blue)

## Features

View Departments: Display a list of all department names and its corresponding ids.

View Roles: Display a list of all roles, along with its respective departments, department ids, and salaries. 

View Employees: Display a list of all employees, along with their roles, departments, salaries, and managers.

Add Departments: Add new departments to the database by entering a department name.

Add Roles: Add new roles to the database by entering its name, salary, and the department it belongs to. 

Add Employees: Add new employees to the database by entering their name, role, department, and manager.

Update Employee Roles: Modify an existing employee's role within the company, including changes in their department or manager.

Dynamic User Interaction: Intuitive prompts guide users through the process of adding, updating, and viewing employee data.

## Tests

Choose whichever option you desire from the dropdown menu. Make sure to check that the generated database is correspondent to your input. 