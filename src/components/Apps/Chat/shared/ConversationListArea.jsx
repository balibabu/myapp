import React, { useContext, useEffect, useState } from 'react'
import SearchBox from './SearchBox'
import ConversationsRender from './ConversationsRender';
import ChatContext from '../../../Contexts/ChatContext';
import FloatButton from '../../../../utility/FloatButton';

export default function ConversationListArea({ onSelect, activeUser }) {
    const [, setInitialFetch] = useState(false);
    const { conversations, fetchConversations } = useContext(ChatContext);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev && activeUser === null) {
                fetchConversations();
            }
            return true;
        })
        const id = setTimeout(() => {
            setInitialFetch(false);
        }, 1000);
        return () => {
            clearTimeout(id);
        }
        // eslint-disable-next-line
    }, [onSelect])

    return (
        <div className='position-relative' style={{ height: "99dvh", overflow: "auto" }}>
            <ConversationsRender conversations={conversations} onSelect={onSelect} />
            <SearchBox modalId={"searchUserModal"} onSelect={onSelect} />
            <button
                type="button"
                className="btn btn-success btn-lg position-absolute"
                style={{ right: '20px', bottom: '20px', }}
                data-bs-toggle="modal" data-bs-target="#searchUserModal"
            >+</button>
        </div>
    )
}
