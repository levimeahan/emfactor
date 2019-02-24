import moment from 'moment';

/**
 *
 * @param {number} timestamp time in seconds
 */
export default function getWeekName(timestamp: number) {
    let startDate = moment(timestamp);
    let endDate = moment(startDate).add(6, 'days');

    const format = 'dddd, MMM D, YYYY';

    return `${startDate.format(format)} - ${endDate.format(format)}`;
}