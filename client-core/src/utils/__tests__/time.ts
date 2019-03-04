import { getWeekStartTime } from '../time';

const monJan22017 = 1483315200000;
const wedJan42017 = 1483488000000;

describe('getWeekStartTime', () => {
    it('gets start time for passed timestamp correctly', () => {
        expect(getWeekStartTime(wedJan42017)).toBe(monJan22017);
    });


});