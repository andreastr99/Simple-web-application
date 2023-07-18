import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <h1>welcome to our app</h1>
            <Link to="/">
                <button>Log out</button>
            </Link>
        </div>
    )
}