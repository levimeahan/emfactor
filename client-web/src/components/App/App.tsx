import React from 'react';

import StateProvider from "../../StateProvider";
import AppIndex from './AppIndex';

function App() {
    return <StateProvider>
        <AppIndex />
    </StateProvider>;
}
export default App;
