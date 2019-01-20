var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import defaultState from '../../defaultState';
it('verifies user is not manager', function () {
    var state = __assign({}, defaultState, { app: __assign({}, defaultState.app, { userEmployeeId: 1 }), employees: {
            byId: {
                1: {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe',
                    roles: [],
                },
                2: {
                    id: 2,
                    firstName: 'John',
                    lastName: 'Doe',
                    roles: [],
                }
            },
            allIds: [1]
        } });
});
