import React, { useState } from 'react';
import { getLastXDaysAmountSum } from './lastXdays';
import { sumMoneyBetweenDates } from './calculations/BetweenDates';

const Hidden = ({ expenses }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [day, setDay] = useState(3);
    
    const onDateChangeHandler = (e) => {
        const { id, value } = e.target;
        if (id === 'startDate') {
            setStartDate(new Date(value));
        } else if (id === 'endDate') {
            setEndDate(new Date(value));
        }
    };

    return (
        <div>
            <hr />
            <div className='mb-2'>Last <input style={inputStyle} type='text' value={day} onChange={(e) => setDay(e.target.value)} /> days : Rs {getLastXDaysAmountSum(expenses, day)}</div>
            <div>Total Money Spent: Rs {expenses.reduce((total, expense) => total + parseInt(expense.amount), 0)}</div>
            <table className='table table-dark mt-2'>
                <thead>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Sum</th>
                        <th>Per day</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="date" id="startDate" value={startDate.toISOString().split('T')[0]} onChange={onDateChangeHandler} />
                        </td>
                        <td>
                            <input type="date" id="endDate" value={endDate.toISOString().split('T')[0]} onChange={onDateChangeHandler} />
                        </td>
                        <td>{sumMoneyBetweenDates(expenses, startDate, endDate)}</td>
                        <td>{(sumMoneyBetweenDates(expenses, startDate, endDate) / ((endDate - startDate) / (24 * 60 * 60 * 1000))).toFixed(4)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Hidden;


const inputStyle = {
    width: '25px',
    background: 'transparent',
    color: 'white',
    textAlign: 'center',
    outline: 'none',
}
