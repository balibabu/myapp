import { useMediaQuery } from 'react-responsive';
import MobileChat from './Mobile/MobileChat';
import DesktopChat from './Desktop/DesktopChat';
import { useState } from 'react';

export default function ChatApp() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const [activeUser, setActiveUser] = useState(null);

	const onSelect = (user) => {
		setActiveUser(user);
	}

	const sharedProps = {
		setActiveUser,
		activeUser,
		onSelect,
	}

	return (
		<div
			style={{ backgroundColor: "#0096c7", height: "100vh", overflow: "auto" }}
			className='p-2 pb-5'
		>
			<h3>Chats</h3>
			{isMobile ? <MobileChat sharedProps={sharedProps} /> : <DesktopChat sharedProps={sharedProps} />}
		</div>
	)
}