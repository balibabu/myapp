import { createContext, useContext, useState } from "react";
import { GetTodoList } from "../http/Todo";
import AuthContext from "./AuthContext";
import { GetNoteList } from "../http/Note";

const VariableContext = createContext();
export default VariableContext;

export const VariableProvider=({children})=>{
    const [todoList, setTodoList] = useState([]);
    const [notes, setNotes] = useState([]);
    const { token } = useContext(AuthContext);


    const fetchTodoList=async ()=>{
        const list=await GetTodoList(token);
        setTodoList(list);
    }
    const fetchNotes=async ()=>{
        const list=await GetNoteList(token);
        setNotes(list); 
    }

    const contextData={
        todoList,
        setTodoList,
        fetchTodoList,
        notes,
        setNotes,
        fetchNotes,
    }
    return(
        <VariableContext.Provider value={contextData}>
            {children}
        </VariableContext.Provider>
    )
}