import React, { useEffect, useRef, useState } from 'react'
import convertUtcToLocal from '../../../../utility/AutoLocalTime';
import deleteImg from '../../../../images/delete.png'

export default function DisplayMessages({ messages, username, activeUser, token }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='mb-2 mx-3 rounded-3' style={{ position: 'relative', height: "90dvh", backgroundColor: "#8ecae6" }}>
            <div className='col-12 custom-scrollbar px-1 pt-2' style={{ position: 'absolute', bottom: '0', overflowY: 'auto', maxHeight: "90dvh" }}>
                {messages[activeUser.id] && messages[activeUser.id].map((message) => {
                    return <Message key={message.id} message={message} isSent={message.sender.username === username} {...{ token }} />
                })}
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    )
}


function Message({ message, isSent, token }) {
    const [showTime, setShowTime] = useState(false);
    let class1 = 'd-flex pe-5';
    let bg = 'bg-primary';
    let borderRadius = '1rem 1rem 1rem 0';
    let textAlign = '';

    if (isSent) {
        class1 = 'd-flex justify-content-end ps-5';
        bg = 'bg-success';
        borderRadius = '1rem 1rem 0 1rem';
        textAlign = 'text-end';
    }

    function deleteHandler() {
        alert(message.id)
    }
    return (
        <div className={class1}>
            <div className='mb-1'>
                <div className='d-flex'>
                    <div className={bg} style={{ whiteSpace: 'pre-line', borderRadius: borderRadius }}>
                        <div className='px-2 p-1' onClick={() => setShowTime(!showTime)}>{message.content}</div>
                    </div>
                    {showTime && isSent && <img src={deleteImg} style={{ height: '2rem' }} alt='delete' onClick={deleteHandler} />}
                </div>
                {showTime && <div className={textAlign} style={dateTimeStyle}>{convertUtcToLocal(message.timestamp)}</div>}
            </div>
        </div>
    );
}

const dateTimeStyle = {
    fontSize: "9px",
    color: "black",
    paddingLeft: "5px",
    paddingRight: "5px",
}
