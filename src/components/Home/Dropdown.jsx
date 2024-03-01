import React, { useContext, useState } from 'react'
import profileImg from '../../images/contactProfile.jpg'
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
                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>msg admin</button>
                <button className="dropdown-item" onClick={clearAppOrders}>clear app orders</button>
                <button className="dropdown-item" onClick={() => props.setClipShow(!props.clipShow)}>{props.clipShow ? 'hide' : 'show'} clip icon</button>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
            </ul>
            <MessageAdmin {...{isModalOpen, setIsModalOpen}}/>
        </div>
    )
}

// next time implement setting up order using single key with values in list
function clearAppOrders() {
    const appnames='Share,Calendar,Shrink-URL,Simon,Chat,Storage,Notepad,Todo,Expenses,Photu'
    appnames.split(',').map((appname)=>{
        localStorage.removeItem(appname)
    })
    const token = localStorage.getItem('token');
}