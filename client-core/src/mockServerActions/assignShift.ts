import { validate } from "validate.js";
import {ShiftAssignResponse} from "../types/serverResponses";

import store from '../store';

import getNextCollectionId from '../utils/getNextCollectionId';
import {ScheduledShift} from "../types";

const calcOffset = (days, hours) => {
    let seconds = (days - 1) * 86400 + hours * 3600;

    return seconds * 1000;
};

interface AssignShiftData {
    shiftId: number;
    baseShiftId: number;
    employeeId: number;
    weekId: number;
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
            presence: { allowEmpty: false },
            numericality: true,
        },
        baseShiftId: {
            presence: true,
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

    const { shifts, scheduledShifts, scheduleWeeks } = store.getState();

    let scheduledShift: ScheduledShift;
    let existingId = scheduledShifts.allIds.find(id =>
        scheduledShifts.byId[id].baseShiftId === data.shiftId
    );

    if(!scheduleWeeks.byId.hasOwnProperty(data.weekId)) {
        response.errorMessage = "Invalid week!";
        return response;
    }

    if(existingId === undefined) {
        response.isNew = true;

        let baseShift = shifts.byId[data.shiftId];
        let weekStartTime = scheduleWeeks.byId[data.weekId].startTimestamp;

        scheduledShift = {
            id: getNextCollectionId(scheduledShifts),
            baseShiftId: data.shiftId,
            employeeId: data.employeeId,
            weekId: data.weekId,
            day: baseShift.day,
            name: baseShift.name,
            startHour: baseShift.startHour,
            endHour: baseShift.endHour,
            startTimestamp: weekStartTime + calcOffset(baseShift.day, baseShift.startHour),
            endTimestamp: weekStartTime + calcOffset(baseShift.day, baseShift.endHour + 1),
            roleId: baseShift.roleId,
        };
    }
    else {
        scheduledShift = {
            ...scheduledShifts.byId[existingId],
            employeeId: data.employeeId,
        };
    }

    response.scheduledShift = scheduledShift;

    return response;
}