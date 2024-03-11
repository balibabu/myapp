import React, { useContext, useEffect, useState } from 'react'
import ThumbRend from './ThumbRender/ThumbRend';
import PhotoContext from '../../Contexts/PhotoContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ShowImage from './ShowImage/ShowImage';
import './photo.css'
import Upload from './Upload/Upload';
import AuthContext from '../../Contexts/AuthContext';

export default function Photo() {
    const { loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const { photos, fetchPhotos, selectedImages, setSelectedImages } = useContext(PhotoContext);
    const navigate = useNavigate();

    useEffect(() => {
        setInitialFetch((prev) => {
            if (loggedIn && !prev && photos.length === 0) {
                fetchPhotos();
            }
            return true;
        })
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        if (selectedImages.length > 0) { return; }

        const imageFiles = [];
        const files = [...event.dataTransfer.files];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                imageFiles.push(file);
            }
        }

        if (imageFiles.length > 0) {
            setSelectedImages(imageFiles)
            navigate('/photo/upload/')
        }
    };

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} style={{ minHeight: '100dvh' }}>
            <Routes>
                <Route path="/" element={<ThumbRend {...{ photos }} />} />
                <Route path=":id/" element={<ShowImage {...{ photos }} />} />
                <Route path="upload/" element={<Upload />} />
            </Routes>
        </div>
    )
}
