import React, { useContext, useEffect, useRef, useState } from 'react'
import { getMessages, sendMessage } from '../../../../http/chat'
import AuthContext from '../../../../global/AuthContext';
import VariableContext from '../../../../global/VariableContext';
import sendSound from '../sound/send.mp3';
import { addMessages } from '../addMessages';
import ToastDialog from '../../../../utility/ToastDialog';
import DisplayMessages from '../DisplayMessages';

export default function MessageArea(props) {
	const [content, setContent] = useState('');
	const [lineType, setLineType] = useState('s');
	const { messages, setMessages, showToast } = useContext(VariableContext);
	const { token, username } = useContext(AuthContext);
	const dummy = useRef();
	const lastMsgIdRef = useRef(null);

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
			}
			return true;
		})
		setTimeout(() => {
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}, 2000);

		const intervalCallback = () => {
			addMessages(token, setMessages, props.activeUser, lastMsgIdRef);
			// dummy.current.scrollIntoView({ behavior: 'smooth' });
		};
		const intervalId = setInterval(intervalCallback, 5000);
		return () => clearInterval(intervalId);
		// eslint-disable-next-line
	}, [])




	const sendBtnHandler = async (e) => {
		e.preventDefault();
		playSound();
		setContent('');
		if (content.trim().length > 0) {
			const msg = await sendMessage(token, content, props.activeUser.id);
			if (msg) {
				lastMsgIdRef.current = msg.id;
				setMessages((preMsg) => ({ ...preMsg, [props.activeUser.id]: [...messages[props.activeUser.id], msg] }))
				setTimeout(() => {
					dummy.current.scrollIntoView({ behavior: 'smooth' });
				}, 200);
			}
		}
	}

	const onLineChange = () => {
		if (lineType == 's') {
			showToast('changed into multiline text', 'info');
			setLineType('m');
		} else {
			showToast('changed into singleline text', 'info');
			setLineType('s');
		}
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
			<form onSubmit={sendBtnHandler}>
				<div className='input-group px-2' >
					{
						lineType === 'm' ?
							<textarea className='form-control' rows={content.split('\n').length} value={content} onChange={(e) => setContent(e.target.value)} /> :
							<input type="text" className='form-control' value={content} onChange={(e) => setContent(e.target.value)} />
					}
					<input type='button' className='text-secondary' style={inputTextStyle} value={lineType} onClick={onLineChange} />
					<button className='btn btn-success' onClick={sendBtnHandler}>Send</button>
				</div>
			</form>
			<ToastDialog />
		</>
	)
}

function playSound() {
	var audio = new Audio(sendSound);
	audio.play();
}

const inputTextStyle = {
	// width:"1px", 
	fontSize: "9px",
	border: 'none',
	outline: 'none',
	backgroundColor: "white"
}
