import { AddExpense } from "../../../http/Expense";

export const onCreate = async (newExpense,token,setExpenses) => {
    const expense = await AddExpense(token, newExpense);
    if (expense) {
        setExpenses((prev)=>[newExpense,...prev])
    } else {
        alert('something went wrong');
    }
}