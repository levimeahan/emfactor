import React, { useState, useEffect } from 'react';
import StateContext from './StateContext';

import { store } from 'emfactor-client-core';

function StateProvider(props) {
    const [state, setState] = useState(store.getState());

    const receiveUpdate = (newState) => {
        if(newState === state) {
            return false;
        }

        setState(newState);
    };

    useEffect(
        () => {
            store.subscribe(receiveUpdate);

            return () => {
                store.unsubscribe(receiveUpdate);
            };
        },
        [store]
    );

    return <StateContext.Provider value={state}>
        {props.children}
    </StateContext.Provider>;
}



export default StateProvider;