import React from 'react'
import ContactRender from '../ContactRender';
import MessageArea from './MessageArea';

export default function MobileChat(props) {
  const { recentUsers, setActiveUser, activeUser, onSelect } = props.sharedProps;
  return (
    <div>
      {
        activeUser ?
          <MessageArea setActiveUser={setActiveUser} activeUser={activeUser}/>
          :
          <ContactRender users={recentUsers} onSelect={onSelect} />
      }
    </div>
  )
}
