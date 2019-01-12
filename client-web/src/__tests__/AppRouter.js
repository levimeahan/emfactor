import React from 'react';
import {render} from 'react-testing-library';

import AppRouter from '../AppRouter';

it('renders', () => {
    const {getByText} = render(<AppRouter/>);
});

