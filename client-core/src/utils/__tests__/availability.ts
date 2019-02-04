import * as availability from '../availability';

const eightToSixteen = '0'.repeat(8) + '1'.repeat(8) + '0'.repeat(8);
const tooShortHours = '0'.repeat(23);
const invalidChars = '1'.repeat(23) + '2';

/*it('sets value successfully', () => {
    let hours = new AvailableHours(eightToSixteen);
    expect(hours.valueOf()).toMatch(eightToSixteen);
});*/

/*it('rejects values that are too short', () => {
    let errorFound = false;
    try {
        let hours = new AvailableHours(tooShortHours);
    } catch(e) {
        errorFound = true;
    }

    expect(errorFound).toBe(true);
});*/
/*
it('rejects chars that are not 0/1', () => {
    let errorFound = false;
    try {
        let hours = new AvailableHours(invalidChars);
    } catch(e) {
        errorFound = true;
    }

    expect(errorFound).toBe(true);
});*/

it('matches hour range', () => {
    expect(availability.hasRange(eightToSixteen, 8, 16)).toBe(true);
});