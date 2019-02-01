import { validate } from "validate.js";
import {ShiftAssignResponse} from "../types/serverResponses";

import store from '../store';

import database, { updateDbFromStoreState } from './database';
import getNextCollectionId from './getNextCollectionId';
import {ScheduledShift} from "../types";


interface AssignShiftData {
    shiftId: number;
    employeeId: number;
}

export default function assignShift(data: AssignShiftData): ShiftAssignResponse {
    let response: ShiftAssignResponse = {
        success: false,
        errorMessage: '',
        isNew: false,
        scheduledShift: null,
    };

    let errors = validate(data, {
        shiftId: {
            presence: {
                numericality: true,
            },
            numericality: true,
        },
        employeeId: {
            presence: { allowEmpty: false },
            numericality: true,
        }
    });

    if(errors) {
        response.errorMessage = JSON.stringify(errors);
        return response;
    }

    response.success = true;

    updateDbFromStoreState(store.getState());

    let scheduledShift: ScheduledShift;
    let existingId = database.scheduledShifts.allIds.find(id =>
        database.scheduledShifts.byId[id].shiftId === data.shiftId
    );

    if(existingId === undefined) {
        response.isNew = true;
        scheduledShift = {
            id: getNextCollectionId(database.scheduledShifts),
            shiftId: data.shiftId,
            employeeId: data.employeeId,
            scheduleWeek: 0,
        };
    }
    else {
        scheduledShift = {
            ...database.scheduledShifts.byId[existingId],
            employeeId: data.employeeId,
        };
    }

    response.scheduledShift = scheduledShift;

    return response;
}