import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../../../global/AuthContext';
import VariableContext from '../../../global/VariableContext';
import { uploadFile } from './FileCRUD';
import { privateDetailsFormat } from '../../../global/variables';
import { PrivateDetailForm } from './extra/PrivateDetailForm';
import { Header } from './extra/Header';
import FilePresence from './extra/FilePresence';

export default function UploadFileModal({ modalId, setProgress }) {
    const { files, setFiles, showToast, loadingFileItem, SetloadingFileItem } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateDetails, setPrivateDetails] = useState(privateDetailsFormat);
    const fileInputRef = useRef(null);

    const handleImageInputChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handlerPrivateDetails = (e) => {
        const { name, value } = e.target;
        setPrivateDetails((prev) => ({ ...prev, [name]: value }));
    }

    const onUploadClick = async () => {
        if (!file) { return; }
        if (file.size > 100_000_000) {
            alert('size limit 100MB exceeded, please choose smaller size');
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        if (isPrivate) {
            formData.append("repo_owner", privateDetails.repo_owner);
            formData.append("repo_name", privateDetails.repo_name);
            formData.append("token", privateDetails.token);
        }
        if (FilePresence(file, files)) {
            uploadFile(formData, token, loadingFileItem, showToast, SetloadingFileItem, fileInputRef, setFiles, setProgress);
        }
    };
    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                    <Header isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
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
                        {isPrivate &&
                            <PrivateDetailForm privateDetails={privateDetails} handlerPrivateDetails={handlerPrivateDetails} setPrivateDetails={setPrivateDetails} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}




