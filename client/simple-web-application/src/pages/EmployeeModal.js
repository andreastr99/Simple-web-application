import React, { useState, useEffect } from 'react';
import { calculateDate, calculateAge, minDate, formatDate, convertCheckboxToBoolean, getSkill } from '../components/AssistingFunctions'
import AxiosRequests from '../components/axios';

import Dropdown from '../components/Dropdown';

export default function Modal({ showModal, handleClose, setAlertState, employee, title, onAddEmployee, onEditEmployee, skillLevels}) {

  const initialState = {
    employee_id: '',
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    skill_level: '',
    active: false,
    age: ''
  };


  const handleDropdownChange = (e) => {
    const skill = e.target.value;
    setValues((prevData) => ({ ...prevData, skill }));
    setSelectedSkillLevel(skill);
  };

  const [values, setValues] = useState(initialState)
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');

  useEffect(() => {
    if (employee && localStorage.getItem("token")) {
      const { first_name, last_name, dob, email, skill_level, active, age } = employee;
      setValues({
        first_name,
        last_name,
        dob: formatDate(dob),
        email,
        skill_level,
        active: convertCheckboxToBoolean(active),
        age,
      });
      setSelectedSkillLevel(skill_level); // Set the selected skill level state
    }
  }, [employee]);

  // useEffect(() => {
  //   if (employee && localStorage.getItem("token")) {
  //     const { first_name, last_name, dob, email, skill_level, active, age } = employee;
  //     setValues({
  //       first_name,
  //       last_name,
  //       dob: formatDate(dob),
  //       email,
  //       skill_level: getSkill(skill_level, skillLevels),
  //       active: convertCheckboxToBoolean(active),
  //       age,
  //     });

  //     console.log(getSkill(skill_level, skillLevels))
  //   }
  // }, [employee, skillLevels]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // For checkboxes, the 'value' attribute does not represent the current value of the checkbox.
      // Instead, we should use 'checked' to determine if the checkbox is checked or not.
      setValues((prevData) => ({ ...prevData, [name]: checked }));
    } else if (name === 'dob') {
      const age = calculateAge(value);
      setValues((prevData) => ({ ...prevData, [name]: value, age }));
    } else {
      setValues((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (employee) {
      try {
        const res = await AxiosRequests.editEmployee(employee.employee_id, values);
        setAlertState({ variant: 'success', show: true, message: 'Data saved successfully' });
        onEditEmployee(res.data);
      } catch (err) {
        setValues((prevData) => ({
          ...prevData,
          first_name: employee.first_name,
          last_name: employee.last_name,
          dob: formatDate(employee.dob),
          email: employee.email,
          skill_level: getSkill(employee.skill_level, skillLevels),
          active: convertCheckboxToBoolean(employee.active),
          age: employee.age,
        }));
        setAlertState({ variant: 'danger', show: true, message: err.response.data.message, statusCode: err.response.request.status });
        console.error('Error updating employee:', err.response.request.status);
      }
    } else {
      try {
        const res = await AxiosRequests.addEmployee(values);

        const newState = {
          ...values,
          employee_id: res.data.employee_id,
          active: values.active
        };

        setAlertState({ variant: 'success', show: true, message: 'Employee added successfully', statusCode: 200 });
        onAddEmployee(newState);
      } catch (err) {
        setAlertState({ variant: 'danger', show: true, message: err.response?.data?.message || 'Error adding employee', statusCode: err.response.request.status });
        console.error('Error adding employee:', err.response?.data?.message || err.message);
      }
      setValues(initialState);
    }
    handleClose();
  };

  return (
    <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input onChange={handleInputChange} value={values.first_name} type="text" pattern="[a-zA-Z]+" className="form-control" id="first_name" name="first_name" required />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input onChange={handleInputChange} value={values.last_name} type="text" pattern="[a-zA-Z]+" className="form-control" id="last_name" name="last_name" required />
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  onChange={handleInputChange}
                  value={values.dob}
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  min={calculateDate(new Date(), -100)}
                  max={minDate} // Set the maximum date to today to prevent future dates from being selected
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange={handleInputChange} value={values.email} type="email" pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$' className="form-control" id="email" name="email" required />
              </div>

              {/* Dropdown Menu */}
              {/* <div className="form-group mt-3 mb-2">
                <label htmlFor="skill-level">Employee skill level: </label>
                <select id="skill-level" value={values.skill_level} onChange={handleDropdownChange} required>
                  <option value="">Select an option</option>
                  {SKILL_LEVEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div> */}
              <Dropdown onChange={handleDropdownChange} data={skillLevels} currentValue={selectedSkillLevel} required/>


              {/* Boolean */}
              <div className="form-check">
                <input onChange={handleInputChange} checked={values.active} type="checkbox" className="form-check-input" id="active" name="active" />
                <label className="form-check-label" htmlFor="active">Is active?</label>
              </div>

              {/* Integer */}
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="text" className="form-control" id="age" name="age" value={values.age} readOnly />
              </div>

              <div className="modal-footer mt-3">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-success">Insert Employee</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};