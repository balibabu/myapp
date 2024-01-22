export function getLastXDaysAmountSum(expenses, x) {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date x days ago
    const xDaysAgo = new Date(currentDate);
    xDaysAgo.setDate(currentDate.getDate() - x);

    // Filter expenses for the last x days
    const lastXDaysExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= xDaysAgo && expenseDate <= currentDate;
    });

    // Calculate the sum of amounts for the last x days
    const totalAmount = lastXDaysExpenses.reduce((total, expense) => total + expense.amount, 0);

    return totalAmount;
}