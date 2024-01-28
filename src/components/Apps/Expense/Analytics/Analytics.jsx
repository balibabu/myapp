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
                <table>
                    <tbody>
                        <tr><td>Today </td><td>: Rs {getLastXDaysAmountSum(expenses, 1)}</td></tr>
                        <tr><td>This Week </td><td>: Rs {sumMoneyForCurrentWeek(expenses)}</td></tr>
                        <tr><td>This Month </td><td>: Rs {sumMoneyForCurrentMonth(expenses)}</td></tr>
                    </tbody>
                </table>
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
