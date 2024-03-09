import React, { useContext, useState } from 'react'
import profileImg from '../../images/contactProfile.jpg'
import AuthContext from '../Contexts/AuthContext';
import MessageAdmin from './MessageAdmin';
import { ClipSync } from '../../http/User';
import VariableContext from '../Contexts/VariableContext';

export default function Dropdown(props) {
    const { logout, token } = useContext(AuthContext);
    const { notify } = useContext(VariableContext);
    const [profile, setProfile] = useState(profileImg);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="dropdown ms-2">
            <img className='dropdown-toggle rounded-5' data-bs-toggle="dropdown" aria-expanded="false"
                style={{ width: "50px", height: "50px" }} src={profile} alt="" />

            <ul className="dropdown-menu dropdown-menu-end">
                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>msg admin</button>
                <button className="dropdown-item" onClick={clearAppOrders}>clear app orders</button>
                <button className="dropdown-item" onClick={() => clipClickHandler(notify, token)}>sync clip</button>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
            </ul>
            <MessageAdmin {...{ isModalOpen, setIsModalOpen }} />
        </div>
    )
}

// next time implement setting up order using single key with values in list
function clearAppOrders() {
    const appnames = 'Share,Calendar,Shrink-URL,Simon,Chat,Storage,Notepad,Todo,Expenses,Photu'
    appnames.split(',').map((appname) => {
        localStorage.removeItem(appname)
    })
    const token = localStorage.getItem('token');
}


async function clipClickHandler(notify, token) {
    try {
        const content = await ClipSync(token);
        navigator.clipboard.writeText(content);
        notify('Clipboard', 'synced', 'success');
    } catch (error) {
        notify('Clipboard Error', 'check console for details', 'danger');
    }
}