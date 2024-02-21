import { useMediaQuery } from 'react-responsive';
import MobileChat from './Mobile/MobileChat';
import DesktopChat from './Desktop/DesktopChat';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ChatContext from '../../Contexts/ChatContext';

export default function ChatApp() {
	const { loggedIn } = useContext(AuthContext);
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const [activeUser, setActiveUser] = useState(null);
    const { users, fetchUserList } = useContext(ChatContext);

    const [, setInitialFetch] = useState(false);

    useEffect(() => {
        setInitialFetch((prev) => {
			if (!prev && users === undefined) {
                fetchUserList();
            }
            return true;
        })
        // eslint-disable-next-line
    }, [])

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
		<div style={{ backgroundColor: "#005556" }}>
			{isMobile ? <MobileChat sharedProps={sharedProps} /> : <DesktopChat sharedProps={sharedProps} />}
		</div>
	)
}