import React, { useContext, useEffect, useRef, useState } from 'react'
import { getMessages, sendMessage } from '../../../../http/chat'
import AuthContext from '../../../../global/AuthContext';
import VariableContext from '../../../../global/VariableContext';
import sendSound from '../send.mp3';

export default function MessageArea(props) {
	const [content, setContent] = useState('');
	const { messages, setMessages } = useContext(VariableContext);
	const { token, username } = useContext(AuthContext);
	const dummy = useRef();

	const [, setInitialFetch] = useState(false);

	useEffect(() => {
		const fetchMsg = async () => {
			const messages_userx = await getMessages(token, props.activeUser.id);
			setMessages((prev) => ({ ...prev, [props.activeUser.id]: messages_userx }))
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}

		setInitialFetch((prev) => {
			if (!prev) {
				if (!messages[props.activeUser.id]) {
					fetchMsg();
				}
			}
			return true;
		})
		dummy.current.scrollIntoView({ behavior: 'smooth' });
		// eslint-disable-next-line
	}, [])


	const sendBtnHandler = async (e) => {
		e.preventDefault();
		playSound();
		setContent('');
		if (content.trim().length > 0) {
			const msg = await sendMessage(token, content, props.activeUser.id);
			if (msg) {
				setMessages((preMsg) => ({ ...preMsg, [props.activeUser.id]: [...messages[props.activeUser.id], msg] }))
			}
		}
		dummy.current.scrollIntoView({ behavior: 'smooth' });
	}


	return (
		<div className='position-relative' style={{ height: "88vh", overflow: "auto" }}>
			<div className='d-flex'>
				<button className='btn btn-secondary me-3' onClick={() => props.setActiveUser(null)}>{"<-"}</button>
				<h3>{props.activeUser.username}</h3>
			</div>
			<div className='p-2 m-2 rounded' style={{ backgroundColor: "#8ecae6", maxHeight: "78vh", overflowY: "auto" }}>
				{messages[props.activeUser.id] && messages[props.activeUser.id].map((message) => {
					if (message.sender.username === username) {
						return <div key={message.id} className='text-success text-end'>{message.content}</div>
					} else {
						return <div key={message.id} className='text-primary'>{message.content}</div>
					}
				})}
				<div ref={dummy} style={{height:"1rem"}}></div>
			</div>

			<form onSubmit={sendBtnHandler}>
				<div className='input-group px-3 position-absolute bottom-0 end-0' >
					{/* <textarea className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} /> */}
					<input type="text" className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} />
					<button className='btn btn-success' onClick={sendBtnHandler}>Send</button>
				</div>
			</form>
		</div>
	)
}

function playSound(colorName) {
	var audio = new Audio(sendSound);
	audio.play();
}