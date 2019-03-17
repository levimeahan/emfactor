import store from '../../store';

import editEntityItem from '../../reducers/editEntityItem';

export default function declineTimeOff(requestId, approverId) {
    if(!requestId) {
        throw new Error("Invalid request ID!");
    }

    const request = store.getState().timeOffRequests.byId[requestId];

    store.dispatch(prevState => ({
        ...prevState,
        timeOffRequests: editEntityItem(prevState.timeOffRequests, requestId, {
            approved: false,
            finalized: true,
            finalizedBy: approverId,
            finalizedTime: Date.now(),
        })
    }));
}