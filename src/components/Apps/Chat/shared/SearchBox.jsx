import React, { useContext, useEffect, useState } from 'react'
import ContactRender from './ContactRender';
import ChatContext from '../../../Contexts/ChatContext';

export default function SearchBox({ modalId, onSelect }) {
    const [username, setUsername] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { users } = useContext(ChatContext);


    const onNameChange = (event) => {
        const inputValue = event.target.value;
        setUsername(inputValue);
        setFilteredUsers(users.filter((user) => user.username.toLowerCase().includes(inputValue.toLowerCase())));
    }

    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className='input-group'>
                            <input onChange={onNameChange} value={username} className="form-control form-control-lg" type="text" placeholder="type name" />
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <ContactRender users={filteredUsers} onSelect={onSelect} modalname='modal' />
                    </div>
                </div>
            </div>
        </div>
    )
}
