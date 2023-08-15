import React from 'react'
import image from '../assets/404.png'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', backgroundColor:'#dde5f4',  minHeight: '100vh' }}>
            <h1>Page Not Found</h1>
            <img
                src={image}
                alt="Page Not Found"
                style={{ width: '50%', maxWidth: '400px', margin: '0 auto' }}
            />

            <p>
                <Link to="/">Go back to home page</Link>
            </p>
        </div>
    )
}

export default NotFoundPage;