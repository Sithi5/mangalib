import { render } from '@testing-library/react-native';
import { NumberInput } from 'components/inputs';
import React from 'react';
import { act } from 'react-test-renderer';

describe('My test group', () => {
    it('renders correctly', async () => {
        const initial_value = '';
        React.useRef = jest.fn().mockReturnValue(initial_value);
        const search_text = React.useRef(initial_value);
        const result = render(<NumberInput search_text={search_text} />);
        await act(async () => {
            expect(result).toMatchSnapshot();
        });
    });
});
