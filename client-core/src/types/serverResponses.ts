import { Employee, EntityCollection } from "./index";


export interface LoginResponse {
    loginOk: boolean,
    errorMessage: string,
    employee?: Employee
}

export interface EmployeesResponse {
    success: boolean;
    errorMessage: string;
    employees: EntityCollection<Employee>|null;
}