import React from 'react'
import convertUtcToLocal from '../../../utility/AutoLocalTime';

export default function DisplayMessages({ messages, username, activeUser }) {
    return (
        <div>
            {messages[activeUser.id] && messages[activeUser.id].map((message) => {
                if (message.sender.username === username) {
                    return <div className='d-flex justify-content-end' key={message.id}>
                        <div className='mb-2'>
                            <div className='bg-success' style={{ whiteSpace: 'pre-line', borderRadius: "2rem 2rem 0 2rem" }}>
                                <div className='px-3'>{message.content}</div>
                                <div className='text-end' style={dateTimeStyle}>{convertUtcToLocal(message.timestamp, options)}</div>
                            </div>
                        </div>
                    </div>
                } else {
                    return <div key={message.id}>
                        <div className='d-flex mb-2'>
                            <div className='bg-primary' style={{ whiteSpace: 'pre-line', borderRadius: "2rem 2rem 2rem 0", }}>
                                <div className='px-3'>{message.content}</div>
                                <div style={dateTimeStyle}>{convertUtcToLocal(message.timestamp, options)}</div>
                            </div>
                        </div>
                    </div>
                }
            })}
        </div>
    )
}



const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

const dateTimeStyle = {
    fontSize: "9px",
    color: "black",
    paddingLeft: "5px",
    paddingRight: "5px",
}