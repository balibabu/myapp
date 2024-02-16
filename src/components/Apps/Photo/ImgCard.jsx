import React, { useContext, useEffect, useRef, useState } from 'react'
import PhotoContext from '../../Contexts/PhotoContext';
import AuthContext from '../../Contexts/AuthContext';
import { getAThumbnail } from '../../../http/Photo';
import Preview from './Preview';
import ComponentObserver from '../../Shared/ComponentObserver';

export default function ImgCard({ photo }) {
    const [, setInitialFetch] = useState(false);
    const { token } = useContext(AuthContext);
    const { setPhotos } = useContext(PhotoContext);
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setInitialFetch((prev) => {
                if (!prev) {
                    if (!photo.url) {
                        fetchNsetThumbUrl(photo, setPhotos, token);
                    }
                }
                return true;
            });
        }
    }, [visible])

    return (
        <div className='col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 p-0 text-center'>
            <Preview {...{ photo, token, setPhotos, sectionRef }} />
            <ComponentObserver {...{ sectionRef, setVisible }} />
        </div>
    );
}

async function fetchNsetThumbUrl(photo, setPhotos, token) {
    const data = await getAThumbnail(token, photo.uname);
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob);
    setPhotos((prev) => prev.map((ph) => ph.id === photo.id ? { ...ph, url } : ph));
}