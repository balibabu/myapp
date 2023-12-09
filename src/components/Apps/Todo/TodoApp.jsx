import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../global/AuthContext';
import TodoRender from './TodoRender';
import CreateTodo from './CreateTodo';
import FloatButton from '../../../utility/FloatButton';
import VariableContext from '../../../global/VariableContext';
import { onCreate, onDelete, onUpdate } from './TodoCRUD';

export default function TodoApp() {
    const { todoList,setTodoList, fetchTodoList } = useContext(VariableContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if(todoList.length===0){
            fetchTodoList();
        }
    }, [todoList,fetchTodoList])
    


    return (
        <div style={{backgroundColor:"#264653", height:"100vh"}}>
            <TodoRender 
            todoList={todoList} 
            onDelete={(id)=>onDelete(id,token,setTodoList)} 
            onUpdate={(item)=>onUpdate(item,token,setTodoList)}/>
            <CreateTodo modalId={"createTodoModal"} onCreate={(title)=>onCreate(title,token,setTodoList)}/>
            <FloatButton modalTarget={"createTodoModal"}/>
        </div>
    )
}
