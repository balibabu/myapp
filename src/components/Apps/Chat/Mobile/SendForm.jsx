import { sendMessage } from '../../../../http/chat'
import React, { useEffect, useRef, useState } from 'react'
import sendSound from '../sound/send.mp3';
import { addMessages } from '../addMessages';

export default function SendForm({ sendFormData }) {
	const {
		showToast, token, dummy,
		activeUser, lastMsgIdRef,
		messages, setMessages,
		intervalRef
	} = sendFormData;

	const [lineType, setLineType] = useState('s');
	const [content, setContent] = useState('');
	const [isSending, setIsSending] = useState(false);
	const inputFieldRef = useRef();
	useEffect(() => {
		inputFieldRef.current.focus();
	}, [])


	const sendBtnHandler = async (e) => {
		e.preventDefault();
		await addMessages(token, setMessages, activeUser, lastMsgIdRef);
		if (isSending) { return }
		setIsSending(true);
		setContent('');
		if (content.trim().length > 0) {
			const msg = await sendMessage(token, content, activeUser.id);
			playSound();
			if (msg) {
				lastMsgIdRef.current = msg.id;
				setMessages((preMsg) => ({ ...preMsg, [activeUser.id]: [...messages[activeUser.id], msg] }))
				setTimeout(() => {
					dummy.current.scrollIntoView({ behavior: 'smooth' });
				}, 200);
			}
		}
		intervalRef.current = 1000;
		setIsSending(false);
	}

	const onLineChange = () => {
		if (lineType === 's') {
			showToast('changed into multiline text', 'info');
			setLineType('m');
		} else {
			showToast('changed into singleline text', 'info');
			setLineType('s');
		}
	}
	return (
		<form onSubmit={sendBtnHandler}>
			<div className='input-group px-2' >
				<input type='button' style={inputTextStyle} value={lineType} onClick={onLineChange} />
				{
					lineType === 'm' ?
						<textarea ref={inputFieldRef} className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} /> :
						<input ref={inputFieldRef} type="text" className='form-control' value={content} onChange={(e) => setContent(e.target.value)} />
				}
				<button className='btn btn-success' onClick={sendBtnHandler} >Send</button>
			</div>
		</form>
	)
}


const inputTextStyle = {
	border: 'none',
	outline: 'none',
	borderRadius: '.4rem 0 0 .4rem'
}

function playSound() {
	var audio = new Audio(sendSound);
	audio.play();
}

