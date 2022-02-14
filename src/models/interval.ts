import { getFirstDayOfMonth, getFirstDayOfWeek, getFirstDayOfYear, getLastDayOfMonth, getLastDayOfWeek, getLastDayOfYear } from "../utils/date-helper";

export enum Interval {
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly',
    All = 'All',
}

export function getStartDate(date: Date, interval: Interval) : Date {
    if (interval === Interval.Weekly) {
        return getFirstDayOfWeek(date);
    }

    if (interval === Interval.Monthly) {
        return getFirstDayOfMonth(date);
    }

    if (interval === Interval.Yearly) {
        return getFirstDayOfYear(date);
    }

    return new Date('01/01/1900');
};

export function getEndDate(date: Date, interval: Interval) : Date {
    if (interval === Interval.Weekly) {
        return getLastDayOfWeek(date);
    }

    if (interval === Interval.Monthly) {
        return getLastDayOfMonth(date);
    }

    if (interval === Interval.Yearly) {
        return getLastDayOfYear(date);
    }

    let endOfTime = new Date('12/31/9999')
    endOfTime.setHours(23, 59, 59, 999);
    return endOfTime;
}

export function convertWeeklyTotalMaxToInterval(interval: Interval, weeklyTotalMax: number) : number{
    if (interval === Interval.Monthly) {
        return weeklyTotalMax * 4;
    }

    if (interval === Interval.Yearly) {
        return weeklyTotalMax * 48;
    }

    return weeklyTotalMax;
};
