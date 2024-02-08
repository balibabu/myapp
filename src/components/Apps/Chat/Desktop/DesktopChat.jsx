import React from 'react'
import ConversationListArea from '../shared/ConversationListArea';
import MessageArea from '../shared/MessageArea';

export default function DesktopChat(props) {
	const { setActiveUser, activeUser, onSelect } = props.sharedProps;
	return (
		<div className='container'>
			<div className='row m-0'>
				<div className='col-md-6 mt-0 px-lg-5 p-1'>
					<ConversationListArea activeUser={activeUser} onSelect={onSelect} />
				</div>
				<div className='col-md-6 mt-0 px-lg-5 p-1'>
					{activeUser ?
						<MessageArea setActiveUser={setActiveUser} activeUser={activeUser}/>
						:
						<i>Touch any conversation to open the chat</i>
					}
				</div>
			</div>
		</div>
	)
}
