import React, { useContext, useEffect, useState } from 'react'
import ImgCard from './ImgCard';
import AuthContext from '../../Contexts/AuthContext';
import PhotoContext from '../../Contexts/PhotoContext';

export default function ThumbRend({ photos }) {
    const { helpedServer, ping } = useContext(PhotoContext);
    const [, setInitialFetch] = useState(false);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev && !helpedServer) {
                ping();
            }
            return true;
        });

    }, [])

    return (
        <div className='row m-0 pt-2 px-1'>
            {helpedServer &&
                photos.map((photo) => {
                    return <ImgCard {...{ photo }} key={photo.id} />
                })
            }
        </div>
    )
}