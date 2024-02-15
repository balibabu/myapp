import React from 'react'
import ImgCard from './ImgCard';

export default function ThumbRend({ photos }) {
    return (
        <div className='row m-0 pt-2 px-1'>
            {photos.map((photo) => {
                return <ImgCard {...{ photo }} key={photo.id} />
            })}
        </div>
    )
}