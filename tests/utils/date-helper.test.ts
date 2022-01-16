import * as dateHelper from '../../src/utils/date-helper';

const mockDate = new Date('06/09/2022');
const mockSundayOfWeek = new Date('06/05/2022');

describe('getFirstDayOfWeek', () => {
    it('should return the Sunday of the current week at midnight', () => {
        let actualFirstDayOfWeek: Date;
        
        actualFirstDayOfWeek = dateHelper.getFirstDayOfWeek(mockDate);
        
        expect(actualFirstDayOfWeek).toEqual(mockSundayOfWeek);
    });
});
