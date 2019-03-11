import { validate } from "validate.js";
import {ShiftAssignResponse} from "../types/serverResponses";

import store from '../store';

import getNextCollectionId from '../utils/getNextCollectionId';
import {ScheduledShift} from "../types";
import {calcShiftTimestamps} from "../utils/shifts";

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
    let existingId = scheduledShifts.allIds.find(id => id === data.shiftId);

    if(!scheduleWeeks.byId.hasOwnProperty(data.weekId)) {
        response.errorMessage = "Invalid week!";
        return response;
    }

    if(existingId === undefined) {
        response.isNew = true;

        let baseShift = shifts.byId[data.baseShiftId];
        let weekStartTime = scheduleWeeks.byId[data.weekId].startTimestamp;

        const timestamps = calcShiftTimestamps(weekStartTime, baseShift.day, baseShift.startHour, baseShift.endHour);

        scheduledShift = {
            id: getNextCollectionId(scheduledShifts),
            baseShiftId: data.baseShiftId,
            employeeId: data.employeeId,
            weekId: data.weekId,
            day: baseShift.day,
            name: baseShift.name,
            startHour: baseShift.startHour,
            endHour: baseShift.endHour,
            startTimestamp: timestamps.start,
            endTimestamp: timestamps.end,
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