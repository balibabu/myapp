import React, { useContext, useEffect } from 'react'
import VariableContext from '../Contexts/VariableContext';

export default function Toast() {
    const { notifications, setNotifications, toastColor } = useContext(VariableContext);

    function closeHandler(id) {
        setNotifications((prev) => prev.filter((msg) => msg.id !== id));
    }

    return (
        <div className='position-fixed end-0 bottom-0 me-2 mb-2'>
            {notifications.map((msg) => <ToasMessageCard key={msg.id} {...{ msg, closeHandler, toastColor }} />)}
        </div>
    )
}

function ToasMessageCard({ msg, closeHandler, toastColor }) {
    useEffect(() => {
        const id = setTimeout(() => {
            closeHandler(msg.id);
        }, 5000);
        return () => {
            clearTimeout(id);
        }
    }, [])

    return (
        <div className='my-1 px-2 py-1 rounded-3 d-flex justify-content-between' style={{ width: '250px', backgroundColor: toastColor[msg.bg] || 'rgb(200,255,200)' }}>
            <div>
                <div className="me-auto">{msg.title}</div>
                <div className='text-end' style={{fontSize:'14px',lineHeight:'1.2'}}>{msg.content}</div>
            </div>
            <div className='d-flex align-items-center'>
                <button className='btn-close' onClick={() => closeHandler(msg.id)}></button>
            </div>
        </div>
    );
}