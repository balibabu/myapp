import React, { useContext, useEffect, useState } from 'react'
import VariableContext from '../../../global/VariableContext';
import AuthContext from '../../../global/AuthContext';
import FileRender from './FileRender';
import { Navigate } from 'react-router-dom';
import UploadFileModal from './UploadFileModal';
import FloatButton from '../../../utility/FloatButton';
import ToastDialog from '../../../utility/ToastDialog';

export default function StorageApp() {
    const { files, fetchFiles, showToast, loadingFileItem } = useContext(VariableContext);
    const { loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (files.length === 0 && loggedIn) {
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

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div className='text-white'>
            {loadingFileItem === 'newfile' && <UploadingUI progress={progress} />}
            <FileRender files={files} />
            <UploadFileModal modalId={"uploadFileModal"} setProgress={setProgress} />
            <FloatButton modalTarget={"uploadFileModal"} />
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