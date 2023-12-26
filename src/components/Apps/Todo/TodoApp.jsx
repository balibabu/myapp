import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../global/AuthContext';
import TodoRender from './TodoRender';
import CreateTodo from './CreateTodo';
import FloatButton from '../../../utility/FloatButton';
import VariableContext from '../../../global/VariableContext';
import { onCreate, onDelete, onUpdate } from './TodoCRUD';
import { Navigate } from 'react-router-dom';
import { getCompletedTodoLlist } from '../../../http/Todo';

export default function TodoApp() {
    const { todoList, setTodoList, fetchTodoList } = useContext(VariableContext);
    const { token, loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);

    useEffect(() => {
        if (todoList.length === 0 && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchTodoList();
                }
                return true;
            })
        }
        // eslint-disable-next-line
    }, [])

    const fetchCompletedList=async (completed)=>{
        if(completed.length===0){
            const list=await getCompletedTodoLlist(token);
            setTodoList((prevList)=>[...prevList,...list]);
        }
    }


    if (!loggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div style={{ backgroundColor: "#264653", height: "100vh" }}>
            <TodoRender
                todoList={todoList}
                fetchCompletedList={fetchCompletedList}
                onDelete={(id) => onDelete(id, token, setTodoList)}
                onUpdate={(item) => onUpdate(item, token, setTodoList)} />
            <CreateTodo modalId={"createTodoModal"} onCreate={(title) => onCreate(title, token, setTodoList)} />
            <FloatButton modalTarget={"createTodoModal"} />
        </div>
    )
}
