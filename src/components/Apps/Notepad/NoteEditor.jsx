import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariableContext from '../../../global/VariableContext';
import { onCreate, onUpdate } from './NoteCRUD';
import AuthContext from '../../../global/AuthContext';
import TitleExtractor from '../../../utility/TitleExtractor';
import Dropdown from './extra/Dropdown';

const blankDetails = { title: "", description: "", color: "#dcdcdc" };
export default function NoteEditor() {
    const { noteId } = useParams();

    const [noteDetails, setNoteDetails] = useState(blankDetails);
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
    };

    const saveUpdateHandler = () => {
        if (isNaN(noteId)) {
            if (noteDetails.title.trim().length === 0) {
                noteDetails.title = TitleExtractor(noteDetails.description, 30);
            }
            onCreate(noteDetails, token, setNotes);
        } else {
            SetloadingNoteItem(noteDetails.id);
            onUpdate(noteDetails, token, setNotes).then(() => {
                SetloadingNoteItem(null);
            });
        }
        setNoteDetails(blankDetails);
        navigate('/notepad', { replace: true });
    }

    const Cancel = () => {
        navigate('/notepad', { replace: true });
    }

    return (
        <div style={containerStyle} className='bg-info'>
            <div className='row m-0  justify-content-center'>
                <div className='col-xl-8 col-md-10 col-sm-11 p-4'>
                    <div className="input-group mb-2">
                        <button className="btn" style={{ backgroundColor: "#a5d3fb" }} onClick={() => navigate('/notepad', { replace: true })}>{'<-'}</button>
                        <input style={titleStyle} name='title' type="text" onChange={onValueChange} className='col-lg-10 col-9' placeholder='give a title' value={noteDetails.title} />
                        <input type="color" className="form-control p-0" style={{ height: "auto"}} name='color' value={noteDetails.color} onChange={onValueChange} />
                        <Dropdown/>
                    </div>
                    <textarea className='col-12' name="description" style={textareaStyle}
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

