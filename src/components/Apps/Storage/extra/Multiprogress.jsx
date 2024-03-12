import React from 'react'
import Progress from '../../../Shared/Progress'
import { averageProgress } from '../../Photo/utility/progressHandler'

export default function Multiprogress({ progressList }) {
    const av = averageProgress(progressList);
    return (
        <>
            {av > 0 &&
                <div className='my-2 mx-3'>
                    <div className='text-secondary'><Progress {...{ title: 'Uploading File', progress:av }} /></div>
                    <div className='row m-0 '>
                        {progressList.map((progress, index) => {
                            return <div className='col ps-0 pe-0' key={index}><Progress {...{ title: `chunk-${index + 1}`, progress }} /></div>
                        })}
                    </div>
                </div>
            }
        </>
    )
}
