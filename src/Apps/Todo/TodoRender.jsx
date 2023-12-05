import React from 'react'
import TodoItem from './TodoItem'

export default function TodoRender(props) {
  return (
    <div>
        {props.todoList && props.todoList.map((item)=>{
            return <TodoItem key={item.id} item={item}/>
        })}
    </div>
  )
}
