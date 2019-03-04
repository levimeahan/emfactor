// Note: This file only exports utils that we expose to client-core consumers.
import { hasRange, validateHours } from './availability';
import { fullName } from './employee';
import { testRoleRecursive } from './roles';
import { formatDate, formatMonth, formatWeekday, getWeekStartTime } from './time';

/* getNextCollectionId is excluded because it's exclusive to creating new entity items and consumers should
 not be doing that directly */

export {
    validateHours,
    hasRange,

    testRoleRecursive,

    fullName,

    getWeekStartTime,
    formatWeekday,
    formatMonth,
    formatDate,
}