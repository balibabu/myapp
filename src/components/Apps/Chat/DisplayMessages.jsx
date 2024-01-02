import React from 'react'
import convertUtcToLocal from '../../../utility/AutoLocalTime';
import Tooltip from '../../../utility/Tooltip';

export default function DisplayMessages({ messages, username, activeUser }) {
    return (
        <div>
            {messages[activeUser.id] && messages[activeUser.id].map((message) => {
                return <Message message={message} isSent={message.sender.username === username} />
            })}
        </div>
    )
}


function Message({ message, isSent }) {
    let class1 = 'd-flex';
    let bg = 'bg-primary';
    let borderRadius = '2rem 2rem 2rem 0';
    let textAlign = '';

    if (isSent) {
        class1 = 'd-flex justify-content-end';
        bg = 'bg-success';
        borderRadius = '2rem 2rem 0 2rem';
        textAlign = 'text-end';
    }
    return (
        <div className={class1}>
            <div className='mb-2'>
                <div className={bg} style={{ whiteSpace: 'pre-line', borderRadius: borderRadius }}>
                    <Tooltip text={convertUtcToLocal(message.timestamp,options2)}>
                        <div className='px-3'>{message.content}</div>
                    </Tooltip>
                    <div className={textAlign} style={dateTimeStyle}>{convertUtcToLocal(message.timestamp, options)}</div>
                </div>
            </div>
        </div>
    );
}


const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

const options2={
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
}

const dateTimeStyle = {
    fontSize: "9px",
    color: "black",
    paddingLeft: "5px",
    paddingRight: "5px",
}
