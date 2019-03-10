import React from 'react';
import { render } from 'react-testing-library';

import App from '../components/App/App';

it('renders', () => {
    const { getByText } = render(<App />);
});

