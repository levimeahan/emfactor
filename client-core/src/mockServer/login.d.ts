import { Employee } from "../types";
export default function (data: any): {
    loginOk: boolean;
    errorMessage: string;
    employee?: undefined;
} | {
    loginOk: boolean;
    errorMessage: string;
    employee: Employee;
};
