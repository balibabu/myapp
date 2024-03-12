import React from 'react'
import Progress from '../../../Shared/Progress'
import { averageProgress } from '../../Photo/utility/progressHandler'

export default function Multiprogress({ progressList }) {
    const av = averageProgress(progressList).toFixed(0);
    return (
        <>
            {av > 0 &&
                <div className='my-2 mx-3'>
                    <div className='mb-1'><Progress {...{ title: 'Uploading File', progress: av, height: '1.5rem' }} /></div>
                    <div className='row m-0 '>
                        {progressList.map((progress, index) => {
                            return <div className='col ps-0 pe-0' key={index}><Progress {...{ progress, css: 'rounded-0 text-primary', height: '.3rem' }} /></div>
                        })}
                    </div>
                </div>
            }
        </>
    )
}
