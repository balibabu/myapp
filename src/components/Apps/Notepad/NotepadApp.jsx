import React, { useContext, useEffect } from 'react'
import VariableContext from '../../../global/VariableContext'
import AuthContext from '../../../global/AuthContext';
import NoteRender from './NoteRender';
import { onDelete } from './NoteCRUD';
import { Link, Navigate } from 'react-router-dom';

export default function NotepadApp() {
    const { notes, setNotes, fetchNotes } = useContext(VariableContext);
    const { token, loggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (notes.length === 0 && loggedIn) {
            fetchNotes();
        }
    }, [notes, fetchNotes, loggedIn])

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div style={{ backgroundColor: "#002d4d", height: "100vh" }}>
            <NoteRender
                notes={notes}
                onDelete={(id) => onDelete(id, token, setNotes)}
                 />

            <Link
                to='./edit/x'
                style={floatingButtonStyle}
                type="button"
                className="btn btn-outline-success btn-lg"
            >+</Link>
        </div>
    )
}


const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '10px',
    fontWeight: "bolder",
    borderRadius: "10px",
}