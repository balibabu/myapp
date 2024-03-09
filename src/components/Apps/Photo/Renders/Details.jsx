import React, { useEffect, useState } from 'react'
import IntelligentSize from '../../Storage/extra/IntelligentSize'

export default function Details({ photo }) {
    const [resolution, setResolution] = useState([]);
    useEffect(() => {
        const img = new Image();
        img.src = photo.url;
        img.onload = function () {
            setResolution([this.naturalHeight, this.naturalWidth])
        };
    }, [photo])

    return (
        <div>
            <div className='fs-4'>{photo.original.name}</div>
            <div className=''>Size {IntelligentSize(photo.original.size)}</div>
            <div>width: {photo.width}</div>
            <div>height: {photo.height}</div>
            <div className=''>thumbnail size {IntelligentSize(photo.thumbnail.size)}</div>
        </div>
    )
}


