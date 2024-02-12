import React from 'react'

export default function ProgressUI({ progress=0 }) {
    return (
        <div className="progress mx-3 mt-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}>{`${progress}%`}</div>
        </div>
    )
}