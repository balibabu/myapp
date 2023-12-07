import React, { useContext, useEffect, useState } from 'react'
import TodoRender from './TodoRender';
import FloatButton from '../../utility/FloatButton';
import CreateTodo from './CreateTodo';
import { AddTodo, DeleteTodoItem, GetTodoList, UpdateTodoItem } from '../../http/Todo';
import AuthContext from '../../global/AuthContext';

//[{ id: 1, title: "hw", completed: false, created_time: "2023/12/5" }, { id: 2, title: "cw", completed: false, created_time: "2023/12/4" }]
export default function TodoApp() {
    const [todoList, setTodoList] = useState([]);
    const { token } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchData=async ()=>{
            const list=await GetTodoList(token);
            setTodoList(list);
        }
        fetchData();
    }, [token])
    

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
