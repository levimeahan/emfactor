import React from 'react';

import StoreProvider from "./StoreProvider";
import AppIndex from './AppIndex';

function App() {
    return <StoreProvider>
        <AppIndex />
    </StoreProvider>;
}
export default App;
