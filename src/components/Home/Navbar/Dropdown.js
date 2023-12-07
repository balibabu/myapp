import React, { useContext } from 'react'
import AuthContext from '../../../global/AuthContext'
import { Link } from 'react-router-dom';

export default function Dropdown() {
    const {logout} = useContext(AuthContext);
    return (
        <div className="dropdown">
            <img className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false"
                style={{ width: "50px", height: "50px" }} src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />

            <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/register">About</Link></li>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
            </ul>
        </div>
    )
}
