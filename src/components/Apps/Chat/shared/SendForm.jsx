import { sendMessage } from '../../../../http/chat'
import React, { useContext, useEffect, useRef, useState } from 'react'
import sendSound from '../sound/send.mp3';
import VariableContext from '../../../Contexts/VariableContext';

export default function SendForm({ sendFormData }) {
	const {
		token, dummy,
		activeUser, fetchMessage
	} = sendFormData;

	const [lineType, setLineType] = useState('s');
	const [content, setContent] = useState('');
	const [isSending, setIsSending] = useState(false);
	const { notify } = useContext(VariableContext);

	const inputFieldRef = useRef();
	useEffect(() => {
		inputFieldRef.current.focus();
	}, [])


	const sendBtnHandler = async (e) => {
		e.preventDefault();
		if (isSending) { return }
		setIsSending(true);
		setContent('');
		if (content.trim().length > 0) {
			await sendMessage(token, content, activeUser.id);
			await fetchMessage(activeUser);
			playSound();
			setTimeout(() => {
				dummy.current.scrollIntoView({ behavior: 'smooth' });
			}, 200);
		}
		setIsSending(false);
	}

	const onLineChange = () => {
		if (lineType === 's') {
			notify('ChatApp', 'multiline line msg activated', 'success');
			setLineType('m');
		} else {
			notify('ChatApp', 'single line msg activated', 'success');
			setLineType('s');
		}
	}
	return (
		<form onSubmit={sendBtnHandler} className='d-flex px-3'>
			<div className='input-group me-1' >
				<input type='button' style={inputTextStyle} value={lineType} onClick={onLineChange} />
				{
					lineType === 'm' ?
						<textarea ref={inputFieldRef} className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} /> :
						<input ref={inputFieldRef} type="text" className='form-control' value={content} onChange={(e) => setContent(e.target.value)} />
				}
			</div>
			<button className='btn btn-success' onClick={sendBtnHandler} >Send</button>
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

