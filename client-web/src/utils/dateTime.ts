import moment from "moment";

const weekFormat = 'dddd, MMM D, YYYY';

/**
 *
 * @param {number} timestamp time in seconds
 */
export const getWeekName = (timestamp: number): string => {
    let startDate = moment(timestamp);
    let endDate = moment(startDate).add(6, 'days');

    return `${startDate.format(weekFormat)} - ${endDate.format(weekFormat)}`;
};

export const formatDate = (timestamp: number): string =>
    moment(timestamp).format(weekFormat);