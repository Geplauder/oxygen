import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tooltip from './Tooltip';
import { act } from 'react-dom/test-utils';

describe('Tooltip', () => {
    it('renders provided text on hover', async () => {
        render(
            <Tooltip placement='right' content='foobar'>
                <button>test</button>
            </Tooltip>
        );

        fireEvent.mouseEnter(screen.getByText('test').parentElement as HTMLElement);

        // This fixes a weird error, that an update to the Tippy component was not wrapped in act(...)
        await waitFor(() => {
            expect(screen.getByText(/foobar/i)).toBeInTheDocument();
        })
    });
});