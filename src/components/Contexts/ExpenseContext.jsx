import { createContext, useContext, useState } from "react";
import GetExpenseList from "../../http/Expense";
import AuthContext from "./AuthContext";

const ExpenseContext = createContext();
export default ExpenseContext;

export function ExpenseContextProvider({ children }) {
    const [expenses, setExpenses] = useState();
	const { token } = useContext(AuthContext);
    
    const fetchExpenses = async () => {
        const list = await GetExpenseList(token);
        setExpenses(list);
    }
    const contextData = {
        expenses,
        setExpenses,
        fetchExpenses,
    }
    return (
        <ExpenseContext.Provider value={contextData}>
            {children}
        </ExpenseContext.Provider>
    );
}