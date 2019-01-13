declare class Network {
    errors: string[];
    constructor();
    post(url: any, data: any): Promise<any>;
    getLastError(): string;
}
declare const network: Network;
export default network;
