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

export default function StorageApp() {
    const { selected } = useParams();
    const { loggedIn, token } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [, setInitialFetch] = useState(false);
    const { files, folders, fetchFilesAndFolders, progressList } = useContext(StorageContext);

    const [cut, setCut] = useState();

    useEffect(() => {
        if (files === undefined && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchFilesAndFolders()
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
        const droppedFile = event.dataTransfer.files;
        setFile([...event.dataTransfer.files]);
    };

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div className='text-white' onDragOver={handleDragOver} onDrop={handleDrop} style={{ minHeight: '100dvh' }}>
            <Fetching status={files} title='Files' />
            <BreadCrumbs {...{ selected, folders }} />
            {folders && <FolderRenderer {...{ folders, selected, setCut }} />}
            <Multiprogress {...{ progressList }} />
            {files && files.length > 0 && <FileRenderer {...{ files, selected, setCut }} />}
            <AddButton {...{ selected, file, setFile, cut, setCut, folders, token }} />
        </div>
    )
}
