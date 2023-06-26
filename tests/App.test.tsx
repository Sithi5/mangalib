import { render } from '@testing-library/react-native';
import React from 'react';

import App from '../App';

const originalError = console.error;

describe('App component', () => {
    it('App renders without crashing', () => {
        jest.spyOn(console, 'error').mockImplementation((...args) => {
            if (
                typeof args[0] === 'string' &&
                args[0].includes(
                    'Warning: An update to %s inside a test was not wrapped in act'
                )
            ) {
                return;
            }
            return originalError.call(console, args);
        });
        render(<App />);
    });
});
