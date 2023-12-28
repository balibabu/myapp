import { createContext, useContext, useState } from "react";
import { GetTodoList } from "../http/Todo";
import AuthContext from "./AuthContext";
import { GetNoteList } from "../http/Note";
import { getConversationsList, getUserList } from "../http/chat";
import GetExpenseList from "../http/Expense";
import receiveSound from '../components/Apps/Chat/outchat2.wav';


const VariableContext = createContext();
export default VariableContext;

export const VariableProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([]);
    const [notes, setNotes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});

    const [toast, setToast] = useState(null);
    const [loadingNoteItem, SetloadingNoteItem] = useState(null);
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

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
    }
    const fetchExpenses = async () => {
        const list = await GetExpenseList(token);
        setExpenses(list);
    }
    const fetchConversations = async () => {
        const list = await getConversationsList(token);
        setConversations((prevlist)=>{
            if(JSON.stringify(list)!==JSON.stringify(prevlist)){
                playSound();
                return list;
            }
            return prevlist;
        });
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
        todoList,
        setTodoList,
        fetchTodoList,
        notes,
        setNotes,
        fetchNotes,
        loadingNoteItem,
        SetloadingNoteItem,
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
        setMessages
    }
    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}



function playSound() {
	var audio = new Audio(receiveSound);
	audio.play();
}