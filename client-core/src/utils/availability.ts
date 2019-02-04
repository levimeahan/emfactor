
export const validateHours = (hours: string) => {
    if(typeof hours !== 'string') {
        throw new Error("Invalid hours provided to AvailableHours::set - Must be string!");
    }
    if(hours.length !== 24) {
        throw new Error("Invalid hours provided to AvailableHours::set - Must be 24 character string!");
    }
    if(!hours.match(/^[0,1]+$/)) {
        throw new Error("Invalid hour data provided to AvailableHours - Must be only 0s or 1s!");
    }

    return true;
};

export const hasRange = (hours: string, startTime: number, endTime: number) => {
    if(startTime < 0 || endTime < 0) {
        throw new Error("Invalid range - Start and End must be positive!");
    }
    if(startTime > endTime) {
        throw new Error("Invalid range - Start must be less than end!");
    }

    let length = endTime - startTime;

    return hours.substr(startTime, length) === '1'.repeat(length);
};