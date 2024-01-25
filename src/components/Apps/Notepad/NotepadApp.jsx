import React, { useContext, useEffect, useState } from 'react'
import VariableContext from '../../../global/VariableContext'
import AuthContext from '../../../global/AuthContext';
import NoteRender from './NoteRender';
import { Link, Navigate } from 'react-router-dom';
import { onDelete } from './utility/NoteCRUD';
import ProgressUI from './utility/ProgressUI';

export default function NotepadApp() {
    const { notes, setNotes, fetchNotes, loadingNoteItem } = useContext(VariableContext);
    const { token, loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);


    useEffect(() => {
        if (notes === undefined && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchNotes();
                }
                return true;
            })
        }
        // eslint-disable-next-line
    }, [])

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }



    return (
        <div style={{ maxHeight: "99dvh", overflowY: "auto" }}>
            {loadingNoteItem === 'newItem' && <ProgressUI title='Creating New Note Please wait' />}
            {notes === undefined && <ProgressUI title='Fetching notes please wait' />}

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