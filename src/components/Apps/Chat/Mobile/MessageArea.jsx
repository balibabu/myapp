import React, { useContext, useEffect, useRef, useState } from 'react'
import { getMessages, sendMessage } from '../../../../http/chat'
import AuthContext from '../../../../global/AuthContext';

export default function MessageArea(props) {
	const [content, setContent] = useState('');
	const [messages, setMessages] = useState([]);
	const { token, username } = useContext(AuthContext);
	const dummy = useRef();

	useEffect(() => {
		const fetchMsg = async () => {
			const conversations = await getMessages(token, props.activeUser.id);
			setMessages(conversations);
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}
		fetchMsg();
		// eslint-disable-next-line
	}, [])

	const sendBtnHandler = async (e) => {
		e.preventDefault();
		setContent('');
		if (content.trim().length > 0) {
			const msg = await sendMessage(token, { receiver_id: props.activeUser.id, content: content });
			if (msg) {
				setMessages((preMsg) => [...preMsg, msg])
			}
		}
		dummy.current.scrollIntoView({ behavior: 'smooth' });
	}


	return (
		<div >
			<div className='d-flex'>
				<button className='btn btn-secondary me-3' onClick={() => props.setActiveUser(null)}>{"<-"}</button>
				<h3>{props.activeUser.username}</h3>
			</div>
			<div className='p-2 m-2 rounded' style={{ backgroundColor: "#8ecae6" }}>
				{messages.map((message) => {
					if (message.sender.username === username) {
						return <div key={message.id} className='text-success text-end'>{message.content}</div>
					} else {
						return <div key={message.id} className='text-primary'>{message.content}</div>
					}
				})}
			</div>
			<form onSubmit={sendBtnHandler}>
				<div className='fixed-bottom input-group px-3 pb-2'>
					{/* <textarea className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} /> */}
					<input type="text" className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} />
					<button className='btn btn-success' onClick={sendBtnHandler}>Send</button>
				</div>
			</form>
			<span ref={dummy}></span>
		</div>
	)
}