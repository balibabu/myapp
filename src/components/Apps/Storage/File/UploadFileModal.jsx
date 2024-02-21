import React, { useContext, useEffect, useState } from 'react'
import { uploadFile } from './FileCRUD';
import { PrivateDetailForm } from '../extra/PrivateDetailForm';
import FilePresence from '../extra/FilePresence';
import CustomModal from '../../../../utility/CustomModal';
import DragDrop from './DragDrop';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';

export default function UploadFileModal({ file, setFile, setProgress, fileModal, setFileModal, selected }) {
    const { token } = useContext(AuthContext);
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateDetails, setPrivateDetails] = useState({});
    const { files, setFiles, loadingFileItem, SetloadingFileItem  } = useContext(StorageContext);


    useEffect(() => {
        if (file) {
            setFileModal(true);
        }
    }, [file])


    const onUploadClick = async (file) => {
        setFileModal(false);
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
        if(selected!=='null'){
            formData.append("inside", selected);
        }
        if (FilePresence(file, files)) {
            uploadFile(formData, token, loadingFileItem, ()=>{}, SetloadingFileItem, setFiles, setProgress);
        }
        setFile(null);
    };
    return (
        <div>
            <CustomModal isModalOpen={fileModal} setIsModalOpen={setFileModal} top='35'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)} /> For more privacy</div>
                {isPrivate &&
                    <PrivateDetailForm privateDetails={privateDetails} setPrivateDetails={setPrivateDetails} />
                }
                <DragDrop file={file} setFile={setFile} setIsModalOpen={setFileModal} onUploadClick={onUploadClick} />
            </CustomModal>
            {/* <FloatButton onPress={() => setIsModalOpen(true)} /> */}
        </div>
    )
}



