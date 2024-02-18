import React, { useContext, useEffect, useState } from 'react'
import LazyThumbnails from './LazyThumbnails';
import PhotoContext from '../../Contexts/PhotoContext';
import ProgressUI from '../../Shared/ProgressUI';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Header from './Header';

export default function ThumbRend({ photos }) {
    const { setPhotos, helpedServer, ping } = useContext(PhotoContext);
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
        <div className='row m-0'>
            <Header {...{ setPhotos }} />
            {helpedServer ?
                <>
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 4, 900: 5, 1200: 6 }}>
                        <Masonry gutter="5px">
                            {photos.map((photo) => {
                                return <LazyThumbnails {...{ photo }} key={photo.id} />
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </>
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