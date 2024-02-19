import { createContext, useContext, useState } from "react";
import { GetTodoList } from "../../http/Todo";
import AuthContext from "./AuthContext";
import { GetNoteList } from "../../http/Note";
import { getConversationsList, getMessages, getUserList } from "../../http/chat";
import GetExpenseList from "../../http/Expense";
import { getFiles } from "../../http/Storage";


const VariableContext = createContext();
export default VariableContext;

export const VariableProvider = ({ children }) => {
    const [todoList, setTodoList] = useState();
    const [notes, setNotes] = useState();
    const [expenses, setExpenses] = useState();
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [files, setFiles] = useState();
    const [fileShareSendProgress, setFileShareSendProgress] = useState(0);
    const [fileShareReceiveProgress, setFileShareReceiveProgress] = useState(0);

    const [toast, setToast] = useState(null);
    const [loadingNoteItem, SetloadingNoteItem] = useState(null);
    const [loadingFileItem, SetloadingFileItem] = useState(null);
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState();

    const fetchUserList = async () => {
        const list = await getUserList(token);
        setUsers(list);
    }

    const fetchTodoList = async () => {
        const list = await GetTodoList(token);
        setTodoList(list);
    }
    const fetchNotes = async () => {
        const list = await GetNoteList(token);
        setNotes(list);
        return list;
    }
    const fetchExpenses = async () => {
        const list = await GetExpenseList(token);
        setExpenses(list);
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

    const fetchFiles = async () => {
        const list = await getFiles(token);
        setFiles(list);
    }

    const fetchMessage = async (activeUser) => {
        const messages_userx = await getMessages(token, activeUser.id);
        setMessages((prev) => ({ ...prev, [activeUser.id]: messages_userx }));
    }

    const showToast = (message, type) => {
        setToast({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setToast(null);
        }, 2000);
    }

    const contextData = {
        files,
        setFiles,
        fetchFiles,
        todoList,
        setTodoList,
        fetchTodoList,
        notes,
        setNotes,
        fetchNotes,
        loadingNoteItem,
        SetloadingNoteItem,
        loadingFileItem,
        SetloadingFileItem,
        users,
        setUsers,
        fetchUserList,
        toast,
        showToast,
        expenses,
        setExpenses,
        fetchExpenses,

        conversations,
        setConversations,
        fetchConversations,
        messages,
        setMessages,
        fetchMessage,
        fileShareSendProgress, setFileShareSendProgress,
        fileShareReceiveProgress, setFileShareReceiveProgress
    }
    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}


function playSound(sound) {
    var audio = new Audio(sound);
    audio.play();
}