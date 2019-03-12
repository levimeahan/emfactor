import { validateHours, hasHourRange } from '../availability';
import {Availability} from "../../types";

const eightToSixteen = '0'.repeat(8) + '1'.repeat(8) + '0'.repeat(8);
const tooShortHours = '0'.repeat(23);
const invalidChars = '1'.repeat(23) + '2';
const notAvailable = '0'.repeat(24);

const availability: Availability = {
    mon: notAvailable,
    tue: tooShortHours,
    wed: invalidChars,
    thu: eightToSixteen,
    fri: eightToSixteen,
    sat: notAvailable,
    sun: notAvailable,
};

describe('validateHours', () => {
    it('approves valid values', () => {
        expect(validateHours(eightToSixteen)).toBe(true);
    });

    it('rejects values that are too short', () => {
        let errorFound = false;
        try {
            validateHours(tooShortHours);
        } catch(e) {
            errorFound = true;
        }

        expect(errorFound).toBe(true);
    });

    it('rejects chars that are not 0/1', () => {
        let errorFound = false;
        try {
            validateHours(invalidChars);
        } catch(e) {
            errorFound = true;
        }

        expect(errorFound).toBe(true);
    });
});


it('matches hour range', () => {
    availability.mon = eightToSixteen;
    expect(hasHourRange(availability, 'mon', 8, 16)).toBe(true);
});