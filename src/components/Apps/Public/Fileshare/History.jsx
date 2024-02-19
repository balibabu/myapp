import React from 'react'

export default function History({ history, setHistory }) {
    return (
        <div className='bg-secondary position-fixed bottom-0 end-0 p-2 rounded-start-4'>
            <div>
                <div className='row m-0'>
                    <div className='fs-4 col p-0'>History</div>
                    <button class="col btn-outline-danger btn text-black p-0 ms-2 px-2" onClick={() => clearHistory(setHistory)}>x</button>
                </div>
                {history && history.split(';').slice(1).map((hist, index) => {
                    const [file, code] = hist.split('-');
                    return <div className='' key={index}>{file} - {code}</div>
                })}
            </div>
        </div>
    )
}

function clearHistory(setHistory) {
    localStorage.setItem('shared', '')
    setHistory('');
}