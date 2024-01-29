import React, { useContext, useEffect, useState } from 'react'
import VariableContext from '../../../global/VariableContext';
import AuthContext from '../../../global/AuthContext';
import FileRender from './FileRender';
import { Navigate } from 'react-router-dom';
import UploadFileModal from './UploadFileModal';
import FloatButton from '../../../utility/FloatButton';
import ToastDialog from '../../../utility/ToastDialog';
import Fetching from '../../Shared/Fetching';

export default function StorageApp() {
    const { files, fetchFiles, showToast, loadingFileItem } = useContext(VariableContext);
    const { loggedIn } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [, setInitialFetch] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (files === undefined && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchFiles();
                    showToast('enjoy free unlimited storage', 'primary')
                }
                return true;
            })
        }
        console.log(files);
        // eslint-disable-next-line
    }, [])

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div className='text-white'
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <Fetching status={files} title='Files and Folders' />
            {loadingFileItem === 'newfile' && <UploadingUI progress={progress} />}
            <FileRender files={files} />
            <UploadFileModal setProgress={setProgress} file={file} setFile={setFile} />
            <ToastDialog />
        </div>
    )
}


const UploadingUI = ({ progress }) => {
    return (
        <div className="progress mx-3 mt-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}>{`${progress}%`}</div>
        </div>
    );
}