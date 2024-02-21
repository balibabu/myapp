import React, { useState, useRef, useEffect } from 'react';

export default function Test() {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    // Function to add new message
    const addMessage = (msg) => {
        setMessages(prevMessages => [...prevMessages, msg]);
    };

    // Automatically scroll to the bottom when new message is added
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll to bottom on initial render and whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='bg-secondary' style={{ height: '100vh', position: 'relative' }}>
            <div className='bg-primary col-12' style={{ position: 'absolute', bottom: '0', overflowY: 'auto', maxHeight: 'calc(100vh - 20px)' }}>
                {messages.map((msg, index) => (
                    <div key={index} className={index % 2 === 0 ? 'bg-info m-2 px-2 py-1 rounded-3' : 'bg-success m-2 px-2 py-1 rounded-3 text-end'}>
                        {msg}
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <button onClick={() => addMessage('New message')}>Add Message</button>
        </div>
    );
}
