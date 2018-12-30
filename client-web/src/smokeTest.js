import React from 'react';
import ReactDOM from 'react-dom';

export default function smokeTest(Component) {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Component />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
}

