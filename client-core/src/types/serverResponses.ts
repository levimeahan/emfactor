import {Employee, Shift, EntityCollection, ScheduledShift, DeepReadonly} from "./index";


export interface LoginResponse {
    loginOk: boolean,
    errorMessage: string,
    employee?: Employee
}

export interface EmployeesResponse {
    success: boolean;
    errorMessage: string;
    employees: DeepReadonly<EntityCollection<Employee>>|null;
}

export interface ShiftResponse {
    success: boolean;
    errorMessage: string;
    shift: Shift;
}

export interface ShiftAssignResponse {
    success: boolean;
    errorMessage: string;
    isNew: boolean;
    scheduledShift: ScheduledShift;
}