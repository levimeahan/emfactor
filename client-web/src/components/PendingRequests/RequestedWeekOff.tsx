import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { getWeekName } from "../../utils/dateTime";

import { selectors, types } from "emfactor-client-core";
import useAppState from "../../hooks/useAppState";
import RequestedShiftOff from "./RequestedShiftOff";

// Requested Week Off
interface RequestedWeekOffProps {
    startTime: number;
    scheduleCreated: boolean;
    shifts: types.UIScheduleShift[];
    assignShift: (shiftId: number, baseShiftId: number, employeeId: number) => void;
}
const RequestedWeekOff = ({ startTime, scheduleCreated, shifts, assignShift = () => {} }: RequestedWeekOffProps) => (
    <div>
        <span className={css(styles.weekName)}>Week of {getWeekName(startTime)}</span>
        {scheduleCreated ?
            <ScheduledShiftsList
                shifts={shifts}
                assignShift={assignShift}
            />
            :
            <div>Not scheduled yet. <button>Generate Schedule Draft</button></div>
        }
    </div>
);

// Scheduled Shifts List
interface ScheduledShiftsListProps {
    shifts: types.UIScheduleShift[];
    assignShift: (shiftId: number, baseShiftId: number, employeeId: number) => void;
}
const ScheduledShiftsList = ({ shifts, assignShift }: ScheduledShiftsListProps) => {
    const state = useAppState();

    return <div className={css(styles.scheduledShiftsList)}>
        {shifts.map((shift, i) => (
            <RequestedShiftOff
                key={i}
                startTimestamp={shift.startTimestamp}
                endTimestamp={shift.endTimestamp}
                employeeId={shift.employeeId}
                employeeOptions={selectors.availableEmployees(state, shift.startTimestamp, shift.endTimestamp, shift.id)}
                assign={(employeeId) => assignShift(shift.id, shift.baseShiftId, employeeId)}
            />
        ))}
    </div>;
};




const styles = StyleSheet.create({
    requestedWeekOff: {},
    weekName: {
    },

    scheduledShiftsList: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '4px',
    },
});

export default RequestedWeekOff;