import { useMediaQuery } from 'react-responsive';
import MobileChat from './Mobile/MobileChat';
import DesktopChat from './Desktop/DesktopChat';
import { useContext, useState } from 'react';
import AuthContext from '../../../global/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ChatApp() {
    const { loggedIn } = useContext(AuthContext);
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
	if (!loggedIn) { return <Navigate to="/login" replace={true} />; }
	return (
		<div
			style={{ backgroundColor: "#0096c7", height: "100dvh", overflow: "auto" }}
			className='p-2 pb-5'
		>
			<h3>Chats</h3>
			{isMobile ? <MobileChat sharedProps={sharedProps} /> : <DesktopChat sharedProps={sharedProps} />}
		</div>
	)
}