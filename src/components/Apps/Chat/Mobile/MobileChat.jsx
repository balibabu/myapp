import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import ConversationListArea from '../shared/ConversationListArea';
import MobileMessageArea from './MobileMessageArea';

export default function MobileChat(props) {
  const { setActiveUser, activeUser } = props.sharedProps;
  const navigate = useNavigate();
  const onSelect = (user) => {
    navigate(`/chat/${user.id}`);
  }
  return (
    <Routes>
      <Route path='/' element={<ConversationListArea activeUser={activeUser} onSelect={onSelect} />} />
      <Route path=':id/' element={<MobileMessageArea setActiveUser={setActiveUser} activeUser={activeUser} />} />
    </Routes>
  )
}


