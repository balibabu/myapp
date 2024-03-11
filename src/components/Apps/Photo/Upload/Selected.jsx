import React, { useEffect, useState } from 'react'
import Progress from '../../../Shared/Progress';
import IntelligentSize from '../../Storage/extra/IntelligentSize';

export default function Selected({ image, progress }) {

    return (
        <div className='bg-secondary mb-1 px-2 py-1 rounded'>
            <div className='d-flex justify-content-between'>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{image.name}</div>
                <div>
                    <div className='text-end' style={{ fontSize: '10px' }}>{IntelligentSize(image.size)}</div>
                    {progress === undefined && <div className='text-end' style={{ color: '#014f16', whiteSpace: 'nowrap', fontSize: '10px' }}>uploaded</div>}
                </div>
            </div>
            {progress > 0 && <div className='col p-0 pb-1'><Progress {...{ progress, title: progress < 100 ? 'uploading' : 'processing' }} /></div>}
        </div>
    )
}
