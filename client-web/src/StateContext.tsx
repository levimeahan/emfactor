import React from 'react';

import { store } from 'emfactor-client-core';

const StateContext = React.createContext(store.getState());

export default StateContext;