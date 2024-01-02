import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../../../global/AuthContext';
import VariableContext from '../../../global/VariableContext';
import { uploadFile } from './FileCRUD';
import { privateDetailsFormat } from '../../../global/variables';
import Autofill from './extra/Autofill';

export default function UploadFileModal({ modalId }) {
    const { setFiles, showToast, loadingFileItem, SetloadingFileItem } = useContext(VariableContext);
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
        const formData = new FormData();
        formData.append("file", file);
        if (isPrivate) {
            formData.append("repo_owner", privateDetails.repo_owner);
            formData.append("repo_name", privateDetails.repo_name);
            formData.append("token", privateDetails.token);
        }
        uploadFile(formData, token, loadingFileItem, showToast, SetloadingFileItem, fileInputRef, setFiles);
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
                            <PrivateDetailForm privateDetails={privateDetails} handlerPrivateDetails={handlerPrivateDetails} setPrivateDetails={setPrivateDetails}  />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



function Header({ isPrivate, setIsPrivate }) {
    return (
        <div className="modal-header p-1">
            {isPrivate ?
                <div className='text-success '>Now your file will be private</div>
                :
                <div className='text-danger '>This File will be public. Make it private, toggle switch {' ->'}</div>
            }
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)} />
            </div>
        </div>
    );
}


function PrivateDetailForm({ privateDetails,setPrivateDetails, handlerPrivateDetails }) {
    return (
        <div className='text-black'>
            <div className="input-group mt-3">
                <span className="input-group-text">Github Username</span>
                <input type="text" className="form-control" placeholder="repo owner" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.repo_owner}
                    onChange={handlerPrivateDetails}
                    name='repo_owner'
                />
            </div>
            <div className="input-group mt-3">
                <span className="input-group-text">Repo name</span>
                <input type="text" className="form-control" placeholder="eg. media, photos" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.repo_name}
                    onChange={handlerPrivateDetails}
                    name='repo_name'
                />
            </div>
            <div className="input-group mt-3">
                <input type="text" className="form-control" placeholder="Personal access Token" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.token}
                    onChange={handlerPrivateDetails}
                    name='token'
                />
            </div>
            <Autofill setPrivateDetails={setPrivateDetails} />
        </div>
    );
}