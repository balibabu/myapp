import { createContext, useContext, useState } from "react";
import { GetTodoList } from "../http/Todo";
import AuthContext from "./AuthContext";
import { GetNoteList } from "../http/Note";
import { getUserList } from "../http/chat";
import GetExpenseList from "../http/Expense";

const VariableContext = createContext();
export default VariableContext;

export const VariableProvider = ({ children }) => {
    const [appData, setAppData] = useState({});
    const [todoList, setTodoList] = useState([]);
    const [notes, setNotes] = useState([]);
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
        setAppData((prevAppData)=>{
            return {...prevAppData,expenseData:list}
        })
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
        appData,
        fetchExpenses,
        setAppData
    }
    return (
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}