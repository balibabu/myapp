// Example React component for displaying and sending messages with polling
// ChatComponent.js
import React, { useState, useEffect } from 'react';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [lastMessageId, setLastMessageId] = useState(null);

    const fetchMessages = async () => {
        const response = await fetch('/api/get_messages/');
        const data = await response.json();
        setMessages(data);

        // Update lastMessageId after fetching messages
        if (data.length > 0) {
            setLastMessageId(data[data.length - 1].id);
        }
    };

    const fetchNewMessages = async () => {
        if (lastMessageId !== null) {
            const response = await fetch(`/api/get_new_messages/${lastMessageId}/`);
            const newMessages = await response.json();
            setMessages([...messages, ...newMessages]);
        }
    };

    const sendMessage = async () => {
        // ... (same as previous example)
    };

    useEffect(() => {
        fetchMessages();
        // Poll for new messages every 10 seconds (adjust as needed)
        const intervalId = setInterval(fetchNewMessages, 10000);

        return () => clearInterval(intervalId);
    }, [lastMessageId]); // Include lastMessageId in the dependencies array to trigger re-fetch when it changes

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.sender.username}: {message.content}
                    </div>
                ))}
            </div>
            <div>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
