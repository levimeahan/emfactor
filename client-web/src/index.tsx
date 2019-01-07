import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import StoreProvider from './StoreProvider';
import App from './App';

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById('root')
);

