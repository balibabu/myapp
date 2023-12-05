import React, { useContext, useEffect, useState } from 'react'
import TodoRender from './TodoRender';
import FloatButton from '../../utility/FloatButton';
import CreateTodo from './CreateTodo';
import { AddTodo, GetTodoList } from '../../http/Todo';
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
    return (
        <div>
            <TodoRender todoList={todoList}/>
            <CreateTodo modalId={"createTodoModal"} onCreate={onCreate}/>
            <FloatButton modalTarget={"createTodoModal"}/>
        </div>
    )
}
