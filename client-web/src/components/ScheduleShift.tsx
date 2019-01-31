import React, { useState } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { colors, sizes } from '../themes/default';
import FormInput from "./FormInput";
import calcShiftWidth from '../utils/calcShiftWidth';

import arrayFromRange from "../utils/arrayFromRange";
import formatHour from '../utils/formatHour';

// Note - edit = changing the template of a shift, assign = changing who is assigned to the shift for a given week
interface ScheduleShiftProps {
    name: string;
    startTime: number;
    endTime: number;
    employeeName: string;
    mode: 'EDIT' | 'ASSIGN' | 'DISPLAY';
    update: (newValues: { name?: string, startTime?: number, endTime?: number, employeeName?: string} ) => void;
}

const ScheduleShift = ({ name, startTime, endTime, employeeName, mode, update }: ScheduleShiftProps) => {
    const [editing, setEditing] = useState(false);

    const startEdit = () => {
        if(mode !== 'EDIT') {
            return false;
        }

        // setEditing(true);
    };
    const stopEdit = () => {
        if(mode !== 'EDIT') {
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
                            onChange: (e) => {
                                if(mode === 'EDIT') {
                                    update({ name: e.currentTarget.value })
                                }
                                else {
                                    update({ employeeName: e.currentTarget.value })
                                }
                            },
                        }}
                        styles={styles.nameInput}
                    />
                : null}
                {mode === 'ASSIGN' ?
                    <span>Assign</span>
                : null}
                {mode === 'DISPLAY' ?
                    <span>{name}</span>
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
                    <ShiftTimeDisplay time={startTime} />
                }
            </div>
        </div>
    </div>;
};
ScheduleShift.defaultProps = {
    mode: 'DISPLAY',
};

const ShiftContentView = ({startTime, endTime, name, employeeName}) => (
    <React.Fragment>
        <span className={css(styles.employeeName)}>{employeeName}</span>
        <span className={css(styles.time, styles.endTime)}>{formatHour(endTime)}</span>
    </React.Fragment>
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

const ShiftEditView = ({startTime, endTime, name, employeeName, update}) => (
    <React.Fragment>
        <div className={css(styles.startTime)}>
            
        </div>

        <div className={css(styles.employeeName)}>

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