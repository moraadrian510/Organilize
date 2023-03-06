const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

//connecting to mysql database
db.connect(function (err) {
    if (err) throw err; {
        console.log("connected to Organilize database")
    }
});

const organilize_tracker = () => {
    return inquirer.prompt([
        //command line starting point
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all emplopyees', 'Add a department', 'Add a role', 'Add employee', 'Update an employee','Log Out']
        },
    ]).then((answers) => {
        //views the department table in database
        if (answers.prompt === 'View all departments') {
            db.query(`SELECT  * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("View all departments");
                console.table(result);
                organilize_tracker();
            })
        } else if (answers.prompt === 'View all roles') {
            db, query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log("View all roles");
                console.table(result);
                organilize_tracker();
            });
        } else if (answers.prompt === 'View all employees') {
            db.query(`SELECT * FROM employees`, (err, result) => {
                if (err) throw err;
                console.log("View all employees");
                console.table(result);
                organilize_tracker();
            });
        } else if (answers.prompt === 'Add a department') {
            inquirer.prompt([{
                //adding a new department 
                type: 'input',
                name: 'department',
                message: 'What is the name of department you want to add?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please enter name of department')
                    }
                }
            }]).then((answer) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answer.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answer.department} to database.`)
                    organilize_tracker();
                });
            })
        } else if (answers.prompt === 'Add a role') {
            inquirer.prompt([{
                //adding new role 
                type: 'input',
                name: 'role',
                message: 'What is the name of role you want to add?',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('Please enter name of role');
                    }
                }
            }])
        }
    });
};