import React, { useState } from 'react'

export default function CreateTodo({modalId,onCreate}) {
    const [title, setTitle] = useState('');
    const onSave=async ()=>{
        onCreate(title);
        setTitle('');
    }

    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Give a Title</h1>
                    </div>
                    <div className="modal-body">
                        <input onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control form-control-lg" type="text" placeholder="type your goal here" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
