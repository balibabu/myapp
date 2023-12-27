import React from 'react'
import ConversationListArea from '../ConversationListArea';
import MessageArea from '../Mobile/MessageArea';

export default function DesktopChat(props) {
	const { setActiveUser, activeUser, onSelect } = props.sharedProps;
	return (
		<div>
			{/* <i>Desktop Chat App is on hold due to Development process for Mobile App </i> */}
			<div className='row m-0'>
				<div className='col-md-6 mt-0 px-lg-5 p-1'>
					<ConversationListArea activeUser={activeUser} onSelect={onSelect}/>
				</div>
				<div className='col-md-6 mt-0 px-lg-5 p-1'>
					{activeUser ?
						<MessageArea setActiveUser={setActiveUser} activeUser={activeUser} />
						:
						<i>Please select a contact to message</i>
					}
				</div>
			</div>
		</div>
	)
}
