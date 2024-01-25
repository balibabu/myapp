import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../global/AuthContext';
import CreateTodo from './CreateTodo';
import FloatButton from '../../../utility/FloatButton';
import VariableContext from '../../../global/VariableContext';
import { onCreate, onDelete, onUpdate } from './TodoCRUD';
import { Navigate } from 'react-router-dom';
import Category from './Category/Category';

export default function TodoApp() {
    const { todoList, setTodoList, fetchTodoList } = useContext(VariableContext);
    const { token, loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        if (todoList.length === 0 && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchTodoList();
                }
                return true;
            })
        }
        setTabs([...new Set(todoList.map(item => item.category))])
        // eslint-disable-next-line
    }, [todoList])

    if (!loggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div style={{ backgroundColor: "#264653", height: "100dvh" }}>
            <Category
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                todoList={todoList}
                onDelete={(id) => onDelete(id, token, setTodoList)}
                onUpdate={(item) => onUpdate(item, token, setTodoList)} />
            {/* <TodoRender
                todoList={todoList}
                fetchCompletedList={fetchCompletedList}
                onDelete={(id) => onDelete(id, token, setTodoList)}
                onUpdate={(item) => onUpdate(item, token, setTodoList)} /> */}
            <CreateTodo
                tabs={tabs}
                todoList={todoList}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                modalId={"createTodoModal"}
                onCreate={(data) => onCreate(data, token, setTodoList)} />

            <FloatButton modalTarget={"createTodoModal"} />
        </div>
    )
}
