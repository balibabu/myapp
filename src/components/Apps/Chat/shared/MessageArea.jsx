import React, { useContext, useEffect, useRef, useState } from 'react'
import ToastDialog from '../../../../utility/ToastDialog';
import DisplayMessages from './DisplayMessages';
import SendForm from './SendForm';
import VariableContext from '../../../Contexts/VariableContext';
import AuthContext from '../../../Contexts/AuthContext';

export default function MessageArea(props) {
	const { messages, setMessages, showToast, fetchMessage } = useContext(VariableContext);
	const { token, username } = useContext(AuthContext);
	const dummy = useRef();
	const [, setInitialFetch] = useState(false);

	useEffect(() => {
		setInitialFetch((prev) => {
			if (!prev) {
				fetchMessage(props.activeUser);
			}
			return true;
		})
		const id = setTimeout(() => {
			setInitialFetch(false);
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}, 1000);
		return () => {
			clearTimeout(id);
		}
		// eslint-disable-next-line
	}, [props.activeUser])


	const sendFormData = {
		showToast, token, dummy,
		activeUser: props.activeUser,
		messages, setMessages, fetchMessage
	}

	return (
		<>
			<div>
				<div className='d-flex'>
					{/* <button className='btn btn-secondary me-3' onClick={() => props.setActiveUser(null)}>{"<-"}</button> */}
					<div className='fs-2 ps-3'>{props.activeUser.username}</div>
				</div>
				<div className='p-2 m-2 mx-3 rounded text-white' style={{ backgroundColor: "#8ecae6", height: "85dvh", overflowY: "auto" }}>
					<DisplayMessages messages={messages} username={username} activeUser={props.activeUser} />
					<div ref={dummy}></div>
				</div>
			</div>
			<SendForm sendFormData={sendFormData} />
			<ToastDialog />
		</>
	)
}

