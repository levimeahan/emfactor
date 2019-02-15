
// App days start at 1 = Monday, Date.prototype.getDay() starts at 0 = Sunday
const getDay = (timestamp = null) => {
    if(timestamp === null) {
        timestamp = Date.now();
    }

    let date = new Date(timestamp);

    return date.getDay() === 0 ? 7 : date.getDay();
};

const getDate = (timestamp = null) => {
    if(timestamp === null) {
        timestamp = Date.now();
    }

    let date = new Date(timestamp);

    return date.getDate();
};

export const weekStartTimestamp = () => {
    let currentDate = new Date();

    let day = getDay(currentDate.getTime());
    let date = getDate(currentDate.getTime());

    let startDate = date - (day - 1);


    let weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), startDate);

    return weekStart.getTime();
};