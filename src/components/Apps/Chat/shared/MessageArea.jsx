import React, { useContext, useEffect, useRef, useState } from 'react'
import DisplayMessages from './DisplayMessages';
import SendForm from './SendForm';
import AuthContext from '../../../Contexts/AuthContext';
import ChatContext from '../../../Contexts/ChatContext';
import Online from '../Online';

export default function MessageArea(props) {
	const { messages, setMessages, fetchMessage } = useContext(ChatContext);
	const { token, username } = useContext(AuthContext);
	const dummy = useRef();
	const [, setInitialFetch] = useState(false);

	useEffect(() => {
		setInitialFetch((prev) => {
			if (!prev) {
				updateMessages();
			}
			return true;
		})
		// dummy.current.scrollIntoView({ behavior: 'smooth' });
		// eslint-disable-next-line
	}, [props.activeUser, messages])

	function updateMessages() {
		fetchMessage(props.activeUser);
	}

	const sendFormData = {
		token, dummy,
		activeUser: props.activeUser,
		messages, setMessages, fetchMessage
	}

	return (
		<>
			<div>
				<div className='px-3 d-flex justify-content-between'>
					<div className='fs-2'>{props.activeUser.username}</div>
					<Online {...{ updateMessages }} />
				</div>
				<DisplayMessages messages={messages} username={username} activeUser={props.activeUser} {...{ token }} />
				{/* <div className='p-2 m-2 mx-3 rounded text-white' style={{ backgroundColor: "#8ecae6", height: "85dvh", overflowY: "auto" }}>
				</div> */}
				<div ref={dummy}></div>
			</div>
			<SendForm sendFormData={sendFormData} />
		</>
	)
}

