import React from 'react'
import contactProfile from '../../../images/contactProfile.jpg';

export default function ContactRender({ users, onSelect, modalname = "" }) {

    const onContactClick = (user) => {
        onSelect(user);
    }
    return (
        <div className='pt-2'>
            {users.map((user) => {
                return <div key={user.id}>
                    <div className='p-1 px-2 m-2' style={containerStyle} onClick={() => onContactClick(user)} data-bs-dismiss={modalname}>
                        <div className='row'>
                            <div className='col-2 d-flex justify-content-center align-items-center'>
                                <img src={contactProfile} style={dpStyle} alt="dp" />
                            </div>
                            <div className='col d-flex align-items-center'>
                                <h4 className='m-0 fs-3'>{user.username}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

const dpStyle = {
    width: "3rem",
    height: "3rem",
    borderRadius: "1.3rem",
}

const containerStyle = {
    backgroundColor: "#a2d2ff",
    borderRadius: "1rem",
}