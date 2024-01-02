import React, { useContext, useEffect, useRef, useState } from 'react'
import SearchBox from './SearchBox'
// import FloatButton from '../../../utility/FloatButton'
import ConversationsRender from './ConversationsRender';
import VariableContext from '../../../global/VariableContext';
import incommingSound from './sound/incomming1.mp3';

export default function ConversationListArea({ onSelect }) {
    const [, setInitialFetch] = useState(false);
    const { conversations, fetchConversations } = useContext(VariableContext);
    const intervalRef = useRef(5000);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev) {
                fetchConversations();
            }
            return true;
        })


        let intervalId ;
        const intervalCallback = () => {
                fetchConversations(incommingSound);
                intervalRef.current=intervalRef.current+2000
                clearInterval(intervalId);
                intervalId = setInterval(intervalCallback, intervalRef.current);
		};

        intervalId = setInterval(intervalCallback, intervalRef.current);
		return () => clearInterval(intervalId);

        // eslint-disable-next-line
    }, [])

    return (
        <div className='position-relative' style={{ height: "88dvh", overflow: "auto" }}>
            <ConversationsRender conversations={conversations} onSelect={onSelect} />
            <SearchBox modalId={"searchUserModal"} onSelect={onSelect} />
            <button
                type="button"
                className="btn btn-success btn-lg position-absolute bottom-0 end-0"
                data-bs-toggle="modal" data-bs-target="#searchUserModal"
            >+</button>
        </div>
    )
}
