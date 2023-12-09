import React, { useState } from 'react'

const blankDetails = { title: "", description: "", color: "#b8c0ff" }
export default function NotepadEditor(props) {
    const [noteDetails, setNoteDetails] = useState(blankDetails);

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setNoteDetails((prevNoteDetails) => ({
            ...prevNoteDetails,
            [name]: value,
        }));
    }

    const addHandler=()=>{
        const newNote={...noteDetails};
        props.onCreate(newNote);
        setNoteDetails(blankDetails);
    }

    return (
        <div className="container" style={{ position: "absolute", zIndex: 1 }}>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="accordion custom-accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button uncomplete" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Create A Note
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body body-uncomplete">
                                    <input style={titleStyle} name='title' type="text" onChange={onValueChange} className='col-12' placeholder='give a title' value={noteDetails.title} />
                                    <hr className='p-0 m-0' />
                                    <textarea style={textareaStyle} name='description' onChange={onValueChange} rows='10' className='col-12' placeholder='give a description' value={noteDetails.description} />
                                    <div className='d-flex justify-content-between input-group'>
                                        <button className='col-6 btn btn-success' onClick={addHandler} data-bs-toggle="collapse" data-bs-target="#collapseOne">Add</button>
                                        <button className='col-6 btn btn-danger' onClick={()=>setNoteDetails(blankDetails)}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const textareaStyle = {
    border: 'none',
    outline: 'none',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    borderRadius: '0 0 0 15px',
};

const titleStyle = {
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    padding: '10px',
    backgroundColor: '#a5d3fb',
    borderRadius: '15px 15px 0 0',
}

