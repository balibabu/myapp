import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariableContext from '../../../global/VariableContext';
import { createUpdateHandler, onCreate, onUpdate } from './NoteCRUD';
import AuthContext from '../../../global/AuthContext';
import TitleExtractor from '../../../utility/TitleExtractor';
import Dropdown from './extra/Dropdown';
import currentDateToColor from './extra/Colors';
import Confirm from '../../../utility/Confirm';

const blankDetails = { title: "", description: "", color: currentDateToColor() };
export default function NoteEditor() {
    const { noteId } = useParams();

    const [noteDetails, setNoteDetails] = useState(blankDetails);
    const [changed, setChanged] = useState(false);
    const { notes, setNotes, SetloadingNoteItem, fetchNotes } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
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
        // eslint-disable-next-line
    }, [])

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setNoteDetails((previousDetails) => ({ ...previousDetails, [name]: value }));
        setChanged(true);
    };

    const saveUpdateHandler = () => {
        createUpdateHandler(noteId, noteDetails, token, setNotes, SetloadingNoteItem);
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

    return (
        <div style={{ ...containerStyle, backgroundColor: "rgb(0,62,75)" }}>
            <div className='row m-0  justify-content-center'>
                <div className='col-xl-8 col-md-10 col-sm-11 p-4'>
                    <div className="input-group mb-2">
                        <button className="btn" style={{ backgroundColor: noteDetails.color }} onClick={Cancel}>{'<-'}</button>
                        <input style={{ ...titleStyle, backgroundColor: noteDetails.color }} name='title' type="text" onChange={onValueChange} className='col-lg-10 col-9' placeholder='give a title' value={noteDetails.title} />
                        <input type="color" className="form-control p-0" style={{ height: "auto", border: "none", margin: "0px" }} name='color' value={noteDetails.color} onChange={onValueChange} />
                        <Dropdown color={noteDetails.color} />
                    </div>
                    <textarea className='col-12' name="description"
                        rows='16'
                        // style={textareaStyle}
                        style={{ ...textareaStyle, backgroundColor: noteDetails.color }}
                        onChange={onValueChange}
                        placeholder='give a description'
                        value={noteDetails.description}
                    />
                    <div className='input-group mt-2'>
                        <button className='col-6 btn btn-danger' onClick={Cancel}>Cancel</button>
                        <button className="col-6 btn btn-success" onClick={saveUpdateHandler}>{isNaN(noteId) ? 'Add' : 'Update'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



const containerStyle = {
    // maxWidth: "100vw",
    // minHeight: "100vh",
    // maxHeight: "100vh",
    // height:"100dvh",
}

const textareaStyle = {
    border: 'none',
    outline: 'none',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    // borderRadius: '0 0 15px 15px',
    borderRadius: '15px',
    height: "80dvh"
};

const titleStyle = {
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    padding: '10px',
    backgroundColor: '#a5d3fb',
};

