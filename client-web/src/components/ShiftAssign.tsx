import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, selectors } from 'emfactor-client-core';
import useAppState from "../hooks/useAppState";

const getEmpOptions = (state, shiftId) => (
    selectors.availableEmployees(state, shiftId).map(emp => (
        { value: emp.id, label: `${emp.firstName} ${emp.lastName}`}
    ))
);

// Employee
const ShiftAssign = ({ employeeId, shiftId }) => {
    const state = useAppState();

    const assign = (newEmployeeId) => {
        if(!newEmployeeId) {
            actions.assignShift(shiftId, 0);
        }
        else {
            actions.assignShift(shiftId, newEmployeeId)
        }
    };

    return <select
        value={employeeId ? employeeId : ''}
        onChange={e => e.currentTarget.value ? assign(e.currentTarget.value) : null}
    >
        <option value='0'>None</option>
        {getEmpOptions(state, shiftId).map((option, i) =>
            <option key={i} value={option.value}>{option.label}</option>
        )}
    </select>;
};

const styles = StyleSheet.create({});

export default ShiftAssign;