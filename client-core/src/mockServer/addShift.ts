import { validate } from "validate.js";
import { ShiftResponse } from "../types/serverResponses";
import { DayNumber } from '../types';

import store from '../store';

import getNextCollectionId from './getNextCollectionId';

interface AddShiftData {
    day: DayNumber;
}

export default function addShift(data: AddShiftData): ShiftResponse {
    let response: ShiftResponse = {
        success: false,
        errorMessage: '',
        shift: null,
    };

    let errors = validate(data, {
        day: {
            presence: { allowEmpty: false },
            numericality: {
                greaterThanOrEqualTo: 1,
                lessThanOrEqualTo: 7,
            },
        },
    });

    if(errors) {
        response.errorMessage = JSON.stringify(errors);
        return response;
    }

    response.success = true;
    response.shift = {
        id: getNextCollectionId(store.getState().shifts),
        day: data.day,
        startTime: 0,
        endTime: 8,
        name: 'New Shift',
        allowedRoles: [],
    };

    return response;
}