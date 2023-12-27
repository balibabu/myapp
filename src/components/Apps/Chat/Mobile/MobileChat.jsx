import React from 'react'
import MessageArea from './MessageArea';
import ConversationListArea from '../ConversationListArea';

export default function MobileChat(props) {
  const { setActiveUser, activeUser, onSelect } = props.sharedProps;
  return (
    <div>
      {
        activeUser ?
          <MessageArea setActiveUser={setActiveUser} activeUser={activeUser} />
          :
          <>
            <ConversationListArea activeUser={activeUser} onSelect={onSelect} />
          </>
      }
    </div>
  )
}


