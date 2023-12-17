import React from 'react'
import MobileChat from '../Mobile/MobileChat'
import ContactRender from '../ContactRender';
import MessageArea from '../Mobile/MessageArea';

export default function DesktopChat(props) {
	const { recentUsers, setActiveUser, activeUser, onSelect } = props.sharedProps;
	return (
		<div>
			<i>Desktop Chat App is on hold due to Development process for Mobile App </i>
			<div className='row m-0'>
				<h4 className='m-0 pt-3 ps-4'>Recently Opend Contacts</h4>
				<div className='col-md-6 mt-0 px-lg-5 p-1'>
					<ContactRender users={recentUsers} onSelect={onSelect} />
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
