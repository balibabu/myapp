import React, { useContext, useEffect, useState } from 'react'
import ImgCard from './ImgCard';
import PhotoContext from '../../Contexts/PhotoContext';
import ProgressUI from '../../Shared/ProgressUI';

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
            {helpedServer ?
                photos.map((photo) => {
                    return <ImgCard {...{ photo }} key={photo.id} />
                })
                :
                <>
                    <div className='bg-secondary px-3'>
                        <h1>Only first time, the loading takes time</h1>
                        <h4>Please wait while your files are being ready</h4>
                    </div>
                    <div>
                        <ProgressUI title='processing your files' />
                    </div>
                </>
            }
        </div>
    )
}