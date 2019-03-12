import { getWeekStartTime } from '../time';
import moment from 'moment';

const monJan22017 = moment([2017, 0, 2]).valueOf();
const wedJan42017 = moment([2017, 0, 4]).valueOf();

describe('getWeekStartTime', () => {
    it('gets start time for passed timestamp correctly', () => {
        expect(getWeekStartTime(wedJan42017)).toBe(monJan22017);
    });


});