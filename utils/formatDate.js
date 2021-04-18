const addDateSuffix = dayOfMonth => {
    let dayOfMonthString = dayOfMonth.toString();

    const lastChar = dayOfMonthString.charAt(dayOfMonthString.length - 1);

    if (lastChar === '1' && dayOfMonthString !== '11') return dayOfMonthString = `${dayOfMonthString}st`;
    if (lastChar === '2' && dayOfMonthString !== '12') return dayOfMonthString = `${dayOfMonthString}nd`;
    if (lastChar === '3' && dayOfMonthString !== '13') return dayOfMonthString = `${dayOfMonthString}rd`;
    
    return dayOfMonthString = `${dayOfMonthString}th`;
}

module.exports = (timestamp) => {

    let monthsObj = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    const dateObj = new Date(timestamp);

    const month = monthsObj[dateObj.getMonth()];
    const dayOfMonth = addDateSuffix(dateObj.getDate());
    const year = dateObj.getFullYear();
    
    let hour;
    if (dateObj.getHours() > 12) hour = Math.floor(dateObj.getHours() - 12);
    else hour = dateObj.getHours();
    if (hour === 0) hour = 12;

    const minutes = dateObj.getMinutes();
    
    let meridiem;
    if (dateObj.getHours() >= 12) meridiem = 'pm';
    else meridiem = 'am';

    return `${month} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${meridiem}`;
}