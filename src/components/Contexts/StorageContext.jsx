import React, { createContext, useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { getFilesAndFolders } from '../../http/Storage';

const StorageContext = createContext();
export default StorageContext;
export function StorageContextProvider({ children }) {
    const [files, setFiles] = useState();
    const [folders, setFolders] = useState();
    const { token } = useContext(AuthContext);
    const [loadingFileItem, SetloadingFileItem] = useState(null);
    const [progressList, setProgressList] = useState([]);

    const fetchFilesAndFolders = async () => {
        const res = await getFilesAndFolders(token);
        console.log(res);
        setFiles(res.files);
        setFolders(res.folders);
    }

    const contextData = {
        files,
        setFiles,
        folders,
        setFolders,
        fetchFilesAndFolders,
        loadingFileItem,
        SetloadingFileItem,
        progressList, setProgressList
    }

    return (
        <StorageContext.Provider value={contextData}>
            {children}
        </StorageContext.Provider>
    )
}
