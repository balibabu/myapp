import React from 'react'
import IntelligentSize from '../../Storage/extra/IntelligentSize'
import Progress from '../../../Shared/Progress'

export default function UploadRow({ image, current, progress }) {
    return (
        <div className='bg-secondary mb-1 px-2 py-1 rounded'>
            <div className='d-flex justify-content-between'>
                <div>{image.name}</div>
                <span >{IntelligentSize(image.size)}</span>
            </div>
            {current && <div className='col p-0 pb-1'><Progress {...progress === 0 ? { progress: 100, title: 'compressing' } : { progress, title: 'uploading', bg: 'success' }} /></div>}
        </div>
    )
}
// { progress, title: progress === 0 ? 'compressing' : 'uploading', bg: '' }