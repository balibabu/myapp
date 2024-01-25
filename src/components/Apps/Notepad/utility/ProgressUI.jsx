import React, { useEffect, useState } from 'react'

export default function ProgressUI(props) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setProgress(100);
        }, 300);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    return (
        <div style={{ height: '2rem' }}
            className="progress mx-3 mt-3" role="progressbar" aria-label="Animated striped example">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}>{props.title}</div>
        </div>
    )
}
