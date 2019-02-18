
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

export const currentWeekStartTime = (): number => {
    const currentDate: Date = new Date();

    let day = getWeekdayNum(currentDate.getTime());
    let date = getDate(currentDate.getTime());

    let startDate = date - (day - 1);

    let weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), startDate);

    return weekStart.getTime();
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