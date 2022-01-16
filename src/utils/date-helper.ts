async function main() : Promise<void> {
    console.log(getSundayOf(new Date()));
}

main();

function getSundayOf(date: Date): Date {
    let dateAtMidnight = getDateAtMidnight(date);
    console.log(dateAtMidnight.getDay())
    return dateAtMidnight;
}

function endOfWeek(date: Date): Date {
    return date;
}

function getDateAtMidnight(date: Date): Date {
    let dateAtMidnight = setTimeToZero(date);
    return getDateinEST(dateAtMidnight);
}

function getDateinEST(date: Date): Date {
    const estOffset = -5.0;
    return new Date(date.getTime() + (3600000 * estOffset));
}

function setTimeToZero(date: Date): Date {
    date.setHours(0,0,0,0);
    return date;
}

function isBetweenMonth(entryDate: Date): boolean {
    let entryDateTime = new Date(entryDate).getTime();
    
    return entryDateTime >= new Date('01/01/2022').getTime()
    && entryDateTime <= new Date('01/31/2022').getTime();
}

