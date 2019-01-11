import React, { useState, useEffect } from 'react';
import StoreContext from './StoreContext';

import { store } from 'emfactor-client-core';

function StoreProvider(props) {
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

    return <StoreContext.Provider value={state}>
        {props.children}
    </StoreContext.Provider>;
}



export default StoreProvider;