const app = require('../app');
const db = require('../database/database');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const accessToken = require('../controllers/user.controller');

const { validation, skillIdValidation } = require('../helpers/employee.validation')

function getEmployees(req, res) {

    db.query('SELECT * FROM employees', (error, results) => {
        if (error) {
            return res.status(500).json(error);
        } else
            return res.status(200).json(results);
    });
}

async function addEmployee(req, res) {
    const { first_name, last_name, dob, email, skill_level, active, age } = req.body;

    let isValid;
    
    try {
         isValid = await skillIdValidation(skill_level);
      } catch (error) {
        // Handle the error here if needed
        console.error("An error occurred:", error);
      }
  
    if (!validation(req.body) || isValid) {
        return res.status(400).json({
            "message": "Invalid employee details"
        })
    }
    const employee_id = uuid.v4();

    db.query('SELECT employee_id, email FROM employees WHERE email = ?', [email], (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (result.length > 0) {
            if (employee_id === result[0].employee_id) {
                return res.status(400).json({
                    "message": "That employee id is already exists."
                });
            }
            if (email === result[0].email) {
                return res.status(400).json({
                    "message": "That email is already exists."
                });
            }
        }

        db.query('INSERT INTO employees SET ?', { employee_id: employee_id, first_name: first_name, last_name: last_name, dob: dob, email: email, skill_level: skill_level, active: active, age: age }, (error, result) => {
            if (error) {
                return res.status(500).json(error);
            } if (result) {
                return res.status(201).json({
                    "employee_id": employee_id
                })
            }
        })
    })
}

function editEmployee(req, res) {
    const { first_name, last_name, dob, email, skill_level, active, age } = req.body;

    const employee_id = req.params.EmployeeId;
    // console.log("req body ",req.body)
    if (!validation(req.body)) {
        return res.status(400).json({
            "message": "Invalid employee details"
        })
    }

    db.query('SELECT email FROM employees WHERE employee_id <> ?', [employee_id], (error, emailResults) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (emailResults.length > 0) {
            for (let i = 0; i < emailResults.length; i++) {
                if (email === emailResults[i].email) {
                    return res.status(400).json({
                        "message": "That email is already exists."
                    });
                }
            }
        }


        db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], (error, employeeResults) => {
            if (error) {
                return res.status(500).json(error);
            }

            if (employeeResults) {
                db.query('UPDATE employees SET first_name = ?, last_name = ?, dob = ?, email = ?, skill_level = ?, active = ?, age = ? WHERE employee_id = ?', [first_name, last_name, dob, email, skill_level, active, age, employee_id], (error, result) => {
                    if (error) {
                        return res.status(500).json(error);
                    }

                    if (result) {
                        db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], (error, updatedEmployee) => {
                            if (error) {
                                return res.status(500).json(error)
                            } else {
                                return res.status(200).json(updatedEmployee[0]);
                            }
                        })
                    }

                });
            }

        })
    })
}

function deleteEmployee(req, res) {
    const employee_id = req.params.EmployeeId;

    // db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], (error, employeeFound) => {
    //     if (error) {
    //         res.status(500).json(error);
    //     }
    //     if (employeeFound.length > 0) {
    db.query('DELETE FROM employees WHERE employee_id = ?', [employee_id], (error, result) => {
        if (error) {
            res.status(500).json(error);
        }

        if (result) {
            res.status(200).json({
                "message": "Record deleted successfully!"
            });
        }
    });

    //     } else {
    //         res.status(401).json({
    //             "message": "Invalid employee id"
    //         });
    //     }
    // });
}

module.exports = {
    getEmployees: getEmployees,
    addEmployee: addEmployee,
    editEmployee: editEmployee,
    deleteEmployee: deleteEmployee
}