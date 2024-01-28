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
            <table>
                <tbody>
                    <tr><td><label htmlFor='startDate'>From</label></td><td><input type="date" id="startDate" value={startDate.toISOString().split('T')[0]} onChange={onDateChangeHandler} className='form-control p-0 px-1 mx-2 mt-1 bg-secondary' style={{ cursor: 'pointer' }} /></td></tr>
                    <tr><td><label htmlFor='endDate'>To</label></td><td><input type="date" id="endDate" value={endDate.toISOString().split('T')[0]} onChange={onDateChangeHandler} className='form-control p-0 px-1 mx-2 m-1 bg-secondary' style={{ cursor: 'pointer' }} /></td></tr>
                </tbody>
            </table>
            <div>Total sum: {sumMoneyBetweenDates(expenses, startDate, endDate)}</div>
            <div>Spent per day: {(sumMoneyBetweenDates(expenses, startDate, endDate) / ((endDate - startDate) / (24 * 60 * 60 * 1000))).toFixed(0)}</div>
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
