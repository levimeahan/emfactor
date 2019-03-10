import React from 'react';

class ErrorBoundary extends React.Component {
    state: {
        hasError: false
    };

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if(this.state.hasError) {
            return <div>Error was caught! Check console for details.</div>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;