import React from 'react'
import NoteItem from './NoteItem'

export default function NoteRender(props) {

	return (
		<div className='row m-0 pt-2 mx-1 custom-scrollbar'>
			{props.notes && props.notes.map((note) => (
				<NoteItem note={note} onDelete={props.onDelete} key={note.id} />
			))}
		</div>
	)
}
