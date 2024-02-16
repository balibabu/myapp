import React, { createContext, useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { getPhotos, pingServerAboutThumbnails } from '../../http/Photo';

const PhotoContext = createContext();
export default PhotoContext;
export function PhotoContextProvider({ children }) {
    const [photos, setPhotos] = useState([]);
    const [helpedServer, setHelpedServer] = useState(false);
    const { token } = useContext(AuthContext);

    const fetchPhotos = async () => {
        const res = await getPhotos(token);
        if (res) {
            setPhotos(res);
        }
    }

    const ping = async () => {
        await pingServerAboutThumbnails(token);
        setHelpedServer(true);
    }

    const contextData = {
        photos,
        setPhotos,
        fetchPhotos,
        ping,
        helpedServer,
        setHelpedServer
    }

    return (
        <PhotoContext.Provider value={contextData}>
            {children}
        </PhotoContext.Provider>
    )
}
