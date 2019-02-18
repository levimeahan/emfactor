/**
 *
 * @param {number} timestamp time in seconds
 */
export default function getWeekName(timestamp: number) {
    let startDate = new Date(timestamp);
    let endDate = new Date(timestamp + (6 * 86400000));

    let formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}