import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../../../global/AuthContext';
import VariableContext from '../../../global/VariableContext';
import { uploadFile } from './FileCRUD';

export default function UploadFileModal({ modalId }) {
    const { setFiles,showToast,loadingFileItem, SetloadingFileItem } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const onUploadClick = async () => {
        uploadFile(file,token,loadingFileItem,showToast,SetloadingFileItem,fileInputRef,setFiles);
    };
    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className='input-group'>
                            <input
                                className="form-control"
                                type="file"
                                onChange={handleImageInputChange}
                                ref={fileInputRef}
                            />
                            <button className='btn btn-success' data-bs-dismiss="modal" onClick={onUploadClick}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
