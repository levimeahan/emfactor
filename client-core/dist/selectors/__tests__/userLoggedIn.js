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
import { userLoggedIn } from '../user';
import defaultState from '../../defaultState';
it('verifies user is not logged in', function () {
    var state = __assign({}, defaultState, { app: __assign({}, defaultState.app, { userEmployeeId: 0 }) });
    expect(userLoggedIn(state)).toBe(false);
});
it('verifies user is logged in', function () {
    var state = __assign({}, defaultState, { app: __assign({}, defaultState.app, { userEmployeeId: 1 }) });
    expect(userLoggedIn(state)).toBe(true);
});
