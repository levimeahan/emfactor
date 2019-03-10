import React from 'react';
import {render} from 'react-testing-library';

import AppRouter from '../components/App/AppRouter';

it('renders', () => {
    const {getByText} = render(<AppRouter/>);
});

