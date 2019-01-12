import React from 'react';

import { store } from 'emfactor-client-core';

const StoreContext = React.createContext(store.getState());

export default StoreContext;