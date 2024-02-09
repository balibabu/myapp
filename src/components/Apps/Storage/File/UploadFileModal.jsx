import React, { useContext, useEffect, useRef, useState } from 'react'
import { uploadFile } from '../FileCRUD';
import { PrivateDetailForm } from '../extra/PrivateDetailForm';
import { Header } from '../extra/Header';
import FilePresence from '../extra/FilePresence';
import CustomModal from '../../../../utility/CustomModal';
import FloatButton from '../../../../utility/FloatButton';
import DragDrop from './DragDrop';
import VariableContext from '../../../Contexts/VariableContext';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';

export default function UploadFileModal({ file, setFile, setProgress, fileModal, setFileModal,selected }) {
    const { showToast, loadingFileItem, SetloadingFileItem } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateDetails, setPrivateDetails] = useState({});
    const { files, setFiles } = useContext(StorageContext);


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
        formData.append("inside", selected);
        if (FilePresence(file, files)) {
            uploadFile(formData, token, loadingFileItem, showToast, SetloadingFileItem, setFiles, setProgress);
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



