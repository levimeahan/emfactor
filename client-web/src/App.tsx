import React from 'react';

import { store } from 'emfactor-client-core';

import { canUseStorage, loadState, saveState } from "./utils/stateDevTools";

if(canUseStorage) {
    loadState();
    store.subscribe(saveState);
}

import StateProvider from "./StateProvider";
import AppIndex from './AppIndex';

function App() {
    return <StateProvider>
        <AppIndex />
    </StateProvider>;
}
export default App;
