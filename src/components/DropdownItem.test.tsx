import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import DropdownItem from './DropdownItem';
import Dropdown from './Dropdown';

const openDropdown = () => {
    fireEvent.click(screen.getByRole('button'));
};

describe('DropdownItem', () => {
    it('renders provided text', () => {
        render(
            <Dropdown>
                <DropdownItem>foobar</DropdownItem>
            </Dropdown>
        );

        openDropdown();

        const itemElement = screen.getByText(/foobar/i);

        expect(itemElement).toBeInTheDocument();
    });
});