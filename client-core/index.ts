import store from './store';
import defaultState from './defaultState';
import * as actions from './actions/index';
import * as selectors from './selectors/index';

store.initialize(defaultState);

export {
    store,
    actions,
    selectors
};
