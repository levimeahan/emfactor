import React, { useState } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { colors, sizes } from '../themes/default';
import FormInput from "./FormInput";
import calcShiftWidth from '../utils/calcShiftWidth';

import useAppState from "../hooks/useAppState";

import { actions, selectors } from 'emfactor-client-core';

import ShiftTime from "./ShiftTime";
import ShiftAssign from "./ShiftAssign";

import {ScheduleMode} from "../types";

// Main Component
interface ScheduleShiftProps {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    employeeId: number;
    employeeName: string;
    allowedRoles: number[];
    mode: ScheduleMode;
}

const ScheduleShift = ({
   id, name, startTime, endTime, employeeId, employeeName, allowedRoles, mode,
}: ScheduleShiftProps) => {
    const state = useAppState();

    const update = (data) => {
        actions.editShift(id, data)
    };

    return <div
        className={css(styles.container)}
        style={{ width: calcShiftWidth(endTime - startTime) + '%' }}
    >
        <div className={css(styles.shiftContent)}>
            <ShiftTime
                time={startTime}
                label='Start'
                onChange={newValue => update({ startTime: newValue })}
                mode={mode}
                styles={styles.startTime}
            />

            <div className={css(styles.shiftDetails)}>
                {mode === 'EDIT' ?
                    <>
                        <ShiftNameEdit manager={{
                            value: name, onChange: (e) => update({ name: e.currentTarget.value }),
                        }} />
                        <ShiftRolesEdit
                            currentRoles={allowedRoles}
                            allRoles={selectors.rolesArray(state)}
                            onChange={(newValue) => update({ allowedRoles: newValue })}
                        />
                    </>
                : null}
                {mode === 'ASSIGN' ?
                    <>
                        <ShiftNameDisplay name={name} />
                        <ShiftAssign shiftId={id} employeeId={employeeId} />
                    </>
                : null}
                {mode === 'DISPLAY' ?
                    <>
                        <ShiftNameDisplay name={name} />
                        <ShiftEmployeeName name={employeeName} />
                    </>
                : null}
            </div>

            <ShiftTime
                time={endTime}
                label='End'
                onChange={newValue => update({ endTime: newValue })}
                mode={mode}
                styles={styles.endTime}
            />
        </div>
    </div>;
};
ScheduleShift.defaultProps = {
    mode: 'DISPLAY',
};


// Name
const ShiftNameEdit = ({ manager }) => (
    <FormInput
        type='text'
        name='shiftName'
        label='Name'
        manager={manager}
        containerStyle={styles.nameInputContainer}
        labelStyle={styles.nameInputLabel}
        inputStyle={styles.nameInput}
    />
);

const ShiftNameDisplay = ({ name }) => (
    <span className={css(styles.nameDisplay)}>{name}</span>
);

const ShiftEmployeeName = ({ name }) => (
    <span className={css(styles.employeeNameDisplay)}>{name ? name : '-'}</span>
);

// Roles (Currently only supports one - TODO: Multiselect or change all code to single-value format)
const ShiftRolesEdit = ({ currentRoles, allRoles, onChange }) => {
    return <div className={css(styles.nameInputContainer)}>
        <label className={css(styles.nameInputLabel)}>Role</label>
        <select
            name="role"
            value={currentRoles.length > 0 ? currentRoles[0] : allRoles[0]}
            onChange={e => onChange([e.currentTarget.value])}
            className={css(styles.nameInput)}
        >
            {allRoles.map((role, i) => (
                <option key={i} value={role.id}>{role.name}</option>
            ))}
        </select>
    </div>;
};

// Styles
const styles = StyleSheet.create({
    container: {
        boxSizing: 'border-box',
        padding: '0',
        alignSelf: 'center',
        backgroundColor: '#3a3a3a',
        border: '1px solid #303030',
    },
    shiftContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
    },


    startTime: {
        marginLeft: '6px',
        textAlign: 'left',
    },
    endTime: {
        marginRight: '6px',
        textAlign: 'right',
    },

    shiftDetails: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '12px 4px 8px',
        minHeight: '22px',
        position: 'relative',
    },
    nameDisplay: {
        position: 'absolute',
        top: '0',
        left: '12px',
        fontSize: '10px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.text.medium,
    },
    employeeNameDisplay: {
        fontWeight: 'bold',
        fontFamily: 'Lucida Sans Unicode',
        color: colors.text.semiBright,
        lineHeight: '1em',
    },
    shiftName: {
        margin: 0,
        fontSize: '10px',
        backgroundColor: '#333',
    },

    nameInput: {
        width: '110px',
        margin: 0,
        boxSizing: 'border-box',
    },
    nameInputContainer: {
        display: 'flex',
        flexDirection: 'row',

        margin: '3px 0',
        padding: '4px',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',

        background: colors.background.secondaryDark,
    },
    nameInputLabel: {
        width: '3.7em',
        padding: '0 3px',
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'left',
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
        danger: '#c82f0a',
        dangerLight: '#af6158',
        neutral0:  'rgb(30,30,30)',
        neutral5:  'rgb(40,40,40)',
        neutral10: 'rgb(50,50,50)',
        neutral20: 'rgb(60,60,60)',
        neutral30: 'rgb(70,70,70)',
        neutral40: 'rgb(80,80,80)',
        neutral50: 'rgb(90,90,90)',
        neutral60: 'rgb(100,100,100)',
        neutral70: 'rgb(110,110,110)',
        neutral80: 'rgb(120,120,120)',
        neutral90: 'rgb(130,130,130)',
    },
});

// Export
export default ScheduleShift;