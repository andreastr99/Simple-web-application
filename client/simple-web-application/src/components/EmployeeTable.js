import React, { useState } from 'react'
import EmployeeModal from './EmployeeModal';
import { formatDate, getSkill } from '../helpers/AssistingFunctions'
import AxiosRequests from '../api/axios';


const EmployeeTable = ({ data, setData, skillLevels, setAlertState }) => {

    // --------------Add Modal--------------
    const [showAddModal, setShowAddModal] = useState(false);

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleAddEmployee = (newEmployee) => {
        setData(prevData => [...prevData, newEmployee]);
    };

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowEditModal = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditEmployee = (updatedEmployee) => {
        setData(prevData => prevData.map(employee => (employee.employee_id === updatedEmployee.employee_id ? updatedEmployee : employee)));
    };

    const handleDelete = (employee_id) => {
        console.log(employee_id);

        AxiosRequests.deleteEmployee(employee_id)
            .then(res => {
                setAlertState({ variant: 'success', show: true, message: res.data.message, statusCode: 200 })
                setData(prevData => prevData.filter(employee => employee.employee_id !== employee_id));
            })
            .catch(function (err) {
                setAlertState({ variant: 'danger', show: true, message: err.response.data.message, statusCode: err.response.request.status })
            })
    }

    return (
        <section>
            <div className="d-flex justify-content-start mb-2">
                <button type="button" className="btn btn-success" onClick={handleShowAddModal}>Add Employee +</button>
                <EmployeeModal showModal={showAddModal} handleClose={handleCloseAddModal} setAlertState={setAlertState} employee={null} title={"Add Employee"} onAddEmployee={handleAddEmployee} skillLevels={skillLevels} />
            </div>
            <div className="table-responsive">
                <table className="table table-hover" >
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Skill level</th>
                            <th>Active</th>
                            <th>Age</th>
                            <th style={{ "textAlign": "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee) => {
                            return <tr key={employee.employee_id}>
                                {/* <td>{employee.employee_id}</td> */}
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{formatDate(employee.dob)}</td>
                                <td>{employee.email}</td>
                                <td>{getSkill(employee.skill_level, skillLevels)}</td>
                                <td style={{ "textAlign": "center" }}>
                                    {(employee.active) ? (
                                        <span className="text-success ">&#x2713;</span>
                                    ) : (
                                        <span className="text-danger">&#x2717;</span>
                                    )}
                                </td>
                                <td>{employee.age}</td>
                                <td>
                                    <button onClick={() => handleShowEditModal(employee)} className="btn btn-sm btn-primary mx-2">Edit</button>
                                    <EmployeeModal showModal={showEditModal} handleClose={handleCloseEditModal} setAlertState={setAlertState} employee={selectedEmployee} title={"Edit Employee"} onEditEmployee={handleEditEmployee} skillLevels={skillLevels} />
                                    <button onClick={() => handleDelete(employee.employee_id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default EmployeeTable