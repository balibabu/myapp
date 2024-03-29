import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MessageArea from '../shared/MessageArea';
import ChatContext from '../../../Contexts/ChatContext';

export default function MobileMessageArea(props) {
    const [activeUser, setActiveUser] = useState();
    const { users } = useContext(ChatContext);
    const { id } = useParams();
    useEffect(() => {
        const found = users.find(item => item.id === parseInt(id));
        setActiveUser(found);
    }, [])


    return (
        <>
            {activeUser && <MessageArea setActiveUser={props.setActiveUser} activeUser={activeUser} />}
        </>
    )
}
