import React, { createContext, useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { getFilesAndFolders } from '../../http/Storage';

const StorageContext = createContext();
export default StorageContext;
export function StorageContextProvider({ children }) {
    const [files, setFiles] = useState();
    const [folders, setFolders] = useState();
    const { token } = useContext(AuthContext);

    const fetchFilesAndFolders = async () => {
        const res = await getFilesAndFolders(token);
        setFiles(res.files);
        setFolders(res.folders);
    }

    const contextData = {
        files,
        setFiles,
        folders,
        setFolders,
        fetchFilesAndFolders,
    }

    return (
        <StorageContext.Provider value={contextData}>
            {children}
        </StorageContext.Provider>
    )
}
