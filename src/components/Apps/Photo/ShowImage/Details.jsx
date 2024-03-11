import React, { useEffect, useState } from 'react'
import IntelligentSize from '../../Storage/extra/IntelligentSize'
import { getBlobSizeFromURL } from '../utility/CRUD';

export default function Details({ photo }) {
    const [resolution, setResolution] = useState([]);
    useEffect(() => {
        const img = new Image();
        img.src = photo.url;
        img.onload = function () {
            setResolution([this.naturalHeight, this.naturalWidth])
        };
    }, [photo])

    const [size, setSize] = useState(0)
    getBlobSizeFromURL(photo.url).then((value) => setSize(value));

    return (
        <div>
            <div className='fs-4'>{photo.title}</div>
            <div>Size {IntelligentSize(photo.size)}</div>
            <div>width: {photo.width}</div>
            <div>height: {photo.height}</div>

            {size !== photo.size && <div>thumbnail size {IntelligentSize(size)}</div>}
        </div>
    )
}


