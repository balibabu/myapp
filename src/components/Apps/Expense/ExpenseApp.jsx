import React, { useContext, useEffect, useState } from 'react'
import AddExpenseUI from './AddExpenseUI'
import ExpenseRender from './ExpenseRender';
import Analytics from './Analytics/Analytics';
import { onCreate } from './ExpenseCRUD';
import Fetching from '../../Shared/Fetching';
import AuthContext from '../../Contexts/AuthContext';
import ExpenseContext from '../../Contexts/ExpenseContext';

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

