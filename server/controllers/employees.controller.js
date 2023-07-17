const app = require('../app');
const db = require('../database/database');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const accessToken  = require('../controllers/user.controller');




function getEmployees (req, res){
   
    db.query('SELECT * FROM employees', (error, results) => {
      if (error){
        res.status(500).json(error);
      }else
          res.status(200).json(results);
    });
}

function addEmployee (req, res) {
    const {first_name, last_name, dob, email, skill_level, active, age} = req.body;

    const employee_id = uuid.v4();
    db.query('SELECT employee_id, email FROM employees WHERE email = ?',[email], (error, result) =>{
        if(error){
            res.status(500).json(error);
        }

        if(result.length > 0){
            if(employee_id === result[0].employee_id){
                return res.json({
                    "message": "That employee id is already exists."
                });
            }
            if(email === result[0].email){
                return res.json({
                    "message": "That email is already exists."
                });
            }
        }

        db.query('INSERT INTO employees SET ?', {employee_id: employee_id, first_name: first_name, last_name:last_name, dob:dob, email:email, skill_level:skill_level, active:active, age:age}, (error, result) =>{
            if(error){
                res.status(500).json(error);
            }else{
                res.status(201).json({
                    "employee_id": employee_id
                })
            }
        })
    })
}

function editEmployee (req, res){
    const {first_name, last_name, dob, email, skill_level, active, age} = req.body;
    
    const employee_id = req.params.EmployeeId;
 
    db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], (error, employeeResults) =>{
        if (error){
            res.status(500).json(error);
        }

        if(employeeResults){ 
            db.query('UPDATE employees SET first_name = ?, last_name = ?, dob = ?, email = ?, skill_level = ?, active = ?, age = ? WHERE employee_id = ?', [first_name, last_name, dob, email, skill_level, active, age, employee_id], (error, result) => {
                if (error){
                    res.status(500).json(error);
                }

                if(result){
                    db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], (error, updatedEmployee) =>{
                        if(error){
                            res.status(500).json(error)
                        }else{
                            res.status(200).json(updatedEmployee[0]);
                        }
                    })
                }
                    
            });
        }

    })            
}

function deleteEmployee (req, res){
    const employee_id = req.params.EmployeeId;

    db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id], (error, employeeFound) =>{
        if (error){
           res.status(500).json(error);
        }
        if(employeeFound.length > 0){
            db.query('DELETE FROM employees WHERE employee_id = ?', [employee_id], (error, result) =>{
                if (error){
                    res.status(500).json(error);
                }

                if(result){
                    res.status(200).json({
                        "message" : "record deleted successfully!"
                    });
                }
            });

        }else{
            res.status(401).json({
                "message": "Invalid employee id"
            });
        }
    });
}

module.exports = {
    getEmployees: getEmployees,
    addEmployee: addEmployee,
    editEmployee: editEmployee,
    deleteEmployee: deleteEmployee
}