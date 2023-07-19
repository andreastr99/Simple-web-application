import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

export default function ForgetPasswordPage() {

    const [email, setEmail] = useState("");
    
    const handleInput = (e) =>{
        setEmail(prevData => ({...prevData, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email)
    }

    return (
        <section className="vh-100 background-stripe">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-5">
                        <div className="card border-radius shadow" style={{"background": "#f1f7fe", "maxWidth": "450px", "margin": "auto"}}>
                                <div className="card-body p-4">
                                    <form action="/" onSubmit={handleSubmit}>

                                    <h2 className="mb-5">Reset your password</h2>
                                    <h6 className="mb-2">Enter your email address and we will send you a link to create a new password</h6>

                                        <div className="form-outline mb-4">
                                        <input onChange={handleInput} type="email" id="email" name="email" className="form-control form-control-lg" required/>
                                        <label className="form-label" htmlFor="email">Your Email</label>
                                        </div>

                                        <div className="d-grid gap-2 mb-5">
                                            <button type="submit" className="btn-login">Reset Password</button>
                                        </div>

                                        <div className="mb-5 text-center text-muted">
                                            <p className="mb-0">Don't have an account? <Link to="/register">Create an account</Link>.</p>
                                            <p className="mb-0">Have already an account? <Link to="/">Login here</Link>.</p>   
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