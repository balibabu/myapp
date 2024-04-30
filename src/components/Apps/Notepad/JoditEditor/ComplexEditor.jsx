import React, { useContext, useEffect, useRef, useState } from 'react'
import currentDateToColor from '../utility/Colors';
import { useNavigate, useParams } from 'react-router-dom';
import NoteContext from '../../../Contexts/NoteContext';
import AuthContext from '../../../Contexts/AuthContext';
import { createUpdateHandler } from '../utility/NoteCRUD';
import { Confirm } from '../../../../utility/utilities';
import JoditEditor from 'jodit-react';
import ThemeToggler from './ThemeToggler';

const blankDetails = { title: "", description: "", color: currentDateToColor() };
export default function ComplexEditor() {
    const { noteId } = useParams();

    const [noteDetails, setNoteDetails] = useState(blankDetails);
    const [changed, setChanged] = useState(false);
    const { notes, setNotes, SetloadingNoteItem, fetchNotes } = useContext(NoteContext);
    const { token } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const titleFieldRef = useRef();
    const [theme, setTheme] = useState(localStorage.getItem('editor-theme') || 'light');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev) {
                //////////////////////////////// /main code//////////////////////////////// 
                if (!isNaN(noteId)) {
                    if (notes.length === 0) {
                        fetchNotes().then((_notes) => {
                            const foundNote = _notes.find((note) => note.id === parseInt(noteId));
                            setNoteDetails(foundNote);
                            setContent(foundNote.description);
                        })
                    } else {
                        const foundNote = notes.find((note) => note.id === parseInt(noteId));
                        setNoteDetails(foundNote);
                        setContent(foundNote.description);
                    }
                }
                ////////////////////////// /////////////////////////////////////////////////
            }
            return true;
        })
        if (isNaN(noteId)) { titleFieldRef.current.focus() }
        // eslint-disable-next-line
    }, [])

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setNoteDetails((previousDetails) => ({ ...previousDetails, [name]: value }));
        setChanged(true);
    };

    const saveUpdateHandler = () => {
        const details = { ...noteDetails, description: content };
        console.log(details);
        if (changed) {
            createUpdateHandler(noteId, details, token, setNotes, SetloadingNoteItem);
        }
        setNoteDetails(blankDetails);
        navigate(-1);
    }


    const Cancel = () => {
        if (changed) {
            if (Confirm('Do you want to save the changes?')) {
                saveUpdateHandler();
                return;
            }
        }
        navigate(-1);
    }

    const editor = useRef(null);



    return (
        <div style={{ all: 'initial' }}>
            <div style={{ height: '5dvh', backgroundColor: theme === 'light' ? 'white' : 'grey' }} className='p-1 d-flex justify-content-between'>
                <div>
                    <button onClick={saveUpdateHandler}>{isNaN(noteId) ? 'Add' : 'Update'}</button>
                    <button onClick={Cancel}>cancel</button>
                </div>
                <input ref={titleFieldRef} name='title' type="text" onChange={onValueChange} placeholder='give a title' value={noteDetails.title} className={theme === 'light' ? '' : 'bg-secondary'} />
                <ThemeToggler {...{ theme, setTheme }} />
            </div>
            <JoditEditor
                ref={editor}
                value={content}
                config={{ height: '95dvh', theme }}
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => setContent(newContent)}
            />
        </div>
    )
}
