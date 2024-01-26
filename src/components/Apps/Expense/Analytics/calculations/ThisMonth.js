export function sumMoneyForCurrentMonth(items) {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const itemsInCurrentMonth = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
    });
    const sum = itemsInCurrentMonth.reduce((total, item) => total + item.amount, 0);

    return sum;
}
