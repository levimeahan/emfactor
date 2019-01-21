import login from './login';
import employees from './employees';

const mockServer = (url, data) => {
    let urlSegments = url.split('/');
    if(urlSegments[0] == "") {
        urlSegments = urlSegments.slice(1);
    }

    switch(urlSegments[0]) {
        case "login":
            return login(urlSegments.slice(1), data);
        case "employees":
            return employees(urlSegments.slice(1), data);
        default:
            throw new Error("Invalid URL!");
    }
};



export default mockServer;