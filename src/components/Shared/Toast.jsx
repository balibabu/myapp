import React, { useContext, useEffect, useState } from 'react'
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
    const [width, setWidth] = useState(100);
    const timeoutTime = 5000;
    const intervalTime = 50;

    useEffect(() => {
        const id = setTimeout(() => {
            closeHandler(msg.id);
        }, timeoutTime);
        const interval = setInterval(() => {
            setWidth((prev) => prev - 100 / (timeoutTime / intervalTime));
        }, intervalTime);

        return () => {
            clearInterval(interval);
            clearTimeout(id);
        }
    }, [])

    return (
        <div className='mt-1 rounded-3' style={{ overflow: 'hidden' }}>
            <div className='px-1 d-flex justify-content-between' style={{ width: '250px', backgroundColor: toastColor[msg.bg] || 'rgb(200,255,200)' }}>
                <div>
                    <div className="me-auto">{msg.title}</div>
                    <div className='text-end' style={{ fontSize: '14px', lineHeight: '1.2' }}>{msg.content}</div>
                </div>
                <div className='d-flex align-items-center'>
                    <button className='btn-close' onClick={() => closeHandler(msg.id)}></button>
                </div>
            </div>
            <div style={{ width: `${width}%`, height: '3px', backgroundColor: `rgb(${255 - width * 2},0,${width * 2 + 55})` }}></div>
        </div>
    );
}