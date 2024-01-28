export function sumMoneyForCurrentWeek(items) {
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

    const itemsInCurrentWeek = items.filter(item => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0); // Set time to midnight

        const sd = new Date(startOfWeek);
        sd.setHours(0, 0, 0, 0);
        const ed = new Date(endOfWeek);
        ed.setHours(0, 0, 0, 0);

        return compareDates(sd,itemDate)>=0 && compareDates(itemDate,ed)>=0;
    });
    const sum = itemsInCurrentWeek.reduce((total, item) => total + item.amount, 0);
    return sum;
}

function compareDates(date1, date2) {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    if (time1 < time2) {
        return 1;
    } else if (time1 > time2) {
        return -1;
    } else {
        return 0;
    }
}

function getStartAndEndOfWeek() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

    // Calculate the start of the week (Sunday) by subtracting the current day of the week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);

    // Calculate the end of the week (Saturday) by adding the remaining days
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDayOfWeek));

    // Format the dates
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedStartOfWeek = startOfWeek.toLocaleDateString(undefined, dateOptions);
    const formattedEndOfWeek = endOfWeek.toLocaleDateString(undefined, dateOptions);

    return { startOfWeek: formattedStartOfWeek, endOfWeek: formattedEndOfWeek };
}