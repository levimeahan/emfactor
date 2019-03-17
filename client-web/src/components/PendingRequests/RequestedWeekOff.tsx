import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { getWeekName } from "../../utils/dateTime";

import { selectors, actions, UIScheduleShift } from "emfactor-client-core";
import useAppState from "../../hooks/useAppState";
import RequestedShiftOff from "./RequestedShiftOff";

// Requested Week Off
const RequestedWeekOff = ({ weekId, startTime, scheduleCreated, shifts }) => {
    const assignShift = (shiftId, baseShiftId, employeeId) =>
        actions.schedule.assignShift(weekId, shiftId, baseShiftId, employeeId);

    return <div>
        <span className={css(styles.weekName)}>Week of {getWeekName(startTime)}</span>
        {scheduleCreated ?
            <ScheduledShiftsList
                shifts={shifts}
                assignShift={weekId ?
                    assignShift
                    :
                    () => {}
                }
            />
            :
            <div>Not scheduled yet. <button>Generate Schedule Draft</button></div>
        }
    </div>;
};

// Scheduled Shifts List
interface ScheduledShiftsListProps {
    shifts: UIScheduleShift[];
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