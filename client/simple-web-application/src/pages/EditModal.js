import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { calculateDate, calculateAge, minDate, formatDate } from '../components/dateCalculation'

export default function Modal  ({ showModal, handleClose, employee}) {
  const id = employee ? employee.employee_id : null;

  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    skill_level: '',
    active: false,
    age: '',
  });

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];
  
  const handleDropdownChange = (e) => {
    const skill_level = e.target.value;
    setEditData((prevData) => ({ ...prevData, skill_level }));
  };
  
  const checkHandler = (e) => {
    const { checked } = e.target;
    setEditData((prevData) => ({ ...prevData, active: checked }));
  }

  // Initialize the form fields with employee data when the employee prop changes
  useEffect(() => {
    if (employee) {
      setEditData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        dob: formatDate(employee.dob),
        email: employee.email,
        skill_level: employee.skill_level,
        active: employee.active,
        age: employee.age,
      });
    }
  }, [employee]);

  // Handle changes in the form fields
  const handleInput = (e) =>{
    const { name, value } = e.target;
    if (name === 'dob') {
      const age = calculateAge(value);
      setEditData((prevData) => ({ ...prevData, [name]: value, age }));
    } else {
      setEditData((prevData) => ({ ...prevData, [name]: value }));
    }
  }  
  // Handle form submission (update employee data)
  const handleSubmit = (e) => {
    //   console.log(id);
    e.preventDefault();
  
    axios.put('http://localhost:8081/api/Employees/' + id, editData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
      // If the update is successful, the backend will respond with the updated employee data.
      // You can choose to handle the response here if needed, but you don't necessarily need to reload the page.
        console.log('Employee updated:', res.data);
      })
      .catch(function (err) {
        // If there's an error during the update, you can handle it here.
        console.log('Error updating employee:', err);
      })
    handleClose();
  };
  
  return (
    <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}/>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input onChange={handleInput} value={editData.first_name} type="text"  pattern="[a-zA-Z]+" className="form-control" id="first_name" name="first_name" required/>
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input onChange={handleInput} value={editData.last_name} type="text" pattern="[a-zA-Z]+" className="form-control" id="last_name" name="last_name" required/>
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  onChange={handleInput}
                  value={editData.dob}
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
                <input onChange={handleInput} value={editData.email} type="email" pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$' className="form-control" id="email" name="email" required/>
              </div>

               {/* Dropdown Menu */}
              <div className="form-group mt-3 mb-2">
                <label htmlFor="skill-level">Employee skill level: </label>
                <select id="skill-level" value={editData.skill_level} onChange={handleDropdownChange} required>
                  <option value="">Select an option</option>
                  {dropdownOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>


              {/* Boolean */}
              <div className="form-check">
                <input  onChange={checkHandler} value={editData.active} type="checkbox" className="form-check-input" id="active" name="active" />
                <label className="form-check-label" htmlFor="active">Is active?</label>
              </div>
              
              {/* Integer */}
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input onChange={handleInput} value={editData.age} type="number" min="18" className="form-control" id="age" name="age" disabled/>
              </div>

              <div className="modal-footer mt-3">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-success">Save changes</button>
              </div>

            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// export default Modal;
