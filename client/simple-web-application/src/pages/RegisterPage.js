import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    reenterPassword: ''
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'password') {
      setPasswordMatch(value === formData.reenterPassword);
    } else if (name === 'reenterPassword') {
      setPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.reenterPassword) {
      // Passwords match, perform registration logic
      console.log('Registration successful');
      console.log(formData);
    } else {
      // Passwords don't match, display an error message or take appropriate action
      console.log('Passwords do not match');
      console.log(formData);
    }
  }

  return (
    <section className="vh-100 background-stripe">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-5">
              <div className="card border-radius shadow" style={{ "background": "#f1f7fe", "maxWidth": "450px", "margin": "auto" }}>
                <div className="card-body p-4">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  <form action="/home" onSubmit={handleSubmit}>

                    <div className="form-outline mb-4">
                      <input onChange={handleInput} type="email" id="email" name="email" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input onChange={handleInput} type="password" id="password" name="password" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <div className="form-outline mb-1">
                      <input onChange={handleInput} type="password" id="reenterPassword" name="reenterPassword" className="form-control form-control-lg" required />
                      <label className="form-label" htmlFor="reenterPassword">Repeat your password</label>
                    </div>

                    <div className="text-center">
                      {!passwordMatch && <p style={{ "color": "red" }}>Passwords do not match</p>}
                    </div>
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="agreeBox" />
                      <label className="form-check-label" htmlFor="agreeBox">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>
                    <div className="d-grid gap-2 mb-5">
                      <button type="submit" className="btn-login">Register</button>
                    </div>

                    <div className="mb-5 text-center text-muted">
                      <p className="mb-0">Have already an account? <Link to="/">Login here</Link></p>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}