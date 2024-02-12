import React, { useContext, useState } from 'react'
import profileImg from '../../images/contactProfile.jpg'
import { UploadProfile } from '../../http/User';
import AuthContext from '../Contexts/AuthContext';
import MessageAdmin from './MessageAdmin';

export default function Dropdown(props) {
    const { logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(profileImg);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="dropdown ms-2">
            <img className='dropdown-toggle rounded-5' data-bs-toggle="dropdown" aria-expanded="false"
                style={{ width: "50px", height: "50px" }} src={profile} alt="" />

            <ul className="dropdown-menu dropdown-menu-end">
                <button className="dropdown-item" onClick={clearAppOrders}>clear app orders</button>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                <button className="dropdown-item" onClick={() => props.setClipShow(!props.clipShow)}>{props.clipShow ? 'hide' : 'show'} clip icon</button>
                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>msg admin</button>
            </ul>
            <MessageAdmin {...{isModalOpen, setIsModalOpen}}/>
        </div>
    )
}


function clearAppOrders() {
    const token = localStorage.getItem('token'); // Assuming your token key is 'token'
    localStorage.clear();
    localStorage.setItem('token', token);
}