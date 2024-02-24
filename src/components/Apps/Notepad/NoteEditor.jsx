import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from './extra/Dropdown';
import { createUpdateHandler } from './utility/NoteCRUD';
import currentDateToColor from './utility/Colors';
import { Confirm } from '../../../utility/utilities';
import AuthContext from '../../Contexts/AuthContext';
import NoteContext from '../../Contexts/NoteContext';


const blankDetails = { title: "", description: "", color: currentDateToColor() };
export default function NoteEditor() {
    const { noteId } = useParams();

    const [noteDetails, setNoteDetails] = useState(blankDetails);
    const [changed, setChanged] = useState(false);
    const { notes, setNotes, SetloadingNoteItem, fetchNotes } = useContext(NoteContext);
    const { token } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const titleFieldRef = useRef();

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
                        })
                    } else {
                        const foundNote = notes.find((note) => note.id === parseInt(noteId));
                        setNoteDetails(foundNote);
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
        if (changed) {
            createUpdateHandler(noteId, noteDetails, token, setNotes, SetloadingNoteItem);
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
    const handleKeyDown = (event) => {
        if (event.key === 's' && event.ctrlKey) {
            event.preventDefault();
            saveUpdateHandler()
        }
    };

    return (
        <div style={{ backgroundColor: hexToRGBA(noteDetails.color, 0.4) }} onKeyDown={handleKeyDown}>
            <div className='row m-0  justify-content-center'>
                <div className='col-xl-8 col-md-10 col-sm-11 p-2'>
                    <div className="input-group mb-2">
                        <button className="btn" style={{ backgroundColor: noteDetails.color, borderRight: 'solid 1px grey' }} onClick={Cancel}>{'<-'}</button>
                        <input ref={titleFieldRef} style={{ ...titleStyle, backgroundColor: noteDetails.color }} name='title' type="text" onChange={onValueChange} className='col-lg-10 col-9' placeholder='give a title' value={noteDetails.title} />
                        <input type="color" className="form-control p-0" style={{ height: "auto", margin: "0px", borderColor: 'grey' }} name='color' value={noteDetails.color} onChange={onValueChange} />
                        <Dropdown color={noteDetails.color} />
                    </div>
                    <textarea className='col-12' name="description"
                        rows='16'
                        style={{ ...textareaStyle, backgroundColor: noteDetails.color }}
                        onChange={onValueChange}
                        placeholder='give a description'
                        value={noteDetails.description}
                    />
                    <div className='input-group'>
                        <button className='col-6 btn btn-danger' onClick={Cancel}>Cancel</button>
                        <button className="col-6 btn btn-success" onClick={saveUpdateHandler}>{isNaN(noteId) ? 'Add' : 'Update'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const textareaStyle = {
    border: 'none',
    outline: 'none',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    // borderRadius: '0 0 15px 15px',
    borderRadius: '5px',
    height: "85dvh"
};

const titleStyle = {
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    padding: '10px',
    backgroundColor: '#a5d3fb',
};

const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};