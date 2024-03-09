import React, { useContext, useEffect, useState } from 'react'
import LazyThumbnails from './LazyThumbnails';
import PhotoContext from '../../Contexts/PhotoContext';
import ProgressUI from '../../Shared/ProgressUI';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Header from './Header';

export default function ThumbRend({ photos }) {

    return (
        <div className='row m-0'>
            <Header />
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 4, 900: 5, 1200: 6 }}>
                <Masonry gutter="5px">
                    {photos.map((photo) => {
                        return <LazyThumbnails {...{ photo }} key={photo.id} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}