import React, { useContext, useEffect } from 'react'
import NotepadEditor from './NotepadEditor'
import VariableContext from '../../../global/VariableContext'
import AuthContext from '../../../global/AuthContext';
import NoteRender from './NoteRender';
import { onCreate, onDelete, onUpdate } from './NoteCRUD';

export default function NotepadApp() {
    const { notes, setNotes, fetchNotes } = useContext(VariableContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (notes.length === 0) {
            fetchNotes();
        }
    }, [notes, fetchNotes])

    return (
        <div style={{ backgroundColor: "#002d4d", height: "100vh" }}>
            <NotepadEditor
                onCreate={(newNote)=>onCreate(newNote,token,setNotes)} />
            <div style={{ paddingTop: "60px" }}>
                <NoteRender
                    notes={notes}
                    onDelete={(id)=>onDelete(id,token,setNotes)}
                    onUpdate={(newNote)=>onUpdate(newNote,token,setNotes)} />
            </div>
        </div>
    )
}
