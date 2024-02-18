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
            <div className='fs-4'>{photo.oname}</div>
            <div className=''>Size {IntelligentSize(photo.size)}</div>
            <div>width: {resolution[0]}</div>
            <div>height: {resolution[1]}</div>
        </div>
    )
}


