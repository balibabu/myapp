import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariableContext from '../../../global/VariableContext';
import { onCreate, onUpdate } from './NoteCRUD';
import AuthContext from '../../../global/AuthContext';

const blankDetails = { title: "", description: "", color: "#dcdcdc" };
export default function NoteEditor() {
    const { noteId } = useParams();

    const [noteDetails, setNoteDetails] = useState(blankDetails);
    const [isNewNote, setIsNewNote] = useState(true);
    const { notes, setNotes } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNaN(noteId)) {
            const foundNote = notes.find((note) => note.id === parseInt(noteId));
            setNoteDetails(foundNote);
            setIsNewNote(false);
        }
    }, [noteId, notes])

    const onValueChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        setNoteDetails((previousDetails) => {
            const prevDes = previousDetails.description
            if (name === 'description' && value[value.length - 1] === '\n' && prevDes[prevDes.length - 1] !== '-') {
                const lines = value.split('\n')
                const lastLine = lines[lines.length - 2];
                if (lastLine.substr(0, 3) === '-> ') {
                    processedValue = value + '-> ';
                }
            }

            return { ...previousDetails, [name]: processedValue, }
        })
    };

    const saveUpdateHandler = () => {
        if (isNewNote) {
            onCreate(noteDetails, token, setNotes);
        } else {
            onUpdate(noteDetails, token, setNotes);
        }
        setNoteDetails(blankDetails);
        navigate('/notepad');
    }

    const clearCancel = () => {
        if (isNewNote) {
            setNoteDetails(blankDetails);
        } else {
            navigate('/notepad');
        }
    }

    return (
        <div style={containerStyle} className='bg-info'>
            <div className='row m-0  justify-content-center'>
                <div className='col-xl-8 col-md-10 col-sm-11 p-4'>
                    <div class="input-group">
                        <input style={titleStyle} name='title' type="text" onChange={onValueChange} className='col-11' placeholder='give a title' value={noteDetails.title} />
                        <input type="color" class="form-control p-0" style={{height:"auto"}} name='color' value={noteDetails.color} onChange={onValueChange}/>
                    </div>
                    <hr className='p-0 m-0' />
                    <textarea className='col-12' name="description" style={textareaStyle}
                        onChange={onValueChange}
                        placeholder='give a description'
                        value={noteDetails.description}
                    />
                    <div className='input-group'>
                        <button className='col-6 btn btn-danger' onClick={clearCancel}>{isNewNote ? 'Clear' : 'Cancel'}</button>
                        <button className="col-6 btn btn-success" onClick={saveUpdateHandler}>{isNewNote ? 'Add' : 'Update'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}



const containerStyle = {
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

const textareaStyle = {
    border: 'none',
    outline: 'none',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    borderRadius: '0 0 15px 15px',
    height: "80vh"
};

const titleStyle = {
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    borderRadius: '15px 0 0 0',
};
