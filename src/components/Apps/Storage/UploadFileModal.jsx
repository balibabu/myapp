import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../../../global/AuthContext';
import VariableContext from '../../../global/VariableContext';
import { uploadFile } from './FileCRUD';
import { privateDetailsFormat } from '../../../global/variables';
import { PrivateDetailForm } from './extra/PrivateDetailForm';
import { Header } from './extra/Header';
import FilePresence from './extra/FilePresence';
import CustomModal from '../../../utility/CustomModal';
import FloatButton from '../../../utility/FloatButton';
import DragDrop from './DragDrop';

export default function UploadFileModal({ setProgress }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { files, setFiles, showToast, loadingFileItem, SetloadingFileItem } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateDetails, setPrivateDetails] = useState(privateDetailsFormat);
    const fileInputRef = useRef(null);


    const onUploadClick = async (file) => {
        setIsModalOpen(false);
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
            uploadFile(formData, token, loadingFileItem, showToast, SetloadingFileItem, setFiles, setProgress);
        }
    };
    return (
        <div>
            <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} top='35'>
                {/* <Header isPrivate={isPrivate} setIsPrivate={setIsPrivate} /> */}
                {/* <div className='input-group'>
                    <input
                        className="form-control"
                        type="file"
                        onChange={handleImageInputChange}
                        ref={fileInputRef}
                    />
                    <button className='btn btn-success' onClick={onUploadClick}>Upload</button>
                </div> */}
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)} /> For more privacy</div>
                {isPrivate &&
                    <PrivateDetailForm privateDetails={privateDetails} setPrivateDetails={setPrivateDetails} />
                }
                <DragDrop setIsModalOpen={setIsModalOpen} onUploadClick={onUploadClick} />
            </CustomModal>
            <FloatButton onPress={() => setIsModalOpen(true)} />
        </div>
    )
}


{/* <Header isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
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
                
                
                <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                    
                </div>
            </div>
        </div>*/}


