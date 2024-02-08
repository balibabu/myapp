import { createContext, useContext, useState } from "react";
import { getConversationsList } from "../../http/chat";
import AuthContext from "./AuthContext";

const ChatContext = createContext();
export default ChatContext;

export function ChatContextProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
	const { token } = useContext(AuthContext);

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

    const contextData = {
        conversations,
        setConversations,
        fetchConversations,
        messages,
        setMessages
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