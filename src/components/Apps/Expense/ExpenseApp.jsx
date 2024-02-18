import React, { useContext, useEffect, useState } from 'react'
import AddExpenseUI from './AddExpenseUI'
import ExpenseRender from './ExpenseRender';
import Analytics from './Analytics/Analytics';
import { onCreate } from './ExpenseCRUD';
import Fetching from '../../Shared/Fetching';
import AuthContext from '../../Contexts/AuthContext';
import ExpenseContext from '../../Contexts/ExpenseContext';
import { Navigate } from 'react-router-dom';

export default function ExpenseApp() {
    const { token, loggedIn } = useContext(AuthContext);
    const [, setInitialFetch] = useState(false);
    const { setExpenses, expenses, fetchExpenses } = useContext(ExpenseContext);

    useEffect(() => {
        if (expenses === undefined && loggedIn) {
            setInitialFetch((prev) => {
                if (!prev) {
                    fetchExpenses();
                }
                return true;
            })
        }
        // eslint-disable-next-line
    }, []);

    if (!loggedIn) { return <Navigate to="/login" replace={true} />; }

    return (
        <div style={{ backgroundColor: "#403d39", height: "100dvh", color: "wheat" }}>
            <Fetching status={expenses} title='Expenses'/>
            {expenses && expenses.length > 0 && <div className='row m-0'>
                <div className='col-lg-6 mt-3'>
                    <ExpenseRender expenses={expenses} />
                </div>
                <div className='col-lg-6 mt-3'>
                    <Analytics expenses={expenses} />
                </div>
            </div>}
            <AddExpenseUI add={(newExpense) => onCreate(newExpense, token, setExpenses)} />
        </div>
    )
}

