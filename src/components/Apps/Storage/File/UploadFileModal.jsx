import React, { useContext, useEffect } from 'react'
import { uploadFileInChunks } from './FileCRUD';
import CustomModal from '../../../../utility/CustomModal';
import DragDrop from './DragDrop';
import AuthContext from '../../../Contexts/AuthContext';
import StorageContext from '../../../Contexts/StorageContext';

export default function UploadFileModal({ file, setFile, fileModal, setFileModal, selected, notify }) {
    const { token } = useContext(AuthContext);
    const { setFiles, setProgressList } = useContext(StorageContext);

    useEffect(() => {
        if (file) {
            setFileModal(true);
        }
        // eslint-disable-next-line
    }, [file])


    const onUploadClick = async () => {
        setFileModal(false);
        if (file.length === 0) { return; }
        notify('Storage', `uploading ${file.length} files`, 'success');
        for (const _file of file) {
            await uploadFileInChunks(_file, token, setFiles, selected, setProgressList);
            notify('Storage', `${_file.name} uploaded`, 'success');
        }
        setProgressList([]);
        setFile(null);
    };

    return (
        <div>
            <CustomModal isModalOpen={fileModal} setIsModalOpen={setFileModal} top='35'>
                <DragDrop file={file} setFile={setFile} setIsModalOpen={setFileModal} onUploadClick={onUploadClick} />
            </CustomModal>
        </div>
    )
}



