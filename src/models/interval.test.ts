import { getEndDate, getStartDate, Interval } from "./interval";

const mockDate = new Date('06/09/2022');

describe('getStartDate', () => {
    [
        { date: mockDate, interval: Interval.Weekly, expectedDate: new Date('06/05/2022') },
        { date: mockDate, interval: Interval.Monthly, expectedDate: new Date('06/01/2022') },
        { date: mockDate, interval: Interval.Yearly, expectedDate: new Date('01/01/2022') },
        { date: mockDate, interval: Interval.All, expectedDate: new Date('01/01/1900') },
    ].forEach((test) => {
        it(`should return ${test.expectedDate} if date given is ${test.date} and interval is ${test.interval}`, () => {
            let actualStartDate = getStartDate(test.date, test.interval);

            expect(actualStartDate).toEqual(test.expectedDate);
        });
    })
});

describe('getEndDate', () => {
    [
        { date: mockDate, interval: Interval.Weekly, expectedDate: new Date('06/11/2022') },
        { date: mockDate, interval: Interval.Monthly, expectedDate: new Date('06/30/2022') },
        { date: mockDate, interval: Interval.Yearly, expectedDate: new Date('12/31/2022') },
        { date: mockDate, interval: Interval.All, expectedDate: new Date('12/31/9999') },
    ].forEach((test) => {
        it(`should return ${test.expectedDate} if date given is ${test.date} and interval is ${test.interval}`, () => {
            test.expectedDate.setHours(23, 59, 59, 999);
            let actualEndDate = getEndDate(test.date, test.interval);

            expect(actualEndDate).toEqual(test.expectedDate);
        });
    });
});
