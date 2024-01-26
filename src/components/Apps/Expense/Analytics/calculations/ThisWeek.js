export function sumMoneyForCurrentWeek(items) {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const itemsInCurrentWeek = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
    });
    const sum = itemsInCurrentWeek.reduce((total, item) => total + item.amount, 0);
    return sum;
}
