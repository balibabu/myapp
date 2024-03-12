import React from 'react'

export default function Progress({ title, progress=10, height = '1rem', bg='',css='' }) {
    return (
        <div style={{ height }} className={"progress position-relative "+css}>
            <div className='position-absolute start-0 ps-1'>{progress}%</div>
            <div className={"progress-bar progress-bar-striped progress-bar-animated bg-" + bg}
                style={{ width: `${progress}%` }}
            ></div>
            <div className='position-absolute start-50 top-50 translate-middle text-black'>{title}</div>
        </div>
    )
}
