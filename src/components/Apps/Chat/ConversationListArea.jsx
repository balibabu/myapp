import React, { useContext, useEffect, useState } from 'react'
import SearchBox from './SearchBox'
// import FloatButton from '../../../utility/FloatButton'
import ConversationsRender from './ConversationsRender';
import VariableContext from '../../../global/VariableContext';
import incommingSound from './sound/incomming1.mp3';

export default function ConversationListArea({ onSelect }) {
    const [, setInitialFetch] = useState(false);
    const { conversations, fetchConversations } = useContext(VariableContext);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev) {
                fetchConversations();
            }
            return true;
        })

        const intervalCallback = () => {fetchConversations(incommingSound)};
		const intervalId = setInterval(intervalCallback, 5000);
		return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [])

    return (
        <div className='position-relative' style={{ height: "88vh", overflow: "auto" }}>
            <ConversationsRender conversations={conversations} onSelect={onSelect} />
            <SearchBox modalId={"searchUserModal"} onSelect={onSelect} />
            <button
                type="button"
                className="btn btn-success btn-lg position-absolute bottom-0 end-0"
                data-bs-toggle="modal" data-bs-target="#searchUserModal"
            >+</button>
            {/* <FloatButton modalTarget={"searchUserModal"} /> */}
        </div>
    )
}