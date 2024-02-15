import React, { useContext, useEffect, useState } from 'react'
import PhotoContext from '../../Contexts/PhotoContext';
import AuthContext from '../../Contexts/AuthContext';
import { getAThumbnail } from '../../../http/Photo';
import Preview from './Preview';

export default function ImgCard({ photo }) {
    const [, setInitialFetch] = useState(false);
    const { token } = useContext(AuthContext);
    const { setPhotos } = useContext(PhotoContext);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev) {
                if (!photo.url) {
                    setFetchNsetThumbUrl(photo, setPhotos, token);
                }
            }
            return true;
        });
    }, [])

    return (
        <>
            <Preview {...{ photo,token,setPhotos }} />
        </>
    );
}

async function setFetchNsetThumbUrl(photo, setPhotos, token) {
    const data = await getAThumbnail(token, photo.uname);
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url } : ph));
}