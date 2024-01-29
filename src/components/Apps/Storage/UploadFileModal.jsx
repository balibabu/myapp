import React, { useContext, useEffect, useRef, useState } from 'react'
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

export default function UploadFileModal({ file, setFile, setProgress }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { files, setFiles, showToast, loadingFileItem, SetloadingFileItem } = useContext(VariableContext);
    const { token } = useContext(AuthContext);
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateDetails, setPrivateDetails] = useState(privateDetailsFormat);

    useEffect(() => {
        if (file) {
            setIsModalOpen(true);
        }
    }, [file])


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
            formData.append("folder", 'root');
        }
        if (FilePresence(file, files)) {
            uploadFile(formData, token, loadingFileItem, showToast, SetloadingFileItem, setFiles, setProgress);
        }
        setFile(null);
    };
    return (
        <div>
            <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} top='35'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)} /> For more privacy</div>
                {isPrivate &&
                    <PrivateDetailForm privateDetails={privateDetails} setPrivateDetails={setPrivateDetails} />
                }
                <DragDrop file={file} setFile={setFile} setIsModalOpen={setIsModalOpen} onUploadClick={onUploadClick} />
            </CustomModal>
            <FloatButton onPress={() => setIsModalOpen(true)} />
        </div>
    )
}



