import login from './login';
import addEmployee from './addEmployee';

const mockServer = (url, data) => {
    let urlSegments = url.split('/');
    if(urlSegments[0] == "") {
        urlSegments = urlSegments.slice(1);
    }

    switch(urlSegments[0]) {
        case "login":
            return login(urlSegments.slice(1), data);
        case "employees":
            if(urlSegments.length < 2) {
                throw new Error('No page specified!');
            }

            switch(urlSegments[1]) {
                case 'add':
                    return addEmployee(data);
                default:
                    throw new Error(`Invalid page: /employees/${urlSegments[0]}`);
            }
        default:
            throw new Error("Invalid URL!");
    }
};



export default mockServer;