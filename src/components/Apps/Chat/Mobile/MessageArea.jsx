import React, { useContext, useEffect, useState } from 'react'
import { getMessages, sendMessage } from '../../../../http/chat'
import AuthContext from '../../../../global/AuthContext';

export default function MessageArea(props) {
	const [content, setContent] = useState('');
	const [messages, setMessages] = useState([]);
	const { token, username } = useContext(AuthContext);
	useEffect(() => {
		const fetchMsg = async () => {
			const conversations = await getMessages(token, props.activeUser.id);
			setMessages(conversations);
		}
		fetchMsg();
		// eslint-disable-next-line
	}, [])

	const sendBtnHandler=async ()=>{
		const msg=await sendMessage(token,{receiver_id:props.activeUser.id,content:content});
		if(msg){
			setMessages((preMsg)=>[...preMsg,msg])
		}
		setContent('');
	}

	return (
		<div >
			<div className='d-flex'>
				<button className='btn btn-secondary me-3' onClick={() => props.setActiveUser(null)}>{"<-"}</button>
				<h3>{props.activeUser.username}</h3>
			</div>
			<div className='p-2 m-2 rounded' style={{ backgroundColor: "#8ecae6"}}>
				{messages.map((message) => {
					if (message.sender.username === username) {
						return <div key={message.id} className='text-success text-end'>{message.content}</div>
					} else {
						return <div key={message.id} className='text-primary'>{message.content}</div>
					}
				})}
			</div>
				<div className='fixed-bottom input-group px-3 pb-2'>
					<textarea className='form-control' rows={content.split('\n').length} value={content} onChange={(e)=>setContent(e.target.value)}/>
					<button className='btn btn-success' onClick={sendBtnHandler}>Send</button>
				</div>
		</div>
	)
}


// const message = {
// 	display: "flex",
// 	alignItems: "center"
// }


// const sent = {
// 	flexDirection: "row-reverse"
// }

// const sentp = {
// 	color: "white",
// 	background: "#0b93f6",
// 	alignSelf: "flex-end"
// }
// const receivedp = {
// 	background: "#e5e5ea",
// 	color: "black"
// }