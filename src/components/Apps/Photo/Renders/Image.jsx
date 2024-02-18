import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Image(props) {
    const { photo, photos } = props;
    const navigate = useNavigate();

    const changePhoto = (index) => {
        if (index > -1 && index < photos.length) {
            navigate(`/photo/${photos[index].id}/`, { replace: true });
        } else {
            alert('this is end');
        }
    }

    const nextHandler = () => {
        const nextIndex = photos.indexOf(photo) + 1;
        changePhoto(nextIndex)
    }
    const prevHandler = () => {
        const prevIndex = photos.indexOf(photo) - 1;
        changePhoto(prevIndex)
    }
    return (
        <>
            <div className='position-relative'>
                <div className='position-absolute bg-secondary col-1 navigation-bar' style={{ height: '100%' }} onClick={prevHandler}></div>
                <img src={photo.url} className='col-12' />
                <div className='position-absolute bg-secondary end-0 top-0 col-1 navigation-bar' style={{ height: '100%' }} onClick={nextHandler}></div>
            </div>
        </>
    )
}
