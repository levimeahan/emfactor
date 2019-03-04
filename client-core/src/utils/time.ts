import moment from 'moment';

// App days start at 1 = Monday, Date.prototype.getDay() starts at 0 = Sunday
const getWeekdayNum = (timestamp: number = null): number => {
    if(timestamp === null) {
        timestamp = Date.now();
    }

    let date = new Date(timestamp);

    return date.getDay() === 0 ? 7 : date.getDay();
};

const getDate = (timestamp: number = null): number => {
    if(timestamp === null) {
        timestamp = Date.now();
    }

    let date = new Date(timestamp);

    return date.getDate();
};

export const getWeekStartTime = (targetTimestamp: number = Date.now()): number => {
    const targetDate = moment.utc(targetTimestamp);

    targetDate.startOf('isoWeek');

    return targetDate.valueOf();
};

/*** FORMAT ***/


const getFormatter = (options) => (
    new Intl.DateTimeFormat('en-US', { timezone: 'UTC', ...options })
);

export const formatMonth = (timestamp: number, format: 'long'|'short'|'numeric' = 'short') => (
    getFormatter({ month: format }).format(new Date(timestamp))
);

export const formatWeekday = (timestamp: number, format: 'long'|'short'|'numeric' = 'long') => (
    getFormatter({ weekday: format }).format(new Date(timestamp))
);

export const formatDate = (timestamp: number, format: 'long'|'short'|'numeric' = 'numeric') => (
    getFormatter({ day: format }).format(new Date(timestamp))
);