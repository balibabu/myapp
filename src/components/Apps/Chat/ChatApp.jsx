import SearchBox from './SearchBox';
import FloatButton from '../../../utility/FloatButton';
import { useMediaQuery } from 'react-responsive';
import MobileChat from './Mobile/MobileChat';
import DesktopChat from './Desktop/DesktopChat';
import { useContext, useEffect, useState } from 'react';
import { getMessagesFromUniqueUser } from '../../../http/chat';
import AuthContext from '../../../global/AuthContext';

export default function ChatApp() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const [recentUsers, setRecentUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(null);
	const [messages, setMessages] = useState([]);
	const { token } = useContext(AuthContext);

	useEffect(() => {
		const fetchLatestUniqueMsg = async () => {
			const msg = await getMessagesFromUniqueUser(token);
			setMessages(msg);
		}
		fetchLatestUniqueMsg();
	}, [])


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
		onSelect,
		messages
	}

	return (
		<div style={{ backgroundColor: "#0096c7", height: "100vh", overflow: "auto" }} className='p-2 pb-5'>
			<h3>Chats</h3>
			{isMobile ? <MobileChat sharedProps={sharedProps} /> : <DesktopChat sharedProps={sharedProps} />}
			{!activeUser && <>
				<SearchBox modalId={"searchUserModal"} onSelect={onSelect} />
				<FloatButton modalTarget={"searchUserModal"} />
			</>}
		</div>
	)
}