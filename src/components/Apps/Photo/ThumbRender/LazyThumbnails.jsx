import React, { useContext, useEffect, useRef, useState } from 'react'
import PhotoContext from '../../../Contexts/PhotoContext';
import AuthContext from '../../../Contexts/AuthContext';
import { getAThumbnail } from '../../../../http/Photo';
import ComponentObserver from '../../../Shared/ComponentObserver';
import { useNavigate } from 'react-router-dom';
import Image from '../../../../images/Image';
import { fetchNsetThumbUrl } from '../utility/CRUD';

export default function LazyThumbnails({ photo }) {
    const [, setInitialFetch] = useState(false);
    const { token } = useContext(AuthContext);
    const { setPhotos } = useContext(PhotoContext);
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

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
        <div>
            <div onClick={() => navigate(`/photo/${photo.id}/`)} ref={sectionRef}>
                {photo.url ? <img src={photo.url} alt={photo.title} className='col-12' /> : <div><Image /></div>}
            </div>
            <ComponentObserver {...{ sectionRef, setVisible }} />
        </div>
    );
}