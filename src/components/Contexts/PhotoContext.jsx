import React, { createContext, useContext, useState } from 'react'
import AuthContext from './AuthContext';
import { getPhotos, pingServerAboutThumbnails, uploadImages } from '../../http/Photo';
import { ImageCompressor } from '../Apps/Photo/Compressor';
import { duplicateCheck } from '../Apps/Photo/Upload/duplicateCheck';

const PhotoContext = createContext();
export default PhotoContext;
export function PhotoContextProvider({ children }) {
    const [compress, setCompress] = useState(0.9);
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

    async function upload() {
        if (selectedImages.length === 0) { return }
        let compressedImg;
        for (let i = 0; i < selectedImages.length; i++) {
            const selectedimg = selectedImages[i];
            setCurrent(i);
            if (compress < 1) {
                compressedImg = await ImageCompressor(selectedimg, compress);
                if (compressedImg.size >= selectedimg.size) {
                    compressedImg = selectedimg;
                }
            } else {
                compressedImg = selectedimg;
            }
            if (duplicateCheck(photos, selectedimg)) {
                const formData = new FormData();
                formData.append('file', compressedImg)
                uploadImages(formData, token, setProgress).then((res) => {
                    setPhotos((prev) => [{ ...res, url: URL.createObjectURL(compressedImg) }, ...prev])
                })
            }
        }
        setSelectedImages([]);
    }

    const contextData = {
        photos,
        setPhotos,
        fetchPhotos,
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
