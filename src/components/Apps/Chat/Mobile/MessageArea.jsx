import React, { useContext, useEffect, useRef, useState } from 'react'
import { getMessages } from '../../../../http/chat'
import AuthContext from '../../../../global/AuthContext';
import VariableContext from '../../../../global/VariableContext';
import { addMessages } from '../addMessages';
import ToastDialog from '../../../../utility/ToastDialog';
import DisplayMessages from '../DisplayMessages';
import SendForm from './SendForm';

export default function MessageArea(props) {
	const { messages, setMessages, showToast } = useContext(VariableContext);
	const { token, username } = useContext(AuthContext);
	const dummy = useRef();
	const lastMsgIdRef = useRef(null);
	const intervalRef = useRef(3000);

	const [, setInitialFetch] = useState(false);

	useEffect(() => {
		const fetchMsg = async () => {
			const messages_userx = await getMessages(token, props.activeUser.id);
			if (messages_userx.length > 0) {
				lastMsgIdRef.current = messages_userx[messages_userx.length - 1].id;
			}
			setMessages((prev) => ({ ...prev, [props.activeUser.id]: messages_userx }));
		}
		setInitialFetch((prev) => {
			if (!prev) {
				if (!messages[props.activeUser.id]) {
					fetchMsg();
				}
				addMessages(token, setMessages, props.activeUser, lastMsgIdRef);
			}
			return true;
		})
		const timeoutId = setTimeout(() => {
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}, 1000);

		let intervalId;
		const intervalCallback = () => {
			addMessages(token, setMessages, props.activeUser, lastMsgIdRef);
			intervalRef.current = intervalRef.current + 3000
			clearInterval(intervalId);
			intervalId = setInterval(intervalCallback, intervalRef.current);
		};

		intervalId = setInterval(intervalCallback, intervalRef.current);
		return () => {
			clearInterval(intervalId);
			clearTimeout(timeoutId);
		}
		// eslint-disable-next-line
	}, [])

	const sendFormData={
		showToast,token,dummy,
		activeUser:props.activeUser,lastMsgIdRef,
		messages,setMessages,
		intervalRef,
	}

	return (
		<>
			<div>
				<div className='d-flex'>
					<button className='btn btn-secondary me-3' onClick={() => props.setActiveUser(null)}>{"<-"}</button>
					<div className='fs-2'>{props.activeUser.username}</div>
				</div>
				<div className='p-2 m-2 rounded text-white' style={{ backgroundColor: "#8ecae6", height: "85dvh", overflowY: "auto" }}>
					<DisplayMessages messages={messages} username={username} activeUser={props.activeUser} />
					<div ref={dummy}></div>
				</div>

			</div>
			<SendForm  sendFormData={sendFormData}/>
			<ToastDialog />
		</>
	)
}

