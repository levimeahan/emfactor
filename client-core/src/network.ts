/*
This is the network layer responsible for handling all communication to/from the server. Can switch between
using client-side mocks or real API requests for client testing purposes independent of server
*/

import mockServer from './mockServer/index';

class Network {
    errors: string[];

    constructor() {
        this.errors = [];
    }

    async post(url: string, data: object) {
        try {
            return mockServer(url, data);
        } catch(e) {
            this.errors.push(e);
            throw new Error(e);
        }
    }

    getLastError() {
        return this.errors.pop();
    }


}

const network = new Network();

export default network;