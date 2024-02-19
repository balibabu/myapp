import React from 'react'

export default function ProgressButton({ titles = ['', '', ''], progress, clickHandler, height = '50px', bg = 'success', css = '' }) {
    if (isNaN(progress) || progress === Infinity) { progress = 0 }
    let title = '';
    if (progress === 0) {
        title = titles[0]
    } else if (progress < 100) {
        title = titles[1];
    } else {
        title = titles[2];
    }
    return (
        <div className={"progress position-relative " + css} style={{ height, cursor: 'pointer' }} onClick={progress === 0 ? clickHandler : () => { }}>
            {progress!==0 && progress<100 && <div className='position-absolute start-0 ps-1'>{progress}%</div>}
            <div className={"progress-bar bg-" + bg} style={{ width: `${progress === 0 ? 100 : progress}%` }}></div>
            <div className='position-absolute start-50 top-50 translate-middle text-black fs-2' style={{ whiteSpace: 'nowrap' }}>{title}</div>
        </div>
    );
}
