import React, { useContext } from 'react';
import Login from './pages/Login.tsx';

import './App.css';
import AppRouter from './AppRouter';
import StoreContext from './StoreContext.js';

function App() {
    const state = useContext(StoreContext);

    return <div className="App">
        {state.userEmployeeId ? <AppRouter /> : <Login />}
    </div>;
}

export default App;
