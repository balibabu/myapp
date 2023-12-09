import React from 'react'
import Task from './Task'

export default function NoteRender(props) {
  return (
    <div className="d-flex flex-wrap">
        {props.notes && props.notes.map((note)=>(
            <Task task={note} key={note.id} onDelete={props.onDelete} onUpdate={props.onUpdate}/>
        ))}
    </div>
  )
}
