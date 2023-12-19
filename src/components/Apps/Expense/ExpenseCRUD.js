import { AddExpense } from "../../../http/Expense";

export const onCreate = async (newExpense,token,setAppData) => {
    const expense = await AddExpense(token, newExpense);
    if (expense) {
        setAppData((prev)=>{
            const newData=[expense,...prev.expenseData]
            return {...prev,expenseData:newData}
        })
    } else {
        alert('something went wrong');
    }
}