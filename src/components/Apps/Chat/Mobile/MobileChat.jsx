import React from 'react'
import ContactRender from '../ContactRender';
import MessageArea from './MessageArea';
import ContactMessageRender from './ContactMessageRender';

export default function MobileChat(props) {
  const { recentUsers, setActiveUser, activeUser, onSelect, messages } = props.sharedProps;
  return (
    <div>
      {
        activeUser ?
          <MessageArea setActiveUser={setActiveUser} activeUser={activeUser} />
          :
          <>
            <ContactRender users={recentUsers} onSelect={onSelect} />
            {messages.map((message) => {
              return <ContactMessageRender key={message.id} message={message} setActiveUser={setActiveUser} />
            })}
          </>
      }

    </div>
  )
}


