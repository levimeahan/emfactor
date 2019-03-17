import moment from "moment";

const weekLongFormat = 'dddd, MMMM D, YYYY';
const weekShortFormat = 'ddd, MMM D, YYYY';

/**
 *
 * @param {number} timestamp time in seconds
 */
export const getWeekName = (timestamp: number): string => {
    let startDate = moment(timestamp);
    let endDate = moment(startDate).add(6, 'days');

    return `${startDate.format(weekLongFormat)} - ${endDate.format(weekLongFormat)}`;
};

export const formatDate = (timestamp: number, format: 'long'|'short' = 'short'): string =>
    moment(timestamp).format(format === 'long' ? weekLongFormat : weekShortFormat);