"use strict";
exports.__esModule = true;
var login_1 = require("./login");
var mockServer = function (url, data) {
    var urlSegments = url.split('/');
    if (urlSegments[0] == "") {
        urlSegments = urlSegments.slice(1);
    }
    switch (urlSegments[0]) {
        case "login":
            return login_1["default"](data);
        default:
            throw new Error("Invalid URL!");
    }
};
exports["default"] = mockServer;
