import React from 'react'
import contactProfile from '../../../../images/contactProfile.jpg';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';

export default function ContactMessageRender({ message, setActiveUser, modalname = "" }) {

    const onContactClick = () => {
        setActiveUser(message.sender);
    }
    return (
        <div key={message.sender.id}>
            <div className='p-1 px-2 m-2' style={containerStyle} onClick={onContactClick} data-bs-dismiss={modalname}>
                <div className='row'>
                    <div className='col-2 d-flex justify-content-center align-items-center'>
                        <img src={contactProfile} style={dpStyle} alt="dp" />
                    </div>
                    <div className='col py-1'>
                        <h4 className='m-0'>{message.sender.username}</h4>
                        <div className='row text-secondary' style={{ fontSize: "0.8rem" }}>
                            <div className='col'>{message.content}</div>
                            <div className='col text-end'>{convertUtcToLocal(message.timestamp)}</div>
                        </div>
                    </div>
                </div>
            </div>
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