export function getAmountSumBetweenDates(expenses, startDate, endDate) {
    // Convert start and end dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Filter expenses within the date range
    const expensesInRange = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDateObj && expenseDate <= endDateObj;
    });

    // Calculate the sum of amounts within the date range
    const totalAmount = expensesInRange.reduce((total, expense) => total + expense.amount, 0);

    return totalAmount;
}