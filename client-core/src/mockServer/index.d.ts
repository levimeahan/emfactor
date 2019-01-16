declare const mockServer: (url: any, data: any) => {
    loginOk: boolean;
    errorMessage: string;
    employee?: undefined;
} | {
    loginOk: boolean;
    errorMessage: string;
    employee: import("../types").Employee;
};
export default mockServer;
