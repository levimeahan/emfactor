import { validate } from "validate.js";
import { ShiftResponse } from "../types/serverResponses";
import { DayNumber } from '../types';

import store from '../store';

import database, { updateDbFromStoreState } from './database';
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

    updateDbFromStoreState(store.getState());

    let newShift = {
        id: getNextCollectionId(database.shifts),
        day: data.day,
        startTime: 0,
        endTime: 8,
        name: 'New Shift',
        allowedRoles: [],
    };

    database.shifts.byId[newShift.id] = newShift;
    database.shifts.allIds.push(newShift.id);

    response.shift = newShift;

    return response;
}