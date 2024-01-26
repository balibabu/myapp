import React, { useState } from 'react'
import { getLastXDaysAmountSum } from './lastXdays';
import Hidden from './Hidden';
import { sumMoneyForCurrentWeek } from './calculations/ThisWeek';
import { sumMoneyForCurrentMonth } from './calculations/ThisMonth';

let counter = 0;
export default function Analytics({ expenses }) {
    const [hidden,] = useState(localStorage.getItem('hidden') ? true : false);
    const [collapsed, setCollapsed] = useState(true);
    const collapseHandler = () => {
        setCollapsed(!collapsed)
        if (counter > 10) {
            localStorage.setItem('hidden', true);
        }
        counter += 1;
    }
    return (
        <div style={{ overflowY: "auto" }}>
            <div className='ps-2 fs-3' style={{ cursor: "pointer" }} onClick={collapseHandler}>{collapsed ? '+' : '-'} Analytics</div>
            {!collapsed && <div className='px-5 pt-2' style={{ fontSize: '14px' }}>
                <div className='mb-2'>Today : Rs {getLastXDaysAmountSum(expenses, 1)}</div>
                <div className='mb-2'>This Week : Rs {sumMoneyForCurrentWeek(expenses)}</div>
                <div className='mb-2'>This Month : Rs {sumMoneyForCurrentMonth(expenses)}</div>
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
