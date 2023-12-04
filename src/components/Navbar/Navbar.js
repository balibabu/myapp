import React, { useContext } from 'react'
import AuthContext from '../../global/AuthContext'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';


export default function Navbar() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <>
            <nav className="navbar navbar-expand bg-primary data-bs-theme='dark'">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Welcome</h1>
                    <div className="nav">
                        {
                            loggedIn ?
                                <>
                                    <h4 className='mt-2'>Hello Boss</h4>
                                    <Dropdown />
                                </>
                                :
                                <>
                                    <Link style={linkStyle} to="/login">Login</Link>
                                    <Link style={linkStyle} to="/register" className='ms-2'>Register</Link>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}



const linkStyle = {
    textDecoration: "none",
    fontSize: "1rem",
    color: "#03A9F4",
}