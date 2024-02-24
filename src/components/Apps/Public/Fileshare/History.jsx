import React, { useState } from 'react'

export default function History({ history, setHistory }) {
    const [show, setShow] = useState(true);
    return (
        <div className='bg-secondary position-fixed bottom-0 end-0 ps-2' style={{ borderRadius: '15px 0 0 0',cursor:'pointer' }}>
            {show? <div>
                <div className='row m-0'>
                    <div className='fs-4 col p-0' onClick={()=>setShow(false)}>History</div>
                    <button className="col btn-outline-danger btn text-black p-0 ms-2 px-2" onClick={() => clearHistory(setHistory)}>x</button>
                </div>
                {history && history.split(';').slice(1).map((hist, index) => {
                    const [file, code] = hist.split('-');
                    return <div className='' key={index}>{code} - [{file}]</div>
                })}
            </div>:<div onClick={()=>setShow(true)}>show</div>}
        </div>
    )
}

function clearHistory(setHistory) {
    localStorage.setItem('shared', '')
    setHistory('');
}
