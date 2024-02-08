import { createContext, useContext, useState } from "react";
import { GetTodoList } from "../../http/Todo";
import AuthContext from "./AuthContext";

const TodoContext = createContext();
export default TodoContext;

export const TodoContextProvider = ({ children }) => {
    const [todoList, setTodoList] = useState();
	const { token } = useContext(AuthContext);

    const fetchTodoList = async () => {
        const list = await GetTodoList(token);
        setTodoList(list);
    }
    const contextData = {
        todoList,
        setTodoList,
        fetchTodoList,
    }
    return (
        <TodoContext.Provider value={contextData}>
            {children}
        </TodoContext.Provider>
    );
}