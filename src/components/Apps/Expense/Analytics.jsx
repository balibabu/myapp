import React, { useState } from 'react'
import { getLastXDaysAmountSum } from './Analytics/lastXdays';
import Hidden from './Analytics/Hidden';

let counter = 0;
export default function Analytics({ expenses }) {
    const [hidden, ] = useState(localStorage.getItem('hidden') ? true : false);
    const [collapsed, setCollapsed] = useState(true);
    const [day, setDay] = useState(3);
    const last7daysAmount = getLastXDaysAmountSum(expenses, 7);

    const collapseHandler = () => {
        setCollapsed(!collapsed)
        if (counter > 10) {
            localStorage.setItem('hidden', true);
        }
        counter += 1;
    }
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div className='ps-2 fs-3'>Analytics</div>
                <div style={{ width: '15px' }} onClick={collapseHandler}>{collapsed ? <Expand /> : <Collapse />}</div>
            </div>
            {!collapsed && <div className='px-5 pt-2' style={{ fontSize: '14px' }}>
                <div className='mb-2'>Today : Rs {getLastXDaysAmountSum(expenses, 1)}</div>
                <div className='mb-2'>Last Week : Rs {last7daysAmount}</div>
                <div className='mb-2'>Last Month : Rs {getLastXDaysAmountSum(expenses, 30)}</div>
                <div className='mb-2'>Last <input style={inputStyle} type='text' value={day} onChange={(e) => setDay(e.target.value)} /> days : Rs {getLastXDaysAmountSum(expenses, day)}</div>
                {hidden && <Hidden expenses={expenses}/>}
            </div>}
        </div>
    )
}

const inputStyle = {
    width: '25px',
    background: 'transparent',
    color: 'white',
    textAlign: 'center',
    outline: 'none',
}



function Collapse() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
        </svg>
    );
}

function Expand() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
    );
}