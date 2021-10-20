import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
    it('opens on click', () => {
        render(
            <Dropdown>
                <p>foobar</p>
            </Dropdown>
        );

        fireEvent.click(screen.getByRole('button'));

        const element = screen.getByText(/foobar/i);
        expect(element).toBeInTheDocument();
    });
});