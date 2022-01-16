async function main() : Promise<void> {
}
main();

function startOfWeek(date: Date): Date {
    date = getDateinEST(date);
    console.log(date);
    date = setTimeToZero(date);
    console.log(date);
    date = getDateinEST(date);
    console.log(date);

    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
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

