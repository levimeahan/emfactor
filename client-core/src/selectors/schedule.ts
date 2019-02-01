import {ScheduledShift, State, UIScheduleShift, UIScheduleWeek} from "../types";

/*** UTILS ***/

const spreadShiftsToDays = (shifts: UIScheduleShift[]) => {
    let shiftsByDay = {
        1: <UIScheduleShift[]>[],
        2: <UIScheduleShift[]>[],
        3: <UIScheduleShift[]>[],
        4: <UIScheduleShift[]>[],
        5: <UIScheduleShift[]>[],
        6: <UIScheduleShift[]>[],
        7: <UIScheduleShift[]>[],
    };

    shifts.forEach((shift) => {
        shiftsByDay[shift.day].push(shift)
    });

    return shiftsByDay;
};

const getUIScheduleShifts = (shifts: State["shifts"], scheduledShifts: State["scheduledShifts"], employees: State["employees"]) => {
    let shiftIdIndex = new Map();

    let uiScheduleShifts: UIScheduleShift[] = shifts.allIds.map((id, i) => {
        shiftIdIndex.set(id, i);

        return <UIScheduleShift>{
            ...shifts.byId[id],
            employeeId: null,
            employeeName: null,
        };
    });

    Object.values(scheduledShifts.byId).forEach((scheduledShift) => {
        let shiftKey = shiftIdIndex.get(scheduledShift.shiftId);
        if(shiftKey === undefined) {
            return;
        }

        uiScheduleShifts[shiftKey].employeeId = scheduledShift.employeeId;

        if(employees.byId.hasOwnProperty(scheduledShift.employeeId)) {
            uiScheduleShifts[shiftKey].employeeName =
                `${employees.byId[scheduledShift.employeeId].firstName} ${employees.byId[scheduledShift.employeeId].lastName}`;
        }
    });

    return uiScheduleShifts;
};

/*** SELECTORS ***/

export const currentScheduleWeek = (state: State): UIScheduleWeek => {
    let shifts = getUIScheduleShifts(state.shifts, state.scheduledShifts, state.employees);
    let shiftsByDay = spreadShiftsToDays(shifts);

    return {
        id: 1,
        draft: false,
        startTimestamp: 0,
        days: {
            1: {
                name: 'Monday',
                date: 'Feb 4',
                shifts: shiftsByDay[1],
            },
            2: {
                name: 'Tuesday',
                date: 'Feb 5',
                shifts: shiftsByDay[2],
            },
            3: {
                name: 'Wednesday',
                date: 'Feb 6',
                shifts: shiftsByDay[3],
            },
            4: {
                name: 'Thursday',
                date: 'Feb 7',
                shifts: shiftsByDay[4],
            },
            5: {
                name: 'Friday',
                date: 'Feb 8',
                shifts: shiftsByDay[5],
            },
            6: {
                name: 'Saturday',
                date: 'Feb 9',
                shifts: shiftsByDay[6],
            },
            7: {
                name: 'Sunday',
                date: 'Feb 10',
                shifts: shiftsByDay[7],
            },
        },
        dayIds: [1, 2, 3, 4, 5, 6, 7]
    };
};

