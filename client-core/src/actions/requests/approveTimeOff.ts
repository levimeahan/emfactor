import store from '../../store';

import editEntityItem from '../../reducers/editEntityItem';

export default function approveTimeOff(requestId, approverId) {
    if(!requestId) {
        throw new Error("Invalid request ID!");
    }
    const request = store.getState().timeOffRequests.byId[requestId];

    debugger;

    store.dispatch(prevState => ({
        ...prevState,
        timeOffRequests: editEntityItem(prevState.timeOffRequests, requestId, {
            approved: true,
            finalized: true,
            finalizedBy: approverId,
            finalizedTime: Date.now(),
        })
    }));
}