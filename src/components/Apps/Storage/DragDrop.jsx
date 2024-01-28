import React, { useRef, useState } from 'react';

export default function DragDrop({ setIsModalOpen, onUploadClick }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        fileInputRef.current = droppedFile;
        setFile(droppedFile);
    };

    const handleInputChange = (event) => {
        const selectedFile = event.target.files[0];
        fileInputRef.current = selectedFile;
        setFile(selectedFile);
    };
    // console.log(file.name);
    return (
        <div className=''>
            <label className="form-control bg-secondary" htmlFor="fileSelector"
                style={{ width: '100%', height: '25dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {file ? file.name : 'Select or Drop a Your File Here'}
            </label>
            <div className="input-group mt-2">
                <button type="button" className="btn btn-primary form-control" onClick={() => setIsModalOpen(false)}>Close</button>
                <button type="button" className="btn btn-success form-control" onClick={() => onUploadClick(file)}>Save changes</button>
            </div>
            <input className='form-control opacity-0' style={{ height: '1px' }} type='file' id='fileSelector' onChange={handleInputChange} />
        </div>
    );
}
