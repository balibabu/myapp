import React, { useContext, useEffect, useState } from 'react'
import VariableContext from '../../../global/VariableContext';
import AuthContext from '../../../global/AuthContext';
import FileRender from './FileRender';
import { Navigate } from 'react-router-dom';
import UploadFileModal from './UploadFileModal';
import FloatButton from '../../../utility/FloatButton';
import ToastDialog from '../../../utility/ToastDialog';

export default function StorageApp() {
    const { files,fetchFiles, showToast,} = useContext(VariableContext);
    const { loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);

    useEffect(() => {
        if (files.length === 0 && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchFiles();
                    showToast('enjoy free unlimited storage','primary')
                }
                return true;
            })
        }
        // eslint-disable-next-line
    }, [])
    
    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div className='text-white'>
            <FileRender files={files}/>
            <UploadFileModal modalId={"uploadFileModal"}/>
            <FloatButton modalTarget={"uploadFileModal"} />
            <ToastDialog />
        </div>
    )
}
