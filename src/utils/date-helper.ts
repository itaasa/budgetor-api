async function main() : Promise<void> {
    console.log(getSaturdayOfDate(new Date()));
    console.log(getSundayOfDate(new Date()));
}

main();

function getSundayOfDate(date: Date): Date {
    let dayOfTheWeek = date.getDay();
    
    date.setDate(date.getDate() - dayOfTheWeek);

    date.setHours(0,0,0,0);

    return date;
}

function getSaturdayOfDate(date: Date): Date {
    let dayOfTheWeek = date.getDay();

    let offsetDays = 6 - (dayOfTheWeek % 7);

    date.setDate(date.getDate() + offsetDays);

    date.setHours(23, 59, 59, 999);

    return date;
}

function getSundayOfTheMonth(date: Date): Date {

}

function getFirstDayOfMonth(date: Date): Date {
    
}

