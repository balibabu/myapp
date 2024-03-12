import React from 'react'
import Progress from '../../../Shared/Progress'
import { averageProgress } from '../../Photo/utility/progressHandler'

export default function Multiprogress({ progressList }) {
    const av = averageProgress(progressList).toFixed(0);
    return (
        <>
            {av > 0 &&
                <div className='my-2 mx-3 position-relative rounded-3 overflow-hidden'>
                    <div className='mb-1'><Progress {...{ title: 'Uploading File', progress: av, height: '1.5rem', css: 'rounded-0' }} /></div>
                    <div className='row m-0' style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                        {progressList.map((progress, index) => {
                            return <div className='col ps-0 pe-0' key={index}><Progress {...{ progress, css: 'rounded-0 text-info', height: '0.3rem',bg:'info' }} /></div>
                        })}
                    </div>
                    {/* <div className='row m-0' style={{ position: 'absolute', top: '1rem' }}>bali</div> */}
                </div>
            }
        </>
    )
}
