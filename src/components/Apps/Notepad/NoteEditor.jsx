import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariableContext from '../../../global/VariableContext';
import { onCreate, onUpdate } from './NoteCRUD';
import AuthContext from '../../../global/AuthContext';
import TitleExtractor from '../../../utility/TitleExtractor';
import { GetNoteDetail } from '../../../http/Note';

const blankDetails = { title: "", description: "", color: "#dcdcdc" };
export default function NoteEditor() {
    const { noteId } = useParams();

    const [noteDetails, setNoteDetails] = useState(blankDetails);
    const { notes, setNotes, SetloadingNoteItem, fetchNotes } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchDetailedNote = async () => {
            const foundNote = notes.find((note) => note.id === parseInt(noteId));
            if(!foundNote.description){
                const detailedNote = await GetNoteDetail(token, noteId);
                setNoteDetails(detailedNote);
                setNotes((oldList) =>
                    oldList.map((note) => (note.id === detailedNote.id ? detailedNote : note))
                );
            }else{
                setNoteDetails(foundNote);
            }
        }
        setInitialFetch((prev)=>{
            if(!prev){
                //////////////////////////////// /main code//////////////////////////////// 
                if (!isNaN(noteId)) {
                    if (notes.length === 0) {
                        fetchNotes().then((_notes) => {
                            fetchDetailedNote();
                        })
                    } else {
                        fetchDetailedNote();
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
                        <input style={titleStyle} name='title' type="text" onChange={onValueChange} className='col-9' placeholder='give a title' value={noteDetails.title} />
                        <input type="color" className="form-control p-0" style={{ height: "auto" }} name='color' value={noteDetails.color} onChange={onValueChange} />
                    </div>

                    {/* <div className="input-group">
                        <button className='btn'>{'<-'}</button>
                        <input style={titleStyle} name='title' type="text" onChange={onValueChange} className='col' placeholder='give a title' value={noteDetails.title} />
                        <input type="color" className="form-control p-0" style={{ height: "auto" }} name='color' value={noteDetails.color} onChange={onValueChange} />
                    </div> */}
                    {/* <hr className='p-0 m-0' /> */}
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
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

const textareaStyle = {
    border: 'none',
    outline: 'none',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    // borderRadius: '0 0 15px 15px',
    borderRadius: '15px',
    height: "80vh"
};

const titleStyle = {
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    padding: '10px',
    backgroundColor: '#a5d3fb',
};

