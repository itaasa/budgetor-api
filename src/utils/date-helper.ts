export function getFirstDayOfWeek(date: Date): Date {
    let newDate = new Date(date);
    let dayOfTheWeek = date.getDay();
    
    newDate.setDate(newDate.getDate() - dayOfTheWeek);

    newDate.setHours(0,0,0,0);

    return newDate;
}

export function getLastDayOfWeek(date: Date): Date {
    let newDate = new Date(date);
    let dayOfTheWeek = date.getDay();
    let offsetDays = 6 - (dayOfTheWeek % 7);

    newDate.setDate(newDate.getDate() + offsetDays);

    newDate.setHours(23 , 59, 59, 999);

    return newDate;
}

export function getFirstDayOfMonth(date: Date): Date {
    let newDate = new Date(date);
    let dayOfTheMonth = date.getDate();
    
    newDate.setDate(newDate.getDate() - (dayOfTheMonth - 1));
    
    newDate.setHours(0,0,0,0);

    return newDate;
}

export function getLastDayOfMonth(date: Date): Date {
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let lastDayOfMonth = new Date(year, month, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);

    return lastDayOfMonth;
}

export function getFirstDayOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 1);
}

export function getLastDayOfYear(date: Date): Date {
    let december31st = new Date(date.getFullYear(), 11, 31);

    december31st.setHours(23, 59, 59, 999);
    
    return december31st;
}
