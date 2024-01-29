import React from 'react'
import ProgressUI from './ProgressUI'

export default function Fetching({ status, title }) {
    return (
        <>
            {status === undefined && <ProgressUI title={`Fetching ${title} please wait`} />}
            {status && status.length === 0 &&
                <div className='fs-3 bg-info text-center'>
                    No {title} available
                </div>
            }
        </>
    )
}
