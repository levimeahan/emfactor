import React, { useState } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { colors, sizes } from '../themes/default';
import FormInput from "./FormInput";
import calcShiftWidth from '../utils/calcShiftWidth';

const formatTime = (hour) => {
    if(hour == 0 || hour == 24) {
        return '12 AM';
    }

    if(hour == 12) {
        return '12 PM';
    }

    if(hour > 12) {
        return `${hour - 12} PM`;
    }
    else {
        return `${hour} AM`;
    }
};

const ScheduleShift = ({ name, startTime, endTime, employeeName, templateMode, update }) => {
    const [editing, setEditing] = useState(false);

    const startEdit = () => {
        if(!templateMode) {
            return false;
        }

        // setEditing(true);
    };
    const stopEdit = () => {
        if(!templateMode) {
            return false;
        }

        // setEditing(false);
    };

    return <div
        className={css(styles.container)}
        style={{ width: calcShiftWidth(endTime - startTime) + '%' }}
        onClick={startEdit}
        onBlur={stopEdit}
    >
        <div className={css(styles.shiftContent)}>
            {templateMode ?
                <ShiftEditView
                    startTime={startTime}
                    endTime={endTime}
                    name={name}
                    employeeName={employeeName}
                    update={update}
                />
                :
                <ShiftContentView
                    startTime={startTime}
                    endTime={endTime}
                    name={name}
                    employeeName={templateMode ? name : employeeName}
                />
            }
        </div>
    </div>;
};

const ShiftContentView = ({startTime, endTime, name, employeeName}) => (
    <React.Fragment>
        <span className={css(styles.time, styles.startTime)}>{formatTime(startTime)}</span>
        <span className={css(styles.employeeName)}>{employeeName}</span>
        <span className={css(styles.time, styles.endTime)}>{formatTime(endTime)}</span>
    </React.Fragment>
);


let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const ShiftEditView = ({startTime, endTime, name, employeeName, update}) => (
    <React.Fragment>
        <div className={css(styles.startTime)}>
            <span>Start: </span>
            <select
                onBlur={(e) => {e.stopPropagation()}}
                value={startTime}
                onChange={e => update({ startTime: parseInt(e.currentTarget.value) })}
            >
                {hours.map((hour, i) => (
                    <option key={i} value={hour}>{hour}:00</option>
                ))}
            </select>
        </div>

        <div className={css(styles.employeeName)}>
            <FormInput
                type='text'
                name='shiftName'
                label=''
                manager={{
                    value: name,
                    onChange: (e) => { update({ name: e.currentTarget.value }) }
                }}
                styles={styles.nameInput}
            />
        </div>


        <div className={css(styles.endTime)}>
            <span>End: </span>
            <select
                onBlur={(e) => {e.stopPropagation()}}
                value={endTime}
                onChange={e => update({ endTime: parseInt(e.currentTarget.value) })}
            >
                {hours.map((hour, i) => (
                    <option key={i} value={hour}>{hour}:00</option>
                ))}
            </select>
        </div>
    </React.Fragment>
);

const styles = StyleSheet.create({
    container: {
        boxSizing: 'border-box',
        padding: '4px',
        alignSelf: 'center',
        backgroundColor: '#3a3a3a',
        border: '1px solid #303030',
    },
    shiftContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '4px 5px',
    },
    time: {
        fontSize: sizes.primaryFont - 2,
        color: colors.text.dark,
        width: '4.5em',
    },
    startTime: {
        textAlign: 'left',
    },
    endTime: {
        textAlign: 'right',
    },
    employeeName: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontFamily: 'Lucida Sans Unicode',
        color: colors.text.semiBright,
    },
    shiftName: {
        margin: 0,
        fontSize: '10px',
        backgroundColor: '#333',
    },

    nameInput: {
        width: '150px',
    },
});

export default ScheduleShift;