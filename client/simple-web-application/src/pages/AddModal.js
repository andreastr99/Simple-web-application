import React, { useState } from 'react';

const Modal = ({ showModal, handleClose }) => {
  const initialState = {
    selectedOption: ''
  };
  
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];
  
  function DropdownComponent() {
    const [state, setState] = useState(initialState);
  
    const handleDropdownChange = (event) => {
      const selectedOption = event.target.value;
      setState({ selectedOption });
    };
  }
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    active: false,
    age: ''
  })

  const handleInput = (e) =>{
    setValues(prevData => ({...prevData, [e.target.name]: [e.target.value]}))
}

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleClose();
    setValues({
      first_name: '',
      last_name: '',
      dob: '',
      email: '',
      active: false,
      age: ''
    })
    console.log(values)
  }

  return (
    <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Employee</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}/>
          </div>
          <div className="modal-body">
            <form>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input onChange={handleInput} value={values.first_name} type="text" className="form-control" id="first_name" name="first_name" />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input onChange={handleInput} value={values.last_name} type="text" className="form-control" id="last_name" name="last_name" />
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input onChange={handleInput} value={values.dob} type="date" className="form-control" id="dob" name="dob" />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange={handleInput} value={values.email} type="email" className="form-control" id="email" name="email" />
              </div>

               {/* Dropdown Menu */}
               <div className="form-group">
               <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={state.selectedOption} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Selected option: {state.selectedOption}</p>
                </div>


              {/* Boolean */}
              <div className="form-check">
                <input onChange={handleInput} value={values.active} type="checkbox" className="form-check-input" id="active" name="active" />
                <label className="form-check-label" htmlFor="active">
                 Is active?
                </label>
              </div>
              
              {/* Integer */}
              <div className="form-group">
                <label htmlFor="age">Age (Integer)</label>
                <input onChange={handleInput} value={values.age} type="number" className="form-control" id="age" name="age" />
              </div>
              
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button onClick={handleSubmit} type="submit" className="btn btn-success">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
