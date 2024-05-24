import React, { useContext, useEffect, useState } from 'react'
import NoteRender from './NoteRender';
import { Link, Navigate } from 'react-router-dom';
import { onDelete } from './utility/NoteCRUD';
import ProgressUI from '../../Shared/ProgressUI';
import Fetching from '../../Shared/Fetching';
import AuthContext from '../../Contexts/AuthContext';
import NoteContext from '../../Contexts/NoteContext';

export default function NotepadApp() {
    const { notes, setNotes, fetchNotes, loadingNoteItem } = useContext(NoteContext);
    const { token, loggedIn } = useContext(AuthContext);

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div style={{ maxHeight: "100dvh", overflowY: "auto" }} className='custom-scrollbar'>
            <Fetching status={notes} title='Notes'/>
            {loadingNoteItem === 'newItem' && <ProgressUI title='Creating New Note Please wait' />}
            {/* {notes === undefined && <ProgressUI title='Fetching notes please wait' />} */}

            <NoteRender
                notes={notes}
                onDelete={(id) => onDelete(id, token, setNotes)}
            />
            <Link
                to='./edit/x'
                style={floatingButtonStyle}
                type="button"
                className="btn btn-primary btn-lg"
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