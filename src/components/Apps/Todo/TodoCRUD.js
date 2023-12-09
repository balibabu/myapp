import { AddTodo, DeleteTodoItem, UpdateTodoItem } from "../../../http/Todo";

export const onCreate = async (title,token,setTodoList) => {
    const item = await AddTodo(token, title);
    if (item) {
        setTodoList((oldList) => [item, ...oldList]);
    } else {
        alert('something went wrong');
    }
}

export const onUpdate = async (item,token,setTodoList) => {
    const updatedItem = await UpdateTodoItem(token, item);
    if (updatedItem) {
        setTodoList((oldList) =>
            oldList.map((todo) => (todo.id === item.id ? updatedItem : todo))
        );
    } else {
        alert('Something went wrong while updating');
    }
};

export const onDelete = async (id,token,setTodoList) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) { return; }

    const isSuccess = await DeleteTodoItem(token, id);
    if (isSuccess) {
        setTodoList((oldList) => oldList.filter((todo) => todo.id !== id));
    } else {
        alert('Something went wrong while deleting');
    }
};