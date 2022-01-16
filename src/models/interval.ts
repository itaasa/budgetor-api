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

    return new Date();
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

    return new Date();
}
