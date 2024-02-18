import React, { createContext, useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { getPhotos, pingServerAboutThumbnails, uploadImages } from '../../http/Photo';
import { ImageCompressor } from '../Apps/Photo/Compressor';

const PhotoContext = createContext();
export default PhotoContext;
export function PhotoContextProvider({ children }) {
    const [compress, setCompress] = useState(0.8);
    const [photos, setPhotos] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [helpedServer, setHelpedServer] = useState(false);
    const { token } = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const [current, setCurrent] = useState();


    const fetchPhotos = async () => {
        const res = await getPhotos(token);
        if (res) {
            setPhotos(res);
        }
    }

    const setImages = (images) => {
        setSelectedImages([...images]);
        setCurrent();
    }

    const ping = async () => {
        await pingServerAboutThumbnails(token);
        setHelpedServer(true);
    }

    async function upload() {
        for (let i = 0; i < selectedImages.length; i++) {
            setCurrent(i);
            let compressedImage;
            if (compress < 1) {
                compressedImage = await ImageCompressor(selectedImages[i], compress);
            }
            if (compressedImage.size > selectedImages[i].size) {
                compressedImage = selectedImages[i];
            }
            const formData = new FormData();
            formData.append('files', compressedImage, selectedImages[i].name);
            const res = await uploadImages(formData, token, setProgress);
            setPhotos((prev) => [...prev, { ...res[0], url: URL.createObjectURL(compressedImage) }])
        }
        setSelectedImages([]);
    }

    const contextData = {
        photos,
        setPhotos,
        fetchPhotos,
        ping,
        helpedServer,
        setHelpedServer,
        selectedImages, setSelectedImages,
        compress, setCompress, upload,
        current, progress, setProgress, setImages
    }

    return (
        <PhotoContext.Provider value={contextData}>
            {children}
        </PhotoContext.Provider>
    )
}
