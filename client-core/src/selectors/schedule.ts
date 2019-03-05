import { State, UIScheduleShift, UIScheduleWeek } from "../types";
import { fullName } from '../utils/employee';

export const getUIScheduleShifts = (state: State, scheduledShiftIds: number[]) => {
    let shiftIdIndex = new Map();

    let uiScheduleShifts: UIScheduleShift[] = state.shifts.allIds.map((id, i) => {
        shiftIdIndex.set(id, i);

        return <UIScheduleShift>{
            ...state.shifts.byId[id],
            employeeId: null,
            employeeName: null,
        };
    });

    scheduledShiftIds.forEach((scheduledShiftId) => {
        let scheduledShift = state.scheduledShifts.byId[scheduledShiftId];

        let shiftKey = shiftIdIndex.get(scheduledShift.shiftId);
        if(shiftKey === undefined) {
            return;
        }

        uiScheduleShifts[shiftKey].employeeId = scheduledShift.employeeId;

        if(state.employees.byId.hasOwnProperty(scheduledShift.employeeId)) {
            uiScheduleShifts[shiftKey].employeeName = fullName(state.employees.byId[scheduledShift.employeeId]);
        }
    });

    return uiScheduleShifts;
};

export const employeeShiftsByWeek = (state: State, employeeId: number, weekId: number) => (
    state.scheduledShifts.allIds
        .filter(id => {
            let shift = state.scheduledShifts.byId[id];

            return shift.employeeId === employeeId && shift.weekId === weekId;
        })
        .map(id => state.scheduledShifts.byId[id])
);