import React, { useContext, useEffect } from 'react'
import NotepadEditor from './NotepadEditor'
import VariableContext from '../../../global/VariableContext'
import AuthContext from '../../../global/AuthContext';
import NoteRender from './NoteRender';
import { onCreate, onDelete, onUpdate } from './NoteCRUD';
import { Navigate } from 'react-router-dom';

export default function NotepadApp() {
    const { notes, setNotes, fetchNotes } = useContext(VariableContext);
    const { token,loggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (notes.length === 0 && loggedIn) {
            fetchNotes();
        }
    }, [notes, fetchNotes, loggedIn])

    if(!loggedIn) {return <Navigate to="/login" replace={true} />;}

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
