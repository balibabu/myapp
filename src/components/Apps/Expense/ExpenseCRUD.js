import { AddExpense } from "../../../http/Expense";

export const onCreate = async (newExpense,token,setExpenses) => {
    const expense = await AddExpense(token, newExpense);
    if (expense) {
        console.log(expense);
        setExpenses((oldExpenses) => [expense, ...oldExpenses]);
    } else {
        alert('something went wrong');
    }
}