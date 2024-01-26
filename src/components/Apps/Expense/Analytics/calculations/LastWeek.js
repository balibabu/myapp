export function sumMoneyForLastWeek(items) {
    const currentDate = new Date();
    const startOfLastWeek = new Date(currentDate);
    startOfLastWeek.setDate(currentDate.getDate() - currentDate.getDay() - 6); 
    const endOfLastWeek = new Date(currentDate);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
    const itemsInLastWeek = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfLastWeek && itemDate <= endOfLastWeek;
    });

    const sum = itemsInLastWeek.reduce((total, item) => total + item.price, 0);
    return sum;
}
