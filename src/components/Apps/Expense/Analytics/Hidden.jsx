import React, { useState } from 'react'
import { getLastXDaysAmountSum } from './lastXdays'

const f = getLastXDaysAmountSum;
export default function Hidden({ expenses }) {
    const [day, setDay] = useState(3);
    return (
        <div>
            <div>Total Money Spent : Rs {expenses.reduce((total, expense) => total + parseInt(expense.amount), 0)}</div>
            <hr />
            <table className='table table-dark'>
                <thead>
                    <tr><th>Action</th><th>Week</th><th>Month</th><th>Year</th><th>Last<input style={inputStyle} type='text' value={day} onChange={(e) => setDay(e.target.value)} /></th></tr>
                </thead>
                <tbody>
                    <tr><td>Sum</td><td>{f(expenses, 7)}</td><td>{f(expenses, 30)}</td><td>{f(expenses, 365)}</td><td>{(f(expenses, day)).toFixed(1)}</td></tr>
                    <tr><td>per day</td><td>{(f(expenses, 7) / 7).toFixed(1)}</td><td>{(f(expenses, 30) / 30).toFixed(1)}</td><td>{(f(expenses, 365) / 365).toFixed(1)}</td><td>{(f(expenses, day) / day).toFixed(1)}</td></tr>
                </tbody>
            </table>
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
