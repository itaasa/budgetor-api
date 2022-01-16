import * as dateHelper from './date-helper';

const mockDate = new Date('06/09/2022');

describe('getFirstDayOfWeek', () => {
    it('should return the Sunday of the week at midnight', () => {
        const expectedSundayOfWeek = new Date('06/05/2022');
        let actualFirstDayOfWeek: Date;
        
        actualFirstDayOfWeek = dateHelper.getFirstDayOfWeek(mockDate);
        
        expect(actualFirstDayOfWeek).toEqual(expectedSundayOfWeek);
    });
});

describe('getLastDayOfWeek', () => {
    it('should return the Saturday of the week at end of day', () => {
        const expectedSaturdayOfWeek = new Date(2022, 5, 11, 23, 59, 59, 999);
        let actualLastDayOfWeek: Date;

        actualLastDayOfWeek = dateHelper.getLastDayOfWeek(mockDate);

        expect(actualLastDayOfWeek).toEqual(expectedSaturdayOfWeek);
    });
});

describe('getFirstDayOfMonth', () => {
    it('should return the first day of the month at midnight', () => {
        const expectedFirstDayOfMonth = new Date(2022, 5, 1, 0, 0, 0, 0);
        let actualFirstDayOfMonth: Date;

        actualFirstDayOfMonth = dateHelper.getFirstDayOfMonth(mockDate);

        expect(actualFirstDayOfMonth).toEqual(expectedFirstDayOfMonth);
    });
});

describe('getLastDayOfMonth', () => {
    it('should return the last day of the month at end of day', () => {
        const expectedLastDayOfMonth = new Date(2022, 5, 30, 23, 59, 59, 999);
        let actualLastDayOfMonth: Date;

        actualLastDayOfMonth = dateHelper.getLastDayOfMonth(mockDate);

        expect(actualLastDayOfMonth).toEqual(expectedLastDayOfMonth);
    });
});

describe('getFirstDayOfYear', () => {
    it('should return first day of the year a midnight', () => {
        const expectedFirstDayOfYear = new Date(2022, 0, 1, 0, 0, 0, 0);
        let actualFirstDayOfYear: Date;

        actualFirstDayOfYear = dateHelper.getFirstDayOfYear(mockDate);

        expect(expectedFirstDayOfYear).toEqual(actualFirstDayOfYear);
    });
});

describe('getLastDayOfYear', () => {
    it('should return the last of the year at end of day', () => {
        const expectedLastDayOfYear = new Date(2022, 11, 31, 23, 59, 59, 999);
        let actualLastDayOfYear: Date;

        actualLastDayOfYear = dateHelper.getLastDayOfYear(mockDate);

        expect(expectedLastDayOfYear).toEqual(actualLastDayOfYear);
    });
});
