import React, { useContext } from 'react'
import contactProfile from '../../../../images/contactProfile.jpg';
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import AuthContext from '../../../Contexts/AuthContext';

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
                            <div className='col-10 py-1'>
                                <div className='row'>
                                    <div className=''>{user.username}</div>
                                    <div className='text-secondary'>
                                        <div className='' style={{ fontSize: "0.8rem", overflow: "hidden", whiteSpace: "nowrap" }}>{message.content}</div>
                                        <div className='text-end' style={{ fontSize: "0.6rem"}}>{convertUtcToLocal(message.timestamp)}</div>
                                    </div>
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