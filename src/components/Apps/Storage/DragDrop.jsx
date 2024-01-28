import React, { useRef, useState } from 'react';

export default function DragDrop({ file, setFile, setIsModalOpen, onUploadClick }) {

    const handleInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className=''>
            <label className="form-control bg-secondary" htmlFor="fileSelector"
                style={{ width: '100%', height: '25dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {file ? file.name : 'Select or Drop a Your File Here'}
            </label>
            <div className="input-group mt-2">
                <button type="button" className="btn btn-danger form-control" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-success form-control" onClick={() => onUploadClick(file)}>Save changes</button>
            </div>
            <input className='form-control opacity-0' style={{ height: '1px' }} type='file' id='fileSelector' onChange={handleInputChange} />
        </div>
    );
}
