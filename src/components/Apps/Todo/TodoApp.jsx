import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../global/AuthContext';
import { AddTodo, DeleteTodoItem, UpdateTodoItem } from '../../../http/Todo';
import TodoRender from './TodoRender';
import CreateTodo from './CreateTodo';
import FloatButton from '../../../utility/FloatButton';
import VariableContext from '../../../global/VariableContext';

export default function TodoApp() {
    const { todoList,setTodoList, fetchTodoList } = useContext(VariableContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if(todoList.length===0){
            fetchTodoList();
        }
    }, [todoList,fetchTodoList])
    

    const onCreate=async (title)=>{
        const item=await AddTodo(token,title);
        if(item){
            setTodoList((oldList)=>[item,...oldList]);
        }else{
            alert('something went wrong');
        }
    }

    const onUpdate = async (item) => {
        const updatedItem = await UpdateTodoItem(token, item);
        if (updatedItem) {
            setTodoList((oldList) =>
                oldList.map((todo) => (todo.id === item.id ? updatedItem : todo))
            );
        } else {
            alert('Something went wrong while updating');
        }
    };

    const onDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) { return; }

        const isSuccess = await DeleteTodoItem(token, id);
        if (isSuccess) {
            setTodoList((oldList) => oldList.filter((todo) => todo.id !== id));
        } else {
            alert('Something went wrong while deleting');
        }
    };

    return (
        <div style={{backgroundColor:"#264653", height:"100vh"}}>
            <TodoRender todoList={todoList} onDelete={onDelete} onUpdate={onUpdate}/>
            <CreateTodo modalId={"createTodoModal"} onCreate={onCreate}/>
            <FloatButton modalTarget={"createTodoModal"}/>
        </div>
    )
}
