export function sumMoneyBetweenDates(items, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const itemsInRange = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
    });
    const sum = itemsInRange.reduce((total, item) => total + item.amount, 0);
    return sum;
}