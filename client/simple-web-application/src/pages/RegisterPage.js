import React from 'react'
import { Link } from 'react-router-dom'


export default function RegisterPage() {

    return (
        <div>
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/home">
                <p>
                    <label htmlFor='username'>Username</label><br/>
                    <input type="text" name="username" required />
                </p>
                <p>
                    <label htmlFor='email'>Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor='password'>Password</label><br/>
                    <input type="password" name="password" requiredc />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}