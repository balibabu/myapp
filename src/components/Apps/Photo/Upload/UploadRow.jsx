import React from 'react'
import IntelligentSize from '../../Storage/extra/IntelligentSize'
import Progress from '../../../Shared/Progress'

export default function UploadRow({ image, current, progress, index }) {
    if (isNaN(progress)) { progress = 0 }
    let bg = 'info'
    let title = 'Processing';
    if (progress === 0) {
        title = 'Compressing';
        bg = 'warning';
    } else if (progress < 100) {
        title = 'Uploading';
        bg = 'success';
    }
    return (
        <div className='bg-secondary mb-1 px-2 py-1 rounded'>
            <div className='d-flex justify-content-between'>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{image.name}</div>
                <div>
                    <div className='text-end' style={{ fontSize: '10px' }}>{IntelligentSize(image.size)}</div>
                    {(index < current) && <div className='text-end' style={{ color: '#014f16', whiteSpace: 'nowrap', fontSize: '10px' }}>uploaded</div>}
                </div>
            </div>
            {current===index && <div className='col p-0 pb-1'><Progress {...{ progress: progress === 0 ? 100 : progress, title, bg }} /></div>}
        </div>
    )
}
// { progress, title: progress === 0 ? 'compressing' : 'uploading', bg: '' }