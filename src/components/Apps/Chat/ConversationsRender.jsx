import React, { useContext } from 'react'
import AuthContext from '../../../global/AuthContext';
import contactProfile from '../../../images/contactProfile.jpg';
import convertUtcToLocal from '../../../utility/AutoLocalTime';

export default function ConversationsRender({ onSelect, conversations }) {
    const { username } = useContext(AuthContext);

    const onContactClick = (user) => {
        onSelect(user);
    }
    return (
        <div className='pt-2'>
            {conversations.map((message) => {
                const user = message.sender.username === username ? message.receiver : message.sender;
                return <div key={message.id}>
                    <div className='p-1 px-2 m-2' style={containerStyle} onClick={() => onContactClick(user)}>
                        <div className='row'>
                            <div className='col-2 d-flex justify-content-center align-items-center'>
                                <img src={contactProfile} style={dpStyle} alt="dp" />
                            </div>
                            <div className='col py-1'>
                                <h4 className='m-0'>{user.username}</h4>
                                <div className='row text-secondary' style={{ fontSize: "0.8rem", overflow: "hidden", whiteSpace: "nowrap" }}>
                                    <div className='col'>{message.content}</div>
                                    <div className='col text-end'>{convertUtcToLocal(message.timestamp)}</div>
                                </div>
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