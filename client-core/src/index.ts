import store from './store/index';
import defaultState from './defaultState';
import * as actions from './actions/index';
import * as selectors from './selectors/index';
import { Days, permissions } from './config';

store.initialize(defaultState);

export {
    store,
    actions,
    selectors,
    Days,
    permissions,
};

