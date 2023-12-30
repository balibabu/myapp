import React from 'react'
import MessageArea from './MessageArea';
import ConversationListArea from '../ConversationListArea';

export default function MobileChat(props) {
  const { setActiveUser, activeUser, onSelect } = props.sharedProps;
  return (
    <div className='container pt-3'>
      {
        activeUser ?
          <MessageArea setActiveUser={setActiveUser} activeUser={activeUser} />
          :
          <>
            <h3>Chats</h3>
            <ConversationListArea activeUser={activeUser} onSelect={onSelect} />
          </>
      }
    </div>
  )
}


