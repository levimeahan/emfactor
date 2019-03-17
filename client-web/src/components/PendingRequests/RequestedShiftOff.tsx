import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {DeepReadonly, Employee} from "../../../../client-core/src/types";
import {formatDate} from "../../utils/dateTime";
import {colors} from "../../themes/default";
import moment from "moment";
import ShiftAssign from "../Schedule/ShiftAssign";
import ShiftTime from "../Schedule/ShiftTime";

// Utils
function formatTime(timestamp) {
    let time = moment(timestamp);
    if(time.minutes() === 59) {
        time.hour(time.hour() + 1);
        time.minutes(0);
    }

    return time.format('h A');
}

// RequestedShiftOff
interface RequestedShiftOffProps {
    startTimestamp: number;
    endTimestamp: number;
    employeeId: number;
    employeeOptions: DeepReadonly<Employee[]>;
    assign: (employeeId: number) => void;
}
const RequestedShiftOff = ({ startTimestamp, endTimestamp, employeeId, employeeOptions, assign }: RequestedShiftOffProps) => (
    <div className={css(styles.scheduledShift)}>
        <span className={css(styles.scheduledShiftDate)}>{formatDate(startTimestamp, 'short')}</span>
        <span className={css(styles.startTime)}>{formatTime(startTimestamp)}</span>
        <span>&rarr;</span>
        <span className={css(styles.endTime)}>{formatTime(endTimestamp)}</span>
        <div className={css(styles.shiftAssignContainer)}>
            <ShiftAssign
                employeeId={employeeId}
                employeeOptions={employeeOptions}
                assign={(employeeId) => assign(employeeId)}
                extraStyles={styles.shiftAssign}
            />
        </div>
    </div>
);

const styles = StyleSheet.create({
    scheduledShift: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '10.5em',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5px',
        padding: '10px',

        background: colors.background.secondaryDark,
    },
    scheduledShiftDate: {
        flexBasis: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '5px',
    },

    startTime: {},
    endTime: {},
    shiftAssignContainer: {
        flexBasis: '100%',
        textAlign: 'center',
        marginTop: '5px',
    },
    shiftAssign: {
        width: '100%'
    },
});

export default RequestedShiftOff;