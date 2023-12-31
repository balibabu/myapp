import React from 'react'
import TodoApp from '../../Todo/TodoApp';

export default function ToDoModal() {
    return (
        <div className="modal fade" id="ToDoModal" tabIndex="-1" aria-labelledby="ToDoModal" aria-hidden="true">
            <button type="button" className="btn btn-danger form-control rounded-5 m-1" data-bs-dismiss="modal" aria-label="Close">Close The Todo List</button>
            <TodoApp />
        </div>
    );
}
