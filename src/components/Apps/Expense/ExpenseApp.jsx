import React, { useContext, useEffect, useState } from 'react'
import AddExpenseUI from './AddExpenseUI'
import ExpenseRender from './ExpenseRender';
import AuthContext from '../../../global/AuthContext';
import GetExpenseList from '../../../http/Expense';

export default function ExpenseApp() {
    const [expenses, setExpenses] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetch=async ()=>{
            const list=await GetExpenseList(token);
            setExpenses(list);
        }
        if(expenses.length===0){
            fetch();
        }
    }, [token,expenses])
    
    return (
        <div style={{ backgroundColor: "#403d39", height: "100vh", color: "wheat" }}>
            <ExpenseRender expenses={expenses}/>
            <AddExpenseUI setExpenses={setExpenses} token={token}/>
        </div>
    )
}

