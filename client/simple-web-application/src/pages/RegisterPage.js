import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function RegisterPage() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  //δέχεται ένα event object (πχ e) και καλεί την συνάρτηση setValues
  //όπου παίρνει το προηγούμενο state ως argument
  //ενημερώνει το state object με δυναμική ανάθεση καινούργιας τιμής που βασίζεται
  //στα e.target.name και e.target.value 
  const handleInput = (e) =>{
      setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(values)
  }

    return (
        <section className="vh-100">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className=" border-radius shadow" style={{"background": "#f1f7fe"}}>
                    <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                        <form action="/home" onSubmit={handleSubmit}>

                            <div className="form-outline mb-4">
                                <input onChange={handleInput} type="email" id="email" name='email' className="form-control form-control-lg" required/>
                                <label className="form-label" htmlFor="email">Your Email</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input onChange={handleInput} type="password" id="password" name='password' className="form-control form-control-lg"  required/>
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>

                            <div className="form-outline mb-4">
                              <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
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

                            <div className="mb-5 text-center">                          
                                <p className='mb-0'><Link to="/">Back to Homepage</Link>.</p>
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