import React from 'react';

import { render, screen, fireEvent } from '../utility/testUtils';
import ErrorBox from './ErrorBox';

describe('ErrorBox', () => {
    it('shows error when it exists', () => {
        render(<ErrorBox error="foobar" />)

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });
});