const inquirer = require('inquirer');
const db = require('./db/connection');


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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add employee', 'Update an employee', 'Log Out']
        },
    ]).then((answers) => {
        //views the department table in database
        if (answers.prompt === 'View all departments') {
            db.promise().query('SELECT * FROM department').then(([data]) => {
                console.table(data)
                organilize_tracker()
            })
            // db.promise().query(`SELECT  * FROM department`, (err, result) => {
            //     if (err) throw err;
            //     console.log("View all departments");
            //     console.table(result);
            //     organilize_tracker();
            // })
        } else if (answers.prompt === 'View all roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("View all roles");
                console.table(result);
                organilize_tracker();
            });
        } else if (answers.prompt === 'View all employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
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
            //////////////////////////////// adding role
        } else if (answers.prompt === 'Add a role') {
            inquirer.prompt([
                //gathering data to choose from database
                db.query(`SELECT * FROM depeartment`, (err, result) => {
                    if (err) throw err;

                    inquirer.prompt([
                        {
                            //Adding new role
                            type: 'input',
                            name: 'role',
                            message: 'What is the name of role?',
                            validate: roleInput => {
                                if (roleInput) {
                                    return true;
                                } else {
                                    console.log('Please enter a role!');
                                    return false;
                                }
                            }
                        },
                        {
                            //Adding salary
                            type: 'input',
                            name: 'salary',
                            message: 'What is the role salary?',
                            validate: salaryInput => {
                                if (salaryInput) {
                                    return true;
                                } else {
                                    console.log('Please enter role salary!');
                                    return false;
                                }
                            }
                        },
                        {
                            //department
                            type: 'list',
                            name: 'department',
                            message: 'Wich department does the role belong to?',
                            choices: () => {
                                var array = [];
                                for (var i = 0; i < result.length; i++) {
                                    array.push(result[i].name);
                                }
                                return array;
                            }
                        }
                    ]).then((answers) => {
                        //comparing the result and storing into variable
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].name === answers.department) {
                                var department = result[i];
                            }
                        }

                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department_id], (err, result) => {
                            if (err) throw err;
                            console.log(`Added ${answers.role} to the database`);
                        })
                    });
                })
            ]);
            //////////////////////////////Adding employee
        } else if (answers.prompt === 'Add employee') {
            //calling database to gather roles and managers
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        //Adding employee first name
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a name!')
                                return false;
                            }
                        }
                    },
                    {
                        //Adding employee last name
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name? ',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please anter employee las name!')
                                return false;
                            }
                        }
                    },
                    {
                        //Adding employee role 
                        type: 'input',
                        name: 'role',
                        message: 'What ism the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Adding employess manager
                        type: 'input',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Please add manager!')
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    //comparing results and storing into variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i]
                        }
                    }

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${lastName} to database.`)
                        organilize_tracker();
                    });
                })
            })
        } else if (answers.prompt === 'Update an employee') {
            // gathering database information
            db.query(`SELECT * FROM employee , role`, (err, result) => {
                if (err) throw err;
                //choice of emplyee to update
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Wich employee would you like to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        ///updates new role
                        type: 'list',
                        name: 'role',
                        message: 'Wich role would you like to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title)
                            }
                            var newArray = [...new Set(array)]
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    for(var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var name = result[i];
                        }
                    }
                    for (var i= 0; i < result.length; i++){
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to database.`)
                        organilize_tracker();
                    })
                })
            })
        } else if (answers.prompt === 'Log Out'){
            db.end();
            console.log("GOOD-BYE!")
        }
    });
};

organilize_tracker();