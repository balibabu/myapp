import React, { useContext, useEffect, useState } from 'react'
import CreateTodo from './CreateTodo';
import { onCreate, onDelete, onUpdate } from './TodoCRUD';
import { Navigate } from 'react-router-dom';
import Category from './Category';
import Fetching from '../../Shared/Fetching';
import AuthContext from '../../Contexts/AuthContext';
import TodoContext from '../../Contexts/TodoContext';

export default function TodoApp() {
    const { todoList, setTodoList } = useContext(TodoContext);
    const { token, loggedIn } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        setTabs([...new Set(todoList && todoList.map(item => item.category))])
    }, [todoList])

    if (!loggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div style={{ backgroundColor: "#264653", height: "100dvh" }}>
            <Fetching status={todoList} title='todo list' />
            {todoList && todoList.length > 0 && <>
                <Category
                    tabs={tabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    todoList={todoList}
                    onDelete={(id) => onDelete(id, token, setTodoList)}
                    onUpdate={(item) => onUpdate(item, token, setTodoList)} />
            </>
            }

            <CreateTodo
                tabs={tabs}
                todoList={todoList}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onCreate={(data) => onCreate(data, token, setTodoList)} />
        </div>
    )
}
