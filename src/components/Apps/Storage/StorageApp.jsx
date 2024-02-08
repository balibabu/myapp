import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ToastDialog from '../../../utility/ToastDialog';
import Fetching from '../../Shared/Fetching';
import FolderRenderer from './Folder/FolderRenderer';
import AddButton from './AddButton';
import FileRenderer from './File/FileRenderer';
import VariableContext from '../../Contexts/VariableContext';
import StorageContext from '../../Contexts/StorageContext';
import AuthContext from '../../Contexts/AuthContext';
import BreadCrumbs from './Breadcrumbs/BreadCrumbs';

export default function StorageApp() {
    const { selected } = useParams();
    const navigate = useNavigate();
    const { showToast, loadingFileItem } = useContext(VariableContext);
    const { loggedIn, token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [, setInitialFetch] = useState(false);
    const [progress, setProgress] = useState(0);
    const { files, folders, fetchFilesAndFolders } = useContext(StorageContext);

    useEffect(() => {
        if (files === undefined && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchFilesAndFolders()
                    showToast('enjoy free unlimited storage', 'primary')
                }
                return true;
            })
        }
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
            onDrop={handleDrop} style={{ minHeight: '100dvh' }}>
            <Fetching status={files} title='Files and Folders' /> <ToastDialog />
            {loadingFileItem === 'newfile' && <UploadingUI progress={progress} />}
            {/* <button onClick={() => navigate(-1)}>Back</button> */}
            <BreadCrumbs {...{selected,folders}}/>
            <hr />
            {folders && folders.length > 0 && <FolderRenderer {...{ folders, selected }} />}
            <hr />
            {files && files.length > 0 && <FileRenderer {...{ files, selected }} />}
            <AddButton {...{ selected, setProgress, file, setFile }} />
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

