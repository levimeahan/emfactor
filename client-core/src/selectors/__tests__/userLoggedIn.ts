import { userLoggedIn } from '../user';

import { State } from '../../types';
import defaultState from '../../defaultState';

it('verifies user is not logged in', () => {
    const state: State = {
        ...defaultState,
        app: {
            ...defaultState.app,
            userEmployeeId: 0,
        }
    };

    expect(userLoggedIn(state)).toBe(false);
});

it('verifies user is logged in', () => {
    const state: State = {
        ...defaultState,
        app: {
            ...defaultState.app,
            userEmployeeId: 1,
        }
    };

    expect(userLoggedIn(state)).toBe(true);
});