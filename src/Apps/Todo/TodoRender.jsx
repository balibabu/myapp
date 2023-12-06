import React from 'react'
import TodoItem from './TodoItem'
import './accordionStyle.css'

export default function TodoRender(props) {
  return (
    <div className="accordion custom-accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button uncomplete" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Not Completed Tasks
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body body-uncomplete">
            <div className="container">
              <div className="row">
                {props.todoList && props.todoList.map((item) => {
                  if (!item.completed) {
                    return <TodoItem key={item.id} item={item} />
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed complete" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Completed Tasks
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body body-complete">
            <div className="container">
              <div className="row">
                {props.todoList && props.todoList.map((item) => {
                  if (item.completed) {
                    return <TodoItem key={item.id} item={item} />
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

