import React from 'react';

const Modal = ({ showModal, handleClose }) => {
  return (
    <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}/>
          </div>
          <div className="modal-body">
            <form>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" />
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" className="form-control" id="dateOfBirth" />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="address">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>

               {/* Dropdown Menu */}
               <div className="form-group">
                <label htmlFor="dropdownMenu">Skill level</label>
                <select className="form-control" id="dropdownMenu">
                  <option value="" disabled>Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>


              {/* Boolean */}
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="isSubscribed" />
                <label className="form-check-label" htmlFor="isSubscribed">
                 Is active?
                </label>
              </div>
              
              {/* Integer */}
              <div className="form-group">
                <label htmlFor="age">Age (Integer)</label>
                <input type="number" className="form-control" id="age" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-success">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
