import React, { useContext, useEffect, useState } from 'react'
import ThumbRend from './ThumbRend';
import PhotoContext from '../../Contexts/PhotoContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ImgDetailWin from './Renders/ImgDetailWin';
import './photo.css'
import Upload from './Upload/Upload';
import AuthContext from '../../Contexts/AuthContext';

export default function Photo() {
    const { loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const { photos, fetchPhotos, selectedImages, setImages } = useContext(PhotoContext);
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
        setImages(event.dataTransfer.files)
        navigate('/photo/upload/')
    };

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            <Routes>
                <Route path="/" element={<ThumbRend {...{ photos }} />} />
                <Route path=":id/" element={<ImgDetailWin {...{ photos }} />} />
                <Route path="upload/" element={<Upload />} />
            </Routes>
        </div>
    )
}
