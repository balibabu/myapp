import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { getAThumbnail, getPhotos } from '../../../http/Photo';
import AuthContext from '../../Contexts/AuthContext';
import ThumbRend from './ThumbRend';
import PhotoContext from '../../Contexts/PhotoContext';

export default function Photo() {
    const [, setInitialFetch] = useState(false);
    const { photos, setPhotos, fetchPhotos } = useContext(PhotoContext);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev && photos.length === 0) {
                fetchPhotos();
            }
            return true;
        })
    }, []);

    return (
        <div>
            <Header {...{ setPhotos }} />
            <ThumbRend {...{ photos }} />
        </div>
    )
}
