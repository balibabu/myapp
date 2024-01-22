export function getLast7DaysAmountSum(expenses) {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Filter expenses for the last 7 days
    const last7DaysExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= sevenDaysAgo && expenseDate <= currentDate;
    });
    const totalAmount = last7DaysExpenses.reduce((total, expense) => total + expense.amount, 0);
    return totalAmount;
}