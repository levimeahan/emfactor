import { Employee } from "../store/schema";
export default function (data: any): {
    loginOk: boolean;
    errorMessage: string;
    employee?: undefined;
} | {
    loginOk: boolean;
    errorMessage: string;
    employee: Employee;
};
