const express = require('express');
const employeesController = require('../controllers/employees.controller');
const checkAuthMiddleware = require('../middleware/authentication');
const router = express.Router();


router.get('/Employees', checkAuthMiddleware.checkAuth, employeesController.getEmployees);
router.post('/Employees', checkAuthMiddleware.checkAuth, employeesController.addEmployee);
router.put('/Employees/:EmployeeId', checkAuthMiddleware.checkAuth, employeesController.editEmployee);
router.delete('/Employees/:EmployeeId', checkAuthMiddleware.checkAuth, employeesController.deleteEmployee);


module.exports = router;