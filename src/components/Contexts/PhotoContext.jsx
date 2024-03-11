import React, { createContext, useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { getPhotos } from '../../http/Photo';

const PhotoContext = createContext();
export default PhotoContext;
export function PhotoContextProvider({ children }) {
    const [photos, setPhotos] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const { token } = useContext(AuthContext);
    const [progressList, setProgressList] = useState([]);

    const fetchPhotos = async () => {
        const res = await getPhotos(token);
        if (res) {
            setPhotos(res);
        }
    }

    const contextData = {
        photos,
        setPhotos,
        fetchPhotos,
        selectedImages, setSelectedImages,token,
        progressList, setProgressList
    }

    return (
        <PhotoContext.Provider value={contextData}>
            {children}
        </PhotoContext.Provider>
    )
}
