import React from 'react'

export default function Test1({ tabs }) {
    return (
        <div className='d-flex bg-secondary mt-3 overflow-x-scroll'>
            {tabs.map((tab, index) => {
                return (
                    <div key={index}>
                        <input type='radio' name='tabs' id={`tab${index}`} style={{ display: 'none' }} />
                        <label className='px-2' for={`tab${index}`}>{tab}</label>
                    </div>
                );
            })}
        </div>
    )
}
