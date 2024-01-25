import React, { useState } from 'react'
import { getLastXDaysAmountSum } from './lastXdays';
import Hidden from './Hidden';

let counter = 0;
export default function Analytics({ expenses }) {
    const [hidden,] = useState(localStorage.getItem('hidden') ? true : false);
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
        <div style={{ overflowY: "auto" }}>
            <div className='ps-2 fs-3' style={{ cursor: "pointer" }} onClick={collapseHandler}>Analytics</div>
            {!collapsed && <div className='px-5 pt-2' style={{ fontSize: '14px' }}>
                <div className='mb-2'>Today : Rs {getLastXDaysAmountSum(expenses, 1)}</div>
                <div className='mb-2'>Last Week : Rs {last7daysAmount}</div>
                <div className='mb-2'>Last Month : Rs {getLastXDaysAmountSum(expenses, 30)}</div>
                <div className='mb-2'>Last <input style={inputStyle} type='text' value={day} onChange={(e) => setDay(e.target.value)} /> days : Rs {getLastXDaysAmountSum(expenses, day)}</div>
                {hidden && <Hidden expenses={expenses} />}
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