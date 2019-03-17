import React, { useState } from 'react';
import { css } from 'aphrodite/no-important';

import {Employee, Shift, DeepReadonly } from "emfactor-client-core";
import { ScheduleMode, ScheduleDayActions } from "../../types";

import calcShiftWidth from '../../utils/calcShiftWidth';

import FormInput from "../Form/FormInput";
import ShiftTime from "./ShiftTime";
import ShiftAssign from "./ShiftAssign";
import ShiftRoleEdit from "./ShiftRoleEdit";

import useFormInput from "../../hooks/useFormInput";

import styles from './scheduleShiftStyles';

// Main Component
interface ScheduleShiftProps {
    name: string;
    startHour: number;
    endHour: number;
    employeeId: number;
    employeeName: string;
    employeeOptions: DeepReadonly<Employee[]>;
    roleId: number;
    allRoles: number[];
    mode: ScheduleMode;
    edit: (changedData: Partial<Shift>) => void;
    assign: (employeeId: number) => void;
}

/**
 *
 */
const ScheduleShift = ({
   name, startHour, endHour, employeeId, employeeName, employeeOptions, roleId, allRoles, mode, edit, assign
}: ScheduleShiftProps) => {


    return <div
        className={css(styles.container)}
        style={{width: calcShiftWidth(endHour - startHour) + '%'}}
    >
        <div className={css(styles.shiftContent)}>
            <ShiftTime
                time={startHour}
                label='Start'
                onChange={newValue => edit({startHour: newValue})}
                mode={mode}
                extraStyles={styles.startTime}
            />

            <div className={css(styles.shiftDetails)}>
                {mode === 'EDIT' ?
                    <>
                        <ShiftNameEdit name={name} update={(newValue) => { console.log('update'); edit({ name: newValue }) }} />
                        <ShiftRoleEdit
                            currentRole={roleId}
                            allRoles={allRoles}
                            onChange={(newValue) => edit({roleId: newValue})}
                        />
                    </>
                : null}
                {mode === 'ASSIGN' ?
                    <>
                        <ShiftNameDisplay name={name}/>
                        <ShiftAssign
                            employeeId={employeeId}
                            employeeOptions={employeeOptions}
                            assign={assign}
                        />
                    </>
                : null}
                {mode === 'DISPLAY' ?
                    <>
                        <ShiftNameDisplay name={name}/>
                        <ShiftEmployeeName name={employeeName}/>
                    </>
                : null}
            </div>

            <ShiftTime
                time={endHour}
                label='End'
                onChange={newValue => edit({endHour: newValue})}
                mode={mode}
                extraStyles={styles.endTime}
            />
        </div>
    </div>;
};
ScheduleShift.defaultProps = {
    mode: 'DISPLAY',
};


// Name
const ShiftNameEdit = ({ name, update }) => {
    const nameManager = useFormInput(name);

    return <FormInput
        type='text'
        name='shiftName'
        label='Name'
        manager={nameManager}
        onBlur={() => update(nameManager.value)}
        containerStyle={styles.nameInputContainer}
        labelStyle={styles.nameInputLabel}
        inputStyle={styles.nameInput}
    />;
};

const ShiftNameDisplay = ({ name }) => (
    <span className={css(styles.nameDisplay)}>{name}</span>
);

const ShiftEmployeeName = ({ name }) => (
    <span className={css(styles.employeeNameDisplay)}>{name ? name : '-'}</span>
);



// Styles


// Export
export default ScheduleShift;