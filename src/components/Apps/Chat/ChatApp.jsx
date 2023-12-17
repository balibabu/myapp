import SearchBox from './SearchBox';
import FloatButton from '../../../utility/FloatButton';
import { useMediaQuery } from 'react-responsive';
import MobileChat from './Mobile/MobileChat';
import DesktopChat from './Desktop/DesktopChat';
import { useState } from 'react';

export default function ChatApp() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const [recentUsers, setRecentUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(null);

	const onSelect = (user) => {
		setRecentUsers((prevUsers) => {
			const updatedUsers = prevUsers.filter((prevUser) => prevUser.id !== user.id);
			return [user, ...updatedUsers];
		});
		setActiveUser(user);
	}
	const sharedProps = {
		recentUsers,
		setActiveUser,
		activeUser,
		onSelect
	}

	return (
		<div style={{ backgroundColor: "#0096c7", height: "100vh" }} className='p-2'>
			<h3>Chats</h3>
			{isMobile ? <MobileChat sharedProps={sharedProps} /> : <DesktopChat sharedProps={sharedProps} />}
			<SearchBox modalId={"searchUserModal"} onSelect={onSelect} />
			<FloatButton modalTarget={"searchUserModal"} />
		</div>
	)
}