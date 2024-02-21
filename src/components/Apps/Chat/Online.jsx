import React, { useContext, useEffect, useState } from 'react'
import VariableContext from '../../Contexts/VariableContext';

export default function Online({ updateMessages }) {
    const [isOnline, setIsOnline] = useState(false);
    const { notify } = useContext(VariableContext);


    useEffect(() => {
        const id = setInterval(() => {
            if (isOnline) {
                updateMessages();
            }
        }, 5000);
        return () => {
            clearInterval(id);
        }
    }, [isOnline, updateMessages])

    function activeHandler() {
        if (!isOnline) {
            notify('ChatApp', 'now you can receive msg automatically', 'success');
        } else {
            notify('ChatApp', 'you have to reopen conversation to get latest msg', 'danger');
        }
        setIsOnline(!isOnline);
    }


    return (
        <div className='d-flex align-items-center'> {isOnline ? 'active' : 'offline'}
            <div className="form-check form-switch ms-2">
                <input className="form-check-input" type="checkbox" checked={isOnline} onChange={activeHandler} />
            </div>
        </div>
    )
}
