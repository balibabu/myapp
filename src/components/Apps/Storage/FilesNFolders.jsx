import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Fetching from '../../Shared/Fetching';
import FolderRenderer from './Folder/FolderRenderer';
import AddButton from './AddButton';
import FileRenderer from './File/FileRenderer';
import StorageContext from '../../Contexts/StorageContext';
import AuthContext from '../../Contexts/AuthContext';
import BreadCrumbs from './Breadcrumbs/BreadCrumbs';
import Multiprogress from './extra/Multiprogress';
import VariableContext from '../../Contexts/VariableContext';


export default function FilesNFolders() {
    const { selected } = useParams();
    const { loggedIn, token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const { files, folders, progressList } = useContext(StorageContext);
    const [cut, setCut] = useState();

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFile([...event.dataTransfer.files]);
    };

    const handlePaste = (event) => {
        const items = event.clipboardData.items;
        for (let item of items) {
            if (item.type.startsWith('image/')) {
                const blob = item.getAsFile();
                const file = new File([blob], `clipImg-${new Date().toISOString().slice(0, -5)}.png`, { type: blob.type });
                setFile([file]);
            }
        }
    };

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div className='text-white' onPaste={handlePaste} onDragOver={handleDragOver} onDrop={handleDrop} style={{ minHeight: '100dvh' }}>
            <Fetching status={files} title='Files' />
            <BreadCrumbs {...{ selected, folders }} />
            {folders && <FolderRenderer {...{ folders, selected, setCut }} />}
            <Multiprogress {...{ progressList }} />
            {files && files.length > 0 && <FileRenderer {...{ files, selected, setCut }} />}
            <AddButton {...{ selected, file, setFile, cut, setCut, folders, token }} />
        </div>
    )
}
