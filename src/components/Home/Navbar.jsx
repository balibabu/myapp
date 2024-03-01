import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import AuthContext from '../Contexts/AuthContext';
import ClipboardSync from './ClipboardSync';
import VariableContext from '../Contexts/VariableContext';


export default function Navbar() {
    const { loggedIn, username,token } = useContext(AuthContext);
    const { clipShow, setClipShow } = useContext(VariableContext);

    return (
        <>
            <nav className="navbar navbar-expand bg-primary data-bs-theme='dark'">
                <div className="container-fluid">
                    {clipShow ?
                        <ClipboardSync token={token}/> :
                        <h1 className="navbar-brand">Welcome</h1>
                    }
                    <div className="nav">
                        {loggedIn ?
                            <><h4 className='mt-2'>Hello {username}</h4>
                                <Dropdown {...{ clipShow, setClipShow }} /></>
                            :
                            <><Link style={linkStyle} to="/login">Login</Link>
                                <Link style={linkStyle} to="/register" className='ms-2'>Register</Link></>}
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

const bellStyle = {
    border: "none",
    height: "2rem",
}
