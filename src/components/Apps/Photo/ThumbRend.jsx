import React, { useContext, useEffect, useState } from 'react'
import { getAThumbnail } from '../../../http/Photo';
import AuthContext from '../../Contexts/AuthContext';
import PhotoContext from '../../Contexts/PhotoContext';
import ImgCard from './ImgCard';

export default function ThumbRend({ photos }) {
    return (
        <div className='d-flex flex-wrap mt-3 bg-secondary'>
            {photos.map((photo) => {
                return <ImgCard {...{ photo }} key={photo.id} />
            })}
        </div>
    )
}


function ImageItem({ photo }) {
    const [imgUrl, setImgUrl] = useState('');
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
            {/* <div className='col-6 col-sm-4 col-md-3 col-lg-2'> */}
            <img src={photo.url} alt={photo.oname} style={{ width: '128px', padding:'3px' }} />
            {/* </div> */}
        </>
    );
}

async function setFetchNsetThumbUrl(photo, setPhotos, token) {
    const data = await getAThumbnail(token, photo.uname);
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url } : ph));
}