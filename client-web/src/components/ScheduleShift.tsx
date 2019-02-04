import React, { useState } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import Select from 'react-select';

import { colors, sizes } from '../themes/default';
import FormInput from "./FormInput";
import calcShiftWidth from '../utils/calcShiftWidth';

import arrayFromRange from "../utils/arrayFromRange";
import formatHour from '../utils/formatHour';
import useAppState from "../hooks/useAppState";

import { actions, selectors } from 'emfactor-client-core';
import {ScheduleMode} from "../types";

// Note - edit = changing the template of a shift, assign = changing who is assigned to the shift for a given week
interface ScheduleShiftProps {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    employeeId: number;
    employeeName: string;
    mode: ScheduleMode;
}

const ScheduleShift = ({
   id, name, startTime, endTime, employeeId, employeeName, mode,
}: ScheduleShiftProps) => {
    const state = useAppState();

    const update = (data) => {
        actions.editShift(id, data)
    };
    const assign = (newEmployeeId) => {
        if(!newEmployeeId) {
            actions.assignShift(id, 0);
        }
        else {
            actions.assignShift(id, newEmployeeId)
        }
    };

    return <div
        className={css(styles.container)}
        style={{ width: calcShiftWidth(endTime - startTime) + '%' }}
    >
        <div className={css(styles.shiftContent)}>
            <div className={css(styles.time, styles.startTime)}>
                {mode === 'EDIT' ?
                    <ShiftTimeEdit
                        time={startTime}
                        label='Start: '
                        onChange={newValue => update({ startTime: newValue })}
                    />
                :
                    <ShiftTimeDisplay time={startTime} />
                }
            </div>

            <div className={css(styles.employeeName)}>
                {mode === 'EDIT' ?
                    <FormInput
                        type='text'
                        name='shiftName'
                        label=''
                        manager={{
                            value: name,
                            onChange: (e) => update({ name: e.currentTarget.value }),
                        }}
                        styles={styles.nameInput}
                    />
                : null}
                {mode === 'ASSIGN' ?
                    <select
                        value={employeeId ? employeeId : ''}
                        onChange={e => e.currentTarget.value ? assign(e.currentTarget.value) : null}
                    >
                        <option value='0'>None</option>
                        {getEmpOptions(state, id).map((option, i) =>
                            <option key={i} value={option.value}>{option.label}</option>
                        )}
                    </select>
                : null}
                {mode === 'DISPLAY' ?
                    <span>{employeeName}</span>
                : null}
            </div>

            <div className={css(styles.time, styles.endTime)}>
                {mode === 'EDIT' ?
                    <ShiftTimeEdit
                        time={endTime}
                        label='End: '
                        onChange={newValue => update({ endTime: newValue })}
                    />
                    :
                    <ShiftTimeDisplay time={endTime} />
                }
            </div>
        </div>
    </div>;
};
ScheduleShift.defaultProps = {
    mode: 'DISPLAY',
};

const getEmpOptions = (state, shiftId) => (
    selectors.availableEmployees(state, shiftId).map(emp => (
        { value: emp.id, label: `${emp.firstName} ${emp.lastName}`}
    ))
);

const hours = arrayFromRange(0, 24);

const ShiftTimeDisplay = ({ time }) => (
    <span>{formatHour(time)}</span>
);

const ShiftTimeEdit = ({ time, label, onChange }) => (
    <React.Fragment>
        <span>{label}</span>
        <select
            onBlur={(e) => {e.stopPropagation()}}
            value={time}
            onChange={e => onChange(parseInt(e.currentTarget.value))}
        >
            {hours.map((hour, i) => (
                <option key={i} value={hour}>{hour}:00</option>
            ))}
        </select>
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

const selectTheme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: '#1a3469',
        primary25: '#515969',
        primary50: '#1d3469',
        primary75: '#344469',
        neutral0: '#202020',
        neutral5: '#252525',
        neutral10: '#2a2a2a',
        neutral20: '#2f2f2f',
        neutral30: '#343434',
        neutral40: '#393939',
        neutral50: '#3e3e3e',
        neutral60: '#434343',
        neutral70: '#484848',
        neutral80: '#4d4d4d',
        neutral90: '#525252',
    },
});

export default ScheduleShift;