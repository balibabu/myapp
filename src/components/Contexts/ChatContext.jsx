import { createContext, useContext, useState } from "react";
import { getConversationsList, getMessages, getUserList } from "../../http/chat";
import AuthContext from "./AuthContext";

const ChatContext = createContext();
export default ChatContext;

export function ChatContextProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
	const { token } = useContext(AuthContext);
    const [users, setUsers] = useState();


    const fetchUserList = async () => {
        const list = await getUserList(token);
        setUsers(list);
    }

    const fetchConversations = async (sound) => {
        const list = await getConversationsList(token);
        setConversations((prevlist) => {
            if (JSON.stringify(list) !== JSON.stringify(prevlist)) {
                playSound(sound);
                return list;
            }
            return prevlist;
        });
    }

    const fetchMessage = async (activeUser) => {
        const messages_userx = await getMessages(token, activeUser.id);
        setMessages((prev) => ({ ...prev, [activeUser.id]: messages_userx }));
    }

    const contextData = {
        conversations,
        setConversations,
        fetchConversations,
        messages,
        setMessages,
        fetchMessage,
        users, setUsers,
        fetchUserList
    };
    return (
        <ChatContext.Provider value={contextData}>
            {children}
        </ChatContext.Provider>
    );
}

function playSound(sound) {
    var audio = new Audio(sound);
    audio.play();
}